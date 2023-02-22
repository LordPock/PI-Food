import { useEffect, useState } from "react";
import { connect, useDispatch } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { emptyDetail, findRecipe } from "../../redux/actions";
import Loading from "../Loading/loading";


export function RecipeDetail(props) {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { detail } = props;
   const [isLoading, setIsLoading] = useState(true)


  useEffect(() => {
   setIsLoading(true)
   dispatch(emptyDetail)
   dispatch(findRecipe(id));
    // eslint-disable-next-line
  }, [id]);

  useEffect(() => {
    if (detail) {
      setIsLoading(false);
    }
  }, [detail])

  function clearDetail() {
    dispatch(emptyDetail)
  }

  return (
    <div>
    {isLoading ? <Loading /> : 
 
    <div>
      <Link to={"/recipes"}>
        <button onClick={clearDetail}>Volver</button>
      </Link>
      <h1>{detail.title}</h1>
      <img src={detail.image} alt="Imagen no encontrada" />
      {detail.dishTypes ? <h3>{detail.dishTypes.join(', ')}</h3> : null}
      {detail.diets ? <h3>{detail.diets.join(', ')}</h3> : null}
      <h4>{detail.healthScore}</h4>
      <h4>{detail.summary?.replace(/(<([^>]+)>)/ig, '')}</h4>
      <h4>{detail.instructions?.replace(/(<([^>]+)>)/ig, '')}</h4>
      
    </div>}
    </div>
  );
}

export function mapStateToProps(state) {
  return {
    detail: state.detail,
  };
}

export default connect(mapStateToProps, null)(RecipeDetail);
