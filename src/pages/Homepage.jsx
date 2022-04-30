import Popular from "../components/Popular"
import Recomended from "../components/Recomended"
import Thriller from "../components/Thriller";
import Drama from "../components/Drama";
import Romance from "../components/Romance";
import Documentaries from "../components/Documentaries";
import Vignette from "../components/Vignette";
import styled from "styled-components"
import Navbar from "../components/Navbar";


function Homepage() {
    return (  
        <div>
            <Container>
                <Top>
                <Fixed>
                    <Navbar />
                </Fixed>
                    <Vignette />
                    <Content>
                    
                    <Popular />
                    <Recomended />
                    <Documentaries />
                    <Thriller /> 
                    <Romance />
                    <Drama />
                </Content>
                </Top>
            </Container>
        </div>
     
    );
}

const Fixed = styled.div`
position: fixed;
z-index: 3;
`;
const Top = styled.div`
position: relative;
z-index: 0;
`;
const Content = styled.div`
position: absolute;
top: 70%;
width: 100%;
z-index: 2;
`;
const Container = styled.div`
background-color: rgb(20, 20, 20);
height: 100vh;
width: 100%;
position: relative;
`;



export default Homepage;