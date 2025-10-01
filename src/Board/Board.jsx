import { useEffect, useState } from 'react';
import style from './Board.module.css'
import Cuadraditos from './Cuadraditos/Cuadraditos';
const Board=()=>{
    const [x,setX]=useState(0);
    const [y,setY]=useState(0);
    const [puntuacion,setPuntuacion]=useState(0);
    const body=[[x,y]];
    const [manzana,setManzana]=useState([1,3]);
    //Esta funcion hace que luego de comer la manzana se ponga en un lugar aleatorio 
    //afuera del cuerpo de la serpiente
    const manzanaPosition=()=>{
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

    const comerManzana=()=>{
        const [Hx,Hy]=body[0];
        const [Mx,My]=manzana;
        if(Hx===Mx && Hy===My){
            manzanaPosition();
            setPuntuacion(puntuacion+1);
        }
    }
    useEffect(()=>{
        comerManzana();
        const handleKeydown=(e)=>{
            if(e.key==="ArrowRight"){
                setX(x+1);
                console.log(" se movio a a derecha");
            }
            if(e.key==="ArrowLeft"){
                setX(x-1);
            }
            if(e.key==="ArrowDown"){
                setY(y+1);
                console.log(" se movio a a derecha");
            }
            if(e.key==="ArrowUp"){
                setY(y-1);
            }
        };
        window.addEventListener("keydown", handleKeydown);
        return () => {
            window.removeEventListener("keydown", handleKeydown);
        };
    },[setY,y,setX,x,setPuntuacion])
    return(
        <div>
            <h2>Score :{puntuacion}</h2>
            <div className={style.container}>
                <Cuadraditos cuerpoSerpiente={body} manzana={manzana} />
            </div>
        </div>
    );
}
export default Board