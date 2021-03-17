import {Form, Button} from 'react-bootstrap'
import DropDownLocationMenu from './DropdownLocationMenu'
import {useState, useEffect} from 'react'

const EventForm = ({event, locations, confirmation, formSubmitAction, formAction, closeForm}) => {
    // Initial event object
    const [name, setName] = useState(event.name ? event.name : '')
    const [location, setLocation] = useState(event.location ? event.location : 0)
    const [date, setDate] = useState(event.date ? event.date : '')

    useEffect(()=>{
        
    },[])

    // Submit form action
    const submitForm = (e) => {
        e.preventDefault()
        if (!name){
            alert('Please enter event name')
        } else if (location === 0){
            alert('Please choose location')
        } else if (!date){
            alert('Please choose event date')
        } else {
            const formData = {name, location, date}
            if (formAction.update) formData.id = event.id
            formSubmitAction(formData)
        }

        setName('')
        setLocation(0)
        setDate('')
    }

    return (
        <div style={{width:'50%', margin: '0 auto'}}>
            <div className='d-flex'>
                <h3>{formAction.formTitle}</h3>
                <Button className='btn btn-danger ml-auto' onClick={() => closeForm()}>Close</Button>
            </div>
            <Form className="mb-4" onSubmit={submitForm}>
                <Form.Group controlId="forEventDetails">
                    <Form.Label>Event Name</Form.Label>
                    <Form.Control type="text" placeholder="Enter event name" onChange={(e) => setName(e.target.value)} value={name}/>
                </Form.Group>
                <Form.Group controlId="forLocations">
                    <Form.Label>Location</Form.Label>
                    <Form.Control as="select" onChange={(e) => setLocation(parseInt(e.target.value))} value={location}>
                        <option value='0'>Please select location</option>
                        <DropDownLocationMenu locationList={locations}/>
                    </Form.Control>
                </Form.Group>
                <Form.Group controlId="forDate">
                    <Form.Label>Time and Date</Form.Label>
                    <Form.Control type="datetime-local" onChange={(e) => setDate(e.target.value)} value={date}/>
                </Form.Group>
                <Button className='btn-block' variant="primary" type="submit">{formAction.update ? 'Update Event' : 'Add Event'}</Button>
            </Form>
            {confirmation.action &&
            <div className={`alert ${confirmation.error ? 'alert-danger' : 'alert-success'}`} role='alert'>
                {confirmation.text}
            </div>
            }
        </div>
    )
}

export default EventForm
