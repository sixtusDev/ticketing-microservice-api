import mongoose from "mongoose";

interface UserAttribute {
  email: string;
  password: string;
}

interface UserModel extends mongoose.Model<UserDoc> {
  createUser(user: UserAttribute): UserDoc;
}

interface UserDoc extends mongoose.Document, UserAttribute {}

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

userSchema.statics.createUser = (user: UserAttribute) => {
  return new User(user);
};
const User = mongoose.model<UserDoc, UserModel>("User", userSchema);

export { User };
