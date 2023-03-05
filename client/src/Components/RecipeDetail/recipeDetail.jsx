import { useEffect, useState } from "react";
import { connect, useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { emptyDetail, findRecipe } from "../../redux/actions";
import Loading from "../Loading/loading";
import styles from "./recipeDetail.module.css";

export function RecipeDetail(props) {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { detail } = props;
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate()

  useEffect(() => {
    setIsLoading(true);
    dispatch(findRecipe(id));
    // eslint-disable-next-line
  }, [id]);

  useEffect(() => {
    if (detail) {
      setIsLoading(false);
    }
  }, [detail]);

  function handleVolver() {
    dispatch(emptyDetail);
    navigate('/recipes')
  }

  return (
    <div className={styles.recipeDetail}>
      {isLoading ? (
        <Loading />
      ) : (
        <div className={styles.container}>
         
          <div className={styles.details}>
            <div className={styles.first}>
            
              <h1>{detail.title}</h1>
              <img src={detail.image} alt="Imagen no encontrada" />
              <div>
                {detail.dishTypes ? (
                  <h3>Tipo de plato: {detail.dishTypes.join(", ")}</h3>
                ) : null}
                {detail.diets ? (
                  <h3>Tipo de dieta: {detail.diets && typeof detail.diets[0] === 'object' ? <span>{detail.diets.map((d, index) => index !== detail.diets.length - 1  ? d.title + ', ' : d.title)}</span> : <span>{detail.diets?.join(', ')}</span>  }</h3>
                ) : null}
                <h4>Puntaje saludable: {detail.healthScore}</h4>
              </div>
            </div>
            <div className={styles.second}>
              <h1>Resumen</h1>
              <h4>{detail.summary?.replace(/(<([^>]+)>)/gi, "")}</h4>
            </div>
            <div className={styles.third}>
              <h1>Instrucciones</h1>
              <h4>{detail.instructions?.replace(/(<([^>]+)>)/gi, "")}</h4>
              <button onClick={handleVolver}></button>
            </div>
            
          </div>
        </div>
      )}
    </div>
  );
}

export function mapStateToProps(state) {
  return {
    detail: state.detail,
  };
}

export default connect(mapStateToProps, null)(RecipeDetail);
