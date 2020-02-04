import React from 'react'

import Auth from '../../lib/Auth'

class Account extends React.Component {

  logout = () => {
    Auth.logout()
    Auth.isAuthenticated()
    this.props.history.push('/')
  }

  render() {
    return (
      <section className="body">
        <button onClick={this.logout}>Log out</button>
      </section>
    )
  }
}

export default Account