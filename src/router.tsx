import { Route, withRouter, Switch, Redirect } from 'react-router-dom'

import Login from './pages/login'
import Admin from './pages/console'

export default withRouter((location) => (
  <Switch>
    <Route path="/" exact>
      <Redirect to="/login" />
    </Route>
    <Route path="/login" component={Login} exact />
    <Route path="/admin" exact>
      <Redirect to="/admin/dashboard" />
    </Route>
    <Route path="/admin" component={Admin} />
  </Switch>
))
