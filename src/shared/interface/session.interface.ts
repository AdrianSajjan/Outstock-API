import { Tokens } from './token.interface';
import { UserDocument } from '../../user/schema';

export interface Session extends Tokens {
  user: UserDocument;
}
