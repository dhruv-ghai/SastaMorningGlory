import { useEffect, useState } from 'react';

const buildStory = (post) => {
  const data = post.data || {};
  return {
    id: data.id,
    title: data.title,
    subreddit: data.subreddit,
    score: data.score,
    comments: data.num_comments,
    url: `https://www.reddit.com${data.permalink}`,
    thumbnail: data.thumbnail && data.thumbnail.startsWith('http') ? data.thumbnail : null
  };
};

export const useRedditFeed = (subreddit = 'news', sort = 'top') => {
  const [state, setState] = useState({ status: 'idle', stories: [], error: null });

  useEffect(() => {
    let isMounted = true;
    const fetchReddit = async () => {
      setState({ status: 'loading', stories: [], error: null });
      try {
        const res = await fetch(
          `https://www.reddit.com/r/${subreddit}/${sort}.json?limit=8&t=day`,
          {
            headers: {
              'User-Agent': 'SastaMorningGlory/1.0'
            }
          }
        );
        if (!res.ok) throw new Error('Unable to load Reddit feed');
        const json = await res.json();
        const children = json?.data?.children || [];
        const stories = children.map((post) => buildStory(post));
        if (isMounted) {
          setState({ status: 'success', stories, error: null });
        }
      } catch (error) {
        if (isMounted) {
          setState({ status: 'error', stories: [], error: error.message });
        }
      }
    };
    fetchReddit();
    const id = setInterval(fetchReddit, 1000 * 60 * 15);
    return () => {
      isMounted = false;
      clearInterval(id);
    };
  }, [subreddit, sort]);

  return state;
};

