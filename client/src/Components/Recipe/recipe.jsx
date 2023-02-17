import React from "react";
import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { addDiets } from "../../redux/actions";



function recipe(props) {

  
  return (
    <div >
       <div id={props.id} key={props.id}>
          <img  src={props.image} alt="No encontrado" /> 
          <NavLink to={`/recipes/${props.id}`}>
          <h2>{props.title}</h2>
          </NavLink>
          <h4>Score: {props.healthScore}</h4>
          <p >{props.summary.replace(/(<([^>]+)>)/ig, '')}</p>
          <span>{props.dishTypes}</span>
          <span>{props.diets.join(',')}</span>

          
       </div>
    </div>
 );
      }
export default recipe;
