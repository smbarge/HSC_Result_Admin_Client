import { create, test, enforce ,only, include} from "vest";


const suite = create((data = {},fieldName) => {
  only(fieldName);
  include('seatno').when('submit')
  include('password').when('submit')
  
  test("seatno", "seatno is required", () => {
    enforce(data.seatno).isNotBlank();
  }); 
  test("seatno", "Seat no is must be at least 6 char", () => {
    enforce(data.seatno).longerThanOrEquals(6);
  });

  test("password", "password is required", () => {
    enforce(data.password).isNotBlank();
  });
  test("password", "password should be atleat 5 chars long", () => {
    enforce(data.password).longerThanOrEquals(5);
  });
  
});

export default suite;
