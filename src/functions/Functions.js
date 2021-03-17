import appProperties from '../properties/ApplicationProperties'

// Fetch single event from server
export const fetchEvent = async id => {
    const event = await fetch(`${appProperties.serverEvents}/${id}`)
    const data = await event.json()
    return data
}
