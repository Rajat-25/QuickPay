import { Request, Response, Router } from 'express';
import authMiddleware from '../middlewares/authMiddleware';
import Favourite from '../schemas/favouriteSchema';
import { code, CustomRequest } from '../utils';
const router = Router();

router.get(
  '/favourites/info',
  authMiddleware,
  async (req: CustomRequest, res: Response) => {
    const accUserId = req.userId;

    try {
      const dbFavourite = await Favourite.find({ userId:accUserId }).select(
        'fullName phoneNo bookmarkUserId -_id'
      );

      return res.status(code.succ).json({
        msg: 'Success',
        data:dbFavourite,
      });

    } catch (err) {
      return res.status(code.serv).json({ msg: code.servMsg });
    }
  }
);

router.post(
  '/favourites/add',
  authMiddleware,
  async (req: CustomRequest, res: Response) => {
    const accUserId = req.userId;

    try {
      let dbFavourite = await Favourite.create({
        userId:accUserId,
        ...req.body,
      });
      return res.status(code.succ).json({ msg: 'Added to favourites' });
    } catch (err) {
      return res.status(code.serv).json({ msg: code.servMsg });
    }
  }
);

router.delete(
  '/favourites/remove',
  authMiddleware,
  async (req: Request, res: Response) => {
    const { bookmarkUserId } = req.body;

    try {
      const dbFavourite = await Favourite.deleteOne({ bookmarkUserId });

      return res
        .status(code.succ)
        .json({ msg: 'Bookmarked removed successfully' });
    } catch (err) {
      return res.status(code.serv).json({ msg: code.servMsg });
    }
  }
);

export default router;
