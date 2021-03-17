import {FaTimes} from 'react-icons/fa'
import PropTypes from 'prop-types'

const EventTableItem = ({event, deleteEvent, selectEvent}) => {
  const formatDate = (date) => {
      const dateToFormat = new Date(date)
      const formattedDate = {
        date: dateToFormat.toLocaleDateString('en-US',{weekday: 'long', year: 'numeric', month:'long', day: 'numeric', }),
        time: dateToFormat.toLocaleTimeString('en-US')
      }
      return formattedDate
  }

    return (
        <>
          <tr>
            <td onClick={() => selectEvent(event.id)} style={{cursor:'pointer'}}>{event.name}</td>  
            <td>{event.location}</td>
            <td>{formatDate(event.date).date}</td>
            <td>{formatDate(event.date).time}</td>
            <td><FaTimes style={{color: 'red', cursor:'pointer'}} className='pr-2' onClick={()=> deleteEvent(event.id)}/></td>
          </tr>
        </>
    )
}

EventTableItem.propTypes = {
  event: PropTypes.object,
  deleteEvent: PropTypes.func,
  selectEvent: PropTypes.func
}

export default EventTableItem
