import {BsFilterRight, BsSearch} from 'react-icons/bs'

import './index.css'

const RestaurantHeader = props => {
  const {sortByOptions, activeOptionId, searchInput} = props
  const onChangeSortby = event => {
    const {changeSortby} = props
    changeSortby(event.target.value)
  }

  const onEnterSearchInput = event => {
    const {enterSearchInput} = props
    if (event.key === 'Enter') {
      enterSearchInput()
    }
  }

  const onChangeSearchInput = event => {
    const {changeSearchInput} = props
    changeSearchInput(event.target.value)
  }

  return (
    <div className="restaurant-header">
      <div>
        <h1 className="restaurant-list-heading">Popular Restaurants</h1>
      </div>
      <div className="filter-container">
        <p className="restaurant-list-description">
          Select Your favourite restaurant special dish and make your day
          happy...
        </p>
        <div className="sort-by-container">
          <div className="sort-by-icon-container">
            <BsFilterRight className="sort-by-icon" />
            <p className="sort-by">Sort by</p>
          </div>
          <select
            className="sort-by-select"
            value={activeOptionId}
            onChange={onChangeSortby}
          >
            {sortByOptions.map(eachOption => (
              <option
                key={eachOption.id}
                value={eachOption.value}
                className="select-option"
              >
                {eachOption.displayText}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="search-input-container">
        <input
          value={searchInput}
          type="search"
          className="search-input"
          placeholder="Search"
          onChange={onChangeSearchInput}
          onKeyDown={onEnterSearchInput}
        />
        <BsSearch className="search-icon" />
      </div>
    </div>
  )
}

export default RestaurantHeader
