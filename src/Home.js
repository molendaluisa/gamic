import React, { useState } from "react";
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import App from './App';

export default function Home() {
  return (
    <main>
      <Switch>
        <Route path="/" component={App} exact />
        <Route path="/moderator" component={App} />
        <Route path="/joinGame" component={App} />
      </Switch>
    </main>
  );
}


