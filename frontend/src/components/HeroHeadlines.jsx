import { Link } from 'react-router-dom';

const WeatherMiniCard = ({ weather }) => {
  if (!weather) {
    return (
      <div className="toi-weather-mini">
        <p>Loading...</p>
      </div>
    );
  }

  const { status, data, error } = weather;

  if (status === 'error') {
    return (
      <div className="toi-weather-mini">
        <p className="toi-muted">Weather unavailable: {error}</p>
        <Link to="/weather" className="toi-link">
          Check dashboard →
        </Link>
      </div>
    );
  }

  if (status === 'loading' || !data) {
    return (
      <div className="toi-weather-mini">
        <p>Locating you...</p>
      </div>
    );
  }

  return (
    <div className="toi-weather-mini">
      <div className="toi-weather-header">
        <div>
          <p className="toi-label">Your Weather</p>
          <h3>{data.location}</h3>
        </div>
        <div className="toi-weather-temp">
          <span>{Math.round(data.current.temperature)}°</span>
          <small>{Math.round(data.current.windspeed)} km/h wind</small>
        </div>
      </div>
      <div className="toi-weather-meta">
        <span>Feels like {Math.round(data.hourly?.apparent_temperature?.[0] ?? data.current.temperature)}°</span>
        <span>AQI {data.air?.aqi ?? '—'}</span>
      </div>
      <Link to="/weather" className="toi-weather-cta">
        Full forecast →
      </Link>
    </div>
  );
};

const ForexMiniCard = ({ forex }) => {
  if (!forex || forex.status !== 'success' || !forex.data) {
    return (
      <div className="toi-forex-card">
        <p className="toi-label">Markets</p>
        <p className="toi-muted">Watching INR basket...</p>
      </div>
    );
  }

  const rateEntries = Object.entries(forex.data.rates || {});
  if (!rateEntries.length) {
    return (
      <div className="toi-forex-card">
        <p className="toi-label">Markets</p>
        <p className="toi-muted">Forex feed unavailable right now.</p>
      </div>
    );
  }

  const previewEntries = rateEntries.slice(0, 4);

  return (
    <div className="toi-forex-card">
      <div className="toi-forex-header">
        <p className="toi-label">Markets</p>
        <span>{forex.data.date}</span>
      </div>
      <ul>
        {previewEntries.map(([symbol, value]) => (
          <li key={symbol}>
            <strong>1 {symbol}</strong>
            <span>₹{(1 / value).toFixed(2)}</span>
          </li>
        ))}
      </ul>
      <Link to="/markets" className="toi-rail-button">
        Open markets hub
      </Link>
    </div>
  );
};

const TrendingMiniCard = ({ trending = [] }) => {
  if (!trending.length) return null;
  return (
    <div className="toi-trending-mini">
      <p className="toi-label">Trending Topics</p>
      <ul>
        {trending.map((tag) => (
          <li key={tag.label}>
            <span>#{tag.label}</span>
            <small>{tag.count} stories</small>
          </li>
        ))}
      </ul>
    </div>
  );
};

const HeroHeadlines = ({
  featured = [],
  secondary = [],
  weather,
  forex,
  trending = []
}) => {
  if (!featured || featured.length === 0) return null;

  const mainArticle = featured[0];
  const mainDate = new Date(mainArticle.publishedAt || mainArticle.createdAt || Date.now());
  const additionalHeadlines = [...featured.slice(1), ...secondary].slice(0, 8);
  const videoHighlight = [...featured, ...secondary].find(
    (article) => article.youtubeId || article.videoUrl
  );

  return (
    <section className="toi-frontpage">
      <div className="container-custom">
        <div className="toi-frontpage-grid">
          <div className="toi-left-rail">
            <WeatherMiniCard weather={weather} />
            <ForexMiniCard forex={forex} />
            <TrendingMiniCard trending={trending} />
          </div>

          <article className="toi-main-headline">
            <Link to={`/article/${mainArticle.slug}`}>
              <div className="toi-main-media">
                {mainArticle.heroImageUrl ? (
                  <img src={mainArticle.heroImageUrl} alt={mainArticle.title} />
                ) : (
                  <div className="toi-main-placeholder">Image coming soon</div>
                )}
              </div>
              <div className="toi-main-body">
                <span className="toi-main-pill">{mainArticle.category}</span>
                <h1>{mainArticle.title}</h1>
                <p>{mainArticle.metaDescription}</p>
                <div className="toi-main-meta">
                  <span>{mainArticle.author || 'Editorial Desk'}</span>
                  <span>•</span>
                  <time>
                    {mainDate.toLocaleDateString('en-GB', {
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric'
                    })}
                  </time>
                </div>
              </div>
            </Link>
          </article>

          <div className="toi-headline-feed">
            <div className="toi-section-label">In The News</div>
            {additionalHeadlines.map((article) => (
              <Link key={article._id} to={`/article/${article.slug}`} className="toi-headline-item">
                <div>
                  <span>{article.category}</span>
                  <h3>{article.title}</h3>
                </div>
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M9 5l7 7-7 7" stroke="currentColor" strokeWidth="2" fill="none" />
                </svg>
              </Link>
            ))}
          </div>

          <aside className="toi-right-rail">
            <div className="toi-rail-card">
              <div className="toi-rail-card-header">
                <span>Daily Puzzles</span>
                <small>New</small>
              </div>
              <ul>
                <li>Connect • The Perfect Trace</li>
                <li>Loop the Loop • Puzzle Circuit</li>
                <li>Location Guesser • Guess the Spot</li>
              </ul>
            <Link to="/puzzles" className="toi-rail-button">
              Play puzzles
            </Link>
            </div>

            {videoHighlight && (
              <div className="toi-rail-card">
                <div className="toi-rail-card-header">
                  <span>Featured Video</span>
                </div>
                {videoHighlight.youtubeId ? (
                  <div className="toi-video-wrapper">
                    <iframe
                      title={videoHighlight.title}
                      src={`https://www.youtube.com/embed/${videoHighlight.youtubeId}`}
                      allowFullScreen
                    />
                  </div>
                ) : (
                  videoHighlight.heroImageUrl && (
                    <img src={videoHighlight.heroImageUrl} alt={videoHighlight.title} />
                  )
                )}
                <p className="toi-video-title">{videoHighlight.title}</p>
              </div>
            )}
          </aside>
        </div>
      </div>
    </section>
  );
};

export default HeroHeadlines;
