import { Route, withRouter, Switch, Redirect } from 'react-router-dom'

import Login from './pages/login'
import Admin from './pages/admin'

export default withRouter((location) => (
  <Switch>
    <Route path="/" exact>
      <Redirect to="/login" />
    </Route>
    <Route path="/login" component={Login} exact />
    <Route path="/admin" component={Admin} exact />
  </Switch>
))
