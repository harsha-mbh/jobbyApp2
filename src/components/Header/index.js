import {withRouter, Link} from 'react-router-dom'
import {AiFillHome} from 'react-icons/ai'
import {BsFillBriefcaseFill} from 'react-icons/bs'
import {FiLogOut} from 'react-icons/fi'
import Cookies from 'js-cookie'
import './index.css'

const Header = props => {
  const onClickLogout = () => {
    const {history} = props
    Cookies.remove('jwt_token')
    history.replace('login')
  }

  return (
    <nav className="nav-header">
      <Link to="/">
        <img
          src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
          alt="website-logo"
          className="nav-logo"
        />
      </Link>

      <ul className="nav-mobile-container">
        <Link to="/">
          <AiFillHome color="#ffffff" className="nav-mob-icon" />
        </Link>
        <Link to="/jobs">
          <BsFillBriefcaseFill color="#ffffff" className="nav-mob-icon" />
        </Link>
        <button
          type="button"
          className="logout-mobile-btn"
          onClick={onClickLogout}
        >
          <FiLogOut color="#ffffff" className="nav-mob-icon" />
        </button>
      </ul>
      <ul className="nav-desktop-menu-container">
        <Link to="/" className="nav-link">
          <li className="nav-menu">Home</li>
        </Link>
        <Link to="/jobs" className="nav-link">
          <li className="nav-menu">Jobs</li>
        </Link>
      </ul>
      <button
        type="button"
        className="logout-btn-desktop"
        onClick={onClickLogout}
      >
        Logout
      </button>
    </nav>
  )
}

export default withRouter(Header)
