import { create, test, enforce, only, include } from "vest";
import "vest/enforce/email";

const suite = create((data = {}, fieldName) => {
  only(fieldName);
  include("email").when("submit");
  

  test("email", "email is required", () => {
    enforce(data.email).isNotBlank();
  });
  test("email", "email is not valid", () => {
    enforce(data.email).isEmail();
  });
  test("verificationCode", "email verification code is required", () => {
    enforce(data.email).isNotBlank();
  });
  test(
    "verificationCode",
    "email verification code should be 6 digit code",
    () => {
      enforce(data.verificationCode).lengthEquals(6);
      enforce(data.verificationCode.trim()).matches(/^[0-9]*$/);
    }
  );

});

export default suite;
