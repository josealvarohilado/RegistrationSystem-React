import {Container} from 'react-bootstrap'

const Header = ({title}) => {
    return (
        <Container className="pb-2">
            <h1>{title}</h1>
        </Container>
    )
}

export default Header
