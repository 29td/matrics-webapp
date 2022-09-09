import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getMetrics } from '../redux/metrics/metrics';

const translateAQI = (aqi) => {
  let obj = {};
  if (aqi >= 0 && aqi <= 50) {
    obj = { msg: 'Good', style: 'green' };
  } else if (aqi >= 51 && aqi <= 100) {
    obj = { msg: 'Moderate', style: 'yellow' };
  } else if (aqi >= 101 && aqi <= 150) {
    obj = { msg: 'Unhealthy for Sensitive Groups', style: 'orange' };
  } else if (aqi >= 151 && aqi <= 200) {
    obj = { msg: 'Unhealthy', style: 'red' };
  } else if (aqi >= 201 && aqi <= 300) {
    obj = { msg: 'Very Unhealthy', style: 'purple' };
  } else {
    obj = { msg: 'Hazardous', style: 'maroon' };
  }
  return obj;
};

const City = () => {
  const { state: stateName, city } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const metrics = useSelector((state) => state.metrics);

  useEffect(() => {
    const details = {
      stateName,
      city,
    };

    dispatch(getMetrics(details));
  }, [dispatch, city, stateName]);

  const location = `${metrics.city}, ${metrics.state}, ${metrics.country}`;
  const weatherIcon = metrics.current.weather.ic
    ? `https://www.airvisual.com/images/${metrics.current.weather.ic}.png`
    : '';
  const temperature = `${metrics.current.weather.tp}°C`;
  const humidity = `${metrics.current.weather.hu}%`;
  const pressure = `${metrics.current.weather.pr}mb`;
  const windSpeed = `${metrics.current.weather.ws}km/h`;

  const AQI = metrics.current.pollution.aqius;
  const pollutant = metrics.current.pollution.mainus;
  const pollutionLevel = translateAQI(AQI).msg;
  const backColor = translateAQI(AQI).style;

  return (
    <>
      <div className="btn-container">
        <button className="btn" type="button" onClick={() => navigate(-1)}>
          Back
        </button>
      </div>
      <div className="weather">
        <p className="weather__location">{location}</p>
        <img className="weather__icon" src={weatherIcon} alt="Weather Icon" />
      </div>

      <ul className="w-metrics">
        <li className="w-metrics__item">
          <span>Temperature:</span>
          <span className="w-metrics__units">{temperature}</span>
        </li>
        <li className="w-metrics__item">
          <span>Humidity:</span>
          <span className="w-metrics__units">{humidity}</span>
        </li>
        <li className="w-metrics__item">
          <span>Pressure:</span>
          <span className="w-metrics__units">{pressure}</span>
        </li>
        <li className="w-metrics__item">
          <span>Wind Speed:</span>
          <span className="w-metrics__units">{windSpeed}</span>
        </li>
      </ul>

      <div className="p-metrics">
        <p className="p-metrics__title">Air Pollution Level</p>
        <p className="p-metrics__title">Air Quality Index</p>
        <p className="p-metrics__title">Main Pollutant</p>
        <p className="p-metrics__details">{pollutionLevel}</p>
        <p className="p-metrics__details">{`${AQI} US AQI`}</p>
        <p className="p-metrics__details">{pollutant}</p>
      </div>

      <p className="summary" style={{ backgroundColor: backColor }}>
        {pollutionLevel}
      </p>
    </>
  );
};

export default City;
