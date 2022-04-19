import { User } from "../models/user";
import { AbstractService } from "./AbstractService";

export class UserService extends AbstractService<typeof User> {}