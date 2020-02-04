import React from 'react'
import { Link } from 'react-router-dom'

class DestinationCard extends React.Component{
  render() {
    return (
      <div className="card">
        {/* <Link to={{ pathname: `/destinations/${this.props.name}`, state: { p: this.props } }} className="card_inner"> */}
        <Link to={`/destinations/${this.props._id}`} className="card_inner">
          <div className ="card_image" style={{ backgroundImage: `url(${this.props.imageURL})` }}></div>
          <div className="card_info">
            <h2>{this.props.name}</h2>
            <h3>{this.props.region}</h3>
            <h3>{this.props.rating}</h3>
          </div>
        </Link>
      </div>
    )
  }
}

export default DestinationCard