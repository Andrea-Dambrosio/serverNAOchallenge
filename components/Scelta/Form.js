import React from "react";
import styles from "./sceltadue.module.scss";
import defaultItems from "./defaultItems";
function activeCheck(item, index) {
    return (
        <div className={styles.formGroup}>
            <label className={styles.label} htmlFor={index}>
                {item.label}
            </label>
            <div className={styles.checkDiv}>
                <span>
                    <input
                        className={styles.checkbox}
                        type="checkbox"
                        id={index}
                        checked={item.value === true}
                    />
                    Si
                </span>
                <span>
                    <input
                        type="checkbox"
                        className={styles.checkbox}
                        id={index}
                        checked={item.value === false}
                    />
                    No
                </span>
            </div>
        </div>
    );
}

function deactive(item, index) {
    return (
        <div className={styles.deactiveGroup}>
            <label className={styles.label} htmlFor={index}>
                {item.label}
            </label>
            <div className={styles.checkDiv}>
                <span className={styles.deactiveSpan}>
                    *Sulla base delle risposte ricevute non esistono formaggi di
                    questa tipologia
                </span>
            </div>
        </div>
    );
}

function mapFunction(item, index) {
    if (item.value == "deactive") {
        return deactive(item, index);
    }
    if (item.type === "checkbox") {
        return activeCheck(item, index);
    }

    return (
        <div className={styles.textDiv}>
            <label htmlFor={index} className={styles.label}>
                {item.label}
            </label>
            <input
                type="text"
                className={[
                    styles.text,
                    item.value != "" && styles.compiled,
                ].join(" ")}
                id={index}
                placeholder="In attesa da NAO"
                value={item.value}
            />
        </div>
    );
}

export default function Form(props) {
    if (props.items == "default") {
        return (
            <div id={styles.box}>
                <div>
                    <h1 id={styles.title}>Scelta Prodotto</h1>
                    <h2 id={styles.subtitle}>
                        NAO ti aiuterà a scegliere il prodotto
                    </h2>
                    <form id={styles.form}>
                        {defaultItems.map(mapFunction)}
                    </form>
                </div>
            </div>
        );
    }
    const items = props.items.sort((a, b) => {
        // If value is "deactive", move it to the end
        if (a.value === "deactive") return 1;
        if (b.value === "deactive") return -1;

        // If value is not null, "", or "deactive", move it to the beginning
        if (a.value !== null && a.value !== "" && a.value !== "deactive") return -1;
        if (b.value !== null && b.value !== "" && b.value !== "deactive") return 1;

        // If value is "" or null, move it to the middle
        if ((a.value === "" || a.value === null) && (b.value !== "" && b.value !== null)) return 1;
        if ((b.value === "" || b.value === null) && (a.value !== "" && a.value !== null)) return -1;

        // If values are equal, maintain original order
        return 0;
        });
    return (
        <div id={styles.box}>
            <div>
                <h1 id={styles.title}>Scelta Prodotto</h1>
                <h2 id={styles.subtitle}>
                    NAO ti aiuterà a scegliere il prodotto
                </h2>
                <form id={styles.form}>{items.map(mapFunction)}</form>
            </div>
        </div>
    );
}
