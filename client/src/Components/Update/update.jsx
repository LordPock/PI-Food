import { useEffect, useState } from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  emptyDetail,
  findRecipe,
  emptyMessage,
  updateRecipe,
  getRecipes,
} from "../../redux/actions";
import validation from "../Validation/validation";
import Loading from "../Loading/loading";
import styles from "./update.module.css";

export function Update(props) {
  const { diets, message, detail } = useSelector((state) => state);
  const dispatch = useDispatch();
  const { id } = useParams();
  const [receta, setReceta] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    setIsLoading(true);
    dispatch(findRecipe(id));
    // eslint-disable-next-line
  }, [id]);

  useEffect(() => {
    if (detail) {
      setReceta(detail);
      setIsLoading(false);
    }
  }, [detail]);

  const [errors, setErrors] = useState({
    title: null,
    image: null,
    healthScore: null,
    summary: null,
    instructions: null,
    diets: null,
  });

  useEffect(() => {
    if (message) {
      if (typeof message === "string") {
        let mensaje = message;
        alert(mensaje);
        dispatch(emptyMessage())
        dispatch(getRecipes());
        navigate("/recipes");
      } else {
        let mensaje = message?.error;
        alert(mensaje);
      }
    } // eslint-disable-next-line
  }, [message]);

  function handleInputChange(e) {
    setReceta({ ...receta, [e.target.name]: e.target.value });
    setErrors(validation({ ...receta, [e.target.name]: e.target.value }));
  }

  function addDiets(e) {
    if (receta.diets.includes(e.target.value)) {
      setReceta({
        ...receta,
        diets: receta.diets.filter((d) => d !== e.target.value),
      });
    } else {
      setReceta({ ...receta, diets: [...receta.diets, e.target.value] });
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    dispatch(updateRecipe(receta));
  }

  function handleReturn() {
    navigate(-1);
  }

  const errorsNull = Object.values(errors).every((value) => value === null);

  return (
    <div className={styles.recipeDetail}>
      {isLoading ? (
        <Loading />
      ) : (
        <div className={styles.container}>
          <button className={styles.return} onClick={handleReturn}></button>
          <form className={styles.details} onSubmit={handleSubmit}>
            <div className={styles.first}>
              <textarea
                className={errors.title && styles.warningtextarea}
                name="title"
                type="text"
                value={receta.title}
                onChange={handleInputChange}
                placeholder="Título"
              ></textarea>
              <div className={styles.img}>
                <label>Imagen:</label>
                <input
                  name="image"
                  type="text"
                  value={receta.image}
                  placeholder="Imagen"
                  onChange={handleInputChange}
                />
                {!errors.image ? null : (
                  <p className={styles.dangerimg}>{errors.image}</p>
                )}
              </div>
              <img src={receta.image} alt="" />

              <div className={styles.dieta}>
                <label>
                  <b>
                    <u>Tipo de dieta:</u>
                  </b>
                </label>
                {diets ? (
                  <div className={styles.grid}>
                    {diets.map((d) => (
                      <label key={d.id}>
                        <input
                          className={errors.diets && styles.warning}
                          onClick={addDiets}
                          type={"checkbox"}
                          label={d.title}
                          key={d.id}
                          id={d.id}
                          value={d.title}
                          defaultChecked={receta.diets.some((r) => r.title === d.title)}
                        />
                        {d.title}
                      </label>
                    ))}
                  </div>
                ) : (
                  <h3>No hay recetas cargadas </h3>
                )}
                {!errors.diets ? null : (
                  <p className={styles.dangerdiets}>{errors.diets}</p>
                )}
              </div>
              <div className={styles.health}>
                <label>Puntaje saludable:</label>
                <input
                  className={errors.healthScore && styles.warning}
                  name="healthScore"
                  type="number"
                  value={receta.healthScore}
                  onChange={handleInputChange}
                />
                {!errors.healthScore ? null : (
                  <p className={styles.danger}>{errors.healthScore}</p>
                )}
              </div>
              {!errors.title ? null : (
                <p className={styles.dangerh1}>{errors.title}</p>
              )}
            </div>

            <div className={styles.second}>
              <h1>Resumen</h1>
              <textarea
                className={errors.summary && styles.warningtextarea}
                name="summary"
                type="textarea"
                value={receta.summary}
                onChange={handleInputChange}
                placeholder="Resumen de la receta"
              ></textarea>
              {!errors.summary ? null : (
                <p className={styles.dangersummary}>{errors.summary}</p>
              )}
            </div>
            <div className={styles.third}>
              <h1>Instrucciones</h1>
              <textarea
                className={errors.instructions && styles.warningtextarea}
                name="instructions"
                type="textarea"
                value={receta.instructions}
                onChange={handleInputChange}
                placeholder="Instrucciones para la preparación de la receta"
              ></textarea>
              {!errors.instructions ? null : (
                <p className={styles.dangerinstruction}>
                  {errors.instructions}
                </p>
              )}
              <button
                className={styles.submit}
                type="submit"
                hidden={errorsNull ? false : true}
              ></button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

export function mapDispatchToProps(dispatch) {
  return {
    updateRecipe: (recipe) => dispatch(updateRecipe(recipe)),
    emptyMessage: () => dispatch(emptyMessage()),
    findRecipe: (id) => dispatch(findRecipe(id)),
    emptyDetail: (id) => dispatch(emptyDetail(id)),
  };
}

export default connect(null, mapDispatchToProps)(Update);