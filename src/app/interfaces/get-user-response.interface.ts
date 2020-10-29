import { User } from './user.interface';

export interface GetUserResponse {
  ok?: boolean;
  user?: User;
}
