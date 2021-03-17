const DropDownLocationItem = ({location}) => {
    return (
        <option value={location.id}>{location.name}</option>
    )
}

export default DropDownLocationItem
