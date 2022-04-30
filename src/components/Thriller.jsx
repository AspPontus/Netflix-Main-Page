import { useState, useEffect } from "react";
import styled from 'styled-components'
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/splide/dist/css/splide.min.css'
import "./thriller.css"
import like from "./like-icon.png"
import add from "./add-icon.png"

function Thriller() {
    const [thriller, setThriller] = useState([])
    const [poster, setPoster] = useState([])
    const [popup, setPopup] = useState(false)
    const [modalInfo, setModalInfo] = useState([])

    const getThriller = async () => {
        const api = await fetch(`https://api.themoviedb.org/3/discover/movie?api_key=645ad6e71f4c1ebceab47dcbb7e4118b&with_genres=53`)
        const data = await api.json();
        setThriller(data.results)
        console.log(data);
    }

    const getPoster = async () => {
        const api = await fetch(`https://api.themoviedb.org/3/configuration?api_key=645ad6e71f4c1ebceab47dcbb7e4118b`)
        const data = await api.json();
        setPoster(data.images)
        console.log(data);
    }

    const exit = () => {
        setPopup(!popup)
    }

    useEffect(() => {
        getPoster()
        getThriller()
    }, [])

       return ( 
       <div>
       <Wrapper>
           <h2>Thriller</h2>
        <Splide options={{
                    perPage: 3,
                    arrows: true,
                    pagination: false,
                    drag: 'free',
                    gap: '1rem',
                    type: 'loop'
                }}>
        {thriller.map((item) => {


            const itemPopup = () => {
                setPopup(!popup)
                setModalInfo(item)
                console.log(`clicked ${item.title}`);             
            }
            
            return (
                <SplideSlide key={item.id}>
                    <Card >
                        <Container>
                        <img src={`${poster.base_url}/w1280${item.backdrop_path}`} alt="" onClick={() => {itemPopup()}}/>
                        </Container>
                    </Card>
                </SplideSlide>
            )
        })}
        </Splide>
    </Wrapper>
    {popup && 
       <div className="modal">
           <div className="overlay" onClick={() => {exit()}}></div>
           <div className="modal-content">
               <div className="top">
                   <button className="close" onClick={() => {exit()}}>X</button>
                   <div className="gradient">
                   <img className="modal-img" src={`${poster.base_url}/w1280${modalInfo.backdrop_path}`} alt="" /> 
                   </div>
                  <div className="buttons">
                    <button className="play">Play Now</button> 
                    <div className="icons">
                    <img className="add" src={add} alt="" />
                    <img className="like" src={like} alt="" />
                        </div> 
                    
                  </div>
               
               </div>

               <div className="modal-desc">
                  <h2>{modalInfo.title}</h2>
                  <h4>{modalInfo.overview}</h4> 
               </div>
               <div className="recommended">
                   <h2 className="similar">Similar titles</h2>
                   <Splide
                   options={{
                    perPage: 3,
                    arrows: true,
                    pagination: false,
                    drag: 'free',
                    gap: '1rem',
                    type: 'loop'
                    }}>
                     {thriller.map((film) =>{
                         return(
                             
                            <SplideSlide>
                            <Card >
                            <Container>
                                <img src={`${poster.base_url}/w1280${film.poster_path}`} alt="" /> 
                            </Container>
                            </Card>
                            </SplideSlide>
                         )
                     })}

                   </Splide>
               </div>
           </div>
       </div>  
   }  
    </div>
     );
}

const Card = styled.div`
top: 20%;
color: white; 
padding: 1rem;
`;
const Container = styled.div`
position: relative;
img{
    position:sticky;
    border-radius: 1px;
    width 110% 
    
}
img:hover{ 
    transform: scale(1.25);
    transition: all .5s ease-in-out;
    z-index: 3;
}
@media (max-width: 768px){
    img{
        width: 120%;
    }
    @media (max-width: 468px){
        img{
            width: 150%;
        }
    }
}
`;

const Wrapper = styled.div`
h2{
    font-size: 18px;
    margin: 1rem 1rem 0rem;
}
color: white;
background-color: rgb(20, 20, 20);
border: 1px solid rgb(32, 32, 32);
`;

export default Thriller;