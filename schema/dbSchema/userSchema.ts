import { Schema } from "mongoose";
import { IUser } from "../../interfaces/IUserDataType";

const userSchema = new Schema<IUser>({
 name: { type: String, required: false },
 email: { type: String, required: true },
 otp: { type: Number, required: true },
});

export default userSchema