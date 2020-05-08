import { JwtStrategy } from "./jwt.strategy";
import { Test } from "@nestjs/testing";
import { UserRepository } from "./user.repository";
import { User } from "./user.entity";
import { UnauthorizedException } from "@nestjs/common";

const mockUserRepository = () => ({
  findOne: jest.fn(),
});

describe("JwtStrategy", () => {
  let jwtStrategy: JwtStrategy;
  let userRepository;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        JwtStrategy,
        {
          provide: UserRepository,
          useFactory: mockUserRepository,
        },
      ],
    }).compile();

    jwtStrategy = await module.get<JwtStrategy>(JwtStrategy);
    userRepository = await module.get<UserRepository>(UserRepository);
  });

  describe("validate with jwt strategy", () => {
    it("validates and returns the user based on JWT payload", async () => {
      const user = new User();
      user.username = "awesome";
      userRepository.findOne.mockResolvedValue(user);
      const result = await jwtStrategy.validate({ username: "awesome" });
      expect(userRepository.findOne).toHaveBeenCalledWith({
        username: "awesome",
      });
      expect(result).toEqual(user);
    });

    it("throws an anauthorized user exception as user cannot be found", () => {
      userRepository.findOne.mockResolvedValue(null);
      expect(jwtStrategy.validate({ username: "awesome" })).rejects.toThrow(
        UnauthorizedException,
      );
    });
  });
});
