import {Dropdown} from 'react-bootstrap'
import DropDownLocationItem from './DropDownLocationItem'

const DropdownLocationMenu = ({locationList}) => {
    return (
        <>
            {locationList.map((location) => <DropDownLocationItem key={location.id} location={location}/>)}
        </>
    )
}

export default DropdownLocationMenu
