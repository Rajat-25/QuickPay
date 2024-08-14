import { Request, Response, Router } from 'express';
import authMiddleware from '../middlewares/authMiddleware';
import Balance from '../schemas/balanceSchema';
import Favourite from '../schemas/favouriteSchema';
import { default as Transaction } from '../schemas/transactionSchema';
import User from '../schemas/userSchema';
import {
  code,
  CustomRequest,
  getFormattedData,
  getToken,
  signInBody,
  signUpBody,
} from '../utils';
import favouriteRouter from './favouriteRoute';

const router = Router();

router.post('/signup', async (req: Request, res: Response) => {
  const reqBody = req.body;
  const { success, error } = signUpBody.safeParse(reqBody);

  const dbUser = await User.findOne({
    $or: [{ username: reqBody.username }, { phoneNo: reqBody.phoneNo }],
  });

  if (error || dbUser) {
    return res.status(code.cred).json({
      msg: code.credMsg + ' Or Email / phoneNo Incorrect',
    });
  }

  try {
    const { _id, firstName, lastName, username, phoneNo } = await User.create(
      reqBody
    );

    const token = getToken(_id);

    const accBalance = await Balance.create({
      userId: _id,
      currBalance: 1000,
    });

    return res.status(code.succ).json({
      msg: 'User Signed Up successfully',
      token,
      user: {
        userId: _id,
        firstName,
        lastName,
        username,
        phoneNo,
      },
    });
  } catch (err) {
    return res.status(code.serv).json({ msg: code.servMsg });
  }
});

router.post('/signin', async (req: Request, res: Response) => {
  const reqBody = req.body;
  const { success, error } = signInBody.safeParse(reqBody);

  const dbUser = await User.findOne({
    username: reqBody.username,
  }).select('firstName lastName username phoneNo');

  if (error || !dbUser) {
    return res
      .status(code.cred)
      .json({ msg: 'Invalid credentials/User not found' });
  }

  try {
    const token = getToken(dbUser._id);

    return res.status(code.succ).json({
      msg: 'User Signed in successfully',
      token,
      user: dbUser,
    });
  } catch (err) {
    return res.status(code.serv).json({ msg: code.servMsg });
  }
});

router.get(
  '/contacts/info',
  authMiddleware,
  async (req: CustomRequest, res: Response) => {
    let { currPg, filterStr } = req.query as {
      filterStr: string;
      currPg: string;
    };

    const accUserId = req.userId;

    let pgNo = parseInt(currPg);

    const limit = 10;
    const skip = (pgNo - 1) * limit;

    try {
      const filterVal = typeof filterStr === 'string' ? filterStr.trim() : '';

      if (filterVal == '') {
        const dbUser = await User.find()
          .select('firstName lastName phoneNo ')
          .limit(limit);
        const data = getFormattedData(dbUser, accUserId!);

        return res
          .status(code.succ)
          .json({ msg: 'Success', data, prevPg: false, nextPg: false });
      } else {
        const dbUser = await User.find({
          $and: [
            {
              $or: [
                { firstName: { $regex: filterStr, $options: 'i' } },
                { lastName: { $regex: filterStr, $options: 'i' } },
                { phoneNo: { $regex: filterStr, $options: 'i' } },
              ],
            },
            { _id: { $ne: accUserId} } 
          ],
        })
          .select('firstName lastName phoneNo ')
          .skip(skip)
          .limit(limit);

        const data = getFormattedData(dbUser, accUserId!);

        const prevPg = pgNo > 1;
        const nextPg = data.length == limit;

        return res
          .status(code.succ)
          .json({ msg: 'Success', data, prevPg, nextPg });
      }
    } catch (err) {
      return res.status(code.serv).json({ msg: code.servMsg });
    }
  }
);

router.delete(
  '/del',
  authMiddleware,
  async (req: CustomRequest, res: Response) => {
    const accUserId = req.userId;

    const dbUser = await User.deleteOne({ _id: accUserId });
    const dbTransactions = await Transaction.deleteMany({ userId: accUserId });
    const dbFavourites = await Favourite.deleteMany({ userId: accUserId });

    if (dbUser && dbTransactions && dbFavourites) {
      return res.status(code.succ).json({ msg: 'user deleted sucessfully' });
    } else {
      return res.status(code.serv).json({ msg: code.servMsg });
    }
  }
);

router.use('', favouriteRouter);

export default router;
