import style from './cuadraditos.module.css'

const Cuadraditos=({cuerpoSerpiente,manzana})=>{
    const matriz=[];
    const Cell=10;
    const renderCuadraditos=()=>{
        for(let i=0;i<Cell;i++){
            matriz[i]=[]
            for(let j=0;j<Cell;j++){
                matriz[i][j]=(<div className={style.cuadradito}></div>);
            }
        }
        renderCuerpo();
        renderManzana();
        return matriz.flat();
    }
    const renderCuerpo = () => {
        cuerpoSerpiente.forEach(([x, y], idx) => {
        matriz[y][x] = (<div key={`body-${idx}`} className={style.body}></div>);});
    };

    const renderManzana = () => {
        const [x, y] = manzana;
        matriz[y][x] = (<div key={`apple-${x}-${y}`} className={style.manzana}></div>);
    };
    return (
        <>
            {renderCuadraditos()}
        </>
    );
}
export default Cuadraditos