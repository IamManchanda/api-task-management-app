import { User } from "./user.entity";
import * as bcrypt from "bcryptjs";

describe("User entity", () => {
  let user: User;

  beforeEach(() => {
    user = new User();
    user.password = "test_hashed_password";
    user.salt = "test_salt";
    bcrypt.hash = jest.fn();
  });

  describe("validatePassword", () => {
    it("returns true as password is valid", async () => {
      bcrypt.hash.mockReturnValue("test_hashed_password");
      expect(bcrypt.hash).not.toHaveBeenCalled();
      const result = await user.validatePassword("test_password");
      expect(bcrypt.hash).toHaveBeenCalledWith("test_password", "test_salt");
      expect(result).toEqual(true);
    });

    it("returns false as password is invalid", async () => {
      bcrypt.hash.mockReturnValue("test_wrong_hashed_password");
      expect(bcrypt.hash).not.toHaveBeenCalled();
      const result = await user.validatePassword("test_wrong_password");
      expect(bcrypt.hash).toHaveBeenCalledWith(
        "test_wrong_password",
        "test_salt",
      );
      expect(result).toEqual(false);
    });
  });
});
