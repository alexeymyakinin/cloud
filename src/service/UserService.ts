import { AbstractService } from "./AbstractService";

import { User } from "../models/user";

export class UserService extends AbstractService<typeof User> {}
