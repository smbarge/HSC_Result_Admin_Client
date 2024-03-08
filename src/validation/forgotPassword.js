import { create, test, enforce, only, include } from "vest";

const suite = create((data = {}, fieldName) => {
  only(fieldName);
  include("userId").when("submit");

  test("userId", "userId is required", () => {
    enforce(data.userId).isNotBlank();
  });
  test("userId", "userId is must be at least 6 char", () => {
    enforce(data.userId).longerThanOrEquals(6);
  });
  test("userId", "user name begins with either hsc- or ssc-", () => {
    enforce(data.userId).matches(/^[hs]sc-/);
  });
});

export default suite;
