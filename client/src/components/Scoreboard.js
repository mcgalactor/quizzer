import React from 'react';
import { Route, Switch } from 'react-router-dom';
import ScoreboardHome from './ScoreboardHome';

const Scoreboard = () => {
  return (
    <Switch>
      <Route
        path="/scoreboard/:roomCode"
        render={routeProps => <ScoreboardHome {...routeProps} />}
      />
    </Switch>
  );
};

export default Scoreboard;
