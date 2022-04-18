import { AbstractService } from './AbstractService';

import { User } from '../models/user';

class UserService extends AbstractService<typeof User> {}

export default new UserService(User);
