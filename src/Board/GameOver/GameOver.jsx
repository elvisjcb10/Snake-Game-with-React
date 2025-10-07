import "./GameOver.css"
function GameOver({score,onClick}) {
    return (
    <div className="game_over" >
        <h2>Game Over</h2>
        <h2>Score <span>{score}</span></h2>
        <button className="btn" onClick={onClick}>Jugar de nuevo</button>
    </div> 
  );
}

export default GameOver