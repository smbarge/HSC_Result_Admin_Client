import { create, test, enforce, only, include } from "vest";
const suite = create((data = {}, fieldName) => {
  only(fieldName);
  include("rolltNo").when("submit");
  include("mothersName").when("submit");

  test("rollNo", "enter valid seat no", () => {
    enforce(data.rollNo).matches(/^[PNRMXVSTW][0-9]{6}$/);
  });
  test("rollNo", "roll no is required", () => {
    enforce(data.rollNo).isNotBlank();
  });
  test("rollNo", "roll No should be at least 6 char", () => {
    enforce(data.rollNo).longerThanOrEquals(7);
  });

  test("motherName", "mother name is required", () => {
    enforce(data.motherName).isNotBlank();
  });

  test("motherName", "mother name should be atleat 3 chars long", () => {
    enforce(data.motherName).longerThanOrEquals(3);
  });
});

export default suite;
