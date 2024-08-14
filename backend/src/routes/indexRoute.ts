import { Router } from 'express';
import transactionRouter from './transactionRoute';
import userRouter from './userRoute';
const router = Router();

router.use('/user', userRouter);

router.use('/account', transactionRouter);

export default router;
