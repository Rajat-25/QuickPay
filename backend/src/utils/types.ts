import { Request } from 'express';
import { Types } from 'mongoose';

interface CustomRequest extends Request {
  userId?: Types.ObjectId;
}

type JwtPayloadType = {
  userId: Types.ObjectId;
};

type UserType={
  _id: Types.ObjectId,
  firstName:string,
  lastName:string,
  phoneNo:string,
}

type FilteredDataType={
  data:UserType[],
  filterStr:string
}



export { CustomRequest, FilteredDataType, JwtPayloadType, UserType };
