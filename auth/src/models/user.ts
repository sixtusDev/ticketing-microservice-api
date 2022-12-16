import mongoose from "mongoose";
import { Password } from "../services/password";

interface UserAttribute {
  email: string;
  password: string;
}

interface UserModel extends mongoose.Model<UserDoc> {
  createUser(user: UserAttribute): UserDoc;
}

interface UserDoc extends mongoose.Document, UserAttribute {}

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.password;
        delete ret.__v;
      },
    },
  }
);

userSchema.pre("save", async function (done) {
  if (this.isModified("password")) {
    const hashed = await Password.hash(this.get("password"));
    this.set("password", hashed);
    done();
  }
});

userSchema.statics.createUser = (user: UserAttribute) => {
  return new User(user);
};
const User = mongoose.model<UserDoc, UserModel>("User", userSchema);

export { User };
