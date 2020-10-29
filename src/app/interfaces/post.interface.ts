import { User } from './user.interface';

export interface Post {
  imgs?: string[];
  _id?: string;
  mensaje?: string;
  coords?: string;
  usuario?: User;
  created?: string;
}