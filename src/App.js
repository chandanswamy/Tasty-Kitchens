import {Component} from 'react'
import {Switch, Route, Redirect} from 'react-router-dom'

import Home from './components/Home'
import Cart from './components/Cart'
import PageNotFound from './components/PageNotFound'
import Login from './components/Login'

import './App.css'

// eslint-disable-next-line
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

class App extends Component {
  render() {
    return (
      <>
        <Switch>
          <Route exact path="/login" component={Login} />
          <Route exact path="/" component={Home} />
          <Route exact path="/cart" component={Cart} />
          <Route exact path="/not-found" component={PageNotFound} />
          <Redirect to="/not-found" />
        </Switch>
      </>
    )
  }
}

export default App
