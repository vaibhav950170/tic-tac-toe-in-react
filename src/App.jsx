import { act, useState } from "react";
import Player from "./Components/Player";
import GameBoard from "./Components/GameBoard";
import Log from "./Components/Log";
import { WINNING_COMBINATIONS } from "./winning-combinations";
import GameOver from "./Components/GameOver";


function deriveActivePlayer(gameTurns){
  let currentPlayer = 'X';
  if(gameTurns.length>0 &&  gameTurns[0].player==='X'){
    currentPlayer='O';
  }
  return currentPlayer;
}

const initialGameBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null]
];
const PLAYERS={
  'X':'Player 1',
  'O':'Player 2' 
}

function deriveWinner(gameBoard,players){
  let winner;

  for(const combination of WINNING_COMBINATIONS){
    const firstSqaure = gameBoard[combination[0].row][combination[0].column];
    const secondSqaure = gameBoard[combination[1].row][combination[1].column];
    const thirdSqaure = gameBoard[combination[2].row][combination[2].column];

    if(firstSqaure && firstSqaure===secondSqaure && firstSqaure==thirdSqaure){
      winner=players[firstSqaure];
    }
  }
  return winner;
}

function deriveGameBoard(gameTurns){
  let gameBoard = [...initialGameBoard.map(array=> [...array])];
  for (const turn of gameTurns) {
      const { square, player } = turn;
      const { row, col } = square;

      gameBoard[row][col] = player;
  }
  return gameBoard;
}

function App() {
  const [players, setPlayers]= useState(PLAYERS);
  const [gameTurns,setGameTurns] = useState([]);
  // const [hasWinner, setHasWinner] = useState(false);
  // const [activePlayer,setActivePlayer]=useState('X');
  const activePlayer = deriveActivePlayer(gameTurns);

  const gameBoard = deriveGameBoard(gameTurns);
  const winner = deriveWinner(gameBoard,players);
  const hasDraw = gameTurns.length ===9 && !winner;
  function handleSelectSquare(rowIndex,colIndex){
    // setActivePlayer((curActivePlayer)=>curActivePlayer==='X' ? 'O':'X'
    // );
    setGameTurns(prevTurns => {
      const currentPlayer = deriveActivePlayer(prevTurns);
      const updatedTurns = [{square: {row: rowIndex, col: colIndex},player:currentPlayer},...prevTurns];
      return updatedTurns;
    });
  }

  function handleRestartButton(){
    setGameTurns([]);
  }

  function handlePlayerNameChange(symbol, newName){
    setPlayers(prePlayers => {
      return {...prePlayers,
        [symbol]: newName
    }});
  }
  return (<main>
    <div id="game-container">
      <ol id="players" className="highlight-player">
       <Player intitalName={PLAYERS.X} symbol="X" isActive={activePlayer==='X'} onChangeName={handlePlayerNameChange}/>
       <Player intitalName={PLAYERS.O} symbol="O" isActive={activePlayer==='O'} onChangeName={handlePlayerNameChange}/>
      </ol>
      {(winner || hasDraw) && <GameOver winner={winner} onRestart={handleRestartButton}/>}
      <GameBoard onSelectSquare={handleSelectSquare} board = {gameBoard}/>
    </div>

    <Log turns={gameTurns}/>
  </main>);
}

export default App
