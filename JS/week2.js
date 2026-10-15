// Flight booking fullname function
function getFullName(firstName, surname, useFormalName) {
    if (firstName === "" || surname === "") {
        return "";}
    if (useFormalName === true) {
        return "Lord" +" " + firstName + " " + surname;}
    return firstName + " " + surname;}
const fullName1 = getFullName("Benjamin", "Hughes", true);
const fullName2 = getFullName("Benjamin", "Hughes", false);
const fullName3 = getFullName("Donald", "Trumpinio", false);
console.log(fullName1);
console.log(fullName2);
console.log(fullName3);



// Event application
function getEventWeekday(numberOfDays) {
    let today = new Date();
    let dayNumber = today.getDay();
    let weekdays = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday"];
    let eventDayNumber = (dayNumber + numberOfDays) % 7;
    return weekdays[eventDayNumber];}
console.log(getEventWeekday(9));
console.log(getEventWeekday(2));


// WWeather wear
function getClothesToWear(temperature) {
    if (temperature >= 25) {
        return "shorts and a t-shirt";}
         else if (temperature >= 15) {
        return "pants and a t-shirt";}
    else if (temperature >= 5) {
        return "pants, a sweater, and a jacket";}
    else {return "a warm coat, gloves, and a hat";}}

const clothesToWear = getClothesToWear(67);
console.log(clothesToWear);


//Student manager
const class07Students = [];

function addStudentToClass(studentName) {
  if (studentName === "") {
    return;}
  if (class07Students.includes(studentName)) {
    console.log(`Student ${studentName} is already in the class`);
    return;}
  if (class07Students.length >= 6 && studentName !== "Queen") {
    console.log("Cannot add more students to class 07");
    return;}
  class07Students.push(studentName);}
function getNumberOfStudents() {
  return class07Students.length;}


addStudentToClass("Benjamin");
addStudentToClass("Mette");
addStudentToClass("Peter");
addStudentToClass("Maria");
addStudentToClass("Ellon");
addStudentToClass("Zukenberg");

addStudentToClass("John");      // Class is full
addStudentToClass("Benjamin"); // Already in class
addStudentToClass("Queen");    // Queen gets a space

console.log(getNumberOfStudents());
console.log(class07Students);