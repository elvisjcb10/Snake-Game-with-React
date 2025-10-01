import { useEffect, useState } from 'react';
import style from './Board.module.css'
import Cuadraditos from './Cuadraditos/Cuadraditos';
const Board=()=>{

    const [puntuacion,setPuntuacion]=useState(0);
    const [body,setBody]=useState([[0,0]]);
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
            setBody([...body,[Mx,My]]);
            setPuntuacion(puntuacion+1);
        }
    }
    console.log(body);
    useEffect(()=>{
        comerManzana();
        const handleKeydown=(e)=>{
            let newHead = [...body[0]];

            if (e.key === "ArrowRight") newHead[0]++;
            if (e.key === "ArrowLeft") newHead[0]--;
            if (e.key === "ArrowDown") newHead[1]++;
            if (e.key === "ArrowUp") newHead[1]--;
            setBody((prev) => {
                    const newBody = [newHead, ...prev.slice(0, -1)];
                    return newBody;
                });
        };
        window.addEventListener("keydown", handleKeydown);
        return () => {
            window.removeEventListener("keydown", handleKeydown);
        };
    },[setPuntuacion,setBody,body])
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