import { useEffect, useState } from 'react';

const FOREX_URL = 'https://open.er-api.com/v6/latest/INR';

export const useForexRates = () => {
  const [state, setState] = useState({
    status: 'loading',
    data: null,
    error: null
  });

  useEffect(() => {
    let isMounted = true;
    const fetchRates = async () => {
      setState((prev) => ({ ...prev, status: 'loading', error: null }));
      try {
        const res = await fetch(FOREX_URL);
        if (!res.ok) throw new Error('Unable to load forex rates');
        const json = await res.json();
        if (json.result !== 'success') {
          throw new Error(json['error-type'] || 'Forex API error');
        }
        if (isMounted) {
          setState({
            status: 'success',
            data: {
              base: json.base_code,
              date: json.time_last_update_utc,
              rates: json.rates
            },
            error: null
          });
        }
      } catch (error) {
        if (isMounted) {
          setState({ status: 'error', data: null, error: error.message });
        }
      }
    };
    fetchRates();
    const id = setInterval(fetchRates, 1000 * 60 * 30);
    return () => {
      isMounted = false;
      clearInterval(id);
    };
  }, []);

  return state;
};

