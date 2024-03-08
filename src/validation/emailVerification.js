import { create, test, enforce, only, include } from "vest";
import "vest/enforce/email";

const suite = create((data = {}, fieldName) => {
  only(fieldName);
  include("email").when("submit");
  include("password").when("submit");
  include("confirmPassword").when("submit");

  include("password").when("confirmPassword");

  test("email", "email is required", () => {
    enforce(data.email).isNotBlank();
  });
  test("email", "email is not valid", () => {
    enforce(data.email).isEmail();
  });
  test("emailVerificationCode", "email verification code is required", () => {
    enforce(data.email).isNotBlank();
  });
  test(
    "emailVerificationCode",
    "email verification code should be 6 digit code",
    () => {
      enforce(data.emailVerificationCode).lengthEquals(6);
      enforce(data.emailVerificationCode.trim()).matches(/^[0-9]*$/);
    }
  );

  test("password", "password is required", () => {
    enforce(data.password).isNotBlank();
  });
  test("password", "password should be at least of length 6", () => {
    enforce(data.password).longerThanOrEquals(6);
  });

  test("confirmPassword", "confirm password is required", () => {
    enforce(data.confirmPassword).isNotBlank();
  });
  test(
    "confirmPassword",
    "confirm password should be at least of length 6",
    () => {
      enforce(data.confirmPassword).longerThanOrEquals(6);
    }
  );
  test("confirmPassword", "password and confirm password should match", () => {
    enforce(data.password).equals(data.confirmPassword);
  });
});

export default suite;
