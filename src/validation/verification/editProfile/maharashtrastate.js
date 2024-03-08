import { create, test, enforce, only, include } from "vest";

const suite = create((data = {}, fieldName) => {
  only(fieldName);
  include("streetAddress").when("submit");
  include("district").when("submit");
  include("taluka").when("submit");
  include("pin").when("submit");
  include("city").when("submit");

  test("pin", "PIN code is mandatory", () => {
    enforce(data.pin).isNotBlank();
  });
  test("pin", "only numbers are allowed", () => {
    enforce(data.pin).isNumeric();
  });
  test("pin", "pin has six digits", () => {
    enforce(data.pin).matches(/^\d{6}$/);
  });

  test("streetAddress", "street address is mandatory", () => {
    enforce(data.streetAddress).isNotBlank();
  });
  test("streetAddress", "street address length should be more than 3", () => {
    enforce(data.streetAddress).longerThan(3);
  });

  test("district", "district is mandatory", () => {
    enforce(data.district).isNotBlank();
  });
  test("taluka", "taluka is mandatory", () => {
    enforce(data.taluka).isNotBlank();
  });
  test("city", "city/village is mandatory", () => {
    enforce(data.city).isNotBlank();
  });
  test("city", "city/village length should be more than 3", () => {
    enforce(data.city).longerThan(3);
  });
});

export default suite;
