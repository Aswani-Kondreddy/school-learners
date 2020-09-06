import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Signin from './Components/Signin/signin';
import Signup from './Components/Signup/signup';
import LearnerList from './Components/LearnersList/learners-list';
import Navbar from './Components/Navbar/navbar';
import LearnerDetails from './Components/LearnerDetails/learner-details';
import {Provider} from 'react-redux';
import store from './store';

const Routing = () => {


  return <Switch>
    <Route path="/" exact>
      <LearnerList />
    </Route>
    <Route path="/signin" exact>
      <Signin />
    </Route>
    <Route path="/signup" exact>
      <Signup />
    </Route>
    <Route path="/learner/:id">
      <LearnerDetails />
    </Route>
  </Switch>
}

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Navbar />
        <Routing />
      </BrowserRouter>
    </Provider>
  );

}

export default App;
