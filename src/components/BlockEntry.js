import React from 'react';

function BlockEntry(props) {
  const { label, value, onClick } = props;
  let labelElem = (
    <span className="eos-label">
      {label}
      :
    </span>
  );
  let valueElem = (
    <span className="eos-value">
      {value}
    </span>
  );
  if (onClick) {
    labelElem = (
      <button type="button" className="link-button" onClick={onClick}>
        {labelElem}
      </button>
    );
    valueElem = (
      <button type="button" className="link-button" onClick={onClick}>
        {valueElem}
      </button>
    );
  }
  return (
    <div>
      <div className="eos-label">{labelElem}</div>
      {valueElem}
    </div>
  );
}

export default BlockEntry;
