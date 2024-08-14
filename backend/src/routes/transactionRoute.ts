import { Response, Router } from 'express';
import mongoose from 'mongoose';
import authMiddleware from '../middlewares/authMiddleware';
import Balance from '../schemas/balanceSchema';
import Transaction from '../schemas/transactionSchema';
import User from '../schemas/userSchema';
import { code, CustomRequest } from '../utils';

const router = Router();

router.get(
  '/balance/info',
  authMiddleware,
  async (req: CustomRequest, res: Response) => {
    const accUserId = req.userId;

    try {
      const accBalance = await Balance.findOne({
        userId: accUserId,
      }).select(' currBalance ');

      return res.status(code.succ).json({
        msg: 'Success',
        data: accBalance?.currBalance,
      });
    } catch (err) {
      return res.status(code.serv).json({ msg: code.servMsg });
    }
  }
);

router.get(
  '/transactions/info/:currPg',
  authMiddleware,
  async (req: CustomRequest, res: Response) => {
    const accUserId = req.userId;
    const { currPg } = req.params;
    const pgNo = parseInt(currPg);
    const skip = (pgNo - 1) * 10;
    const limit = 10;

    try {
      const accTransactions = await Transaction.find({
        userId: accUserId,
      })
        .select(' transactionType userTransactionId fullName amount createdAt ')
        .skip(skip)
        .limit(limit)
        .sort({ createdAt: -1 });

      const prevPg = pgNo > 1;
      const nextPg = accTransactions && accTransactions.length == limit;

      return res.status(code.succ).json({
        msg: 'Success',
        data: accTransactions,
        prevPg,
        nextPg,
      });
    } catch (err) {
      return res.status(code.serv).json({ msg: code.servMsg });
    }
  }
);


router.post(
  '/add/balance',
  authMiddleware,
  async (req: CustomRequest, res: Response) => {
    const { amount } = req.body;
    const accUserId = req.userId;
    const session = await mongoose.startSession();

    try {
      session.startTransaction();
      const accBalance = await Balance.updateOne(
        {
          userId: accUserId,
        },
        {
          $inc: { currBalance: amount },
        }
      ).session(session);

      const accTransaction = await Transaction.create({
        userId: accUserId,
        transactionType: 'Credit',
        userTransactionId: accUserId,
        fullName: 'You',
        amount,
      });

      session.commitTransaction();

      return res
        .status(code.succ)
        .json({ msg: 'Funds transferred Successsfully' });
    } catch (err) {
      return res.status(code.serv).json({ msg: code.servMsg });
    }
  }
);



router.post(
  '/initiate/transaction',
  authMiddleware,
  async (req: CustomRequest, res: Response) => {
    const { receiverUserId, amount, receiverName } = req.body;
    const accUserId = req.userId;
    const session = await mongoose.startSession();

    try {
      session.startTransaction();

      const userAcc = await User.findOne({ _id: accUserId });
      const senderName = userAcc?.firstName + ' ' + userAcc?.lastName;

      const receiver = await Balance.findOne({
        userId: receiverUserId,
      }).session(session);

      const sender = await Balance.findOne({
        userId: accUserId,
      }).session(session);

      if (!receiver || (sender && sender.currBalance < amount)) {
        await session.abortTransaction();
        return res
          .status(code.cred)
          .json({ message: 'Insufficient funds/User not found' });
      }

      const senderBalance = await Balance.updateOne(
        {
          userId: accUserId,
        },
        {
          $inc: { currBalance: -amount },
        }
      ).session(session);

      const receiverBalance = await Balance.updateOne(
        {
          userId: receiverUserId,
        },
        {
          $inc: { currBalance: amount },
        }
      ).session(session);

      const senderTransaction = await Transaction.create({
        userId: accUserId,
        transactionType: 'Debit',
        userTransactionId: receiverUserId,
        fullName: receiverName,
        amount,
      });

      const receiverTransaction = await Transaction.create({
        userId: receiverUserId,
        transactionType: 'Credit',
        userTransactionId: accUserId,
        fullName: senderName,
        amount,
      });

      await session.commitTransaction();

      return res
        .status(code.succ)
        .json({ message: 'Funds transferred Successsfully' });
    } catch (err) {
      return res.status(code.serv).json({ msg: code.servMsg });
    }
  }
);



export default router;
