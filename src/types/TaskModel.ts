import { Subject } from './SubjectModel';

export type Task = {
   completed: boolean;
   subject: Subject;
   title: string;
   user: string;
   date: string;
   __v: string;
   _id: string;
};
