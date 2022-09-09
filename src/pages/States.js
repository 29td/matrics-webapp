import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getStates } from '../redux/states/states';

let initial = true;

const States = () => {
  const states = useSelector((state) => state.states);
  const dispatch = useDispatch();

  useEffect(() => {
    if (initial) {
      dispatch(getStates());
      initial = false;
    }
  }, [dispatch]);

  return (
    <ul className="cards">
      {states.map((state) => (
        <li className="cards__item" key={state}>
          <Link className="cards__link" to={`/${state}`}>
            {state}
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default States;
