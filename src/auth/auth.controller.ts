import {
  Controller,
  Post,
  Body,
  ValidationPipe,
  UseGuards,
} from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { AuthCredentialsDto } from "./dto/auth-credential.dto";
import { AuthService } from "./auth.service";
import { JwtAccessToken } from "./jwt-access-token-interface";
import { ReadUser } from "./read-user.decorator";
import { User } from "./user.entity";

@Controller("/auth")
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post("/signup")
  signupUser(
    @Body(ValidationPipe) credentialsDto: AuthCredentialsDto,
  ): Promise<void> {
    return this.authService.signupUser(credentialsDto);
  }

  @Post("/login")
  loginUser(
    @Body(ValidationPipe) credentialsDto: AuthCredentialsDto,
  ): Promise<JwtAccessToken> {
    return this.authService.loginUser(credentialsDto);
  }

  @Post("/user/access-token")
  @UseGuards(AuthGuard())
  test(@ReadUser() user: User) {
    return user;
  }
}
