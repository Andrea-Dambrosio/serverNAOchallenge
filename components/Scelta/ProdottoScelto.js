import productsId from "./idProdotti";
import styles from "./ProdottoScelto.module.css";
let bool = false;
function number(){
    if(bool){
        bool = false;
        return "0s"
    }
    else{
        bool = true;
        return "-2s"
    }
}
function mapFunction(id, key) {
    return (
        <div
            key={key}
            className={styles.imageContainer}
            style={{ animationDelay: number() }}
        >
            <img
                src={`images/prodotti/${productsId[id] + ".jpg"}`}
                width="100%"
                height="100%"
               
            />
            <p className={styles.nomeProdotto}>{productsId[id]}</p>
        </div>
    );
}
export default function ProdottoScelto(props) {

    return (
        <>
            <h1 className={styles.title}>
                I prodotti scelti per te:
            </h1>
            <div
                className={styles.container}
            >
                {props.ids.map(mapFunction)}
            </div>
        </>
    );
}
