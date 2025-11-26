import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import AdminSidebar from '../components/AdminSidebar.jsx';
import api from '../utils/api.js';

const AdminComments = () => {
  const queryClient = useQueryClient();
  const { data, isLoading } = useQuery({
    queryKey: ['pending-comments'],
    queryFn: async () => {
      try {
        const response = await api.get('/comments/pending');
        return response.data || [];
      } catch (err) {
        console.error('Error fetching comments:', err);
        return [];
      }
    },
    refetchInterval: 30000 // Refresh every 30 seconds
  });

  const approveMutation = useMutation({
    mutationFn: (id) => api.patch(`/comments/${id}/approve`),
    onSuccess: () => {
      queryClient.invalidateQueries(['pending-comments']);
    }
  });

  const deleteMutation = useMutation({
    mutationFn: (id) => api.delete(`/comments/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries(['pending-comments']);
    }
  });

  const handleApprove = (id) => {
    approveMutation.mutate(id);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this comment?')) {
      deleteMutation.mutate(id);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <AdminSidebar />
      <div className="flex-1 p-8">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 font-serif">Comment Moderation</h1>
            <p className="text-gray-600 mt-1">Review and approve comments from readers</p>
          </div>

          {/* Comments List */}
          {isLoading ? (
            <div className="bg-white rounded-xl shadow-md p-8">
              <div className="animate-pulse space-y-6">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="h-32 bg-gray-200 rounded-lg" />
                ))}
              </div>
            </div>
          ) : data && data.length > 0 ? (
            <div className="space-y-4">
              {data.map((comment) => (
                <div
                  key={comment._id}
                  className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-red-600 to-red-800 rounded-full flex items-center justify-center text-white font-bold">
                          {comment.username?.charAt(0).toUpperCase() || '?'}
                        </div>
                        <div>
                          <div className="flex items-center space-x-2">
                            <strong className="text-gray-900 font-semibold">{comment.username}</strong>
                            <span className="text-gray-400">•</span>
                            <time className="text-sm text-gray-500">
                              {new Date(comment.createdAt).toLocaleDateString('en-US', {
                                month: 'short',
                                day: 'numeric',
                                year: 'numeric',
                                hour: 'numeric',
                                minute: '2-digit'
                              })}
                            </time>
                          </div>
                          {comment.article && (
                            <Link
                              to={`/article/${comment.article.slug}`}
                              target="_blank"
                              className="text-sm text-red-600 hover:text-red-700 font-medium"
                            >
                              On: {comment.article.title}
                            </Link>
                          )}
                        </div>
                      </div>
                      <p className="text-gray-700 ml-13 mb-4 leading-relaxed">{comment.text}</p>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center space-x-3 pt-4 border-t border-gray-200">
                    <button
                      onClick={() => handleApprove(comment._id)}
                      disabled={approveMutation.isLoading}
                      className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
                    >
                      <span>✓</span>
                      <span>Approve</span>
                    </button>
                    <button
                      onClick={() => handleDelete(comment._id)}
                      disabled={deleteMutation.isLoading}
                      className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
                    >
                      <span>✕</span>
                      <span>Delete</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-xl shadow-md p-12 text-center">
              <div className="text-6xl mb-4">💬</div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">No Pending Comments</h2>
              <p className="text-gray-600">All caught up! There are no comments waiting for approval.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminComments;
