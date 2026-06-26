import bcrypt from "bcryptjs"
import userModel from "../models/user.model.js"
import jwt from "jsonwebtoken";
import crypto from "crypto"
import config from "../config/config.js";

export const register = async (req, res) => {

    try {
        const { fullName, userName, password, gender } = req.body

        if (!fullName || !userName || !password || !gender) {
            return res.status(400).json({
                message: "Something is missing",
                success: false
            })
        }
        const lowerCaseUserName = userName.trim().toLowerCase()
        const findUser = await userModel.findOne({ userName: lowerCaseUserName })

        if (findUser) {
            return res.status(400).json({
                message: "User already exits"
            })
        }

        const hashedPassword = await bcrypt.hash(password, 10)

        const avatar = gender === "male"
            ? `https://api.dicebear.com/9.x/adventurer/svg?seed=${lowerCaseUserName}`
            : `https://api.dicebear.com/9.x/lorelei/svg?seed=${lowerCaseUserName}`;

        const user = await userModel.create({
            fullName,
            userName: lowerCaseUserName,
            password: hashedPassword,
            gender,
            avatar: avatar
        })

        //refresh token
        const refreshtoken = jwt.sign(
            {
                id: user._id,
            },
            config.JWT_SECRET,
            {
                expiresIn: "7d",
            },
        );
        const refreshtokenhash = crypto
            .createHash("sha256")
            .update(refreshtoken)
            .digest("hex");



        const accessToken = jwt.sign({ id: user._id }, config.JWT_SECRET, {
            expiresIn: "15m",
        });
        const safeUser = {
            _id: user._id,
            fullName: user.fullName,
            userName: user.userName,
            gender: user.gender,
            avatar: user.avatar
        }
        res.status(200).cookie("refreshtoken", refreshtoken, {
            httpOnly: true,
            secure: false, //for local host
            sameSite: "lax",
            maxAge: 7 * 24 * 60 * 60 * 1000,
        });
        return res.status(201).json({
            success: true,
            message: "User has been successfully registered",
            accessToken,
            user: safeUser,
            originalUserName: userName
        });
    }

    catch (error) {
        console.error(error);

        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
}

export const login = async (req, res) => {
    try {
        const { userName, password } = req.body;


        if (!userName || !password) {
            return res.status(400).json({
                message: "Something is missing",
                success: "false",
            });
        }

        const lowerCaseUserName = userName.trim().toLowerCase()
        let user = await userModel.findOne({ userName: lowerCaseUserName });

        if (!user) {
            return res.status(400).json({ message: "Incorrect userName or password" });
        }

        const validpassword = await bcrypt.compare(
            password,
            user.password
        );



        if (!validpassword) {
            return res.status(401).json({
                success: false,
                message: "Incorrect password",
            });
        }

        //refreshToken
        const refreshtoken = jwt.sign(
            {
                id: user._id,
            },
            config.JWT_SECRET,
            {
                expiresIn: "7d",
            },
        );
        const refreshtokenhash = crypto
            .createHash("sha256")
            .update(refreshtoken)
            .digest("hex");



        const accessToken = jwt.sign({ id: user._id }, config.JWT_SECRET, {
            expiresIn: "45m",
        });
        const safeuser = {
            _id: user._id,
            fullName: user.fullName,
            userName: user.userName,
            gender: user.gender,
            avatar: user.avatar

        };
        res.cookie("refreshtoken", refreshtoken, {
            httpOnly: true,
            secure: false, //for local host
            sameSite: "lax",
            maxAge: 7 * 24 * 60 * 60 * 1000,
        });
        return res.status(200).json({
            success: true,
            message: `Welcome back ${user.fullName}`,
            accessToken,
            user: safeuser,
        });
    } catch (error) {
        console.error(error);

        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
};

export const getProfile = async (req, res) => {

    try {
        const userId = req.id;

        const profile = await userModel.findById(userId);
        if (!profile) {
            return res.status(404) / json({
                success: false,
                message: "User not found"
            })
        }
        res.status(200).json({
            success: true,
            responseData: profile,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
};


export const logout = async (req, res) => {

    return res.status(200).clearCookie("refreshtoken").json({
        success: true,
        message: "Logged out successfully"
    })
}

export const getOtherUsers = async (req, res) => {
    try {

        const userId = req.id

        const otherUsers = await userModel.find({
            _id: { $ne: userId }
        }); //do not want myself

        res.status(200).json({
            message: "Found others ",
            otherUsers
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });

    }
}

export const updateProfile = async (req, res) => {
    try {
        const userId = req.id

        const { fullName, userName, password, gender } = req.body




        let hashedPassword;


        let user = await userModel.findById(userId)

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "No such user exists"
            })
        }

        if (fullName) {
            user.fullName = fullName
        }
        if (userName) {
            user.userName = userName
        }
        if (gender) {
            user.gender = gender
        }
        if (password) {
            hashedPassword = await bcrypt.hash(password, 10)
            user.password = hashedPassword
        }
        await user.save()

        const safeUser = {
            _id: user._id,
            fullName: user.fullName,
            userName: user.userName,
            avatar: user.avatar,
            gender: user.gender
        }

        return res.status(200).json({
            success: true,
            message: "User updated successfully",
            user: safeUser
        })
    } catch (error) {
        console.log(error)

        return res.status(500).json({
            success: false,
            message: "Internal server error..."
        })
    }


}