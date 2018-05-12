import React, { Component } from 'react';
import SearchBar from '../containers/search_bar';
import WeatherList from '../containers/weather_list';
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
