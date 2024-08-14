import { model, Schema } from 'mongoose';
import { Types } from 'mongoose';

const balanceSchema = new Schema({
  userId: {
    ref:'User',
    type: Schema.Types.ObjectId,
    required: true,
  },

  currBalance: {
    type: Number,
    required: true,
  },
});

const Balance = model('Balance', balanceSchema);

export default Balance;
