import React from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import { CreateRoom, Home, SignIn, SignUp, Room, Top, Profile, SelectRoom, TestSkyway, SearchRoom, SkyWay } from './templates';


function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path={'/'} component={Top} />
        <Route exact path={'/signup'} component={SignUp} />
        <Route exact path={'/signin'} component={SignIn} />
        <Route exact path={'/home'} component={Home} />
        <Route exact path={'/testskyway'} component={TestSkyway} />
        <Route exact path={'/selectroom'} component={SelectRoom} />
        <Route exact path={'/room'} component={Room} />
        <Route exact path={'/createroom'} component={CreateRoom} />
        <Route exact path={'/profile'} component={Profile} />
        <Route exact path={'/searchroom'} component={SearchRoom} />
        <Route exact path={'/'} component={() => SkyWay('1')} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
