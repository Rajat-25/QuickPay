import { model, Schema } from 'mongoose';

const transactionSchema = new Schema({
  userId: {
    ref: 'User',
    type: Schema.Types.ObjectId,
    required: true,
  },

  transactionType: {
    type: String,
    required: true,
  },
  userTransactionId: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  fullName: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Transaction = model('Transaction', transactionSchema);

export default Transaction;
