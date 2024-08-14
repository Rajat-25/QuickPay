import { model, Schema } from 'mongoose';

const favouriteSchema = new Schema({
  userId: {
    ref:'User',
    type: Schema.Types.ObjectId,
    required: true,
  },
  fullName: {
    trim: true,
    type: String,
    required: true,
  },
  phoneNo: {
    trim: true,
    type: String,
    required: true,
  },
  bookmarkUserId: {
    type: Schema.Types.ObjectId,
    required: true,
  },
});

const Favourite = model('favourite', favouriteSchema);

export default Favourite;
