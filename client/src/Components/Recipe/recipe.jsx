import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { emptyDetail } from "../../redux/actions";
import styles from "./recipe.module.css";

function Recipe(props) {
  const dispatch = useDispatch();
  const navigation = useNavigate();

  function handleDetail() {
    dispatch(emptyDetail());
    navigation(`/recipes/${props.id}`, {method: 'PUT'});
  }


  return (
    <div className={styles.div}>
      <div  className={styles.luis}>
        <div onClick={handleDetail} className={styles.recipe} id={props.id && props.id} key={props.id && props.id}>
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
         {props.dishTypes ? <div onClick={handleDetail} className={styles.dish}>
            <b>Tipo de plato: </b>
             <span>{props.dishTypes?.join(", ")}</span>
          </div> : null}
          <div onClick={handleDetail} className={styles.diet}>
            <b>Tipo de dieta: </b> 
            {props.diets && typeof props.diets[0] === 'object' ? <span>{props.diets.map((d, index) => index !== props.diets.length - 1  ? d.title + ', ' : d.title)}</span> : <span>{props.diets?.join(', ')}</span>  }
          </div>
          <div className={styles.icon}>
        {props.id && props.id.length > 10 ? <div onClick={() => props.handleEdit(props.id)}> &#128395;</div> : null}
        <div onClick={() => props.handleDelete(props.id)}> &#128465;</div>
      </div>
        </div>
      </div>

      
    </div>
  );
}
export default Recipe;
