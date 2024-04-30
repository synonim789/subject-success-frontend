import { Task } from './TaskModel';

export type Subject = {
   completed?: boolean;
   grade?: number;
   name: string;
   type: 'grade' | 'completion';
   user: string;
   __v: number;
   _id: string;
   tasks: Task[];
   status: 'noTasks' | 'inProgress' | 'completed';
};
