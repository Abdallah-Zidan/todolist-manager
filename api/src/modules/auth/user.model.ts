import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

export interface IUser extends mongoose.Document {
  email: string;
  password: string;
  name: string;
  comparePassword: (candidatePassword: string) => Promise<boolean>;
}

const UserSchema = new mongoose.Schema<IUser>({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
});

UserSchema.pre('save', function (next) {
  const user = this as IUser;
  if (!user.isModified('password')) return next();
  bcrypt.hash(user.password, 10, (err: Error | undefined, hash: string) => {
    if (err) return next(err);
    user.password = hash;
    next();
  });
});

UserSchema.methods.comparePassword = function (
  this: IUser,
  candidatePassword: string,
) {
  return bcrypt.compare(candidatePassword, this.password);
};

export const UserModel = mongoose.model<IUser>('User', UserSchema);
