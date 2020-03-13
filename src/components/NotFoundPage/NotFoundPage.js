import React, { Component } from 'react';
import './NotFoundPage.css'

export default class NotFoundPage extends Component {
  render() {
    return (
      <div className='notFoundPage'>
        <h2>Page Not Found</h2>
        <p>This page does not exist!</p>
        <p>Try going back or using the navigation menu.</p>
      </div>
    )
  }
}