import { useCallback, useEffect, useMemo, useState } from 'react';
import demoArticles from '../data/demoArticles.js';

const DEFAULT_COORDS = {
  latitude: 28.6139,
  longitude: 77.209,
  label: 'New Delhi, India'
};

const buildWeatherUrl = (latitude, longitude) =>
  `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true&hourly=temperature_2m,relativehumidity_2m,apparent_temperature,precipitation_probability&daily=temperature_2m_max,temperature_2m_min,sunrise,sunset,uv_index_max&timezone=auto`;

const buildAirUrl = (latitude, longitude) =>
  `https://air-quality-api.open-meteo.com/v1/air-quality?latitude=${latitude}&longitude=${longitude}&hourly=us_aqi,pm10,pm2_5,carbon_monoxide,ozone&timezone=auto`;

const reverseGeocodeUrl = (latitude, longitude) =>
  `https://geocoding-api.open-meteo.com/v1/reverse?latitude=${latitude}&longitude=${longitude}&count=1&language=en&format=json`;

const geocodeCityUrl = (name) =>
  `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(
    name
  )}&count=1&language=en&format=json`;

const fetchJson = async (url) => {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Failed to fetch ${url}`);
  return res.json();
};

const buildWeatherPayload = async ({ latitude, longitude, label }) => {
  const [weather, air] = await Promise.all([
    fetchJson(buildWeatherUrl(latitude, longitude)),
    fetchJson(buildAirUrl(latitude, longitude))
  ]);

  let locationLabel = label;
  if (!locationLabel) {
    try {
      const reverse = await fetchJson(reverseGeocodeUrl(latitude, longitude));
      locationLabel =
        reverse?.results?.[0]?.name && reverse?.results?.[0]?.country
          ? `${reverse.results[0].name}, ${reverse.results[0].country}`
          : undefined;
    } catch {
      locationLabel = undefined;
    }
  }

  return {
    location: locationLabel || `${latitude.toFixed(2)}, ${longitude.toFixed(2)}`,
    coordinates: { latitude, longitude },
    current: weather.current_weather,
    daily: weather.daily,
    hourly: weather.hourly,
    air: {
      aqi: air?.hourly?.us_aqi?.[0],
      pm10: air?.hourly?.pm10?.[0],
      pm25: air?.hourly?.pm2_5?.[0],
      ozone: air?.hourly?.ozone?.[0],
      carbon_monoxide: air?.hourly?.carbon_monoxide?.[0]
    },
    fetchedAt: new Date().toISOString()
  };
};

export const useWeather = ({ auto = true } = {}) => {
  const [state, setState] = useState({
    status: auto ? 'loading' : 'idle',
    data: null,
    error: null
  });

  const [target, setTarget] = useState(auto ? null : DEFAULT_COORDS);

  const runFetch = useCallback(async (coords) => {
    if (!coords) return;
    setState((prev) => ({ ...prev, status: 'loading', error: null }));
    try {
      const payload = await buildWeatherPayload(coords);
      setState({ status: 'success', data: payload, error: null });
    } catch (error) {
      setState({ status: 'error', data: null, error: error.message });
    }
  }, []);

  useEffect(() => {
    if (!auto) return;
    if (!('geolocation' in navigator)) {
      setTarget(DEFAULT_COORDS);
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setTarget({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          label: 'Your location'
        });
      },
      () => setTarget(DEFAULT_COORDS),
      { enableHighAccuracy: true, timeout: 8000 }
    );
  }, [auto]);

  useEffect(() => {
    if (target) {
      runFetch(target);
    }
  }, [target, runFetch]);

  const searchByCity = useCallback(async (city) => {
    if (!city) return;
    setState((prev) => ({ ...prev, status: 'loading', error: null }));
    try {
      const geo = await fetchJson(geocodeCityUrl(city));
      const match = geo?.results?.[0];
      if (!match) throw new Error('City not found');
      setTarget({
        latitude: match.latitude,
        longitude: match.longitude,
        label: `${match.name}, ${match.country}`
      });
    } catch (error) {
      setState({ status: 'error', data: null, error: error.message });
    }
  }, []);

  const refresh = useCallback(() => {
    if (state.data) {
      runFetch(state.data.coordinates);
    } else if (target) {
      runFetch(target);
    }
  }, [runFetch, state.data, target]);

  const fallbackHeadline = useMemo(() => {
    return demoArticles.find((article) => article.tags?.includes('AirQuality'));
  }, []);

  return {
    ...state,
    searchByCity,
    refresh,
    fallbackHeadline
  };
};

