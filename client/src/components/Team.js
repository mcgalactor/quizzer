import React from 'react';
import { Route, Switch, Redirect, withRouter } from 'react-router-dom';
import { useSelector } from 'react-redux';
import TeamHome from './TeamHome';
import TeamRoom from './TeamRoom';
import Logo from './Logo';

import { Container, Row, Col } from 'react-grid-system';

const Team = ({ location: { pathname } }) => {
  const connected = useSelector(state => state.websocket.connected);

  if (pathname !== '/team' && !connected) {
    return <Redirect to="/team" />;
  }

  return (
    <div fluid className="container mx-auto flex flex-col m-auto items-center">
      <div className="grid auto-cols-min">
        <div>
          <Logo />
          <Switch>
            <Route exact path="/team/room">
              <TeamRoom />
            </Route>
            <Route>
              <TeamHome />
            </Route>
          </Switch>
        </div>
      </div>
    </div>
  );
};

export default withRouter(Team);
