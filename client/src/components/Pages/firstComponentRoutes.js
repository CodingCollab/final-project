// Last Update by Kevin Glasow on 07/12/2018

// *********************************************************************************
// firstComponentRoutes.js - contains a set of routes for rending the top most component of the main page
// *********************************************************************************

// DEPENDENCIES
// =============================================================
import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Login from '../Login'
import NewRequestForm from '../NewRequestForm'
import Home from '../Home'
import About from '../About'
import Search from '../Search'
import NewLanguageForm from '../NewLanguageForm';
import NewUserForm from '../NewUserForm'
import SingleResult from '../SingleResult'

// Creating the Switch for the main section of the site
// =============================================================
const Main = () => (
    <main>
        <Switch>
            <Route exact path='/' component={ Home }/>
            <Route path='/Login' component={ Login }/>
            <Route path='/NewRequestForm' component={ NewRequestForm }/>
            <Route path='/About' component={ About }/>
            <Route path='/Search' component={ Search }/>
            <Route path='/NewLanguageForm' component={ NewLanguageForm }/>
            <Route path='/NewUserForm' component={ NewUserForm }/>
            <Route path='/SingleResult' component={ SingleResult }/>
        </Switch>
    </main>
)

// Exporting the elements as "Main"
export default Main;