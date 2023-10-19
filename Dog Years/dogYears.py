//myAge

const myAge = 50;

//earlyYears

let earlyYears = 2;
earlyYears *= 10.5;

/*Since we already accounted for the first two years, take the myAge variable, and subtract 2 from it. */

let laterYears = myAge - 2;

/*Multiply the laterYears variable by 4 to calculate the number of dog years accounted for by your later years. Use the multiplication assignment operator to multiply and assign in one step. */

laterYears = laterYears *= 4;
console.log(earlyYears);
console.log(laterYears);

const myAgeInDogYears = earlyYears + laterYears

//myName

let myName = 'Dina'
myName = myName.toLowerCase();

console.log("My name is " + myName + " I am " + myAge + " years old in human years which is " + myAgeInDogYears +" years old in dog years.");



