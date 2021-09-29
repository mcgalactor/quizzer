import React, { useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';

import Button from './Button';
import { fetchRoomState, closeRoomQuestion, questionCompleted } from '../reducers/qm/room';
import { toggleGuessCorrect } from '../reducers/qm/guess';

const Header = () => {
  const questionNo = useSelector(state => state.quizzMasterApp.question);
  const round = useSelector(state => state.quizzMasterApp.round);
  const { question, answer } = useSelector(state => state.quizzMasterApp.currentQuestion);

  return (
    <div>
      <div className="flex flex-col gap-2 justify-center items-center">
        <h1 className="text-3xl font-bold">
          Round {round} - Question {questionNo}
        </h1>
        <h2>Q: {question}</h2>
        <h2 className="font-semibold">A: {answer}</h2>
      </div>
    </div>
  );
};

const TeamGuess = ({ team: teamNo }) => {
  const dispatch = useDispatch();
  const roomCode = useSelector(state => state.quizzMasterApp.roomCode);
  const team = useSelector(state => state.quizzMasterApp.approvedTeamApplications[teamNo]);
  const questionClosed = useSelector(state => state.quizzMasterApp.questionClosed);
  const approvingATeamGuess = useSelector(state => state.quizzMasterApp.approvingATeamGuess);

  const toggleGuess = useCallback(() => {
    dispatch(toggleGuessCorrect(roomCode, team._id, !team.guessCorrect));
  }, [roomCode, team, dispatch]);

  if (!team) {
    return <div />;
  }
  return (
    <div>
      <div className="bg-qgrey p-5 text-center flex flex-col items-center gap-4">
        <h3>{team.name}</h3>
        <h3>{team.guess || '-'}</h3>

        {questionClosed && (
          <Button type="small" onClick={toggleGuess} disabled={approvingATeamGuess || !team.guess}>
            {team.guessCorrect ? (
              <span role="img" aria-label={`Approve team ${team.name}'s guess`}>
                👍
              </span>
            ) : (
              <span role="img" aria-label={`Reject team ${team.name}'s guess`}>
                👎
              </span>
            )}
          </Button>
        )}
      </div>
    </div>
  );
};

const Guesses = () => {
  return (
    <>
      <div className="grid grid-cols-3 gap-8">
        <TeamGuess team={0} />
        <TeamGuess team={1} />
        <TeamGuess team={2} />
      </div>
      <div className="grid grid-cols-3 gap-8">
        <TeamGuess team={3} />
        <TeamGuess team={4} />
        <TeamGuess team={5} />
      </div>
    </>
  );
};

const NextButton = () => {
  const dispatch = useDispatch();
  const questionClosed = useSelector(state => state.quizzMasterApp.questionClosed);
  const roomCode = useSelector(state => state.quizzMasterApp.roomCode);

  return (
    <div className="grid grid-cols-3 gap-8">
      <div className="grid-cols-1 col-start-2">
        {questionClosed ? (
          <Button
            onClick={() => {
              dispatch(questionCompleted(roomCode));
            }}
          >
            Next
          </Button>
        ) : (
          <Button
            onClick={() => {
              dispatch(closeRoomQuestion(roomCode));
            }}
          >
            Close Question
          </Button>
        )}
      </div>
    </div>
  );
};

const QMGuesses = () => {
  const dispatch = useDispatch();
  const roomCode = useSelector(state => state.quizzMasterApp.roomCode);
  const currentQuestion = useSelector(state => state.quizzMasterApp.currentQuestion);

  useEffect(() => {
    dispatch(fetchRoomState(roomCode));
  }, [dispatch, roomCode]);

  if (!currentQuestion) {
    return <Redirect to="/master/categories" />;
  }

  return (
    <div className="container pt-4 space-y-4 mx-auto">
      <Header />
      <Guesses />
      <NextButton />
    </div>
  );
};

export default QMGuesses;
