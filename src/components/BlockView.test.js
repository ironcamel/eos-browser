import React from 'react';
import ReactDOM from 'react-dom';
import BlockView from './BlockView';


test('Block renders without crashing', () => {
  const block = {
    id: '100',
    timestamp: '2020-10-30',
    actions: [],
  }
  const div = document.createElement('div');
  ReactDOM.render(<BlockView block={block} onClick={jest.fn()}/>, div);
});
