import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useForexRates } from '../hooks/useForexRates.js';
import { useMarketTickers } from '../hooks/useMarketTickers.js';
import { useNewsFeed } from '../hooks/useNewsFeed.js';

const formatChange = (value) => {
  if (typeof value !== 'number') return '—';
  return `${value > 0 ? '+' : ''}${value.toFixed(2)}%`;
};

const Markets = () => {
  const forex = useForexRates();
  const tickers = useMarketTickers();
  const news = useNewsFeed('business');
  const [showAllForex, setShowAllForex] = useState(false);
  const [showAllTickers, setShowAllTickers] = useState(false);

  const forexEntries =
    forex.status === 'success' && forex.data?.rates
      ? Object.entries(forex.data.rates || {})
      : [];
  const visibleForex = showAllForex ? forexEntries : forexEntries.slice(0, 4);
  const tickerList = tickers.tickers || [];
  const visibleTickers = showAllTickers ? tickerList : tickerList.slice(0, 4);

  return (
    <div className="market-page">
      <div className="container-custom">
        <div className="market-page-header">
          <div>
            <p className="market-kicker">Live Markets Hub</p>
            <h1>Snapshot of currencies, digital assets & business news</h1>
            <p className="market-subtitle">
              Track INR forex pairs, quick crypto prices and curated business headlines updated
              through free public APIs.
            </p>
          </div>
          <Link to="/" className="market-back-link">
            ← Back to Newsroom
          </Link>
        </div>

        <div className="market-grid">
          <div className="market-card">
            <div className="market-card-header">
              <div>
                <p className="market-label">Forex Watchlist</p>
                <h2>Rupee crosses</h2>
              </div>
              <small>{forex.data?.date || 'auto-refreshing'}</small>
            </div>
            {forex.status === 'loading' && <p>Loading live forex...</p>}
            {forex.status === 'error' && (
              <p className="market-muted">Forex feed unavailable: {forex.error}</p>
            )}
            {visibleForex.length > 0 && (
              <ul className="market-forex-list">
                {visibleForex.map(([symbol, value]) => (
                  <li key={symbol}>
                    <div>
                      <strong>{symbol}</strong>
                      <span>1 {symbol}</span>
                    </div>
                    <span className="market-forex-value">₹{(1 / value).toFixed(2)}</span>
                  </li>
                ))}
              </ul>
            )}
            {forexEntries.length > 4 && (
              <button
                type="button"
                className="market-refresh-btn"
                onClick={() => setShowAllForex((prev) => !prev)}
              >
                {showAllForex ? 'Show fewer pairs' : 'Show all pairs'}
              </button>
            )}
          </div>

          <div className="market-card">
            <div className="market-card-header">
              <div>
                <p className="market-label">Digital Assets</p>
                <h2>Crypto Topline</h2>
              </div>
              <button
                type="button"
                className="market-refresh-btn"
                onClick={() => window.location.reload()}
              >
                Refresh
              </button>
            </div>
            {tickers.status === 'loading' && <p>Fetching tickers...</p>}
            {tickers.status === 'error' && (
              <p className="market-muted">Ticker feed unavailable: {tickers.error}</p>
            )}
            {tickers.status === 'success' && (
              <div className="market-ticker-grid">
                {visibleTickers.map((ticker) => (
                  <div key={ticker.symbol} className="market-ticker-card">
                    <span className="market-ticker-symbol">{ticker.symbol.toUpperCase()}</span>
                    <strong>₹{ticker.inr?.toLocaleString(undefined, { maximumFractionDigits: 0 })}</strong>
                    <small>
                      ${ticker.usd?.toLocaleString(undefined, { maximumFractionDigits: 0 })}{' '}
                      <span className={ticker.change >= 0 ? 'text-green' : 'text-red'}>
                        {formatChange(ticker.change)}
                      </span>
                    </small>
                  </div>
                ))}
              </div>
            )}
            {tickerList.length > 4 && (
              <button
                type="button"
                className="market-refresh-btn"
                onClick={() => setShowAllTickers((prev) => !prev)}
                style={{ marginTop: '1rem' }}
              >
                {showAllTickers ? 'Show fewer assets' : 'Show all assets'}
              </button>
            )}
          </div>

          <div className="market-card market-card-news">
            <div className="market-card-header">
              <div>
                <p className="market-label">Business Headlines</p>
                <h2>From the wire</h2>
              </div>
            </div>
            {news.status === 'loading' && <p>Syncing latest stories...</p>}
            {news.status === 'error' && (
              <p className="market-muted">News feed error: {news.error}</p>
            )}
            {news.status === 'success' && (
              <ul>
                {news.stories.slice(0, 6).map((story) => (
                  <li key={story.id}>
                    <a href={story.externalUrl} target="_blank" rel="noopener noreferrer">
                      <h3>{story.title}</h3>
                      <p>{story.description}</p>
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Markets;

