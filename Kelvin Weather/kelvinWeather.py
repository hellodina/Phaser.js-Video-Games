/*The value saved to kelvin will stay constant. Choose the variable type with this in mind.*/

const kelvin = 0;

/*Celsius is similar to Kelvin — the only difference is that Celsius is 273 degrees less than Kelvin.*/

let celsius = kelvin - 273;

/*Use this equation to calculate Fahrenheit, then store the answer in a variable named fahrenheit.*/

let fahrenheit = celsius * (9/5) + 32;
fahrenheit = Math.floor(fahrenheit);
console.log("The temperature is " + fahrenheit + " degrees Fahrenheit.");
