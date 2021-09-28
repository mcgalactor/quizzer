import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { hidePopUpAction } from '../reducers/pop-up';
import Button from './Button';

const PopUp = () => {
  const title = useSelector(state => state.popUp.title);
  const message = useSelector(state => state.popUp.message);
  const button = useSelector(state => state.popUp.button);
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(hidePopUpAction());
  };

  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-opacity-70 bg-black">
      <div className="bg-qlight flex flex-col items-center justify-center text-center space-y-6 p-8 w-80 border-qlight rounded-md">
        <div className="flex flex-col space-y-4">
          <span className="text-qdark font-semibold uppercase text-3xl">{title}</span>
          <span className="text-qdark font-semibold text-lg">{message}</span>
        </div>
        <Button type="small" onClick={handleClick}>
          {button}
        </Button>
      </div>
    </div>
  );
};

export default PopUp;
