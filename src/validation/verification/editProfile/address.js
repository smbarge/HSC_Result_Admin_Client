import { create, test, enforce, only, include } from "vest";

const suite = create((data = {}, fieldName) => {
  only(fieldName);
  include('state').when('submit')
  include('district').when('submit')
  include('city').when('submit')
  include('pin').when('submit')
  include('taluka').when('submit')
  include('streetAddress').when('submit')

  test("state", "State is required", () => {
    enforce(data.state).isNotBlank();
  });
  
  test("district", "District is required", () => {
    enforce(data.district).isNotBlank();
  });
  
  test("city", "City is required", () => {
    enforce(data.city).isNotBlank();
  });
  
  test("streetAddress", "Street address is required", () => {
    enforce(data.streetAddress).isNotBlank();
  });
  
  test("taluka", "Taluka is required", () => {
    enforce(data.streetAddress).isNotBlank();
  });

  test("pin", "Pin code is required", () => {
    enforce(data.pin).isNotBlank();
  });
  test("pin", "Pin code should be 6 digits", () => {
    enforce(data.pin).lengthEquals(6);
  });
  test("pin", "Only digits allowed in Pin code", () => {
    enforce(data.pin).isNumeric();
  });
});

export default suite;