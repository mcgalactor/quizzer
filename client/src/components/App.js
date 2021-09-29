import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { useSelector } from 'react-redux';
import PopUp from './PopUp';
import Home from './Home';
import Team from './Team';
import QM from './QM';
import Scoreboard from './Scoreboard';
import RecoverButton from './RecoverButton';

const App = () => {
  const crashed = useSelector(state => state.websocket.crashed);
  const popUpActive = useSelector(state => state.popUp.active);

  return (
    <div className="bg-qdark text-qlight antialiased pt-4 pb-16 px-8 min-h-screen flex flex-col min-w-min">
      <Router>
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/team">
            <Team />
          </Route>
          <Route path="/master">
            <QM />
          </Route>
          <Route path="/scoreboard">
            <Scoreboard />
          </Route>
        </Switch>
        {crashed && <RecoverButton />}
        {popUpActive && <PopUp />}
      </Router>
    </div>
  );
};

export default App;
