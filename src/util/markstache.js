import Mustache from 'mustache';
import MarkdownIt from 'markdown-it';

const md = new MarkdownIt();

export const render = (template, data) => {
  try {
    return md.render(Mustache.render(template, data));
  } catch (err) {
    console.log('ERROR: failed to render template');
    console.log(err);
    return '';
  }
};
