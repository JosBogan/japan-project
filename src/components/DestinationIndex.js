import React from 'react'
import axios from 'axios'

import DestinationCard from './DestinationCard'

class DestinationIndex extends React.Component{

  state = {
    destinations: null
  }

  async componentDidMount() {
    const response = await axios.get('/api/destinations')
    const destinations = response.data.sort((a, b) => {
      return (a.name < b.name) ? -1 : (a.name > b.name) ? 1 : 0
    })
    this.setState({ destinations })
  }

  render() {
    return (
      <section className="body index_container">
        {this.state.destinations ? this.state.destinations.map(destination => {
          return <DestinationCard key={destination.name} {...destination}/>
        }) : null }
      </section>
    )
  }
}

export default DestinationIndex