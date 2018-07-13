// Last Update by Kevin Glasow on 07/12/2018

// *********************************************************************************
// secondCompenentRoutes.js - contains a set of routes for rending the second component of the HTML
// *********************************************************************************

// DEPENDENCIES
// =============================================================
import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Results from '../Results'

// Creating the Switch for the second section of the site
// =============================================================


const Second = () => (
    <second>
        <Switch>
            <Route path='/Search' component={ Results }/>
        </Switch>
    </second>
)

// Exporting the elements as Second"
export default Second;