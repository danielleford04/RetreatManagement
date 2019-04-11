import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { returnFutureEvents } from '../global/utilities';
import { fetchEvents, setActiveEvent } from '../actions';

class EventsNavigation extends Component {
  constructor(props, context) {
    super(props, context);
    this.scroller = null;
    this.state = {
      lastActiveEvent: this.props.activeEvent,
    };
  }
  componentDidMount() {
    this.props.fetchEvents();
  }
  componentDidUpdate() {
    if((this.props.activeEvent !== this.state.lastActiveEvent)  ) {
    this.props.fetchEvents();
      this.setState({ lastActiveEvent: this.props.activeEvent })
  }
  }
  renderList() {
    return this.props.futureEvents.map((event) => {
      return (
        <li key={event._id} className="nav-item ">
          <Link className={"nav-link" + (event._id === this.props.activeEvent ? ' active' : '')}  onClick={() =>this.props.setActiveEvent(event._id)} to="/">{event.name}</Link>
        </li>
      );
    })
  }

  onClickLeft = () => {
    ReactDOM.findDOMNode(this.scroller).scrollLeft -= 300;
}
onClickRight = () => {
  this.scroller.scrollLeft += 300;
}

  render() {
    return(
      <div className="events-nav">
      <div className="scroller-arrow scroller-right" onClick={this.onClickLeft}><i className="fas fa-chevron-left"></i></div>


        <ul className="wrapper nav nav-tabs" ref={ (ref) => this.scroller=ref }>
          {this.renderList()}

        </ul>

        <div className="scroller-arrow scroller-left" onClick={this.onClickRight}><i className="fas fa-chevron-right"></i></div>
        <span id="add-new-event">
        <Link to="/new_event" className="">
        <button className="btn">
          Add Event
          </button>
        </Link>
        </span>
        </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    events: state.events,
    activeEvent: state.activeEvent,
    futureEvents: state.futureEvents,
  }
}

export default connect(mapStateToProps, { fetchEvents, setActiveEvent })(EventsNavigation);
