import { Schema } from "mongoose";
import { IUser } from "../../interfaces/IUserDataType";

const userSchema = new Schema<IUser>({
 name: { type: String, required: true },
 email: { type: String, required: true },
});

export default userSchema