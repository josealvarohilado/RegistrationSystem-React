import EventTableItem from './EventTableItem'
import PropTypes from 'prop-types'

const EventTableBody = ({events, deleteEvent, selectEvent}) => {
    return (
        <tbody>
            {events.map((event)=><EventTableItem key={event.id} event={event} deleteEvent={deleteEvent} selectEvent={selectEvent}/>)}
        </tbody>
    )
}

EventTableBody.propTypes = {
    events: PropTypes.array,
    deleteEvent: PropTypes.func,
    selectEvent: PropTypes.func
}

export default EventTableBody
