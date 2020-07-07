import React from 'react'
import {Route, Switch} from 'react-router-dom'
import Repository from '../pages/Repository/index'
import Dashboard from '../pages/DashBoard/index'

const Routes : React.FC = () =>{
  return(
    <Switch>
      <Route path='/' component={Dashboard} exact></Route>
      <Route path='/repository' component={Repository}></Route>
    </Switch>
  )
}

export default Routes

