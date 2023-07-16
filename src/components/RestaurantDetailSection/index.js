import {Component} from 'react'

import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {AiFillStar} from 'react-icons/ai'

import Header from '../Header'
import Footer from '../Footer'

import './index.css'
import FoodItemCard from '../FoodItemCard'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class RestaurantDetailSection extends Component {
  state = {
    restaurantData: {},
    foodItemData: [],
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getRestaurantData()
  }

  getRestaurantData = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params

    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })
    const jwtToken = Cookies.get('jwt_token')

    const apiUrl = `https://apis.ccbp.in/restaurants-list/${id}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)

    if (response.ok === true) {
      const fetchedData = await response.json()
      const updatedData = {
        rating: fetchedData.rating,
        id: fetchedData.id,
        name: fetchedData.name,
        costForTwo: fetchedData.cost_for_two,
        cuisine: fetchedData.cuisine,
        imageUrl: fetchedData.image_url,
        reviewsCount: fetchedData.reviews_count,
        opensAt: fetchedData.opens_at,
        location: fetchedData.location,
        itemsCount: fetchedData.items_count,
        foodItems: fetchedData.food_items,
      }

      const updatedFoodItemsData = fetchedData.food_items.map(data => ({
        name: data.name,
        cost: data.cost,
        foodType: data.food_type,
        imageUrl: data.image_url,
        id: data.id,
        rating: data.rating,
      }))

      this.setState({
        restaurantData: updatedData,
        foodItemData: updatedFoodItemsData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderLoadingView = () => (
    <div
      data-testid="restaurant-details-loader"
      className="restaurant-loader-container"
    >
      <Loader type="TailSpin" color="#F7931E" height="50" width="50" />
    </div>
  )

  renderFailureView = () => {
    const {history} = this.props
    history.push('/not-found')
  }

  renderRestaurantDetailView = () => {
    const {restaurantData, foodItemData} = this.state

    const {
      rating,
      name,
      costForTwo,
      cuisine,
      imageUrl,
      reviewsCount,
      location,
    } = restaurantData

    return (
      <div className="restaurant-detail-container">
        <div className="wallpaper-container">
          <img src={imageUrl} className="restaurant-img" alt="restaurant" />
          <div className="restaurant-detail-content">
            <h1 className="name-heading">{name}</h1>
            <p className="content-description">{cuisine}</p>
            <p className="content-description">{location}</p>
            <div className="rating-and-coast-container">
              <div className="rating-container">
                <p className="content-description">
                  <AiFillStar className="icons" /> {rating}
                </p>
                <p className="content-description">{reviewsCount}+ Ratings</p>
              </div>
              <hr className="vertical-line" />
              <div className="rating-container">
                <p className="content-description">₹ {costForTwo}</p>
                <p className="content-description">Cost for two</p>
              </div>
            </div>
          </div>
        </div>
        <ul className="food-items-container">
          {foodItemData.map(foodItem => (
            <FoodItemCard foodData={foodItem} key={foodItem.id} />
          ))}
        </ul>
      </div>
    )
  }

  renderRestaurantDetails = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderRestaurantDetailView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  render() {
    return (
      <>
        <Header />
        <div className="product-item-details-container">
          {this.renderRestaurantDetails()}
        </div>
        <Footer />
      </>
    )
  }
}

export default RestaurantDetailSection
