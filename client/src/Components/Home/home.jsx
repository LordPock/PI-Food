import { Link } from "react-router-dom";
import React from "react";
import styles from './home.module.css'
import { useDispatch } from "react-redux";
import { addDiets, getRecipes } from "../../redux/actions";


function Home() {
const dispatch = useDispatch()

  function handleClick() {
    dispatch(getRecipes());
    dispatch(addDiets());
  }
  return (
    <div className={styles.home}>
      <Link to={'/recipes'} onClick={handleClick}>
    <img src='src/landing.png' alt=''/>
    </Link>
    </div>
  );
}

export default Home;
