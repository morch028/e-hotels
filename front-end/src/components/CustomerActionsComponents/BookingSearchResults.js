import React from "react";
import HotelResult from "./HotelResult";

const filterHotels = ({category, chain, minRooms, area}) => hotel => {
  if (hotel.rooms.length === 0) {
    return false;
  }
  if (category && hotel.category !== parseInt(category)) {
    return false;
  }
  if (chain && hotel.hotelChainName !== chain) {
    return false;
  }
  // Todo: Replace once room count is actually included on the hotel
  if (minRooms && hotel.totalRooms < minRooms) {
    return false;
  }
  if (area && area.city !== hotel.address.city && area.country !== hotel.address.country) {
    return false;
  }
  // Passed all tests
  return true;
};

const filterRooms = ({minPrice, maxPrice, minCapacity}) => room => {
  if (minPrice && room.price < minPrice) {
    return false;
  }
  if (maxPrice && room.price > maxPrice) {
    return false;
  }
  if (minCapacity && room.capacity < minCapacity) {
    return false;
  }
  // Passed all tests
  return true;
};


export default class BookingSearchResults extends React.Component {
  static applyFilter = (roomsByHotel, filterSettings) =>
    Object.keys(filterSettings).length === 0
      ? roomsByHotel
      : roomsByHotel
      .filter(filterHotels(filterSettings))
      .map(({rooms, ...rest}) => ({...rest, rooms: rooms.filter(filterRooms(filterSettings))}))
      .filter(hotel => hotel.rooms.length > 0);

  render() {
    const {filterSettings, roomsByHotel, onSelectRoom} = this.props;
    const filteredRoomsByHotel = BookingSearchResults.applyFilter(roomsByHotel, filterSettings);
    return <>
      <h3>Search Results</h3>
      <ul className="no-bullet rails booking-search-results">
        {filteredRoomsByHotel.map(hotel =>
          <li key={`${hotel.hotelChainName}-${hotel.id}`}>
            <HotelResult hotel={hotel} onSelectRoom={onSelectRoom}/>
          </li>)}
        <li className="placeholder">
          No rooms
        </li>
      </ul>
    </>

  }
}