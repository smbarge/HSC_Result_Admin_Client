import { create, test, enforce ,only, include} from "vest";


const suite = create((data = {},fieldName) => {
  only(fieldName);
  include('seatNo').when('submit')
  include('fullName').when('submit')
  include('mothersName').when('submit')
  include("exam")
  test("exam", "please select exam", () => {
    enforce(data.exam).isNotBlank();
  }); 
  test("seatNo", "seat no is required", () => {
    enforce(data.seatNo).isNotBlank();
  }); 
  test("seatNo", "Seat No should be at least 6 char", () => {
    enforce(data.seatNo).longerThanOrEquals(6);
  });

  test("fullName", "name is required", () => {
    enforce(data.fullName).isNotBlank();
  }); 
  test("fullName", "name should be at least 6 char", () => {
    enforce(data.fullName).longerThanOrEquals(6);
  });

  test("mothersName", "mothers name is required", () => {
    enforce(data.mothersName).isNotBlank();
  });
  test("mothersName", "mothers name should be atleat 5 chars long", () => {
    enforce(data.mothersName).longerThanOrEquals(5);
  });
  
});

export default suite;
