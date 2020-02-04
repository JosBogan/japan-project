import React from 'react'
import axios from 'axios'

import Auth from '../../lib/Auth'

const templateData = {
  email: '',
  password: ''
}

class Login extends React.Component{

    state = {
      data: {
        email: '',
        password: ''
      },
      errors: null
    }

  handleChange = () => {
    const data = { ...this.state.data, [event.target.name]: event.target.value }
    this.setState({ data })
    this.setState({ errors: null })
  }

  handleSubmit = async () => {
    event.preventDefault()
    try {
      const res = await axios.post('/api/login', this.state.data)
      Auth.setToken(res.data.token)
      this.setState({ templateData: templateData })
      this.props.history.push('/')
    } catch (err) {
      this.setState({ errors: err.response.data.message })
    }
  }

  render() {
    return (
      <section className="login_container body">
        <form 
          className="auth_form"
          onSubmit={this.handleSubmit}
        >
          <h1 className="auth_header">Login</h1>
          <div className="input_container">
            <label>Email</label>
            <div>
              <input 
                type="email" 
                name="email"
                placeholder="Email" 
                onChange={this.handleChange}
              />
            </div>
          </div>
          <div className="input_container">
            <label>Password</label>
            <div>
              <input 
                type="password" 
                name="password"
                placeholder="Password"
                onChange={this.handleChange}
              />
            </div>
            {this.state.errors && <div className="error_text">{this.state.errors}</div>}
          </div>
          <div>
            <button type="submit">Login</button>
          </div>
        </form>
      </section>
    )
  }
}

export default Login