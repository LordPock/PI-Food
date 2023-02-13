import React from "react";


function Recipe(props) {
  console.log(props)
  return (
    <div >
       <div id={props.id} key={props.id}>
          <img  src={props.image} alt="No encontrado" /> 
          {/* <NavLink to={`/detail/${props.id}`} className={styles.name}> */}
          <h2 >{props.title}</h2>
          {/* </NavLink> */}
          <h4>Score: {props.healthScore}</h4>
          <p >{props.summary}</p>
          {/* <span>{props.dishTypes}</span> */}
          {/* <span>{props.diets}</span> */}

          {/* {location.pathname ==='/home' ? */}
          <button >X</button> 
          {/* : null } */}
          {/* {
          isFav ? (
             <button className={styles.fav} onClick={handleFavorite}>❤️</button>
          ) : (
             <button className={styles.fav} onClick={handleFavorite}>🤍</button>
          )
       } */}
       </div>
    </div>
 );
      }
export default Recipe;
