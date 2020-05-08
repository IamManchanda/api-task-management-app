import { Test } from "@nestjs/testing";
import { UserRepository } from "./user.repository";
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
});
