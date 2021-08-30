import React from "react";
import { Route, Switch } from 'react-router-dom';
import App from './App';
import AppM from './AppM';

export default function Home() {
  return (
    <main>
      <Switch>
        <Route path="/" component={AppM} exact />
        <Route path="/moderator" component={AppM} />
        <Route path="/joinGame" component={App} />
      </Switch>
    </main>
  );
}


