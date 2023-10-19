let raceNumber = Math.floor(Math.random() * 1000);
const earlyReg = false;
let runnerAge = 18;

if(runnerAge > 18 && earlyReg){
  raceNumber += 1000;
  console.log(`You will race @ 9:30am!. Your race number is ${raceNumber}.`)
}
  else if(runnerAge>18 && !earlyReg){
      console.log(`You will race @ 11:00am!. Your race number is ${raceNumber}.`)
  }
  else if(runnerAge == 18){
    console.log("Please see the registration desk for your race # and start time.")
  }
  else{
     console.log(`You will race @ 12:30pm!. Your race number is ${raceNumber}.`)
  }


