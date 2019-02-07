import React, { Component } from 'react';
import EarthquakeDump from './EarthquakeDump/EarthquakeDump';
import MapContainer from './Map/MapContainer';

class App extends Component {
  constructor(){
    super();
    this.state = {
      quakesWeek: [],
      quakesMonth: [],
      isWeek: true
    }
  }
  getWeekQuakes = async ()=>{
    try{
      const apiResponse = await fetch(`https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/significant_week.geojson`);
      const quakesList = await apiResponse.json();
      this.setState({
        quakesWeek: quakesList.features
      })
      console.log(quakesList);
    }catch(err){
      return err;
    }
  }
  getMonthQuakes = async ()=>{
    try{
      const apiResponse = await fetch(`https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/significant_month.geojson`);
      const quakesList = await apiResponse.json();
      this.setState({
        quakesMonth: quakesList.features
      })
    }catch(err){
      return err;
    }
  }
  switchTime = ()=>{
    if(this.state.isWeek){
      this.setState({
        isWeek: false
      })
    }else{
      this.setState({
        isWeek: true
      })
    }
  }
  componentDidMount(){
    this.getWeekQuakes();
    this.getMonthQuakes();
  }
  render() {
    return (
      <div className="app">
        <div className="mapContainer">
          <MapContainer google={this.props.google} quakesList={this.state.isWeek ?this.state.quakesWeek: this.state.quakesMonth}/>
        </div>
        <button className="switch-button" onClick={this.switchTime}>Switch time</button>
        <div className="quakeContainer">
          <h1>Earthquakes from the past {this.state.isWeek ? 'week':'month'}: </h1>
            <EarthquakeDump quakesList={this.state.isWeek ?this.state.quakesWeek: this.state.quakesMonth} />
        </div>
      </div>
    );
  }
}

export default App;
