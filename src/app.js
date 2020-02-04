import React from 'react'
import ReactDOM from 'react-dom'
import './styles/main.scss'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import Home from './components/Home'
import Navbar from './components/common/Navbar'
import DestinationIndex from './components/DestinationIndex'
import Login from './components/auth/Login'
import Register from './components/auth/Register'
import DestinationShow from './components/DestinationShow' 
import ErrorPage from './components/common/Error'
import Account from './components/account/Account'
import TripPlanner from './components/tripplan/TripPlanner'

import SecureRoute from './components/common/SecureRoute'
import ReverseSecureRoute from './components/common/ReverseSecureRoute'

const App = () => (

  <BrowserRouter>
    <main className="page_container">
      <Navbar />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/destinations/:id" component={DestinationShow}/>
        <Route path="/destinations" component={DestinationIndex} />
        <Route path="/tripplanner" component={TripPlanner} />
        <ReverseSecureRoute path="/login" component={Login} />
        <ReverseSecureRoute path="/register" component={Register} />
        <SecureRoute path="/account" component={Account} />
        <Route path='/*' component={ErrorPage}/>
      </Switch>
    </main>
  </BrowserRouter>

)

ReactDOM.render(
  <App />,
  document.getElementById('root')
)
