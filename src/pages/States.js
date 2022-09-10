import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { getStates } from '../redux/states/states';

let initial = true;

const States = () => {
  const states = useSelector((state) => state.states);
  const dispatch = useDispatch();

  const [q, setQ] = useState('');
  const searchHandle = (e) => {
    q.toLowerCase();
    const query = e.target.value.trim();
    setQ(query);
  };

  const filteredStates = states.filter((data) => data.toLowerCase().includes(q));

  useEffect(() => {
    if (initial) {
      dispatch(getStates());
      initial = false;
    }
  }, [dispatch]);

  return (
    <>
      <label className="search-btn" htmlFor="search-form">
        <input type="text" className="search-btn" placeholder="search state" value={q} onChange={searchHandle} />
      </label>
      {filteredStates.length && (
      <ul className="cards">
        {filteredStates.map((state) => (
          <li className="cards__item" key={state}>
            <Link className="cards__link" to={`/${state}`}>
              {state}
            </Link>
          </li>
        ))}
      </ul>
      )}
    </>
  );
};

export default States;
