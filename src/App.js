import {Container, Button} from 'react-bootstrap'
import Header from './components/Header'
import Events from './components/Events'

function App() {
  return (
    <>
      <Header title='Registration System'/>
      <Container>
        <Events/>
      </Container>
    </>
  );
}

export default App;
