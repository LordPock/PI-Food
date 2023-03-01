import React from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { emptyDetail } from "../../redux/actions";
import styles from "./recipe.module.css";

function Recipe(props) {
  const dispatch = useDispatch();
  const navigation = useNavigate();

  function handleDetail() {
    dispatch(emptyDetail());
    navigation(`/recipes/${props.id}`);
  }

  function handleEdit() {}

  function handleDelete() {}

  return (
    <div className={styles.div}>
      <div onClick={handleDetail} className={styles.luis}>
        <div className={styles.recipe} id={props.id} key={props.id}>
          <h2 className={styles.title}>{props.title}</h2>
          <img className={styles.img} src={props.image} alt="No encontrado" />
          <h4
            className={
              props.healthScore >= 70
                ? styles.health
                : props.healthScore <= 30
                ? styles.noHealth
                : styles.midHealth
            }
          >
            Puntaje saludable: {props.healthScore}
          </h4>
        </div>
        <div className={styles.back}>
          <div className={styles.dish}>
            <b>Tipo de plato: </b>
             <span>{props.dishTypes?.join(", ")}</span>
          </div>
          <div className={styles.diet}>
            <b>Tipo de dieta: </b> 
            <span>{props.diets.join(", ")}</span>
          </div>
        </div>
      </div>

      <div className={styles.icon}>
        <div onClick={handleEdit}> &#128395;</div>
        <div onClick={handleDelete}> &#128465;</div>
      </div>
    </div>
  );
}
export default Recipe;
