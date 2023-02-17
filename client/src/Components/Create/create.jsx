import { useState } from "react";
import { connect, useDispatch } from "react-redux";
import validation from "../Validation/validation";
import { addRecipes, createRecipe } from "../../redux/actions";
import { Link } from "react-router-dom";
import styles from './create.module.css'

export function Create(props) {
  const { diets } = props
  const dispatch = useDispatch

  function getRecipes() {
    dispatch(addRecipes())
  }

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

  function handleInputChange(e) {
    setReceta({ ...receta, [e.target.name]: e.target.value });
    setErrors(validation({ ...receta, [e.target.name]: e.target.value }));
  }

  function addDiets(e) {
    if (receta.diets.includes(e.target.value)) {
      setReceta({...receta, diets: receta.diets.filter(d => d !== e.target.value)})
    } else {
      setReceta({...receta, diets: [...receta.diets, e.target.value]})
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    props.createRecipe(receta);
  }

  return (
    <div>
        <div className={styles.div}>
      <form onSubmit={handleSubmit}>
        <label>Título: </label>
        <input name="title" type='text' value={receta.title} onChange={handleInputChange}/>
        <label>Imagen: </label>
        <input name="image" type='text' value={receta.image} onChange={handleInputChange}/>
        <label>Puntaje saludable: </label>
        <input name="healthScore" type='' value={receta.healthScore} onChange={handleInputChange}/>
        <label>Resumen: </label>
        <input name="summary" type='' value={receta.summary} onChange={handleInputChange}/>
        <label>Instrucciones</label>
        <input name="instructions" type='' value={receta.instructions} onChange={handleInputChange}/>
        <label>Dietas: </label>
        {diets ? diets.map((d) => 
        <label><input onClick={addDiets} type={"checkbox"} label={d.title} key={d.id} className={styles.check} value={d.title}/>{d.title}</label>
) : <h3>No hay recetas cargadas </h3>}
        <button type='submit'>Agregar</button>
      </form>
      <Link to={'/recipes'}>
      <button>Volver</button></Link>
    </div>
    <div>
        <img src={receta.image} alt='Imagen no encontrada' />
            </div>
            </div>
  );
}

export function mapDispatchToProps(dispatch) {
  return {
    createRecipe: (recipe) => dispatch(createRecipe(recipe)),
  };
}

export function mapStateToProps(state) {
  return {
    diets: state.diets,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Create);
