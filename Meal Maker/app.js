const menu ={
_meal:'',
_price:0,
set newMeal(mealToCheck){
  if(typeof mealToCheck === "string"){
    return this._meal = mealToCheck;
  }
},
set newPrice(priceToCheck){
  if(typeof priceToCheck === 'number'){
    return this._price = priceToCheck;
  }
},
get todaysSpecial(){
  if(this._meal && this._price){
    return "Today's Special is a Taco Trio + Guacamole for $15.99!"
  } else {
    return 'Meal or price was not set correctly!'
  }
}
};

//menu._meal = 369;
//menu._price = 'I love you';

//console.log(menu);

menu.newMeal = 'Taco Trio + Guacamole';
menu.newPrice = 15.99;

console.log(menu._meal);
console.log(menu._price);
console.log(menu.todaysSpecial);
