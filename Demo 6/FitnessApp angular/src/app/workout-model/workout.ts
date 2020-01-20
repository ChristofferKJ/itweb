import { Exercise } from './exercise';
export class Workout {
  [x: string]: any;
  _id: string;
  name: string;
  exercises: Array<Exercise>;
  userid: string;
}