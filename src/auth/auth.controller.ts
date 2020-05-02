import { Controller, Post, Body } from "@nestjs/common";
import { AuthCredentialsDto } from "./dto/auth-credential.dto";
import { AuthService } from "./auth.service";

@Controller("/auth")
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post("/signup")
  signupUser(@Body() credentialsDto: AuthCredentialsDto): Promise<void> {
    return this.authService.signupUser(credentialsDto);
  }
}
