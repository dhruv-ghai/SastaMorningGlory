export const log = (...args) => {
  if (process.env.NODE_ENV !== 'test') {
    console.log('[SMG]', ...args);
  }
};

