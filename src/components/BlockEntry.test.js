import React from 'react';
import { shallow } from 'enzyme';
import BlockEntry from './BlockEntry';

test('BlockEntry', () => {
  const label = 'foo';
  const value = 'bar';
  const blockEntry = shallow(
    <BlockEntry label={label} value={value} />
  );

  const labelElem = blockEntry.find('span.eos-label');
  expect(labelElem).toHaveLength(1);
  expect(labelElem.text()).toBe('foo:');

  const valueElem = blockEntry.find('span.eos-value');
  expect(valueElem).toHaveLength(1);
  expect(valueElem.text()).toBe('bar');

  expect(blockEntry.find('.link-button')).toHaveLength(0);
});

test('BlockEntry with links', () => {
  const label = 'foo';
  const value = 'bar';
  const blockEntry = shallow(
    <BlockEntry label={label} value={value} onClick={jest.fn()}/>
  );

  const labelElem = blockEntry.find('.link-button span.eos-label');
  expect(labelElem).toHaveLength(1);
  expect(labelElem.text()).toBe('foo:');

  const valueElem = blockEntry.find('.link-button span.eos-value');
  expect(valueElem).toHaveLength(1);
  expect(valueElem.text()).toBe('bar');

  expect(blockEntry.find('.link-button')).toHaveLength(2);
});
