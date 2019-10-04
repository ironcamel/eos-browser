import { render } from './markstache';

test('render markdown', () => {
  const template = '# Hello'
  expect(render(template, {})).toEqual("<h1>Hello</h1>\n");
});

test('render markdown with data', () => {
  const template = '# Hello {{person}}'
  const data = { person: 'Bob' };
  expect(render(template, data)).toEqual("<h1>Hello Bob</h1>\n");
});
