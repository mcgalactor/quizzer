import React from 'react';
import { useSelector } from 'react-redux';
import clsx from 'clsx';

const Button = ({ type, disabled = false, children, ...rest }) => {
  const connecting = useSelector(state => state.websocket.connecting);

  return (
    <button
      className={clsx(
        'bg-qorange w-full px-2 py-4 text-xl font-extrabold select-none border-qgrey border-2 hover:bg-yellow-600 font-sans',
        {
          'filter grayscale cursor-not-allowed': disabled,
          'max-w-min px-9': type === 'small',
          'bg-qlight text-qgrey active:border-qorange': type === 'secondary' || type === 'recover',
          'absolute top-4 right-4 max-w-min': type === 'recover',
        }
      )}
      disabled={disabled || connecting}
      {...rest}
    >
      {children}
    </button>
  );
};

export default Button;
