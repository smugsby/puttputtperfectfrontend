import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
//import Navbar from './elements/Navbar';
import { setContext } from '@apollo/client/link/context';
import {
  ApolloProvider,
  ApolloClient,
  createHttpLink,
  InMemoryCache,
} from '@apollo/client';
import { onError } from 'apollo-link-error';
import { ApolloLink } from 'apollo-link';

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    console.log('graphQLErrors', graphQLErrors);
  }
  if (networkError) {
    console.log('networkError', networkError);
  }
});


const link = createHttpLink({
  uri: '/graphql',
});

const logError = ApolloLink.from([errorLink, link]);
const auth = setContext((_, { headers }) => {
  const token = localStorage.getItem('id_token');
  return {
    headers: {
      ...headers,
   //   accept: 'application/json',
      authorization: token ? `Bearer ${token}` : '',
    }
  };
});

const apolloClient = new ApolloClient({
  link: auth.concat(link),
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={apolloClient}>
      <Router>
        <>
          {/* <Navbar /> */}
          <Routes>
            <Route exact path='/' element={<Login />} />
            <Route exact path='/dashboard' element={<Dashboard />} />
            <Route render={() => <h1 className='display-2'>Wrong page!</h1>} />
          </Routes>
        </>
      </Router>
    </ApolloProvider>
  );
}

export default App;
