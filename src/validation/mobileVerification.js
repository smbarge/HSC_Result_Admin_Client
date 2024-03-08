import { create, test, enforce, only, include } from "vest";
// import "vest/enforce/email";
// import isMobilePhone from 'validator/es/lib/isMobilePhone';

const suite = create((data = {}, fieldName) => {
  only(fieldName);
  include("mobileNo").when("submit");
  include("mobileNoVerificationCode").when("submit");
  
  test("mobileNo", "mobile is required", () => {
    enforce(data.mobileNo).isNotBlank();
  });
  test("mobileNo", "First Digit Of mobile no Should be one of 9,8,7,6 ", () => {
    enforce(data.mobileNo).matches(/^[6-9]/);
  });
  test("mobileNo", "mobile no should be 10 digit", () => {
    enforce(data.mobileNo).lengthEquals(10);
  });
  test("mobileNo", "only digits", () => {
    enforce(data.mobileNo).isNumeric();
  });
  test("mobileNoVerificationCode", "mobile verification code is required", () => {
    enforce(data.mobileNoVerificationCode).isNotBlank();
  });
  
  test(
    "mobileNoVerificationCode",
    "mobile verification code should be 6 digit code",
    () => {
      enforce(data.mobileNoVerificationCode).lengthEquals(6);
      enforce(data.mobileNoVerificationCode.trim()).matches(/^[0-9]*$/);
    }
  );

 
});

export default suite;
