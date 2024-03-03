import { Request } from 'express';

interface AuthUser {
  id: string;
  email: string;
  username: string;
  role: string;
}

export interface RequestInterface extends Request {
  user?: AuthUser;
}
