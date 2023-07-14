import {Component} from 'react'
import {Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'
import './index.css'

class Login extends Component {
  state = {
    username: '',
    password: '',
    showSubmitError: false,
    errorMsg: '',
  }

  handleUsernameChange = event => {
    this.setState({username: event.target.value})
  }

  handlePasswordChange = event => {
    this.setState({password: event.target.value})
  }

  onSubmitSuccess = jwtToken => {
    const {history} = this.props

    Cookies.set('jwt_token', jwtToken, {
      expires: 30,
    })
    history.replace('/')
  }

  onSubmitFailure = errorMsg => {
    this.setState({showSubmitError: true, errorMsg})
  }

  submitForm = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {username, password}
    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok === true) {
      this.onSubmitSuccess(data.jwt_token)
    } else {
      this.onSubmitFailure(data.error_msg)
    }
  }

  render() {
    const {username, password, showSubmitError, errorMsg} = this.state
    const jwtToken = Cookies.get('jwt_token')

    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }

    return (
      <div className="login-route">
        <div className="login-route-mobile-image-container">
          <img
            src="https://res.cloudinary.com/chandanswamy/image/upload/v1689252847/Rectangle_1457_vw4xjj.png"
            alt="website login"
            className="login-mobile-image"
          />
        </div>
        <div className="login-form-container">
          <form className="login-form" onSubmit={this.submitForm}>
            <img
              src="https://res.cloudinary.com/chandanswamy/image/upload/v1687847733/Frame_274_j3lpbz.png"
              alt="website logo"
              className="form-image"
            />
            <h1 className="form-title">Tasty Kitchens</h1>
            <h1 className="login-heading">Login</h1>
            <div className="form-group">
              <label className="label" htmlFor="username">
                Username
              </label>
              <input
                className="input-element"
                type="text"
                id="username"
                value={username}
                onChange={this.handleUsernameChange}
              />
            </div>
            <div className="form-group">
              <label className="label" htmlFor="password">
                Password
              </label>
              <input
                className="input-element"
                type="password"
                id="password"
                value={password}
                onChange={this.handlePasswordChange}
              />
            </div>
            {showSubmitError && <p className="error-message">*{errorMsg}</p>}
            <button type="submit" className="login-button">
              Login
            </button>
          </form>
        </div>
        <div className="login-route-image-container">
          <img
            src="https://res.cloudinary.com/chandanswamy/image/upload/v1687841293/Rectangle_1456_hhciw2.png"
            alt="website login"
            className="login-image"
          />
        </div>
      </div>
    )
  }
}

export default Login
