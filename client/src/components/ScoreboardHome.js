import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';

import { loginAsScoreboardViewer, fetchGameState } from '../reducers/scoreboard';
import { setLoaderAction, stopLoaderAction } from '../reducers/loader';
import { CenterLoader } from './Loader';
import Logo from './Logo';

const Header = () => {
  const round = useSelector(state => state.scoreboard.round);
  const questionNo = useSelector(state => state.scoreboard.questionNo);
  const category = useSelector(state => state.scoreboard.currentQuestion.category);
  const question = useSelector(state => state.scoreboard.currentQuestion.question);
  const answer = useSelector(state => state.scoreboard.currentQuestion.answer);
  const questionCompleted = useSelector(state => state.scoreboard.questionCompleted);
  const ended = useSelector(state => state.scoreboard.ended);

  return ended ? (
    <>
      <Logo center />
      <h1 className="text-5xl text-center">Quizz Ended</h1>
    </>
  ) : (
    <>
      <div className="flex justify-between text-3xl">
        <h1>Round {round}</h1>
        <h1>{category}</h1>
        <h1>Question {questionNo}</h1>
      </div>
      {!questionCompleted ? (
        <h1 className="text-5xl text-center">Q: {question}</h1>
      ) : (
        <h1 className="text-5xl text-center">A: {answer}</h1>
      )}
    </>
  );
};

const TeamStatus = ({ team, pos }) => {
  const questionClosed = useSelector(state => state.scoreboard.questionClosed);
  const questionCompleted = useSelector(state => state.scoreboard.questionCompleted);
  const ended = useSelector(state => state.scoreboard.ended);

  if (!team) {
    return <></>;
  }

  return (
    <div className="bg-qgrey p-3 border-qlight border-2">
      <div className="flex justify-between text-5xl font-normal">
        <span className="font-semibold">{pos}</span>
        {ended || (
          <div>
            <span>{team.roundScore}</span>
            <span className="text-2xl">✔/round</span>
          </div>
        )}
        <div>
          <span>{team.roundPoints}</span>
          <span className="text-2xl">RP</span>
        </div>
      </div>
      <div className="flex items-center justify-between">
        <span className="text-6xl">{team.name}</span>
        {questionCompleted && !ended && (
          <>
            {team.guessCorrect ? (
              <span className="text-4xl" role="img" aria-label="Correct guess">
                ✔️
              </span>
            ) : (
              <span className="text-4xl" role="img" aria-label="Incorrect guess">
                ❌
              </span>
            )}
          </>
        )}
        {questionClosed || ended || (
          <>
            {!team.guess && (
              <span className="text-4xl" role="img" aria-label="The team is thinking of a guess">
                💭
              </span>
            )}
          </>
        )}
      </div>
      {questionCompleted && !ended && (
        <div>
          <span className="text-2xl">{team.guess || '-'}</span>
        </div>
      )}
    </div>
  );
};

const TeamStatuses = () => {
  const scoreboardTeams = useSelector(state => state.scoreboard.teams);

  if (!scoreboardTeams) {
    return <></>;
  }

  const teams = scoreboardTeams
    .slice()
    .sort((a, b) => b.roundPoints - a.roundPoints || b.roundScore - a.roundScore);

  return (
    <div className="grid grid-rows-3 gap-4">
      <div className="grid grid-cols-2 gap-4">
        <TeamStatus pos={1} team={teams[0]} />
        <TeamStatus pos={2} team={teams[1]} />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <TeamStatus pos={3} team={teams[2]} />
        <TeamStatus pos={4} team={teams[3]} />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <TeamStatus pos={5} team={teams[4]} />
        <TeamStatus pos={6} team={teams[5]} />
      </div>
    </div>
  );
};

const ScoreBoard = () => {
  const dispatch = useDispatch();
  const roomCode = useSelector(state => state.scoreboard.roomCode);

  useEffect(() => {
    dispatch(fetchGameState(roomCode));
  }, [dispatch, roomCode]);

  return (
    <div fluid className="container mx-auto pt-4 flex flex-col gap-8">
      <Header />
      <TeamStatuses />
    </div>
  );
};

const ScoreboardHome = ({
  match: {
    params: { roomCode },
  },
}) => {
  const dispatch = useDispatch();
  const triedConnectingToRoom = useSelector(state => state.scoreboard.triedConnectingToRoom);
  const connectedToRoom = useSelector(state => state.scoreboard.connectedToRoom);
  const connectingToRoom = useSelector(state => state.scoreboard.connectingToRoom);
  const questionNo = useSelector(state => state.scoreboard.questionNo);
  const round = useSelector(state => state.scoreboard.round);

  useEffect(() => {
    if (!connectingToRoom && !triedConnectingToRoom) {
      dispatch(loginAsScoreboardViewer(roomCode));
    }
  }, [dispatch, roomCode, connectingToRoom, triedConnectingToRoom]);

  useEffect(() => {
    if (questionNo === 0 && round <= 0) {
      dispatch(setLoaderAction('Wait for the Quizz Master to start the Quizz.'));
    }
  }, [dispatch, round, questionNo]);

  useEffect(() => {
    return () => dispatch(stopLoaderAction());
  }, [dispatch]);

  if (questionNo === 0 && round <= 0) {
    return <CenterLoader />;
  } else if (!triedConnectingToRoom) {
    return <CenterLoader />;
  } else if (!connectedToRoom) {
    return <Redirect to="/scoreboard" />;
  }
  return <ScoreBoard />;
};

export default ScoreboardHome;
