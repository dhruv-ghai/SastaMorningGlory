import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useWeather } from '../hooks/useWeather.js';

const WeatherStat = ({ label, value, helper }) => (
  <div className="weather-stat-card">
    <p>{label}</p>
    <strong>{value}</strong>
    {helper && <small>{helper}</small>}
  </div>
);

const ForecastRow = ({ day, max, min, sunrise, sunset }) => (
  <div className="weather-forecast-row">
    <div>{day}</div>
    <div>
      <span>{Math.round(max)}°</span>
      <span className="weather-forecast-min">{Math.round(min)}°</span>
    </div>
    <div>
      <small>Sunrise {sunrise?.split('T')[1]?.slice(0, 5)}</small>
      <small>Sunset {sunset?.split('T')[1]?.slice(0, 5)}</small>
    </div>
  </div>
);

const Weather = () => {
  const weather = useWeather();
  const [cityInput, setCityInput] = useState('');

  const handleSearch = (event) => {
    event.preventDefault();
    if (cityInput.trim()) {
      weather.searchByCity(cityInput.trim());
    }
  };

  const current = weather.data?.current;
  const daily = weather.data?.daily;
  const air = weather.data?.air;

  return (
    <div className="weather-page">
      <div className="container-custom">
        <div className="weather-page-header">
          <div>
            <p className="weather-kicker">Live Weather + Air Quality</p>
            <h1>Hyperlocal forecast across your city</h1>
            <p className="weather-subtitle">
              Allow location access or search a city to view current conditions, five-day outlook, air
              quality indices and NASA&apos;s astronomy pick.
            </p>
          </div>
          <form onSubmit={handleSearch} className="weather-search">
            <input
              type="text"
              placeholder="Search city"
              value={cityInput}
              onChange={(e) => setCityInput(e.target.value)}
            />
            <button type="submit">Go</button>
          </form>
        </div>

        <div className="weather-grid">
          <div className="weather-primary-card">
            {weather.status === 'loading' && <p>Fetching latest data...</p>}
            {weather.status === 'error' && <p className="toi-muted">{weather.error}</p>}
            {weather.status === 'success' && current && (
              <>
                <div className="weather-primary-meta">
                  <div>
                    <p className="toi-label">Location</p>
                    <h2>{weather.data.location}</h2>
                    <p>Updated {new Date(weather.data.fetchedAt).toLocaleTimeString()}</p>
                  </div>
                  <div className="weather-primary-temp">
                    <span>{Math.round(current.temperature)}°</span>
                    <small>Wind {Math.round(current.windspeed)} km/h</small>
                  </div>
                </div>
                <div className="weather-stats-row">
                  <WeatherStat
                    label="Feels Like"
                    value={`${Math.round(weather.data.hourly?.apparent_temperature?.[0] ?? current.temperature)}°`}
                    helper="apparent temperature"
                  />
                  <WeatherStat label="Humidity" value={`${weather.data.hourly?.relativehumidity_2m?.[0] ?? '--'}%`} />
                  <WeatherStat
                    label="UV Index"
                    value={daily?.uv_index_max?.[0] ?? '--'}
                    helper="midday peak"
                  />
                  <WeatherStat
                    label="Air Quality"
                    value={air?.aqi ?? '--'}
                    helper={air?.aqi ? 'US AQI scale' : 'AQI pending'}
                  />
                </div>
              </>
            )}
          </div>

          <div className="weather-side-card">
            <p className="toi-label">Air Quality snapshot</p>
            {air ? (
              <ul>
                <li>PM2.5: {air.pm25?.toFixed(1) ?? '—'} µg/m³</li>
                <li>PM10: {air.pm10?.toFixed(1) ?? '—'} µg/m³</li>
                <li>Ozone: {air.ozone?.toFixed(1) ?? '—'} μg/m³</li>
                <li>CO: {air.carbon_monoxide?.toFixed(1) ?? '—'} μg/m³</li>
              </ul>
            ) : (
              <p className="toi-muted">Waiting for readings...</p>
            )}
            {weather.fallbackHeadline && (
              <Link to={`/article/${weather.fallbackHeadline.slug}`} className="weather-side-link">
                Related story: {weather.fallbackHeadline.title}
              </Link>
            )}
          </div>
        </div>

        <div className="weather-forecast-card">
          <p className="toi-label">Next five days</p>
          {daily ? (
            daily.time.slice(0, 5).map((time, index) => (
              <ForecastRow
                key={time}
                day={new Date(time).toLocaleDateString('en-IN', {
                  weekday: 'short',
                  month: 'short',
                  day: 'numeric'
                })}
                max={daily.temperature_2m_max[index]}
                min={daily.temperature_2m_min[index]}
                sunrise={daily.sunrise[index]}
                sunset={daily.sunset[index]}
              />
            ))
          ) : (
            <p className="toi-muted">Forecast loading...</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Weather;

