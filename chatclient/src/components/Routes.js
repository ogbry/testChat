import React, { Component } from 'react'
import { BrowserRouter, Route } from 'react-router-dom'
import Chat from './chat-components/Chat'
import SignIn from './auth/Login'

export default class Routes extends Component {
    render() {
        return (
            <React.Fragment>
                <BrowserRouter>
                    <Route exact path="/" component={SignIn} />
                    <Route path="/chat" component={Chat} />
                </BrowserRouter>
            </React.Fragment>
        )
    }
}
