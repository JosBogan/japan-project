import React from 'react'
import axios from 'axios'

class TripPlanner extends React.Component{

  state = {
    destinations: null,
    destinationsOpen: false,
    currentTripSegment: null,
    trip: [{}]
  }

  async componentDidMount() {
    try {
      const res = await axios.get('/api/destinations')
      const destinations = res.data.sort((a, b) => {
        return (a.name < b.name) ? -1 : (a.name > b.name) ? 1 : 0
      })
      this.setState({ destinations })
    } catch (err) {
      console.log(err)
    } 
  }

  chooseDestination = () => {
    const destination = this.state.destinations.find(destination => destination.name === event.target.getAttribute('data-name'))
    const newTrip = JSON.parse(JSON.stringify(this.state.trip))
    newTrip[this.state.currentTripSegment] = destination
    if (Object.keys(newTrip[newTrip.length - 1]).length !== 0) newTrip.push({})
    this.setState({ trip: newTrip, currentTripSegment: null, destinationsOpen: false })
  }

  chooseTripSegment = (index) => {
    this.setState({ destinationsOpen: true, currentTripSegment: index })
  }


  render() {
    return (
      <section className="body trip_plan_container">
        <div className="plan_options">
          {this.state.destinations &&
          this.state.destinationsOpen &&
          this.state.destinations.map(destination => {
            return (
              <div 
                key={destination.name}
                data-name={destination.name}
                className="plan_option"
                onClick={this.chooseDestination}
              >
                <div 
                  className="plan_option_image" 
                  style={{ 
                    backgroundImage: `url(${destination.imageURL})` 

                  }}
                ></div>
                <h2 className="plan_option_header">{destination.name}</h2>
              </div>
            )
          })}
        </div>
        <div className="planner">
          {this.state.trip.map((location, index) => (
            <div 
              key={index}
              className={
                `plan_location 
                ${this.state.currentTripSegment === index ? 'plan_location_selected' : ''} 
                ${Object.keys(location).length > 0 ? 'plan_location_chosen' : '' }`}
              onClick={() => this.chooseTripSegment(index)}
            >
              {console.log(Object.keys(location))}
              <div 
                className="plan_location_image"
                style={{ 
                  backgroundImage: `url(${location.imageURL})` 
                }}
              ></div>
              <h2 className="plan_location_name">{location.name}</h2>
              {/* <div 
                className="plan_location_inner" 
                style={{ 
                  backgroundImage: `url(${location.imageURL})` 
                }}
              ></div> */}
              {/* {Object.keys(location) > 0 &&
              
              } */}
            </div>
          ))}
        </div>
        <div>
        </div>
      </section>
    )
  }
}

export default TripPlanner