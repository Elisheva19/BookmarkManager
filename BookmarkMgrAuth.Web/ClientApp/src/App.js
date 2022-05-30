import React, { Component } from 'react';
import { Route } from 'react-router';
import Home from './Pages/Home';
import Layout from './Components/Layout';
import { BookmarkContextComponent } from './BookmarkContext';
import Signup from './Pages/Signup';
import PrivateRoute from './Components/PrivateRoute';
import Login from './Pages/Login';
import AddBookmark from './Pages/AddBookmark';
import './custom.css'
import Logout from './Pages/Logout';
import MyBookmarks from './Pages/MyBookmarks';

export default class App extends Component {
  static displayName = App.name;

  render () {
    return (
      <BookmarkContextComponent>
      <Layout>
        <Route exact path='/' component={Home} />
        <Route exact path='/signup' component={Signup}/>
        <Route exact path='/login' component={Login}/>
        <Route exact path='/logout' component={Logout}/>
        <PrivateRoute exact path='/addbookmark' component={AddBookmark} />
        <PrivateRoute exact path='/mybookmarks' component={MyBookmarks}/>
        
       
      </Layout>
      </BookmarkContextComponent>
    );
  }
}
