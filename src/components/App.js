import React from 'react'
import AdminNav from './navbars/AdminNav'
import AdminBody from './bodys/AdminBody'
import Login from './login/Login'

class App extends React.Component {
    render() {
        const loggedIn = false
        return(
            <div>
                { loggedIn === true ? <AdminBody /> : <Login /> }
            </div>
        )
    }
}

export default App