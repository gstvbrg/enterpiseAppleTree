import React from 'react'
import AdminNav from './navbars/AdminNav'
import AdminBody from './bodys/AdminBody'

class App extends React.Component {
    render() {
        return(
            <div>
                {/* conditionally render navigation based on role */}
                <AdminNav />
                <AdminBody />
            </div>
        )
    }
}

export default App