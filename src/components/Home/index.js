import Cookies from 'js-cookie'
import './index.css'

const Home = props => {
  const onClickLogoutBtn = () => {
    Cookies.remove('jwt_token')
    const {history} = props
    history.replace('/ebank/login')
  }

  return (
    <div className="home-container">
      <nav className="nav-menu">
        <img
          src="https://assets.ccbp.in/frontend/react-js/ebank-logo-img.png"
          className="website-logo"
          alt="website logo"
        />
        <button onClick={onClickLogoutBtn} type="button" className="logout-btn">
          LogOut
        </button>
      </nav>

      <div className="home-card">
        <h1 className="heading2">Your Flexibility, Our Excellence</h1>
        <img
          src="https://assets.ccbp.in/frontend/react-js/ebank-digital-card-img.png"
          className="digital-card"
          alt="digital card"
        />
      </div>
    </div>
  )
}

export default Home
