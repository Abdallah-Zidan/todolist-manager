import mongoose from 'mongoose';
import { IUser } from '../auth/user.model';

export interface ITodo extends mongoose.Document {
  _id: mongoose.Types.ObjectId,
  title: string;
  description: string;
  completed: boolean;
  userId: mongoose.Types.ObjectId;
  user?: IUser;
  createdAt?: Date;
  updatedAt?: Date;
}

const TodoSchema = new mongoose.Schema<ITodo>({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  completed: {
    type: Boolean,
    default: false,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
}, {
  timestamps: true,
});

export const TodoModel = mongoose.model<ITodo>('Todo', TodoSchema);
