import Homepage from "./pages/Homepage";
import styled from "styled-components"



function App() {
  return (
    <Background className="App">
        <Homepage /> 
    </Background>
  );
}

const Background = styled.div`
background-color:rgb(20, 20, 20);
height: 150vh;
`;

export default App;
