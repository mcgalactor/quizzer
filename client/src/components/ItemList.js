import React from 'react';
import clsx from 'clsx';
import { useSelector, useDispatch } from 'react-redux';

import { handleItemListChange } from '../reducers/item-list';

const ItemListWrapper = ({ children }) => (
  <div className="h-full border-qlight border-2 bg-qgrey">
    <ul>{children}</ul>
  </div>
);

const Item = ({ children, ...props }) => (
  <li
    {...props}
    className={clsx('p-4 cursor-pointer select-none', {
      'bg-qorange hover:bg-yellow-600': props.selected,
      'hover:bg-gray-600': !props.selected,
    })}
  >
    {children}
  </li>
);

export const StaticItemList = ({ items, show }) => (
  <ItemListWrapper>
    {items.map(item => (
      <Item key={item.id}>{item[show]}</Item>
    ))}
  </ItemListWrapper>
);

const ItemList = ({ items, show, selectable, reducer, dispatchAs }) => {
  const dispatch = useDispatch();
  const selected = useSelector(state => state[reducer[0]][reducer[1]]);

  const onItemClick = item => {
    if (!selectable) {
      return;
    }

    if (selected && item.id === selected.id) {
      return dispatch(handleItemListChange(dispatchAs, null));
    }
    dispatch(handleItemListChange(dispatchAs, item));
  };

  return (
    <ItemListWrapper>
      {items.map(item => (
        <Item
          selected={(selected || {}).id === item.id ? 'selected' : null}
          onClick={() => onItemClick(item)}
          key={item.id}
        >
          {item[show]}
        </Item>
      ))}
    </ItemListWrapper>
  );
};

export default ItemList;
