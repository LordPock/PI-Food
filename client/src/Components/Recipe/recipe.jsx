import React from "react";
import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { addDiets } from "../../redux/actions";

function recipe(props) {
  return (
    <div>
      <div id={props.id} key={props.id}>
        <NavLink to={`/recipes/${props.id}`}>
          <img src={props.image} alt="No encontrado" />
          <h2>{props.title}</h2>
        </NavLink>
        <h4>Score: {props.healthScore}</h4>
        <p>{props.summary.replace(/(<([^>]+)>)/gi, "")}</p>
        <p>{props.dishTypes?.join(', ')}</p>
        
        <p>{props.diets.join(', ')}</p>
      </div>
    </div>
  );
}
export default recipe;
