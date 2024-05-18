import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'
import './index.css'

class Login extends Component {
  state = {
    userId: '',
    pin: '',
    loginError: false,
    errorMessage: '',
  }

  loginSuccess = jwtToken => {
    Cookies.set('jwt_token', jwtToken, {expires: 30})
    const {history} = this.props
    history.replace('/')
  }

  loginError = errorMsg => {
    this.setState({
      loginError: true,
      errorMessage: errorMsg,
    })
  }

  checkTheUser = async event => {
    event.preventDefault()
    const {userId, pin} = this.state
    const userDetails = {user_id: userId, pin: pin}

    const url = 'https://apis.ccbp.in/ebank/login'
    const option = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, option)
    const data = await response.json()
    console.log(data)

    if (response.ok === true) {
      this.loginSuccess(data.jwt_token)
    } else {
      this.loginError(data.error_msg)
    }
  }

  onChangeUserIdInput = event => {
    this.setState({userId: event.target.value})
  }

  onChangePinInput = event => {
    this.setState({pin: event.target.value})
  }

  render() {
    const {userId, pin, loginError, errorMessage} = this.state
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }

    return (
      <div className="login-container">
        <div className="login-card">
          <img
            src="https://assets.ccbp.in/frontend/react-js/ebank-login-img.png"
            className="website-login-img"
            alt="website login"
          />
          <form className="form-control" onSubmit={this.checkTheUser}>
            <h1>Welcome Back!</h1>
            <label htmlFor="userId" className="label-name">
              User ID
            </label>
            <input
              id="userId"
              type="text"
              className="user-id-input-field"
              placeholder="Enter User ID"
              value={userId}
              onChange={this.onChangeUserIdInput}
            />
            <label htmlFor="pinId" className="label-name">
              PIN
            </label>
            <input
              id="pinId"
              type="password"
              className="pin-input-field"
              placeholder="Enter PIN"
              value={pin}
              onChange={this.onChangePinInput}
            />
            <button type="submit" className="login-btn">
              Login
            </button>

            {loginError && <p className="error-message">{errorMessage}</p>}
          </form>
        </div>
      </div>
    )
  }
}

export default Login
