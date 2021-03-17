import {Table} from 'react-bootstrap'
import EventTableBody from './EventTableBody'
import {useState, useEffect} from 'react'
import EventForm from './EventForm'
import appProperties from '../properties/ApplicationProperties'
import EventsSubHeading from './EventsSubHeading'

const Events = ({title}) => {
    const [confirmation, setConfirmation] = useState({
        text: '',
        error: false,
        action: false
    })
    const [formAction, setFormAction] = useState({
        updateEvent: false,
        addEvent: true,
        formTitle: '',
        formIsOpen: false
    })
    const [eventsDisplayed, setEventsDisplayed] = useState([])
    const [events, setEvents] = useState([])
    const [locations, setLocations] = useState([])
    const [selectedEvent, setSelectedEvent] = useState([])
    useEffect(() => {
        setDisplayEvents()
        setDisplayLocations()
    }, [])

    // Fetch single event from server
    const fetchEvent = async id => {
        const event = await fetch(`${appProperties.serverEvents}/${id}`)
        const data = await event.json()
        return data
    }

    // Fetch all events from server
    const fetchEvents = async () => {
        const fetchEvents = await fetch(appProperties.serverEvents)
        const eventData = await fetchEvents.json()
        return eventData
    }

    // Fetch all locations from server
    const fetchLocations = async () => {
        const locationsFromSever = await fetch(appProperties.serverLocation)
        const locData = await locationsFromSever.json()
        return locData
    }

    // Displays/Refereshs Events Shown
    const setDisplayEvents = async () => {
        const eventData = await fetchEvents()
        const locData = await fetchLocations()
        
        const getLocationName = id => {
            const locationName = (locData.filter(loc => loc.id === id).map(l => l.name).toString())
            return locationName ? locationName : ""
        }
        
        const eventsDisp = eventData.map(event => ({...event, location: getLocationName(event.location) }))
        setEvents(eventsDisp)
        setEventsDisplayed(eventsDisp)
    }

    // Displays/Sets Locations
    const setDisplayLocations = async () => {
        setLocations(await fetchLocations())
    }

    // Displays Events based on search
    const searchEvent = (eventName) => {
        setEventsDisplayed(events.filter(event => event.name.replace(' ','').toLowerCase().indexOf(eventName.toLowerCase()) > -1))
    }
    
    // Add event
    const formSubmitAction = async (event) => {
        const fetchAction = `${appProperties.serverEvents}${formAction.update ? '/' + event.id : '' }`
        const res = await fetch(fetchAction, {
            method: formAction.update ? 'PUT' : 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(event)
        })

        if(res.ok) {
            setConfirmAction(`Event ${formAction.update ? 'update' : 'added'} successfully`, false)
            setDisplayEvents()
            setFormAction({update: false, formTitle: 'Add Event'})
            actionAddEvent()
         } else setConfirmAction('Error encountered: Event not saved', true)
    }

    // Delete event
    const deleteEvent = async (id) => {
        const event = await fetchEvent(id)
        if (event) {
            const deleteConfirm = window.confirm(`Delete event ${event.name}?`)
            if (deleteConfirm) {
                const res = await fetch(`${appProperties.serverEvents}/${id}`, {
                method: 'DELETE'
                })
                if(res.ok) {
                    setConfirmAction('Event Deleted Successfully!',false)
                    setDisplayEvents()
                }  else setConfirmAction('Error Encountered: Event Not Deleted', true)
            } 
            
        }
    }

    // Sets confirmation message on Event Form
    const setConfirmAction = (text, error) => {
        setConfirmation({...confirmation, text: text, error: error, action: true})
        setTimeout(() => (setConfirmation({...confirmation, action: false})), 3000)
    }

    // Select Event
    const selectEvent = (id) => {
        fetchEvent(id).then(event => {
            setSelectedEvent([event])
            setFormAction({
                update: true,
                formTitle: 'Update Event',
                formIsOpen: true
            })
        })
    }

    const actionAddEvent = () => {
        setSelectedEvent([{
            id: 0,
            name: '',
            location: '',
            date: ''
        }])

        setFormAction({
            update: false,
            formTitle: 'Add Event',
            formIsOpen: true
        })
    }

    const closeForm = () => {
        setFormAction({...formAction, formIsOpen: false})
    }

    return (
        <div>
            <EventsSubHeading title={title} buttonAction={actionAddEvent} searchValue={searchEvent}/>
            {formAction.formIsOpen && (selectedEvent.map(event => <EventForm locations={locations} formSubmitAction={formSubmitAction} confirmation={confirmation} key={event.id} event={event} formAction={formAction} closeForm={closeForm}/>))}
            <Table>
                <thead>
                    <tr>
                        <td>Event Name</td>
                        <td>Location</td>
                        <td>Date</td>
                        <td>Time</td>
                        <td></td>
                    </tr>
                </thead>
                    <EventTableBody events={eventsDisplayed} deleteEvent={deleteEvent} selectEvent={selectEvent}/>
            </Table>
        </div>
    )
}

Events.defaultProps ={
    title: 'Events'
}

export default Events
