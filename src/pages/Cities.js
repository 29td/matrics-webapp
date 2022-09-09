import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { getCities } from '../redux/cities/cities';

const Cities = () => {
  const { state: stateName } = useParams();
  const navigate = useNavigate();
  const cities = useSelector((state) => state.cities);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCities(stateName));
  }, [dispatch, stateName]);

  return (
    <>
      <div className="btn-container">
        <button className="btn" type="button" onClick={() => navigate(-1)}>
          Back
        </button>
      </div>
      <ul className="cards">
        {cities.map((city) => (
          <li className="cards__item" key={city}>
            <Link className="cards__link" to={`/${stateName}/${city}`}>
              {city}
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
};

export default Cities;
