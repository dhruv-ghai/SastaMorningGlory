import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import HeroHeadlines from '../components/HeroHeadlines.jsx';
import CategorySection from '../components/CategorySection.jsx';
import { fetchArticles } from '../utils/articleService.js';
import { useWeather } from '../hooks/useWeather.js';
import { useForexRates } from '../hooks/useForexRates.js';
import { useNewsFeed } from '../hooks/useNewsFeed.js';
import { useRedditFeed } from '../hooks/useRedditFeed.js';
import '../styles/global.css';

const categoryOrder = [
  'National',
  'International',
  'Jammu & Kashmir',
  'Politics',
  'Business',
  'Technology',
  'Entertainment',
  'Sports'
];

const buildTrendingTags = (articles) => {
  const map = new Map();
  articles.forEach((article) => {
    (article.tags || []).forEach((tag) => {
      map.set(tag, (map.get(tag) || 0) + 1);
    });
  });
  return Array.from(map.entries())
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([label, count]) => ({ label, count }));
};

const Home = () => {
  const { data = [], isLoading, error } = useQuery({
    queryKey: ['articles'],
    queryFn: () => fetchArticles({ limit: 80 })
  });
  const weather = useWeather();
  const forex = useForexRates();
  const newsFeed = useNewsFeed('all');
  const redditFeed = useRedditFeed('popular', 'hot');

  if (isLoading) {
    return (
      <div style={{minHeight: '100vh', backgroundColor: '#ffffff'}}>
        <div className="container-custom" style={{padding: '2rem 0'}}>
          <div style={{display: 'flex', flexDirection: 'column', gap: '2rem'}}>
            <div className="loading-skeleton" style={{height: '500px'}}></div>
            <div className="loading-skeleton" style={{height: '200px'}}></div>
            <div className="loading-skeleton" style={{height: '200px'}}></div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !data || data.length === 0) {
    return (
      <div className="empty-state">
        <div className="empty-state-icon">📰</div>
        <h1 className="empty-state-title">No Articles Available</h1>
        <p className="empty-state-text">
          Articles will appear here once they're published. Make sure MongoDB is running and seed the database with demo articles.
        </p>
        <div style={{display: 'flex', flexDirection: 'column', gap: '1rem', alignItems: 'center'}}>
          <Link to="/admin/login" className="btn-bbc">
            Go to Admin Dashboard
          </Link>
          <button
            onClick={() => window.location.reload()}
            style={{
              padding: '0.625rem 1.5rem',
              backgroundColor: '#e5e5e5',
              border: 'none',
              cursor: 'pointer',
              fontWeight: '600'
            }}
          >
            Refresh
          </button>
        </div>
      </div>
    );
  }

  const featured = data.slice(0, 5);
  const secondary = data.slice(5, 12);
  const latestStories = data.slice(12, 24);
  const focusStories = data.slice(24, 34);
  const cityBeat = data.slice(34, 42);

  const articlesByCategory = categoryOrder.reduce((acc, category) => {
    acc[category] = data.filter((article) => article.category === category).slice(0, 4) || [];
    return acc;
  }, {});

  const trending = buildTrendingTags(data);

  const latestNewsItems =
    newsFeed.status === 'success' && newsFeed.stories.length > 0
      ? newsFeed.stories
      : latestStories.map((article) => ({
          id: article._id || article.slug,
          title: article.title,
          description: article.metaDescription,
          internalSlug: article.slug
        }));

  return (
    <div className="toi-home">
      <HeroHeadlines
        featured={featured}
        secondary={secondary}
        weather={weather}
        forex={forex}
        trending={trending}
      />

      <section className="toi-latest-wrapper">
        <div className="container-custom">
          <div className="toi-latest-grid">
            <div className="toi-latest-list">
              <div className="toi-section-label">Latest Updates</div>
            {latestNewsItems.map((item) => {
              const content = (
                <>
                  <div className="toi-dot"></div>
                  <div>
                    <h3>{item.title}</h3>
                    <p>{item.description}</p>
                  </div>
                </>
              );
              return item.internalSlug ? (
                <Link
                  key={item.id}
                  to={`/article/${item.internalSlug}`}
                  className="toi-latest-item"
                >
                  {content}
                </Link>
              ) : (
                <a
                  key={item.id}
                  href={item.externalUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="toi-latest-item"
                >
                  {content}
                </a>
              );
            })}
            </div>

            <div className="toi-opinion-stack">
              <div className="toi-section-label">In Focus</div>
              {focusStories.map((article) => (
                <Link
                  key={article._id}
                  to={`/article/${article.slug}`}
                  className="toi-opinion-card"
                >
                  <span className="toi-opinion-tag">{article.category}</span>
                  <h3>{article.title}</h3>
                  <p>{article.metaDescription}</p>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="toi-city-beat">
        <div className="container-custom">
          <div className="toi-section-label">City Beat</div>
          <div className="toi-city-grid">
            {cityBeat.map((article) => (
              <Link
                key={article._id}
                to={`/article/${article.slug}`}
                className="toi-city-card"
              >
                {article.thumbnailUrl && (
                  <div className="toi-city-thumb">
                    <img src={article.thumbnailUrl} alt={article.title} />
                  </div>
                )}
                <div>
                  <span>{article.category}</span>
                  <h3>{article.title}</h3>
                  <p>{article.metaDescription}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="toi-reddit-wrapper">
        <div className="container-custom">
          <div className="toi-reddit-header">
            <div>
              <div className="toi-section-label">Top Reddit</div>
              <h2>What’s trending right now</h2>
            </div>
            <a
              href="https://www.reddit.com/r/news/"
              target="_blank"
              rel="noopener noreferrer"
              className="toi-reddit-link"
            >
              Visit Reddit →
            </a>
          </div>
          {redditFeed.status === 'loading' && <p>Syncing Reddit front page…</p>}
          {redditFeed.status === 'error' && (
            <p className="toi-muted">Reddit feed unavailable: {redditFeed.error}</p>
          )}
          {redditFeed.status === 'success' && (
            <div className="toi-reddit-grid">
              {redditFeed.stories.map((story) => (
                <a
                  key={story.id}
                  href={story.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="toi-reddit-card"
                >
                  <div>
                    <span className="toi-reddit-tag">r/{story.subreddit}</span>
                    <h3>{story.title}</h3>
                  </div>
                  <div className="toi-reddit-meta">
                    <span>⬆ {story.score.toLocaleString()}</span>
                    <span>💬 {story.comments.toLocaleString()}</span>
                  </div>
                </a>
              ))}
            </div>
          )}
        </div>
      </section>

      {categoryOrder.map((category) => {
        const categoryArticles = articlesByCategory[category];
        if (!categoryArticles || categoryArticles.length === 0) return null;
        return (
          <CategorySection key={category} title={category} articles={categoryArticles} />
        );
      })}
    </div>
  );
};

export default Home;
