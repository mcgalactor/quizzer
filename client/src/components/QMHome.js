import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { createRoom } from '../reducers/qm/room';
import Logo from './Logo';
import Button from './Button';
import { CenterLoader } from './Loader';

const QMHome = () => {
  const isLoading = useSelector(state => state.loader.active);
  const websocketConnected = useSelector(state => state.websocket.connected);
  const dispatch = useDispatch();
  const handleClick = language => {
    dispatch(createRoom(language));
  };

  if (websocketConnected) {
    return <Redirect to="/master/teams" />;
  } else if (isLoading) {
    return <CenterLoader />;
  }
  return (
    <div className="container space-y-4 mx-auto flex flex-col m-auto pb-16">
      <div className="justify-center items-center gap-4 grid">
        <Logo />
        <h2 className="text-2xl font-bold text-center">Host a game</h2>
        <div className="flex gap-4">
          <Button onClick={() => handleClick('en')}>English</Button>
          <Button onClick={() => handleClick('nl')}>Dutch</Button>
        </div>
      </div>
    </div>
  );
};

export default QMHome;
