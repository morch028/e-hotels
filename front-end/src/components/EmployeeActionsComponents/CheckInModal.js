import React from "react";
import {toast} from "react-toastify";
import ReactModal from "react-modal";
import BookingsTable from "./BookingsTable";
import AsyncButton from "../AsyncButton";

export default class CheckInModal extends React.Component {

  state = {
    loadingBookings: false,
    bookings: [],
    selectedBooking: null
  };

  loadBookings = async () => {
    const {hotelChainName, hotelId} = this.props;
    try {
      this.setState({loadingBookings: true});
      const response = await fetch(`/api/hotel-chains/${hotelChainName}/${hotelId}/bookings`);
      if (!response.ok) {
        throw new Error(`Unable to fetch bookings ${response.status}`);
      }
      const bookings = await response.json();
      this.setState({bookings, loadingBookings: false});
    } catch (error) {
      console.error(error);
      toast.error("Unable to load bookings");
      this.props.onRequestClose();
    }
  };

  checkIn = async () => {

  };

  render() {
    const {isOpen, onRequestClose} = this.props;
    const {selectedBooking, loadingBookings, bookings} = this.state;
    return <ReactModal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      onAfterOpen={this.loadBookings}
      appElement={document.getElementById('root')}
      className="modal-fit-content">

      <BookingsTable
        bookings={bookings}
        loadingBookings={loadingBookings}
        onSelectBooking={booking => this.setState({selectedBooking: booking})}/>

      <div>
        <AsyncButton onClick={this.checkIn}
                disabled={!Boolean(selectedBooking)}
                type="button"
                className="btn fill btn--inline">
          Check In
        </AsyncButton>

        <button onClick={onRequestClose}
                type="button"
                className="btn btn--inline">
          Cancel
        </button>
      </div>
    </ReactModal>
  }
}