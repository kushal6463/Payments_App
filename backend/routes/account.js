import express from "express";
import authMiddleware from "../middleware.js";
import { Account } from "../db.js";
import mongoose from "mongoose";

const router = express.Router();


router.get('/balance', authMiddleware, async (req, res) => {
    const account = await Account.findOne({
        userId: req.userId
    })
    res.json({
        balance: account.balance
    });
});


router.post('/transfer', authMiddleware, async (req, res) => {
    const session = await mongoose.startSession();
    try {

        session.startTransaction();
        const { amount, to } = req.body;
        const account = await Account.findOne({ userId: req.userId }).session(session);

        if (!account || account.balance < amount) {
            session.abortTransaction();
            return res.status(400).json({ message: "Insufficient balance" })
        }
        const destAcc = await Account.findOne({ userId: to }).session(session);

        if (!destAcc) {
            session.abortTransaction();
            return res.status(400).json({ message: "Invlaid Account" })
        }

        await Account.updateOne({ userId: req.userId }, { $inc: { balance: -amount } }).session(session);
        await Account.updateOne({ userId: to }, { $inc: { balance: amount } }).session(session);

        await session.commitTransaction();
        res.status(200).json({ message: "Transfer Successfull" })

    } catch (error) {
        res.status(400).json({ message: error.message })
    }
    finally {
        session.endSession();
    }

})



export default router;