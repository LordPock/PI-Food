import { useEffect } from "react";
import { connect, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { findRecipe } from "../../redux/actions";

export function RecipeDetail(props) {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { detail } = props;

  useEffect(() => {
    dispatch(findRecipe(id));
  }, [id]);

  return (
    <div>
      <h1>{detail.title}</h1>
      <img src={detail.image} alt="Donde esta la foto" />
      {detail.dishTypes ? <h3>{detail.dishTypes.join(", ")}</h3> : <h3></h3>}
      {detail.diets ? <h3>{detail.diets.join(", ")}</h3> : <h3></h3>}
      <h4></h4>
      <h4>{detail.healthScore}</h4>
      <h4>{detail.summary}</h4>
      <h4>{detail.instructions}</h4>
    </div>
  );
}

export function mapStateToProps(state) {
  return {
    detail: state.detail,
  };
}

export default connect(mapStateToProps, null)(RecipeDetail);
