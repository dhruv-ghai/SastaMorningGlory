import demoArticles from '../data/demoArticles.js';

const STORAGE_KEY = 'smg_local_articles';

const hasWindow = () => typeof window !== 'undefined' && typeof window.localStorage !== 'undefined';

const normalizeSlug = (text = '') => {
  const normalized = text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
  return normalized || `story-${Date.now()}`;
};

export const initializeLocalArticles = () => {
  if (!hasWindow()) {
    return [...demoArticles];
  }

  const existing = window.localStorage.getItem(STORAGE_KEY);
  if (!existing) {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(demoArticles));
    return [...demoArticles];
  }

  try {
    const parsed = JSON.parse(existing);
    if (!Array.isArray(parsed) || parsed.length === 0) {
      throw new Error('Invalid local articles payload');
    }
    return parsed;
  } catch (error) {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(demoArticles));
    return [...demoArticles];
  }
};

export const getLocalArticles = () => {
  if (!hasWindow()) {
    return [...demoArticles];
  }

  const stored = window.localStorage.getItem(STORAGE_KEY);
  if (!stored) {
    return initializeLocalArticles();
  }

  try {
    const parsed = JSON.parse(stored);
    if (!Array.isArray(parsed)) {
      throw new Error('Invalid local articles format');
    }
    return parsed;
  } catch (err) {
    return initializeLocalArticles();
  }
};

export const setLocalArticles = (articles) => {
  if (hasWindow()) {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(articles));
  }
  return articles;
};

const ensureUniqueSlug = (slug, articles) => {
  let finalSlug = normalizeSlug(slug);
  let counter = 1;

  while (articles.some((article) => article.slug === finalSlug)) {
    finalSlug = `${normalizeSlug(slug)}-${counter}`;
    counter += 1;
  }

  return finalSlug;
};

export const upsertLocalArticle = (article) => {
  const articles = getLocalArticles();
  const now = new Date().toISOString();

  const preparedSlug = article.slug
    ? normalizeSlug(article.slug)
    : normalizeSlug(article.title || `story-${Date.now()}`);

  const safeSlug = ensureUniqueSlug(preparedSlug, articles.filter((item) => item._id !== article._id));

  const baseArticle = {
    ...article,
    slug: safeSlug,
    _id: article._id || `local-${Date.now()}`,
    createdAt: article.createdAt || now,
    updatedAt: now,
    publishedAt: article.publishedAt || now
  };

  const existingIndex = articles.findIndex(
    (item) => item._id === baseArticle._id || item.slug === baseArticle.slug
  );

  if (existingIndex >= 0) {
    articles[existingIndex] = { ...articles[existingIndex], ...baseArticle };
  } else {
    articles.unshift(baseArticle);
  }

  setLocalArticles(articles);
  return baseArticle;
};

export const deleteLocalArticle = (idOrSlug) => {
  const articles = getLocalArticles();
  const filtered = articles.filter(
    (article) => article._id !== idOrSlug && article.slug !== idOrSlug
  );
  setLocalArticles(filtered);
  return filtered;
};

export const getArticleFromLocal = (slugOrId) => {
  const articles = getLocalArticles();
  return (
    articles.find((article) => article.slug === slugOrId || article._id === slugOrId) || null
  );
};

