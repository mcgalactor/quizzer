import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { loginAsScoreboardViewer } from '../reducers/scoreboard';
import { CenterLoader } from './Loader';
import Input from './Input';
import Button from './Button';
import Logo from './Logo';

const ScoreboardLogin = () => {
  const connected = useSelector(state => state.websocket.connected);
  const isLoading = useSelector(state => state.loader.active);
  const roomCodeValid = useSelector(state => state.teamApp.roomCode.valid);
  const roomCodeValue = useSelector(state => state.teamApp.roomCode.value);
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(loginAsScoreboardViewer(roomCodeValue));
  };

  if (connected) {
    return <Redirect to={`/scoreboard/${roomCodeValue}`} />;
  } else if (isLoading) {
    return <CenterLoader />;
  }

  return (
    <div fluid className="container mx-auto flex flex-col m-auto items-center">
      <div className="grid auto-cols-min">
        <div>
          <div className="flex flex-col gap-4">
            <Logo center />
            <div>
              <Input
                reducer="teamApp"
                item="roomCode"
                labelText="Room code"
                placeholder="Enter 4-letter code"
                uppercase
                minLength="4"
                maxLength="4"
              />
            </div>
            <Button onClick={handleClick} disabled={!roomCodeValid}>
              Join
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScoreboardLogin;
