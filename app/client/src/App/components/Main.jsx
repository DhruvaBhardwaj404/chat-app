import React, { Component } from 'react'

import { Switch, Redirect ,Route, Router} from 'react-router-dom'
import  {route}  from './route.js'



function Main() {
        return (
            <section >
            <Switch>
                <Redirect exact from='/' to='/Login' />
                {route.map((value)=><Route {...value} key={value.Component} />)}
            </Switch>
            </section>
        )
    }


export default Main
