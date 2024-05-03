import { Request, Response,NextFunction } from "express"
import User from "../models/user.models.js"
import bcrypt from 'bcrypt'
import { createToken } from "../utils/token-manager.js"
import { COOKIE_NAME } from "../utils/constant.js"
export const getAllUsers = async(
    req, res, next
) => {
    // get all users
    try {
        const users = await User.find()
        return res.status(200)
        .json({
            message: "okk", users
        })
    } catch (error) {
        console.log(error)
        return res.status(400).json({msg:"something went wrong", cause: error.message})
    }
}

export const userSignup = async(
    req, res, next
) => {
    // user signup
    try {
        const {name, email, password} = req.body
        const existingUser = await User.findOne({ email })
        if(existingUser) return res.status(401).send("user already exist")
        const hashPassword = await bcrypt.hash(password, 10)
        const user = new User({name, email, password: hashPassword})
        await user.save()

        //  create token and store cookie
        res.clearCookie(COOKIE_NAME, {
            httpOnly: true,
            domain: "localhost",
            signed: true,
            path: "/"
        })

        const token = createToken(user._id.toString(), user.email, "7d");
        const expires = new Date();
        expires.setDate(expires.getDate() + 7)
        res.cookie(COOKIE_NAME, token, { path: "/", domain: "localhost", expires, httpOnly: true, signed: true})

        return res.status(201)
        .json({
            message: "okk", name: user.name, email:user.email
        })
    } catch (error) {
        console.log(error)
        return res.status(400).json({msg:"something went wrong", cause: error.message})
    }
}

export const userLogin = async(
    req, res, next
) => {
    // user login
    try {
        const {email, password} = req.body
        const user = await User.findOne({email})
        if (!user) {
            return res.status(401).send("User not registered")
        }

        const isPasswordCorrect = await bcrypt.compare(password, user.password)
        if(!isPasswordCorrect) {
            return res.status(403).send("Incorrect Password")
        }

        res.clearCookie(COOKIE_NAME, {
            httpOnly: true,
            domain: "localhost",
            signed: true,
            path: "/"
        })

        const token = createToken(user._id.toString(), user.email, "7d");
        const expires = new Date();
        expires.setDate(expires.getDate() + 7)
        res.cookie(COOKIE_NAME, token, { path: "/", domain: "localhost", expires, httpOnly: true, signed: true})

        return res.status(200)
        .json({
            message: "okk", name: user.name, email:user.email
        })
    } catch (error) {
        console.log(error)
        return res.status(400).json({msg:"something went wrong", cause: error.message})
    }
}

// check authentication status

export const verifyUser = async(
    req, res, next
) => {
    // user login
    try {
        const user = await User.findById(res.locals.jwtData.id)
        if (!user) {
            return res.status(401).send("User not registered or Token malfunctioned")
        }

        console.log(user._id.toString(), res.locals.jwtData.id)

        if(user._id.toString() !== res.locals.jwtData.id) {
            return res.status(401).send("Permission didn't match")
        }

        return res.status(200)
        .json({
            message: "okk", name: user.name, email:user.email
        })
    } catch (error) {
        console.log(error)
        return res.status(400).json({msg:"something went wrong", cause: error.message})
    }
}

export const userLogout = async(
    req:Request, res:Response, next:NextFunction
) => {
    // user login
    try {
        
        const user = await User.findById(res.locals.jwtData.id)
        if (!user) {
            return res.status(401).send("User not registered or Token malfunctioned")
        }

        // console.log(user._id.toString(), res.locals.jwtData.id)

        if(user._id.toString() !== res.locals.jwtData.id) {
            return res.status(401).send("Permission didn't match")
        }

        res.clearCookie(COOKIE_NAME, {
            httpOnly: true,
            domain: "localhost",
            signed: true,
            path: "/"
        })

        return res.status(200)
        .json({
            message: "okk", name: user.name, email:user.email
        })
    } catch (error) {
        console.log(error)
        return res.status(400).json({msg:"something went wrong", cause: error.message})
    }
}

