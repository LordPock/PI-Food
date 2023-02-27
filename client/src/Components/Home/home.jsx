import { Link } from "react-router-dom";
import React from "react";
import styles from './home.module.css'


function Home() {

  return (
    <div className={styles.home}>
      <Link to={'/recipes'}>
    <img src='src/landing.png' alt=''/>
    </Link>
    </div>
  );
}

export default Home;
