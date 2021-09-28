import './App.css';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import { CreateRoom, Home, SignIn, SignUp, Room, Top, Profile, SelectRoom, TestSkyway, SearchRoom, ProfileEdit } from './templates';
import Auth from './Auth';


function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path={'/'} component={Top} />
        <Route exact path={'/signup'} component={SignUp} />
        <Route exact path={'/signin'} component={SignIn} />
        <Auth>
          <Route exact path={'/home'} component={Home} />
          <Route exact path={'/testskyway'} component={TestSkyway} />
          <Route exact path={'/selectroom'} component={SelectRoom} />
          <Route exact path={'/createroom'} component={CreateRoom} />
          <Route exact path={'/profile'} component={Profile} />
          <Route exact path={'/searchroom'} component={SearchRoom} />
          <Route exact path={'/room/:roomId'} component={Room} />
          <Route exact path={'/profile/edit'} component={ProfileEdit} />
        </Auth>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
