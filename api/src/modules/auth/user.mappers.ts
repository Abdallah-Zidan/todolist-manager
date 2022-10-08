import { IUser } from './user.model';

export function userToJSON(user: IUser) {
  return {
    _id: user._id,
    name: user.name,
    email: user.email,
  };
}