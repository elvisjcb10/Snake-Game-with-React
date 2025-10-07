import { useEffect, useState } from 'react';
import style from './Board.module.css'
import Cuadraditos from './Cuadraditos/Cuadraditos';
import GameOver from './GameOver/GameOver';
const Board=()=>{

    const [puntuacion,setPuntuacion]=useState(0);
    const [body,setBody]=useState([[0,0]]);
    const [manzana,setManzana]=useState([1,3]);
    const [direccion,setDireccion]=useState("right");
    //estados para verificar si el jugador perdio
    const [gameOver,setGameOver]=useState(false);
    //funcion para verificar si el usuario salio o colisiono con su cuerpo
    const colision = (newBody) => {
        const [x, y] = newBody[0];
        // Choca con los bordes
        if (x < 0 || x > 9 || y < 0 || y > 9) return true;

        // Choca con su propio cuerpo
        for (let i = 1; i < newBody.length; i++) {
        if (newBody[i][0] === x && newBody[i][1] === y) return true;
        }
        return false;
    };
    //Esta funcion hace que luego de comer la manzana se ponga en un lugar aleatorio 
    //afuera del cuerpo de la serpiente
    const manzanaPosition=(body)=>{
        //Definimos las variables aleatorias
        let [Mx,My]=[ Math.floor(Math.random() * 10) , Math.floor(Math.random() * 10) ];
        //Verificamos que las variables aleatorias esten fuera del cuerpo de la serpiente
        while (body.some(([bx, by]) => bx === Mx && by === My)) {
            //si estan volvemos generar variable aleatorias
            Mx = Math.floor(Math.random() * 10);
            My = Math.floor(Math.random() * 10);
        }
        //las variables ponemos el estado de manzana para q se genere en otro lado
        setManzana([Mx,My]);
    }
    //funcion para comer manzana   
    const comerManzana=(manzana,body)=>{
        const [Hx,Hy]=body[0];
        const [Mx,My]=manzana;
        if(Hx===Mx && Hy===My){
            manzanaPosition(body);
            setBody([...body,[Mx,My]]);
            setPuntuacion(puntuacion+1);
        }
    }
    //teclados 
    useEffect(() => {
        const handleKeyDown = (e) => {
        if (e.key === "ArrowRight" && direccion !== "left") setDireccion("right");
        if (e.key === "ArrowLeft" && direccion !== "right") setDireccion("left");
        if (e.key === "ArrowDown" && direccion !== "up") setDireccion("down");
        if (e.key === "ArrowUp" && direccion !== "down") setDireccion("up");
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [direccion]);
    console.log(body)
  // Movimiento constante en la dirección actual
    useEffect(() => {
        const intervalo = setInterval(() => {
        setBody((prev) => {
            const newHead = [...prev[0]];

            if (direccion === "right") newHead[0]++;
            if (direccion === "left") newHead[0]--;
            if (direccion === "down") newHead[1]++;
            if (direccion === "up") newHead[1]--;

            const newBody = [newHead, ...prev.slice(0, -1)];
            if (colision(newBody)) {
                setGameOver(true);
                clearInterval(intervalo);
                return prev;
            }
            comerManzana(manzana,newBody)
            return newBody;
        });
        }, 150); 

        return () => clearInterval(intervalo);
    }, [direccion, manzana]);
   
    return(
        <div className={style.game}>
            {gameOver && <GameOver score={puntuacion}  gameOver={gameOver} ></GameOver>}
            <div>
                <h1>Snake Game</h1>
                <h2>Score :{puntuacion}</h2>
            </div>
            <div className={style.container}>
                <Cuadraditos cuerpoSerpiente={body} manzana={manzana} />
            </div>
        </div>
    );
}
export default Board