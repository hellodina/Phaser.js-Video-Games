onst getUserChoice = userInput => {
  userInput = userInput.toLowerCase();
  if(userInput == 'rock' || userInput == 'scissors'|| userInput== 'paper' || userInput=='bomb'){
    return userInput;
  }else{
    console.log('Invalid entry. Please try again.')
  }
}

const getComputerChoice = () => {
  const number = Math.floor(Math.random(0,2));
  if(number==0){
    return 'rock';
  } else if(number==1){
    return 'scissors';
  } else{
    return 'paper';
  }
}

function determineWinner(userChoice, computerChoice){
  if(userChoice === computerChoice){
    return 'The game is a tie!';
  }
  if(userChoice==='bomb'){
    return 'User wins!!!';
  }
  if(userChoice==='rock'){
    if(computerChoice==='paper'){
      return 'Computer wins!';
  } else{
      return 'User wins!';
    }
  }
  if(userChoice==='paper'){
    if(computerChoice==='scissors'){
      return 'Computer wins!';
  }
    else{
      return 'User wins!';
    } 
  }
  if(userChoice==='scissors'){
    if(computerChoice==='rock'){
      return 'Computer wins!';
  }
    else{
      return 'User wins!';
    }
}
}
function playGame(){
  let userChoice = getUserChoice('bomb');
  let computerChoice = getComputerChoice();
  console.log(userChoice);
  console.log(computerChoice);

  console.log(determineWinner(userChoice, computerChoice));
}

playGame();
