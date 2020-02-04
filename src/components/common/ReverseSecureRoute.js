import React from 'react'
import { Route, Redirect } from 'react-router-dom'

import Auth from '../../lib/Auth'

const ReverseSecureRoute = ({ component: component, ...rest }) => {
  if (!Auth.isAuthenticated()) return <Route {...rest} component={component} />
  return <Redirect to='/destinations' />
}

export default ReverseSecureRoute