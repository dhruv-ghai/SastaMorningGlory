import { useEffect, useState } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import AdminSidebar from '../components/AdminSidebar.jsx';
import AdminRichTextEditor from '../components/AdminRichTextEditor.jsx';
import api from '../utils/api.js';
import demoArticles from '../data/demoArticles.js';
import { saveArticle } from '../utils/articleService.js';

const categories = ['National', 'International', 'Jammu & Kashmir', 'Politics', 'Business', 'Technology', 'Entertainment', 'Sports'];
const keywordSuggestions = ['Breaking', 'Explainer', 'Live Update', 'Opinion', 'Fact Check'];
const tagSuggestions = ['Top Story', 'Verified', 'Exclusive', 'Video', 'Photo Feature'];

const AdminNewArticle = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const articleId = new URLSearchParams(location.search).get('id');
  const [form, setForm] = useState({
    title: '',
    category: categories[0],
    author: 'Editorial Team',
    content: '',
    metaDescription: '',
    keywords: '',
    tags: '',
    videoUrl: '',
    youtubeId: ''
  });
  const [thumbnail, setThumbnail] = useState(null);
  const [heroImage, setHeroImage] = useState(null);
  const [thumbnailPreview, setThumbnailPreview] = useState('');
  const [heroImagePreview, setHeroImagePreview] = useState('');
  const [thumbnailDataUrl, setThumbnailDataUrl] = useState('');
  const [heroImageDataUrl, setHeroImageDataUrl] = useState('');
  const [showPreview, setShowPreview] = useState(false);

  const { data: article, isLoading: loadingArticle } = useQuery({
    queryKey: ['admin-article', articleId],
    enabled: Boolean(articleId),
    queryFn: async () => {
      try {
        const response = await api.get(`/articles/${articleId}`);
        return response.data;
      } catch (err) {
        if (articleId.startsWith('demo-')) {
          return demoArticles.find((item) => item._id === articleId);
        }
        throw err;
      }
    }
  });

  useEffect(() => {
    if (article) {
      setForm((prev) => ({
        ...prev,
        ...article,
        keywords: article.keywords?.join(', ') || '',
        tags: article.tags?.join(', ') || ''
      }));
      setThumbnailPreview(article.thumbnailUrl || '');
      setHeroImagePreview(article.heroImageUrl || '');
      setThumbnailDataUrl(article.thumbnailUrl || '');
      setHeroImageDataUrl(article.heroImageUrl || '');
    }
  }, [article]);

  const handleThumbnailChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setThumbnail(file);
      const objectUrl = URL.createObjectURL(file);
      setThumbnailPreview(objectUrl);
      const reader = new FileReader();
      reader.onloadend = () => setThumbnailDataUrl(reader.result?.toString() || '');
      reader.readAsDataURL(file);
    }
  };

  const handleHeroImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setHeroImage(file);
      const objectUrl = URL.createObjectURL(file);
      setHeroImagePreview(objectUrl);
      const reader = new FileReader();
      reader.onloadend = () => setHeroImageDataUrl(reader.result?.toString() || '');
      reader.readAsDataURL(file);
    }
  };

  const generateSlug = (title) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
  };

  const buildPayload = () => {
    const keywordList = form.keywords.split(',').map((k) => k.trim()).filter(Boolean);
    const tagList = form.tags.split(',').map((k) => k.trim()).filter(Boolean);
    const slugValue = form.slug || generateSlug(form.title);

    const baseDraft = {
      ...form,
      slug: slugValue,
      keywords: keywordList,
      tags: tagList,
      thumbnailUrl: thumbnailDataUrl || form.thumbnailUrl || '',
      heroImageUrl: heroImageDataUrl || form.heroImageUrl || ''
    };

    const data = new FormData();
    Object.entries({
      ...form,
      slug: slugValue,
      keywords: keywordList,
      tags: tagList
    }).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        value.forEach((entry) => data.append(`${key}[]`, entry));
      } else if (value !== undefined && value !== null && value !== '') {
        data.append(key, value);
      }
    });

    if (thumbnail) data.append('thumbnail', thumbnail);
    if (heroImage) data.append('heroImage', heroImage);

    return { draft: baseDraft, formData: data };
  };

  const mutation = useMutation({
    mutationFn: () => {
      const payload = buildPayload();
      return saveArticle({ articleId, ...payload });
    },
    onSuccess: ({ source }) => {
      queryClient.invalidateQueries(['admin-articles']);
      if (source === 'local') {
        alert('Saved locally. Changes will sync when the backend is online.');
      }
      navigate('/admin/articles');
    }
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    mutation.mutate();
  };

  const handleChipInsert = (field, value) => {
    setForm((prev) => {
      const existing = prev[field] ? prev[field].split(',').map((item) => item.trim()).filter(Boolean) : [];
      if (existing.includes(value)) return prev;
      const next = [...existing, value].join(', ');
      return { ...prev, [field]: next };
    });
  };

  const slugPreview = form.title ? generateSlug(form.title) : 'your-article-title';

  if (loadingArticle) {
    return (
      <div className="flex min-h-screen bg-gray-50">
        <AdminSidebar />
        <div className="flex-1 p-8">
          <div className="animate-pulse">Loading article...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      <AdminSidebar />
      <div className="flex-1 p-8">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <Link to="/admin/articles" className="text-gray-600 hover:text-red-600 mb-4 inline-flex items-center space-x-1">
              <span>←</span>
              <span>Back to Articles</span>
            </Link>
            <h1 className="text-3xl font-bold text-gray-900 font-serif">
              {articleId ? 'Edit Article' : 'Create New Article'}
            </h1>
            <p className="text-gray-600 mt-1">Write and publish your news article</p>
          </div>

          <form onSubmit={handleSubmit} className="admin-article-form space-y-6">
            <section className="admin-form-section">
              <div className="admin-form-section-header">
                <div>
                  <p className="admin-form-eyebrow">Story basics</p>
                  <h2>Headline & authorship</h2>
                </div>
                <p className="admin-form-muted">Give the piece a compelling headline and choose a category.</p>
              </div>
              <div className="admin-form-stack">
                <div>
                  <label>Article Title *</label>
                  <input
                    type="text"
                    value={form.title}
                    onChange={(e) => setForm({ ...form, title: e.target.value })}
                    placeholder="Enter article title..."
                    required
                  />
                  <p className="admin-slug-preview">Slug preview: /article/{slugPreview}</p>
                </div>
                <div className="admin-form-grid-two">
                  <div>
                    <label>Category *</label>
                    <select
                      value={form.category}
                      onChange={(e) => setForm({ ...form, category: e.target.value })}
                    >
                      {categories.map((category) => (
                        <option key={category} value={category}>
                          {category}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label>Author *</label>
                    <input
                      type="text"
                      value={form.author}
                      onChange={(e) => setForm({ ...form, author: e.target.value })}
                      placeholder="Author name"
                      required
                    />
                  </div>
                </div>
              </div>
            </section>

            <section className="admin-form-section">
              <div className="admin-form-section-header">
                <div>
                  <p className="admin-form-eyebrow">SEO & labelling</p>
                  <h2>Metadata toolkit</h2>
                </div>
                <p className="admin-form-muted">Add search snippets and reusable newsroom tags.</p>
              </div>
              <div className="admin-form-stack">
                <div>
                  <label>Meta Description</label>
                  <textarea
                    value={form.metaDescription}
                    onChange={(e) => setForm({ ...form, metaDescription: e.target.value })}
                    rows={3}
                    placeholder="Brief description for SEO..."
                  />
                </div>
                <div className="admin-form-grid-two">
                  <div>
                    <label>Keywords</label>
                    <input
                      type="text"
                      value={form.keywords}
                      onChange={(e) => setForm({ ...form, keywords: e.target.value })}
                      placeholder="keyword1, keyword2, keyword3"
                    />
                    <div className="admin-chip-row">
                      {keywordSuggestions.map((keyword) => (
                        <button
                          key={keyword}
                          type="button"
                          className="admin-chip"
                          onClick={() => handleChipInsert('keywords', keyword)}
                        >
                          {keyword}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label>Tags</label>
                    <input
                      type="text"
                      value={form.tags}
                      onChange={(e) => setForm({ ...form, tags: e.target.value })}
                      placeholder="tag1, tag2, tag3"
                    />
                    <div className="admin-chip-row">
                      {tagSuggestions.map((tag) => (
                        <button
                          key={tag}
                          type="button"
                          className="admin-chip"
                          onClick={() => handleChipInsert('tags', tag)}
                        >
                          {tag}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <section className="admin-form-section">
              <div className="admin-form-section-header">
                <div>
                  <p className="admin-form-eyebrow">Media & embeds</p>
                  <h2>Hero imagery, video and thumbnail</h2>
                </div>
                <p className="admin-form-muted">Upload visuals and optional video embeds for the story.</p>
              </div>
              <div className="admin-form-grid-two">
                <div>
                  <label>Video URL</label>
                  <input
                    type="url"
                    value={form.videoUrl}
                    onChange={(e) => setForm({ ...form, videoUrl: e.target.value })}
                    placeholder="https://..."
                  />
                </div>
                <div>
                  <label>YouTube Video ID</label>
                  <input
                    type="text"
                    value={form.youtubeId}
                    onChange={(e) => setForm({ ...form, youtubeId: e.target.value })}
                    placeholder="dQw4w9WgXcQ"
                  />
                </div>
              </div>
              <div className="admin-form-grid-two">
                <div>
                  <label>Thumbnail Image</label>
                  <div className="admin-upload-tile">
                    <input type="file" accept="image/*" onChange={handleThumbnailChange} />
                    <span>Drop JPG/PNG</span>
                  </div>
                  {thumbnailPreview && (
                    <img src={thumbnailPreview} alt="Thumbnail preview" className="admin-upload-preview" />
                  )}
                </div>
                <div>
                  <label>Hero Image</label>
                  <div className="admin-upload-tile">
                    <input type="file" accept="image/*" onChange={handleHeroImageChange} />
                    <span>Drop wide hero</span>
                  </div>
                  {heroImagePreview && (
                    <img src={heroImagePreview} alt="Hero preview" className="admin-upload-preview tall" />
                  )}
                </div>
              </div>
            </section>

            <section className="admin-form-section">
              <div className="admin-form-section-header">
                <div>
                  <p className="admin-form-eyebrow">Story body</p>
                  <h2>Compose the article</h2>
                </div>
                <p className="admin-form-muted">Write or paste rich HTML content. Use Preview to check layouts.</p>
              </div>
              <div>
                <label>Article Content *</label>
                <AdminRichTextEditor value={form.content} onChange={(value) => setForm({ ...form, content: value })} />
                <p className="text-xs text-gray-500 mt-2">
                  You can use HTML tags for formatting. Use &lt;p&gt; for paragraphs, &lt;h2&gt; for headings, etc.
                </p>
              </div>
            </section>

            {/* Action Buttons */}
            <div className="flex items-center space-x-4">
              <button
                type="submit"
                disabled={mutation.isLoading}
                className="bg-red-600 hover:bg-red-700 text-white font-semibold px-8 py-3 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {mutation.isLoading ? 'Saving...' : articleId ? 'Update Article' : 'Publish Article'}
              </button>
              <button
                type="button"
                onClick={() => setShowPreview((prev) => !prev)}
                className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold px-8 py-3 rounded-lg transition-colors duration-200"
              >
                {showPreview ? 'Hide Preview' : 'Preview Article'}
              </button>
            </div>
          </form>

          {/* Preview */}
          {showPreview && form.title && (
            <div className="mt-8 bg-white rounded-xl shadow-xl p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 font-serif">Article Preview</h2>
              <article className="prose prose-lg max-w-none">
                <h1 className="text-4xl font-bold mb-4">{form.title}</h1>
                <p className="text-gray-600 mb-6">{form.metaDescription}</p>
                {heroImagePreview && (
                  <img src={heroImagePreview} alt="Preview" className="w-full h-64 object-cover rounded-lg mb-6" />
                )}
                <div dangerouslySetInnerHTML={{ __html: form.content || '<p>No content yet...</p>' }} />
              </article>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminNewArticle;
