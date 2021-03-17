import {Button, Form, FormControl} from 'react-bootstrap'

const EventsSubHeading = ({title, buttonAction, searchValue}) => {
    return (
        <div className='d-flex'>
            <h2 className='mr-auto'>{title}</h2>
            <div className='mr-2'>
                <FormControl type="text" placeholder='Search Event' onChange={(e) => searchValue(e.target.value)}/>
            </div>
            <div className=''>
                <Button className='btn btn-success' onClick={()=>buttonAction()}>Add Event</Button>
            </div>
        </div>
    )
}

export default EventsSubHeading
