import React from "react";
import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { emptyDetail } from "../../redux/actions";
import styles from "./recipe.module.css"

function Recipe(props) {
  const dispatch = useDispatch()

  function handleDetail() {
    dispatch(emptyDetail())
  }

  return (
    <div className={styles.div}>
      <div className={styles.recipe} id={props.id} key={props.id}>
        <img className={styles.book} src='src/anotador.png' alt=''/>
        <NavLink onClick={handleDetail} to={`/recipes/${props.id}`}>
          <img className={styles.img} src={props.image} alt="No encontrado" />
          <h2 className={styles.title}>{props.title}</h2>
        </NavLink>
        <h4 className={styles.health}>{props.healthScore}</h4>
        {/* <p>{props.summary.replace(/(<([^>]+)>)/gi, "")}</p> */}
        
        <p className={styles.dish}><b>Tipo de plato:</b> {props.dishTypes?.join(', ')}</p>
        <p className={styles.diet}><b>Tipo de dieta:</b> {props.diets.join(', ')}</p>
      </div>
    </div>
  );
}
export default Recipe;
