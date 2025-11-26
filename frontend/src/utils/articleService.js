import api from './api.js';
import demoArticles from '../data/demoArticles.js';
import {
  deleteLocalArticle,
  getArticleFromLocal,
  getLocalArticles,
  initializeLocalArticles,
  setLocalArticles,
  upsertLocalArticle
} from './localArticles.js';

const sortByPublishedDate = (articles = []) =>
  [...articles].sort(
    (a, b) => new Date(b.publishedAt || b.createdAt) - new Date(a.publishedAt || a.createdAt)
  );

const mergeRemoteWithLocal = (remoteArticles = []) => {
  const locals = getLocalArticles();

  const map = new Map();
  locals.forEach((article) => {
    map.set(article._id || article.slug, article);
  });

  remoteArticles.forEach((article) => {
    map.set(article._id || article.slug, article);
  });

  const merged = sortByPublishedDate(Array.from(map.values()));
  setLocalArticles(merged);
  return merged;
};

const buildQueryString = (params = {}) => {
  const query = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') {
      query.append(key, value);
    }
  });
  const qs = query.toString();
  return qs ? `?${qs}` : '';
};

const fallbackArticles = (params = {}) => {
  const locals = getLocalArticles();
  let base = locals.length ? locals : demoArticles;
  base = sortByPublishedDate(base);
  if (params.category) {
    base = base.filter((article) => article.category === params.category);
  }
  if (params.limit) {
    return base.slice(0, Number(params.limit));
  }
  return base;
};

export const fetchArticles = async (params = {}) => {
  initializeLocalArticles();
  try {
    const response = await api.get(`/articles${buildQueryString(params)}`);
    const payload = Array.isArray(response.data?.data)
      ? response.data.data
      : Array.isArray(response.data)
        ? response.data
        : [];
    if (payload.length) {
      const merged = mergeRemoteWithLocal(payload);
      if (params.category) {
        return merged.filter((article) => article.category === params.category);
      }
      if (params.limit) {
        return merged.slice(0, Number(params.limit));
      }
      return merged;
    }
  } catch (error) {
    console.warn('Falling back to local/demo articles:', error.message);
  }

  return fallbackArticles(params);
};

export const fetchArticleBySlug = async (slugOrId) => {
  initializeLocalArticles();
  try {
    const response = await api.get(`/articles/${slugOrId}`);
    if (response.data) {
      upsertLocalArticle(response.data);
      return response.data;
    }
  } catch (error) {
    console.info(`Using local article for ${slugOrId}`);
  }
  return getArticleFromLocal(slugOrId);
};

export const saveArticle = async ({ articleId, draft, formData }) => {
  initializeLocalArticles();
  const fallbackArticle = {
    ...draft,
    _id: articleId || draft._id || undefined
  };

  try {
    const response = articleId
      ? await api.put(`/articles/${articleId}`, formData)
      : await api.post('/articles', formData);
    if (response.data) {
      upsertLocalArticle(response.data);
      return { article: response.data, source: 'api' };
    }
  } catch (error) {
    console.warn('Persisting article locally because API call failed', error.message);
  }

  const saved = upsertLocalArticle(fallbackArticle);
  return { article: saved, source: 'local' };
};

export const removeArticle = async (id) => {
  initializeLocalArticles();
  try {
    await api.delete(`/articles/${id}`);
    deleteLocalArticle(id);
    return { source: 'api' };
  } catch (error) {
    console.warn('Deleting article locally because API call failed', error.message);
    deleteLocalArticle(id);
    return { source: 'local' };
  }
};

