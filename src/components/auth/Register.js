import React from 'react'
import axios from 'axios'

class Register extends React.Component{

  state = {
    data: {
      username: '',
      email: '',
      password: '',
      passwordConfirmation: ''
    },
    errors: null
  }

  handleChange = () => {
    const data = { ...this.state.data, [event.target.name]: event.target.value }
    this.setState({ data })
    this.setState({ errors: null })
  }

  handeSubmit = async () => {
    event.preventDefault()
    try {
      await axios.post('/api/register', this.state.data)
      this.props.history.push('/login')
    } catch (err) {
      this.setState({ errors: err.response.data.errors })
    }
  }

  render() {
    return (
      <section className="body register_container">
        <form 
          className="auth_form"
          onSubmit={this.handeSubmit}
        >
          <h1 className="auth_header">Register</h1>
          <div className="input_container">
            <label>Username</label>
            <div>
              <input 
                // placeholder="Username"
                name="username"
                // required
                onChange={this.handleChange}
              />
              {this.state.errors && <div className="error_text">{this.state.errors.username}</div>}
            </div>
          </div>
          <div className="input_container">
            <label>Email</label>
            <div>
              <input 
                type="email" 
                name="email"
                // placeholder="Email" 
                // required
                onChange={this.handleChange}
              />
              {this.state.errors && <div className="error_text">{this.state.errors.email}</div>}
            </div>
          </div>
          <div className="input_container">
            <label>Password</label>
            <div>
              <input 
                type="password" 
                name="password"
                // placeholder="Password" 
                // required
                onChange={this.handleChange}
              />
              {this.state.errors && <div className="error_text">{this.state.errors.password}</div>}
            </div>
          </div>
          <div className="input_container">
            <label>Password Confirmation</label>
            <div>
              <input 
                type="password"
                name="passwordConfirmation"
                // placeholder="Password Confirmation" 
                // required
                onChange={this.handleChange}
              />
              {this.state.errors && <div className="error_text">{this.state.errors.passwordConfirmation}</div>}
            </div>
          </div>
          <div>
            <button type="submit">Register</button>
          </div>
        </form>
      </section>
    )
  }
}

export default Register