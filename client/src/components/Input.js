import React from 'react';
import clsx from 'clsx';

import { useSelector, useDispatch } from 'react-redux';
import { textInputHandlerAction } from '../reducers/team-app';

const Input = ({
  reducer,
  item,
  labelText = false,
  uppercase = false,
  placeholder,
  minLength = 1,
  maxLength = 24,
  showCounter = false,
}) => {
  const value = useSelector(state => state[reducer][item].value);
  const dispatch = useDispatch();

  const handleChange =
    () =>
    ({ target: { value } }) => {
      dispatch(textInputHandlerAction(item, value, minLength, maxLength, uppercase));
    };

  return (
    <>
      {labelText && (
        <label>
          {`${labelText} `}
          {showCounter && <span className="char-remaining">{maxLength - value.length}</span>}
        </label>
      )}
      <input
        className={clsx(
          'w-full h-16 text-qgrey bg-qlight font-extrabold text-xl py-1 px-4 outline-none',
          'transition ease-in-out duration-200',
          'border-qgrey border-2 border-r-2 focus:border-qorange',
          'normal-case'
        )}
        id={item}
        placeholder={placeholder}
        value={value}
        onChange={handleChange()}
        minLength={minLength}
        maxLength={maxLength}
      />
    </>
  );
};

export default Input;
