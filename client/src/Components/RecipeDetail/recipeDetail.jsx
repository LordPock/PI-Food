import { useEffect } from "react";
import { connect, useDispatch } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { findRecipe } from "../../redux/actions";

export function RecipeDetail(props) {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { detail } = props;

  useEffect(() => {
    dispatch(findRecipe(id));
    // eslint-disable-next-line
  }, [id]);

  return (
    <div>
      <Link to={"/recipes"}>
        <button>Volver</button>
      </Link>
      <h1>{detail.title}</h1>
      <img src={detail.image} alt="Donde esta la foto" />
      {detail.dishTypes ? <h3>{detail.dishTypes.join(", ")}</h3> : null}
      {detail.diets ? <h3>{detail.diets.join(", ")}</h3> : null}
      <h4>{detail.healthScore}</h4>
      <h4>{detail.summary?.replace(/(<([^>]+)>)/ig, '')}</h4>
      <h4>{detail.instructions?.replace(/(<([^>]+)>)/ig, '')}</h4>
      
    </div>
  );
}

export function mapStateToProps(state) {
  return {
    detail: state.detail,
  };
}

export default connect(mapStateToProps, null)(RecipeDetail);
