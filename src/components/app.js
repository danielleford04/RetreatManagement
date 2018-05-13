import React, { Component } from 'react';
import SideBar from '../components/sidebar_div.js';
import MainContent from '../components/main_content.js';

export default class App extends Component {
  render() {
    return (
      <div>
        <SideBar />
        <MainContent />
      </div>
    );
  }
}
