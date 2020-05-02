import { Repository, EntityRepository } from "typeorm";
import { User } from "./user.entity";
import { AuthCredentialsDto } from "./dto/auth-credential.dto";

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async signupUser({ username, password }: AuthCredentialsDto): Promise<void> {
    const user = new User();
    user.username = username;
    user.password = password;
    await user.save();
  }
}
