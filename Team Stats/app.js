const team ={
_players:[{firstName:'Dina', lastName:'Salama',
      age:'37'},{firstName:'Gracie', lastName:'Esparza',age:'35'},{ firstName:'Jennifer',lastName:'Hernandez', age:'37'}],

_games:[{opponent:'Victor', teamPoints: 19,oponentPoints: 3},{opponent:'Walter', teamPoints:89,oponentPoints:6},{opponent:'Ken', teamPoints:33,oponentPoints:9}],

get players(){
  return this._players;
},

get games(){
  return this._games;
},

addPlayer(newFirstName, newLastName, newAge){
  let player = {firstName:newFirstName,
  lastName: newLastName,
  age: newAge}
  this._players.push(player);
},

addGame(newOpponent, newTeamPoints, newOpponentPoints){
  let game = {opponent:newOpponent, teamPoints:newTeamPoints, opponentPoints:newOpponentPoints}
  this._games.push(game);
}
};

team.addPlayer('Bugs','Bunny',76);
console.log(team._players);

team.addGame('Titans',100,98);
console.log(team._games);

