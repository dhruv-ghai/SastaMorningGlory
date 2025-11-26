import sanitizeHtml from 'sanitize-html';

const defaultOptions = {
  allowedTags: sanitizeHtml.defaults.allowedTags.concat(['img', 'iframe']),
  allowedAttributes: {
    ...sanitizeHtml.defaults.allowedAttributes,
    iframe: ['src', 'width', 'height', 'frameborder', 'allow', 'allowfullscreen']
  }
};

export const sanitizeBody = (fields) => (req, res, next) => {
  fields.forEach((field) => {
    if (req.body[field]) {
      req.body[field] = sanitizeHtml(req.body[field], defaultOptions);
    }
  });
  next();
};

