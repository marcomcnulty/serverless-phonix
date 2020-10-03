const fs = require('fs').promises;

module.exports.handler = async event => {
  const html = await loadHtml();

  return {
    statusCode: 200,
    body: html,
    // overriding API Gateway's default JSON content type
    headers: {
      'Content-Type': 'text/html; charset=UTF-8',
    },
  };
};

// cache html after 1st invocation
let html;

const loadHtml = async () => {
  if (!html) {
    html = await fs.readFile('static/index.html', 'utf-8');
  }

  return html;
};
