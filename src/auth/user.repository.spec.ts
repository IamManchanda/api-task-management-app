import { Test } from "@nestjs/testing";
import { UserRepository } from "./user.repository";
import { User } from "./user.entity";
import {
  ConflictException,
  InternalServerErrorException,
} from "@nestjs/common";

const mockCredentialsDto = {
  username: "awesome",
  password: "VrqXddNPbK4FvqQ",
};

describe("UserRepository", () => {
  let userRepository;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [UserRepository],
    }).compile();

    userRepository = await module.get<UserRepository>(UserRepository);
  });

  describe("createNewUser", () => {
    let save;

    beforeEach(() => {
      save = jest.fn();
      userRepository.create = jest.fn().mockReturnValue({ save });
    });

    it("successfully creates new user", () => {
      save.mockResolvedValue(undefined);
      expect(
        userRepository.createNewUser(mockCredentialsDto),
      ).resolves.not.toThrow();
    });

    it("throws a conflict exception error if username already exists", async () => {
      save.mockRejectedValue({ code: "23505" });
      await expect(
        userRepository.createNewUser(mockCredentialsDto),
      ).rejects.toThrow(ConflictException);
    });

    it("throws an Internal server error exception for server related errors", async () => {
      save.mockRejectedValue({ code: "123123" });
      await expect(
        userRepository.createNewUser(mockCredentialsDto),
      ).rejects.toThrow(InternalServerErrorException);
    });
  });

  describe("validateUserPassword", () => {
    let user;

    beforeEach(() => {
      userRepository.findOne = jest.fn();
      user = new User();
      user.username = mockCredentialsDto.username;
      user.validatePassword = jest.fn();
    });

    it("returns the username as validation is successful", async () => {
      userRepository.findOne.mockResolvedValue(user);
      user.validatePassword.mockResolvedValue(true);
      const result = await userRepository.validateUserPassword(
        mockCredentialsDto,
      );
      expect(result).toEqual(mockCredentialsDto.username);
    });

    it("returns null as user cannot be found", async () => {
      userRepository.findOne.mockResolvedValue(null);
      const result = await userRepository.validateUserPassword(
        mockCredentialsDto,
      );
      expect(user.validatePassword).not.toHaveBeenCalled();
      expect(result).toBeNull();
    });

    it("returns null as password is invalid", async () => {
      userRepository.findOne.mockResolvedValue(user);
      user.validatePassword.mockResolvedValue(false);
      const result = await userRepository.validateUserPassword(
        mockCredentialsDto,
      );
      expect(user.validatePassword).toHaveBeenCalled();
      expect(result).toBeNull();
    });
  });
});
