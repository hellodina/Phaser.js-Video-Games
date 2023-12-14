const getSleepHours = day => {
  switch(day){
    case 'Monday':
      return 8;
      break;
    case 'Tuesday': 
      return 7;
      break;
    case 'Wednesday':
      return 8;
      break;
    case 'Thursday':
      return 6;
      break;
    case 'Friday':
      return 6;
      break;
    case 'Saturday':
      return 8;
      break;
    case 'Sunday':
      return 6;
      break;
    default:
      console.log("Please enter a valid day of the week.")
      break;
  }
};

/*getSleepHours('Monday');*/

const getActualSleepHours = () =>{
  return getSleepHours('Monday')
  +getSleepHours('Tuesday')
  +getSleepHours('Wednesday')
  +getSleepHours('Thursday')
  +getSleepHours('Friday')
  +getSleepHours('Saturday')
  +getSleepHours('Sunday')
};

const getIdealSleepHours = (hours) =>{
  return hours*7;
}

/*getActualSleepHours();
idealSleepHours();*/

const calculateSleepDebt = () =>{
  const actualSleepHours = getActualSleepHours();
  const idealSleepHours = getIdealSleepHours(8);

  if(actualSleepHours === idealSleepHours){
    console.log("You got the perfect amount of sleep.");
  }else if(actualSleepHours>idealSleepHours){
    console.log("You got more sleep than needed.");
  }else if(actualSleepHours<idealSleepHours){
    console.log("You should get some more rest.");
  }else{
    console.log("An error occured. Please try again.")
  };
  //return actualSleepHours, idealSleepHours;
}

calculateSleepDebt();
