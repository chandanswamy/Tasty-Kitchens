import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {MdKeyboardArrowLeft, MdKeyboardArrowRight} from 'react-icons/md'

import Header from '../Header'
import Footer from '../Footer'
import CarouselContainer from '../CarouselContainer'
import RestaurantHeader from '../RestaurantHeader'

import './index.css'
import RestaurantCard from '../RestaurantCard'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

const sortByOptions = [
  {
    id: 0,
    displayText: 'Highest',
    value: 'Highest',
  },
  {
    id: 2,
    displayText: 'Lowest',
    value: 'Lowest',
  },
]

class Home extends Component {
  constructor(props) {
    super(props)
    this.state = {
      restaurantList: [],
      apiStatus: apiStatusConstants.initial,
      activeOptionId: sortByOptions[1].value,
      searchInput: '',
      activePage: 1,
      totalItems: 0,
    }
  }

  componentDidMount() {
    this.getRestaurant()
  }

  getRestaurant = async () => {
    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })
    const jwtToken = Cookies.get('jwt_token')
    const {activeOptionId, searchInput, activePage} = this.state
    const limit = 9
    const offset = (activePage - 1) * limit

    const apiUrl = `https://apis.ccbp.in/restaurants-list?search=${searchInput}&offset=${offset}&limit=${limit}&sort_by_rating=${activeOptionId}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)

    if (response.ok === true) {
      const fetchedData = await response.json()
      const updatedData = fetchedData.restaurants.map(eachItem => ({
        hasOnlineDelivery: eachItem.has_online_delivery,
        userRating: eachItem.user_rating,
        name: eachItem.name,
        hasTableBooking: eachItem.has_table_booking,
        isDeliveringNow: eachItem.is_delivering_now,
        costForTwo: eachItem.cost_for_two,
        cuisine: eachItem.cuisine,
        imageUrl: eachItem.image_url,
        id: eachItem.id,
        menuType: eachItem.menu_type,
        location: eachItem.location,
        opensAt: eachItem.opens_at,
        groupByTime: eachItem.group_by_time,
      }))

      const totalItems = fetchedData.total

      this.setState({
        restaurantList: updatedData,
        apiStatus: apiStatusConstants.success,
        totalItems,
      })
    } else {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }
  }

  changeSortby = activeOptionId => {
    this.setState({activeOptionId}, this.getRestaurant)
  }

  onClickLeft = () => {
    this.setState(prevState => {
      if (prevState.activePage > 1) {
        return {activePage: prevState.activePage - 1}
      }
      return {activePage: prevState.activePage}
    }, this.getRestaurant)
  }

  onClickRight = () => {
    this.setState(prevState => {
      const totalPages = prevState.totalItems / 9
      if (prevState.activePage <= totalPages) {
        return {activePage: prevState.activePage + 1}
      }
      return {activePage: prevState.activePage}
    }, this.getRestaurant)
  }

  renderLoadingView = () => (
    <div
      data-testid="restaurants-list-loader"
      className="restaurant-loader-container"
    >
      <Loader type="TailSpin" color="#F7931E" height="50" width="50" />
    </div>
  )

  renderFailureView = () => {
    const {history} = this.props
    history.push('/not-found')
  }

  enterSearchInput = () => {
    this.getRestaurant()
  }

  changeSearchInput = searchInput => {
    this.setState({searchInput})
  }

  renderRestaurantListView = () => {
    const {
      restaurantList,
      activeOptionId,
      activePage,
      totalItems,
      searchInput,
    } = this.state
    return (
      <div className="all-restaurant-container">
        <RestaurantHeader
          activeOptionId={activeOptionId}
          sortByOptions={sortByOptions}
          changeSortby={this.changeSortby}
          searchInput={searchInput}
          changeSearchInput={this.changeSearchInput}
          enterSearchInput={this.enterSearchInput}
        />
        <ul className="restaurant-list">
          {restaurantList.map(restaurant => (
            <RestaurantCard
              restaurantData={restaurant}
              key={restaurant.id}
              testid="restaurant-item"
            />
          ))}
        </ul>
        <div className="page-container">
          <button
            type="button"
            className="page-controller-button"
            onClick={this.onClickLeft}
            data-testid="pagination-left-button"
          >
            <MdKeyboardArrowLeft className="pagination-arrow" />
          </button>
          <p className="page-no-quantity">
            <span data-testid="active-page-number">{activePage}</span> of{' '}
            {Math.ceil(totalItems / 9)}
          </p>
          <button
            type="button"
            className="page-controller-button"
            onClick={this.onClickRight}
            data-testid="pagination-right-button"
          >
            <MdKeyboardArrowRight className="pagination-arrow" />
          </button>
        </div>
      </div>
    )
  }

  renderAllRestaurants = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderRestaurantListView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  render() {
    const tabActive = 'home-active'
    return (
      <div className="home-route">
        <Header tabActive={tabActive} />
        <CarouselContainer />
        <div className="home-restaurants">{this.renderAllRestaurants()}</div>
        <Footer />
      </div>
    )
  }
}

export default Home
