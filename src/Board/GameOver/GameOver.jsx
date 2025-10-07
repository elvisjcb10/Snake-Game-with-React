import "./GameOver.css"
function GameOver({score,onClick}) {
    return (
    <div className="game_over" >
        <h2>Game Over</h2>
        <h2>Felicidades tu puntuacion fue de {score}</h2>
        <h3>Quiere Jugar de Nuevo</h3>
        <button onClick={onClick}>Jugar de nuevo</button>
    </div> 
  );
}

export default GameOver