import './App.css';
import { Box, Container } from '@mui/material';
import Header from './Components/header';
import StepperForm from './Components/stepperForm';



function App() {
  return (
    <Container maxWidth="xl">
      <Box textAlign={"center"} >
        <Header />
        <StepperForm/>
      </Box>
    </Container>
  );
}

export default App;
