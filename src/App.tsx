import React from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { Home, SignIn, SignUp, Top } from './templates';

function App() {
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path={'/'} component={Top} />
                <Route exact path={'/signup'} component={SignUp} />
                <Route exact path={'/signin'} component={SignIn} />
                <Route exact path={'/home'} component={Home} />
            </Switch>
        </BrowserRouter>
    );
}

export default App;
