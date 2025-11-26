import { useEffect, useState } from 'react';

const TICKER_URL =
  'https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,solana,cardano,polkadot&vs_currencies=usd,inr&include_24hr_change=true';

const mapTicker = (symbol, payload) => ({
  symbol,
  inr: payload.inr,
  usd: payload.usd,
  change: payload.usd_24h_change
});

export const useMarketTickers = () => {
  const [state, setState] = useState({ status: 'idle', tickers: [], error: null });

  useEffect(() => {
    let isMounted = true;
    const fetchTickers = async () => {
      setState({ status: 'loading', tickers: [], error: null });
      try {
        const res = await fetch(TICKER_URL);
        if (!res.ok) throw new Error('Unable to load market tickers');
        const json = await res.json();
        const tickers = Object.entries(json).map(([symbol, payload]) =>
          mapTicker(symbol, payload)
        );
        if (isMounted) {
          setState({ status: 'success', tickers, error: null });
        }
      } catch (error) {
        if (isMounted) {
          setState({ status: 'error', tickers: [], error: error.message });
        }
      }
    };
    fetchTickers();
    const id = setInterval(fetchTickers, 1000 * 60 * 10);
    return () => {
      isMounted = false;
      clearInterval(id);
    };
  }, []);

  return state;
};

