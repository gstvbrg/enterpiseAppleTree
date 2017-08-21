import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom'
import App from './components/App';

import {
    ApolloClient, 
    createNetworkInterface, 
    ApolloProvider,
} from 'react-apollo'

const networkInterface = createNetworkInterface({
    uri: 'https://api.graph.cool/simple/v1/cj5k1l1ko72l20122kx69za3q'
})

const client = new ApolloClient({
    networkInterface
})

ReactDOM.render((
    <ApolloProvider client={client}>
        <Router>
            <App />
        </Router>
    </ApolloProvider>
    ), document.getElementById('root')
)
