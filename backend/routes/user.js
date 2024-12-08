import express from "express";
const router = express.Router();
import zod from "zod";
import { User,Account } from "../db.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import authMiddleware from "../middleware.js";

dotenv.config();
const jwt_secret_key = process.env.JWT_SECRET_KEY;

const signupSchema = zod.object({
    username: zod.string().email(),
    password: zod.string().min(8),
    firstName: zod.string(),
    lastName: zod.string(),
});

const signinSchema = zod.object({
    username: zod.string().email(),
    password: zod.string().min(8)
})

router.post("/signup", async (req, res) => {
    const result = signupSchema.safeParse(req.body);
    if (!result.success) {
        res.status(411).json({
            message: "Email already taken / Incorrect inputs",
        });
    }

    const existingUser = await User.findOne({
        username: req.body.username,
    });

    if (existingUser) {
        res.status(411).json({
            message: "Email already taken / Incorrect inputs",
        });
    }

    const user = await User.create({
        username: req.body.username,
        password: req.body.password,
        firstName: req.body.firstName,
        lastName: req.body.lastName
    })

    const userId = user._id;

    await Account.create({
        userId: userId,
        balance:1+ Math.random()*10000
    })
    
    const token = jwt.sign({ userId }, jwt_secret_key)

    res.status(200).json({
        message: " User created successfully",
        token: token
    })
}) //signup



router.post('/signin', async (req, res) => {
    const result = signinSchema.safeParse(req.body);
    if (!result.success) {
        res.status(411).json({ message: "Incorrect credentails" });
    }

    const user = await User.findOne({ username: req.body.username });
    if (!user) {
        res.status(411).json({ message: "Error while logging in" });
    }

    const token = jwt.sign({
        userId: user._id
    }, jwt_secret_key)

    res.status(200).json({
        message: "User logged in successfully",
        token: token
    });

}) //signin


const updateBody = zod.object({
    password: zod.string().optional(),
    firstName: zod.string().optional(),
    lastName: zod.string().optional()
});

router.put('/', authMiddleware, async (req, res) => {
    const result = updateBody.safeParse(req.body);
    if (!result.success) {
        res.status(411).json({ message: "Error while updating data" });
    }
    // await User.updateOne(req.body, {
    //     _id: req.userId
    // })
    await User.updateOne(
        { _id: req.userId }, // Filter: Find the document by userId
        { $set: result.data } // Update: Set the fields from the validated body
    );
    res.json({
        message: "User updated successfully"
    })
});

router.get('/bulk', async(req,res) => {
    const filter = req.query.filter || "";
    const users = await User.find({
        $or: [
            { firstName: { $regex: filter, $options: "i" } }, // Case-insensitive match
            { lastName: { $regex: filter, $options: "i" } }
        ]
    })
    res.json({
        user: users.map(user => ({
            username: user.username,
            firstName: user.firstName,
            lastName: user.lastName,
            _id: user._id
        }))
    })
}) // get filtered users based on the query parameters 


export default router;