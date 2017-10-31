import React from 'react'
import AdminBody from './bodys/AdminBody'
import Login from './login/Login'
import { gql, graphql} from 'react-apollo'
import { Route } from 'react-router'

const USERQUERY = gql`
    query {
        user {
            id
        }
    }
`
class App extends React.Component {

    constructor() {
        super()
        this.state = {
            authenticated: window.sessionStorage.getItem('graphcoolToken'),
        }
    }

    _setLoginState = (authenticated) => {
        if (window.sessionStorage.getItem('graphcoolToken')) {
            this.setState({ authenticated })
        }
    }

    _logout = () => {
        window.sessionStorage.removeItem('graphcoolToken')
        window.location.reload()
    }

    render() {
        return(
            <Route path="/" render={() => (
                this.state.authenticated !== null ? (
                  <AdminBody/>
                ) : (
                  <Login setAuthState={this._setLoginState} />
                )
            )}/>
        )
    }
}

export default graphql( USERQUERY, { options: { fetchPolicy: 'network-only'}})(App)