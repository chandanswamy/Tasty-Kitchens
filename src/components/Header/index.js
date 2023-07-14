import {Component} from 'react'
import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'
import {FiMenu} from 'react-icons/fi'
import {IoIosCloseCircle} from 'react-icons/io'
import Popup from 'reactjs-popup'
import './index.css'

class Header extends Component {
  onClickLogout = () => {
    const {history} = this.props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  renderPopupMenu = () => {
    const {tabActive} = this.props
    const cart = tabActive === 'cart-active' ? 'cart-active' : null
    const home = tabActive === 'home-active' ? 'home-active' : null
    return (
      <div className="popup-container">
        <Popup
          modal
          trigger={
            <button type="button" className="menu-button">
              <FiMenu className="menu-icon" />
            </button>
          }
        >
          {close => (
            <>
              <ul className="navbar-mobile-menu-container">
                <Link to="/" className="menu-link-item">
                  <li className={`list-item ${home}`}>Home</li>
                </Link>
                <Link to="/cart" className="menu-link-item">
                  <li className={`list-item ${cart}`}>Cart</li>
                </Link>
                <li className="list-item">
                  <button
                    type="button"
                    className="logout-desktop-btn"
                    onClick={this.onClickLogout}
                  >
                    Logout
                  </button>
                </li>
                <li className="list-item">
                  <button
                    type="button"
                    className="trigger-button"
                    onClick={() => close()}
                  >
                    <IoIosCloseCircle className="close-icon" />
                  </button>
                </li>
              </ul>
            </>
          )}
        </Popup>
      </div>
    )
  }

  render() {
    const {tabActive} = this.props
    const cart = tabActive === 'cart-active' ? 'cart-active' : null
    const home = tabActive === 'home-active' ? 'home-active' : null

    return (
      <>
        <nav className="navbar">
          <div className="navbar-logo-title-container">
            <Link to="/">
              <img
                src="https://res.cloudinary.com/chandanswamy/image/upload/v1687847733/Frame_274_j3lpbz.png"
                alt="website logo"
                className="nav-image"
              />
            </Link>
            <h1 className="nav-title">Tasty Kitchens</h1>
          </div>
          <ul className="navbar-desktop-menu-container">
            <Link to="/" className="link-item">
              <li className={`list-item ${home}`}>Home</li>
            </Link>
            <Link to="/cart" className="link-item">
              <li className={`list-item ${cart}`}>Cart</li>
            </Link>
            <li className="list-item">
              <button
                type="button"
                className="logout-desktop-btn"
                onClick={this.onClickLogout}
              >
                Logout
              </button>
            </li>
          </ul>
          <div className="navbar-mobile-menu-container">
            {this.renderPopupMenu()}
          </div>
        </nav>
      </>
    )
  }
}

export default withRouter(Header)
