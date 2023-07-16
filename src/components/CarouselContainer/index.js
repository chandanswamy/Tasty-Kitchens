import {Component} from 'react'
import {withRouter} from 'react-router-dom'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'

import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class CarouselContainer extends Component {
  state = {carouselData: [], apiStatus: apiStatusConstants.initial}

  componentDidMount() {
    this.getCarouselData()
  }

  getCarouselData = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})

    const jwtToken = Cookies.get('jwt_token')

    const apiUrl = 'https://apis.ccbp.in/restaurants-list/offers'
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)

    if (response.ok === true) {
      const fetchedData = await response.json()

      const updatedData = fetchedData.offers.map(eachItem => ({
        imageUrl: eachItem.image_url,
        id: eachItem.id,
      }))

      this.setState({
        carouselData: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }
  }

  renderFailureView = () => {
    const {history} = this.props
    history.push('/not-found')
  }

  renderLoadingView = () => (
    <div
      data-testid="restaurants-offers-loader"
      className="carousel-loader-container"
    >
      <Loader type="TailSpin" color="#F7931E" height="50" width="50" />
    </div>
  )

  renderCarouselView = () => {
    const {carouselData} = this.state
    const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      arrows: false,
    }
    return (
      <div className="slider-container">
        <Slider {...settings}>
          {carouselData.map(eachItem => (
            <div key={eachItem.id}>
              <img
                src={eachItem.imageUrl}
                alt="offer"
                className="carousel-image"
              />
            </div>
          ))}
        </Slider>
      </div>
    )
  }

  renderAllOffers = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderCarouselView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  render() {
    return <div className="carousel">{this.renderAllOffers()}</div>
  }
}

export default withRouter(CarouselContainer)
