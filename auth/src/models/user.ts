import mongoose from "mongoose";
import { PasswordManager } from "../services/password-manager";

interface UserAttributes {
  email: string;
  password: string;
}

interface UserModel extends mongoose.Model<UserDocument> {
  build(userAttrs: UserAttributes): UserDocument;
}

interface UserDocument extends mongoose.Document {
  email: string;
  password: string;
}

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
        // change property key __id to id
        ret.id = ret._id;
        delete ret._id;
        delete ret.password;
        delete ret.wakwaw;
      },
      versionKey: false,
    },
  }
);

userSchema.pre("save", async function (done) {
  if (this.isModified("password")) {
    const hashed = await PasswordManager.toHash(this.get("password"));
    this.set("password", hashed);
  }
  done();
});

// build is a static method to make TS enforce consistent typing between caller with mongoose schema
userSchema.statics.build = (userAttrs: UserAttributes) => {
  return new User(userAttrs);
};

const User = mongoose.model<UserDocument, UserModel>("User", userSchema);

export { User };
