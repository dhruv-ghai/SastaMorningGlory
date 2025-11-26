import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import ArticleCard from '../components/ArticleCard.jsx';
import { fetchArticles } from '../utils/articleService.js';

const slugToName = (slug) => {
  const mapping = {
    'jammu-kashmir': 'Jammu & Kashmir',
    'national': 'National',
    'international': 'International',
    'politics': 'Politics',
    'business': 'Business',
    'technology': 'Technology',
    'entertainment': 'Entertainment',
    'sports': 'Sports'
  };
  return mapping[slug] || slug.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());
};

const CategoryPage = () => {
  const { slug } = useParams();
  const category = slugToName(slug);

  const { data = [], isLoading } = useQuery({
    queryKey: ['category', category],
    queryFn: () => fetchArticles({ category, limit: 40 })
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white">
        <div className="container-custom py-12">
          <div className="space-y-6">
            <div className="h-12 bg-gray-200 animate-pulse rounded w-1/3" />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-0">
              {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                <div key={i} className="h-64 bg-gray-200 animate-pulse border-r border-gray-200 last:border-r-0" />
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="container-custom py-8">
        {/* Category Header - BBC Style */}
        <div className="mb-8 pb-4 border-b-4 border-bbc-red">
          <nav className="mb-4 text-sm text-gray-600">
            <div className="flex items-center space-x-2">
              <Link to="/" className="hover:text-bbc-red hover:underline transition-colors">Home</Link>
              <span>/</span>
              <span className="text-gray-900 font-medium">{category}</span>
            </div>
          </nav>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 uppercase tracking-tight font-serif">
            {category}
          </h1>
          <p className="text-gray-600 mt-2">Latest news and updates from {category}</p>
        </div>

        {/* Articles Grid - BBC Style */}
        {data && data.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-0 border-t border-l border-gray-200">
            {data.map((article, index) => (
              <div key={article._id || article.slug || index} className="border-r border-b border-gray-200">
                <ArticleCard article={article} />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-gray-50 rounded-lg border border-gray-200">
            <div className="text-6xl mb-6">📰</div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4 font-serif">No Articles Found</h2>
            <p className="text-gray-600 mb-8 max-w-md mx-auto">
              There are no articles in this category yet. Check back later for updates.
            </p>
            <Link to="/" className="btn-bbc inline-block">
              Go Back Home
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoryPage;
