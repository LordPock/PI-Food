import { useEffect, useState } from "react";
import { connect } from "react-redux";
import validation from "../Validation/validation";
import { createRecipe, emptyMessage } from "../../redux/actions";
import { useNavigate } from "react-router-dom";
import styles from "./create.module.css";

export function Create(props) {
  const { diets, message } = props;

  const navigate = useNavigate();

  const [receta, setReceta] = useState({
    title: "",
    image: "",
    healthScore: 0,
    summary: "",
    instructions: "",
    diets: [],
  });

  const [errors, setErrors] = useState({
    title: "",
    image: "",
    healthScore: "",
    summary: "",
    instructions: "",
    diets: "",
  });

  const [mensaje, setMensaje] = useState(null);

  useEffect(() => {
    if (message) {
      if (typeof message === "string") {
        let mensaje = message;
        alert(mensaje);
        navigate(-1);
      } else {
        let mensaje = message?.error;
        alert(mensaje);
      }
    }
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
    props.createRecipe(receta);
  }

  function handleReturn() {
    window.history.back();
  }

  return (
    <div className={styles.recipeDetail}>
      <div className={styles.container}>
      <div className={styles.details}>

        <form onSubmit={handleSubmit}>
          <div className={styles.first}>
          <input
            className={errors.title && styles.warning}
            name="title"
            type="text"
            value={receta.title}
            onChange={handleInputChange}
            placeholder="Título"
          />
          {!errors.title ? null : (
            <p className={styles.danger}>{errors.title}</p>
          )}
          <label>Imagen: </label>
          <input
            className={errors.image && styles.warning}
            name="image"
            type="text"
            value={receta.image}
            onChange={handleInputChange}
          />
          <div>
          {!errors.image ? null : (
            <p className={styles.danger}>{errors.image}</p>
          )}
<label>Tipo de dieta: </label>
          {diets ? (
            diets.map((d) => (
              <label>
                <input
                  className={errors.diets && styles.warning}
                  onClick={addDiets}
                  type={"checkbox"}
                  label={d.title}
                  key={d.id}
                  value={d.title}
                />
                {d.title}
              </label>
            ))
          ) : (
            <h3>No hay recetas cargadas </h3>
          )}

          <label>Puntaje saludable: </label>
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
          </div>
            <div className={styles.second}>
          <h1>Resumen: </h1>
          <input
            className={errors.summary && styles.warning}
            name="summary"
            type="textarea"
            value={receta.summary}
            onChange={handleInputChange}
          />
          {!errors.summary ? null : (
            <p className={styles.danger}>{errors.summary}</p>
          )}
</div>
<div className={styles.third}></div>
          <h1>Instrucciones</h1>
          <input
            className={errors.instructions && styles.warning}
            name="instructions"
            type="textarea"
            value={receta.instructions}
            onChange={handleInputChange}
          />
          {!errors.instructions ? null : (
            <p className={styles.danger}>{errors.instructions}</p>
          )}
          <button type="submit">Agregar</button>

        </form>
        <button onClick={handleReturn}>Volver</button>
      </div>
      <div>
        <img src={receta.image} alt="Imagen no encontrada" />
      </div>
      </div>
    </div>
  );
}

export function mapDispatchToProps(dispatch) {
  return {
    createRecipe: (recipe) => dispatch(createRecipe(recipe)),
    emptyMessage: () => dispatch(emptyMessage()),
  };
}

export function mapStateToProps(state) {
  return {
    diets: state.diets,
    message: state.message,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Create);
