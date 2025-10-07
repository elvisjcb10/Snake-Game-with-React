import "./GameOver.css"
function GameOver({score}) {
    return (
    <div className={`game_over ${verGameOver}`} >
        <h2>Game Over</h2>
        <h2>Felicidades tu puntuacion fue de {score}</h2>
        <h3>Quiere Jugar de Nuevo</h3>
        <button >Jugar de nuevo</button>
    </div> 
  );
}

export default GameOver