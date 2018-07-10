// Last Update by Kevin Glasow on 07/01/2018

// *********************************************************************************
// htmlRoutes.js - contains a set of routes for sending users to the various html pages
// *********************************************************************************

// DEPENDENCIES
// =============================================================
import React from 'react'
import { Switch, Route } from 'react-router-dom'

import Login from '../Login'
import NewRequestForm from '../NewRequestForm'
import Home from '../Home'

const Main = () => (
    <main>
        <Switch>
            <Route exact path='/' component={ Home }/>
            <Route path='/Login' component={ Login }/>
            <Route path='/NewRequestForm' component={ NewRequestForm }/>
        </Switch>
    </main>
)

export default Main