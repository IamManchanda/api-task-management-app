import { Injectable } from "@nestjs/common";
import { UserRepository } from "./user.repository";
import { InjectRepository } from "@nestjs/typeorm";
import { AuthCredentialsDto } from "./dto/auth-credential.dto";

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
  ) {}

  signupUser(credentialsDto: AuthCredentialsDto): Promise<void> {
    return this.userRepository.signupUser(credentialsDto);
  }
}
