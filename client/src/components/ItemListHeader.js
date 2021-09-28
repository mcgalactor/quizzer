import React from 'react';

const ItemListHeader = ({ children, ...rest }) => {
  return (
    <h2 {...rest} className="p-1 py-4 text-2xl">
      {children}
    </h2>
  );
};

export default ItemListHeader;
