import { useParams, Link } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Helmet } from 'react-helmet-async';
import api from '../utils/api.js';
import { buildArticleSchema } from '../utils/seo.js';
import { useState } from 'react';
import { fetchArticleBySlug } from '../utils/articleService.js';

const ArticlePage = () => {
  const { slug } = useParams();
  const queryClient = useQueryClient();
  const [commentForm, setCommentForm] = useState({ username: '', text: '' });

  const { data: article, isLoading } = useQuery({
    queryKey: ['article', slug],
    queryFn: () => fetchArticleBySlug(slug)
  });

  const isLocalArticle =
    !article ||
    article._id?.toString().startsWith('demo-') ||
    article._id?.toString().startsWith('local-');

  const { data: comments } = useQuery({
    queryKey: ['comments', article?._id],
    enabled: Boolean(article?._id) && !isLocalArticle,
    queryFn: async () => {
      try {
        const response = await api.get(`/comments/public/${article._id}`);
        return response.data || [];
      } catch (err) {
        return [];
      }
    }
  });

  const commentMutation = useMutation({
    mutationFn: async (payload) => {
      if (isLocalArticle) {
        throw new Error('Offline articles do not support comments.');
      }
      return api.post(`/comments/${article._id}`, payload);
    },
    onSuccess: () => {
      setCommentForm({ username: '', text: '' });
      queryClient.invalidateQueries(['comments', article._id]);
    }
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white">
        <div className="container-custom py-12">
          <div className="max-w-3xl mx-auto space-y-6">
            <div className="h-12 bg-gray-200 animate-pulse rounded w-3/4" />
            <div className="h-96 bg-gray-200 animate-pulse rounded" />
            <div className="space-y-4">
              <div className="h-4 bg-gray-200 animate-pulse rounded" />
              <div className="h-4 bg-gray-200 animate-pulse rounded w-5/6" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!article) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center p-12 bg-gray-50 rounded-lg max-w-md">
          <div className="text-6xl mb-6">📄</div>
          <h2 className="text-3xl font-bold text-gray-900 mb-4 font-serif">Article Not Found</h2>
          <p className="text-gray-600 mb-8">The article you're looking for doesn't exist.</p>
          <Link to="/" className="btn-bbc inline-block">
            Go Back Home
          </Link>
        </div>
      </div>
    );
  }

  const date = new Date(article.publishedAt || article.createdAt || Date.now());

  return (
    <article className="min-h-screen bg-white">
      <Helmet>
        <title>{article.title} | Sasta Morning Glory</title>
        <meta name="description" content={article.metaDescription} />
        <script type="application/ld+json">{JSON.stringify(buildArticleSchema(article))}</script>
      </Helmet>

      <div className="container-custom py-8">
        {/* Breadcrumb - BBC Style */}
        <nav className="mb-6 text-sm">
          <div className="flex items-center space-x-2 text-gray-600">
            <Link to="/" className="hover:text-bbc-red hover:underline transition-colors">Home</Link>
            <span>/</span>
            <Link
              to={`/category/${article.category?.toLowerCase().replace(/\s+/g, '-')}`}
              className="hover:text-bbc-red hover:underline transition-colors"
            >
              {article.category}
            </Link>
            <span>/</span>
            <span className="text-gray-900 font-medium line-clamp-1">{article.title}</span>
          </div>
        </nav>

        <div className="max-w-3xl mx-auto">
          {/* Article Header - BBC Style */}
          <header className="mb-8">
            <span className="inline-block bg-bbc-red text-white px-4 py-1 text-sm font-bold uppercase tracking-wide mb-4">
              {article.category}
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight font-serif">
              {article.title}
            </h1>
            
            <div className="flex flex-wrap items-center gap-4 text-gray-600 border-t border-b border-gray-200 py-4">
              <div className="flex items-center space-x-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                <span className="font-semibold">{article.author || 'Editorial Team'}</span>
              </div>
              <span>•</span>
              <time className="flex items-center space-x-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <span>{date.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
              </time>
              {article.tags && article.tags.length > 0 && (
                <>
                  <span>•</span>
                  <div className="flex flex-wrap gap-2">
                    {article.tags.slice(0, 3).map((tag, i) => (
                      <span key={i} className="text-xs bg-gray-200 px-2 py-1 rounded text-gray-700">
                        #{tag}
                      </span>
                    ))}
                  </div>
                </>
              )}
            </div>
          </header>

          {/* Hero Image - BBC Style */}
          {article.heroImageUrl && (
            <div className="mb-8">
              <img
                src={article.heroImageUrl}
                alt={article.title}
                className="w-full h-auto object-cover"
              />
            </div>
          )}

          {/* Video Embed */}
          {article.youtubeId && (
            <div className="mb-8 aspect-video bg-black rounded overflow-hidden">
              <iframe
                title={article.title}
                src={`https://www.youtube.com/embed/${article.youtubeId}`}
                className="w-full h-full"
                allowFullScreen
              />
            </div>
          )}

          {article.videoUrl && !article.youtubeId && (
            <div className="mb-8">
              <video controls src={article.videoUrl} className="w-full rounded">
                Your browser does not support HTML5 video.
              </video>
            </div>
          )}

          {/* Article Content - BBC Style */}
          <div
            className="prose prose-lg max-w-none mb-12 article-content text-gray-900"
            dangerouslySetInnerHTML={{ __html: article.content }}
            style={{
              fontFamily: 'Georgia, serif',
              fontSize: '1.125rem',
              lineHeight: '1.8'
            }}
          />

          {/* Inline Ad - BBC Style */}
          <div className="my-12 bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
            <span className="text-sm text-gray-500 font-medium">Advertisement</span>
          </div>

          {/* Share Section - BBC Style */}
          <div className="flex items-center space-x-4 py-6 border-t border-b border-gray-200 mb-12">
            <span className="font-semibold text-gray-700 uppercase text-sm tracking-wide">Share this article</span>
            <div className="flex items-center space-x-3">
              <button className="p-2 bg-[#1877F2] text-white rounded-full hover:bg-[#1565C0] transition-colors" aria-label="Share on Facebook">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </button>
              <button className="p-2 bg-[#1DA1F2] text-white rounded-full hover:bg-[#1a91da] transition-colors" aria-label="Share on Twitter">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                </svg>
              </button>
              <button className="p-2 bg-[#0A66C2] text-white rounded-full hover:bg-[#09548c] transition-colors" aria-label="Share on LinkedIn">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
              </button>
            </div>
          </div>

          {/* Comments Section - BBC Style */}
          <section className="bg-gray-50 rounded-lg p-8 border border-gray-200">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 font-serif">Comments</h2>

            {/* Comment Form */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (commentForm.username && commentForm.text && !isLocalArticle) {
                  commentMutation.mutate(commentForm);
                }
              }}
              className="mb-8 space-y-4"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Your name"
                  value={commentForm.username}
                  onChange={(e) => setCommentForm({ ...commentForm, username: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded focus:ring-2 focus:ring-bbc-red focus:border-transparent outline-none transition"
                  required
                  disabled={isLocalArticle}
                />
              </div>
              <textarea
                placeholder="Share your thoughts..."
                value={commentForm.text}
                onChange={(e) => setCommentForm({ ...commentForm, text: e.target.value })}
                rows={4}
                className="w-full px-4 py-3 border border-gray-300 rounded focus:ring-2 focus:ring-bbc-red focus:border-transparent outline-none transition resize-none"
                required
                disabled={isLocalArticle}
              />
              <button
                type="submit"
                disabled={commentMutation.isLoading || isLocalArticle}
                className="btn-bbc disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {commentMutation.isLoading ? 'Submitting...' : 'Post Comment'}
              </button>
              {isLocalArticle && (
                <p className="text-sm text-gray-500">
                  Comments are disabled while you are viewing demo/offline articles.
                </p>
              )}
              {commentMutation.isSuccess && !isLocalArticle && (
                <p className="text-green-600 text-sm font-medium">
                  ✓ Your comment has been submitted and is awaiting approval.
                </p>
              )}
            </form>

            {/* Comments List */}
            <div className="space-y-6 border-t border-gray-200 pt-6">
              {comments && comments.length > 0 ? (
                comments.map((comment) => (
                  <div key={comment._id} className="border-b border-gray-200 pb-6 last:border-0">
                    <div className="flex items-center space-x-3 mb-3">
                      <div className="w-10 h-10 bg-bbc-red rounded-full flex items-center justify-center text-white font-bold">
                        {comment.username.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <strong className="text-gray-900 font-semibold">{comment.username}</strong>
                        <time className="text-gray-500 text-sm ml-3">
                          {new Date(comment.createdAt).toLocaleDateString('en-GB', {
                            day: 'numeric',
                            month: 'long',
                            year: 'numeric',
                            hour: 'numeric',
                            minute: '2-digit'
                          })}
                        </time>
                      </div>
                    </div>
                    <p className="text-gray-700 ml-13 leading-relaxed">{comment.text}</p>
                  </div>
                ))
              ) : (
                <p className="text-gray-500 text-center py-8">No comments yet. Be the first to comment!</p>
              )}
            </div>
          </section>
        </div>
      </div>
    </article>
  );
};

export default ArticlePage;
