import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import AdminSidebar from '../components/AdminSidebar.jsx';
import { fetchArticles, removeArticle } from '../utils/articleService.js';

const AdminArticles = () => {
  const queryClient = useQueryClient();
  const { data = [], isLoading } = useQuery({
    queryKey: ['admin-articles'],
    queryFn: () => fetchArticles({ limit: 120 })
  });

  const deleteMutation = useMutation({
    mutationFn: (id) => removeArticle(id),
    onSuccess: () => queryClient.invalidateQueries(['admin-articles'])
  });

  const handleDelete = (id, title) => {
    if (window.confirm(`Are you sure you want to delete "${title}"?`)) {
      deleteMutation.mutate(id);
    }
  };

  const isDemoMode =
    data.length > 0 &&
    data.every((article) => article._id?.startsWith('demo-') || article._id?.startsWith('local-'));

  return (
    <div className="admin-layout">
      <AdminSidebar />
      <div className="admin-content">
        <div style={{maxWidth: '1280px', margin: '0 auto'}}>
          <div className="admin-page-header" style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2rem'}}>
            <div>
              <h1 className="admin-page-title">Articles</h1>
              <p className="admin-page-subtitle">Manage all your articles</p>
            </div>
            <Link to="/admin/articles/new" className="admin-btn-primary" style={{display: 'inline-flex', alignItems: 'center', gap: '0.5rem', textDecoration: 'none'}}>
              <span>+</span>
              <span>New Article</span>
            </Link>
          </div>

          {isDemoMode && (
            <div className="admin-offline-banner">
              <strong>Demo mode:</strong> You are editing locally stored articles. Start the backend to sync with the server.
            </div>
          )}

          {isLoading ? (
            <div className="admin-table-container" style={{padding: '2rem'}}>
              <div className="loading-skeleton" style={{height: '4rem', marginBottom: '1rem'}}></div>
              <div className="loading-skeleton" style={{height: '4rem', marginBottom: '1rem'}}></div>
              <div className="loading-skeleton" style={{height: '4rem'}}></div>
            </div>
          ) : data && data.length > 0 ? (
            <div className="admin-table-container">
              <div style={{overflowX: 'auto'}}>
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>Title</th>
                      <th>Category</th>
                      <th>Published</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.map((article) => (
                      <tr key={article._id}>
                        <td>
                          <div style={{display: 'flex', alignItems: 'center', gap: '0.75rem'}}>
                            {article.thumbnailUrl && (
                              <img
                                src={article.thumbnailUrl}
                                alt={article.title}
                                style={{width: '4rem', height: '4rem', objectFit: 'cover', borderRadius: '0.5rem'}}
                              />
                            )}
                            <div>
                              <Link
                                to={`/article/${article.slug}`}
                                target="_blank"
                                style={{fontWeight: '600', color: '#1a1a1a', textDecoration: 'none'}}
                                onMouseEnter={(e) => e.target.style.color = '#BB0A21'}
                                onMouseLeave={(e) => e.target.style.color = '#1a1a1a'}
                              >
                                {article.title}
                              </Link>
                              {article.metaDescription && (
                                <p style={{fontSize: '0.875rem', color: '#666666', marginTop: '0.25rem', maxWidth: '400px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap'}}>
                                  {article.metaDescription}
                                </p>
                              )}
                            </div>
                          </div>
                        </td>
                        <td>
                          <span className="admin-badge admin-badge-red">{article.category}</span>
                        </td>
                        <td style={{fontSize: '0.875rem', color: '#666666'}}>
                          {new Date(article.publishedAt || article.createdAt || Date.now()).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric',
                            year: 'numeric'
                          })}
                        </td>
                        <td>
                          <div className="admin-table-actions">
                            <Link
                              to={`/admin/articles/new?id=${article._id}`}
                              className="admin-btn-edit"
                              style={{textDecoration: 'none'}}
                            >
                              Edit
                            </Link>
                            <button
                              onClick={() => handleDelete(article._id, article.title)}
                              disabled={deleteMutation.isLoading}
                              className="admin-btn-delete"
                            >
                              Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ) : (
            <div className="admin-empty-state">
              <div className="admin-empty-icon">📰</div>
              <h2 className="admin-empty-title">No Articles Yet</h2>
              <p className="admin-empty-text">Get started by creating your first article.</p>
              <Link to="/admin/articles/new" className="admin-btn-primary" style={{display: 'inline-block', textDecoration: 'none', width: 'auto', padding: '0.75rem 2rem'}}>
                Create First Article
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminArticles;
