import { useEffect, useState } from "react";
import styled from 'styled-components'


function Vignette() {
    const [vignette, setVignette] = useState([])
    const [backdrop, setBackdrop] = useState([])

    const getVignette = async () => {
        const api = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=645ad6e71f4c1ebceab47dcbb7e4118b`)
        const data = await api.json();
        setVignette(data.results[Math.floor(Math.random() * data.results.length -1)])
        console.log(data);
    }

    const getBackdrop = async () => {
        const api = await fetch(`https://api.themoviedb.org/3/configuration?api_key=645ad6e71f4c1ebceab47dcbb7e4118b`)
        const data = await api.json();
        setBackdrop(data.images)
        console.log(data);
    }

    useEffect(() => {
        getBackdrop()
        getVignette()
    },[])

  

    return ( 
        
        <Card>
            <div className="gradient">
                <img src={`${backdrop.base_url}/w1280${vignette.backdrop_path}`} alt="" />
            </div>
                <Disc>
                    <div className="container">
                    <h2>{vignette.title}</h2>
                    <h4 className="overview">{vignette.overview}</h4>
                    <Play className="Play">Play</Play>
                    <More className="More-info">More info</More>
                    </div>
                </Disc>
       
        </Card> );
}


 


const Card = styled.div`
color: white;
position: relative;
background-color: rgb(20, 20, 20);
z-index: 2;
align-items: center;
img{
    position: relative;
    width: 100%;
    z-index: -1;
}
.gradient{
    background: linear-gradient(rgba(20,20,20,0.4), rgba(20,20,20,1));
}
`;
const Disc = styled.div`
margin: 3rem 2rem;
max-width: 20rem;
position: absolute;
top: 13%;
left: 0%;
text-align: center;
align-items: center;
width: 40%;
height: 20%;

.overview{
    font-weight: 400;
    font-size: 12px;

}
@media (max-width: 800px){
    top: 15%;
    left: 0%;
    margin: 3rem 1rem;
    .overview{
        display: none;
    }
    .container{
        width:100%;
    }
    @media (max-width: 408px){
        top: 0%;
        margin: 2.5rem 0rem 2rem 0rem;
        width: 60%;
        .container{
            padding: 0rem;
            margin: 0rem 0rem 2rem 0rem;
        }
    }
}
`;

const Play = styled.button`
background-color: white;
color: black;
padding: .5rem 3rem;
border: none;
font-weight: bold;
font-size: 14px;
border-radius: 5px;
width: 40%;
@media (max-width: 768px){
    padding: .3rem 1.5rem;
    font-size: 10px;
    width: 6rem;
    @media (max-width: 568px){
       width: 35%;
        margin: auto; 
    }
    
}


`;
const More = styled.button`
background-color: rgba(130, 130, 130, 0.8);
color: black;
padding: .5rem 2rem;
border: none;
font-weight: bold;
font-size: 14px;
border-radius: 5px;
margin: 1rem;
width: 45%;
@media (max-width: 768px){
    padding: .3rem 1.5rem;
    margin: .3rem;
    font-size: 10px;
    width: 6rem;
    @media (max-width: 568px){
        width: 35%;
        padding: .3rem .5rem;
        
    }
}

`;

export default Vignette;