import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { applyTeam } from '../reducers/team-app';
import Loader from './Loader';
import Input from './Input';
import Button from './Button';

const TeamHome = () => {
  const connected = useSelector(state => state.websocket.connected);
  const isLoading = useSelector(state => state.loader.active);
  //const roomCodeValid = useSelector(state => state.teamApp.roomCode.valid);
  //const roomCodeValue = useSelector(state => state.teamApp.roomCode.value);
  //const teamValid = useSelector(state => state.teamApp.team.valid);
  //const teamValue = useSelector(state => state.teamApp.team.value);
  const dispatch = useDispatch();
  const roomCodeValue="0000";
  const teamValue="ben";
  const nameValue="Benoit";

  const handleClick = () => {
    console.log(roomCodeValue);
    dispatch(applyTeam(roomCodeValue, teamValue));
  };

  if (connected) {
    console.log(connected);

    return <Redirect to="/team/room" />;
  }

  return isLoading ? (
    <Loader />
  ) : (
    <>
      {/*<Input
        reducer="teamApp"
        item="roomCode"
        labelText="Room code"
        //placeholder="Enter 5-letter code"
        placeholder="world"
        value="world"
        uppercase
        minLength="5"
        maxLength="5"
        
      /> */}
      {/*
      <Input
        reducer="teamApp"
        item="team"
        labelText="Name"
        placeholder="Hello Ben"
        maxLength="12"
        showCounter
    />*/}
      
      {/*<Button onClick={handleClick} disabled={!roomCodeValid || !teamValid}>*/}
      <Button onClick={handleClick} disabled={false}>
        Join Quiz!
      </Button>
    </>
  );
};

export default TeamHome;
