import { BrowserRouter as Router, Switch } from 'react-router-dom';


import Auth from './components/routing/Auth'

// Routing
import PrivateRoute from './components/routing/PrivateRoute';

// Screens
import Feed from './components/feed/Feed';
import Profile from './pages/profile/Profile';
import Settings from './pages/settings/Settings';
import Comments from './pages/Comments/Comments';



const App = () => {
  return (
      <Router>
        <Switch>
          <PrivateRoute exact path="/" component={Feed} />
          <PrivateRoute exact path='/p/:id' component={Profile} />
          <PrivateRoute exact path="/settings" component={Settings} />
          <PrivateRoute exact path="/a/:id" component={Comments} />
          <Auth />
        </Switch>
      </Router>
  );
}

export default App;