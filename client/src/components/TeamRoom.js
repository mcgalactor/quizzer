import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { stopLoaderAction } from '../reducers/loader';
import { submitGuess } from '../reducers/team-app';

import Loader from './Loader';
import Input from './Input';
import Button from './Button';

const TeamRoom = () => {
  const isLoading = useSelector(state => state.loader.active);
  const roomCode = useSelector(state => state.teamApp.roomCode.value);
  const teamID = useSelector(state => state.teamApp.teamID);
  const roundNo = useSelector(state => state.teamApp.roundNo);
  const open = useSelector(state => state.teamApp.question.open);
  const questionNo = useSelector(state => state.teamApp.question.number);
  const category = useSelector(state => state.teamApp.question.category);
  const question = useSelector(state => state.teamApp.question.question);
  const guess = useSelector(state => state.teamApp.guess.value);
  const dispatch = useDispatch();

  const handleSubmit = () => {
    dispatch(submitGuess(roomCode, teamID, guess));
  };

  const handleChangeAnswer = () => {
    dispatch(stopLoaderAction());
  };

  return isLoading || !open ? (
    <div className="flex flex-col gap-2 text-center">
      <Loader />
      {open && <Button onClick={handleChangeAnswer}>Change answer</Button>}
    </div>
  ) : (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col items-center">
        <span className="font-semibold">Round {roundNo}</span>
        <span className="font-semibold text-4xl">Question {questionNo}</span>
        <span className="font-semibold">{category}</span>
      </div>

      <span className="font-semibold text-2xl text-center">{question}</span>

      <div>
        <Input
          reducer="teamApp"
          item="guess"
          placeholder="Your answer"
          labelText="Answer"
          maxLength="50"
          showCounter
        />
      </div>

      <Button onClick={handleSubmit}>Submit!</Button>
    </div>
  );
};

export default TeamRoom;
