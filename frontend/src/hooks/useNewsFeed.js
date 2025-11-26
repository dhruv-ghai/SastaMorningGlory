import { useEffect, useState } from 'react';

const mapStory = (story) => ({
  id: story.id || story.hashId || story.url || story.title,
  title: story.title,
  description: story.content || story.description || '',
  externalUrl: story.readMoreUrl || story.url,
  imageUrl: story.imageUrl,
  publishedAt: story.date
    ? `${story.date} ${story.time || ''}`.trim()
    : new Date().toISOString()
});

export const useNewsFeed = (category = 'all') => {
  const [state, setState] = useState({ status: 'idle', stories: [], error: null });

  useEffect(() => {
    let isMounted = true;
    const fetchNews = async () => {
      setState({ status: 'loading', stories: [], error: null });
      try {
        const res = await fetch(`https://inshortsapi.vercel.app/news?category=${category}`);
        if (!res.ok) throw new Error('Unable to fetch news feed');
        const json = await res.json();
        const list = Array.isArray(json.data) ? json.data : json.news || [];
        const stories = list
          .map((item) => mapStory(item))
          .filter((item) => item.title && item.externalUrl);
        if (isMounted) {
          setState({ status: 'success', stories, error: null });
        }
      } catch (error) {
        if (isMounted) {
          setState({ status: 'error', stories: [], error: error.message });
        }
      }
    };
    fetchNews();
    const id = setInterval(fetchNews, 1000 * 60 * 30);
    return () => {
      isMounted = false;
      clearInterval(id);
    };
  }, [category]);

  return state;
};

