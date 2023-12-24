import styles from "./attesadue.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRef, useEffect } from "react";
import {
  faCow,
  faCheese,
  faRobot,
  faLeaf,
  faTree,
} from "@fortawesome/free-solid-svg-icons";

function casuale(min, max) {
  const casualt = Math.random() * (max - min) + min;
  return casualt;
}

export default function Sfondo() {

  function setProperties(element) {
    element.style.left = casuale(5, 90) + "%";
    element.style.width = casuale(55, 230) + "px";
    element.style.height = element.style.width;
  }

  const ref = useRef();
  useEffect(() => {
    const elements = ref.current.querySelectorAll("svg");

    elements.forEach((element) => {
      setProperties(element);
      element.addEventListener("animationiteration", () => {
        setProperties(element);
      });
    });
  }, []);

  return (
    <div className={styles.area}>
      <ul className={styles.circles} ref={ref}>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <FontAwesomeIcon icon={faCow} />
        <FontAwesomeIcon icon={faCheese} />
        <FontAwesomeIcon icon={faRobot} />
        <FontAwesomeIcon icon={faLeaf} />
        <FontAwesomeIcon icon={faTree} />
      </ul>
    </div>
  );
}
