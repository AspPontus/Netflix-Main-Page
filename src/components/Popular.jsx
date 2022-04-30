import { useState, useEffect } from "react";
import styled from 'styled-components'
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/splide/dist/css/splide.min.css'
import './Popular.css'
import like from "./like-icon.png"
import add from "./add-icon.png"


function Popular() {

    const [popular, setPopular] = useState([]);//how do i know what to expect
    const [poster, setPoster] = useState([]);
    const [popup, setPopup] = useState(false)
    const [modalInfo, setModalInfo] = useState([])

    const getPopular = async () => {
        const api = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=645ad6e71f4c1ebceab47dcbb7e4118b`);
        const data = await api.json();
        setPopular(data.results)
       
    }

    const getPoster = async () => {
        const api = await fetch(`https://api.themoviedb.org/3/configuration?api_key=645ad6e71f4c1ebceab47dcbb7e4118b`)
        const data = await api.json();
        setPoster(data.images);
        
    }

//is this how to do it?
    useEffect(() => {
        getPoster();
        getPopular();
        //why in this order??
    }, [])

    const exit = () => {
        setPopup(!popup)
    }

    return (
        <div>
             
        <Wrapper>
        <h2>Popular Now</h2>
        <Splide options={{
                    perPage: 5,
                    arrows: true,
                    pagination: false,
                    drag: 'free',
                    gap: '1rem',
                    type: 'loop'
                    
                }}>
        {popular.map((item) => {



             const itemPopup = () => {
                setPopup(!popup)
                setModalInfo(item)
                console.log(`clicked ${item.title}`);             
            }

            
            

            return (
                <SplideSlide key={item.id}>         
                    <Card >
                        <Container>
                            <img src={`${poster.base_url}${poster.poster_sizes[4]}${item.poster_path}`} alt="" onClick={() => {itemPopup()}}/> 
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
                    perPage: 4,
                    arrows: true,
                    pagination: false,
                    drag: 'free',
                    gap: '1rem',
                    type: 'loop'
                    }}>
                     {popular.map((film) =>{
                         return(
                             
                            <SplideSlide>
                            <Card >
                            <Container>
                                <img src={`${poster.base_url}/w1280${film.poster_path}`} alt=""/> 
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
   
    </div>);
    
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
    border-radius: 4px;
    width 110% 
    
}
 
img:hover{
    transform: scale(1.19);
    transition: all .5s ease-in-out;
    background-color: grey;
    padding: 0rem 0rem 0rem 0rem;
    z-index: 2; 
    }

    @media (max-width: 768px){
        img{
            width: 140%;
        }
        @media (max-width: 508px){
            img{
                width: 160%;
            }
            @media (max-width: 400px){
                img{
                    width: 210%;
                } 
            }
        }
    }
`;
const Disc = styled.div`
display: none;
border: 2px solid blue;
position: absolute;
top: 0%;
left: 120%;
width: 15rem;
z-index: 4;
`;


const Wrapper = styled.div`
h2{
    font-size: 18px;
    margin: 1rem 1rem 0rem;
}
color: white;
`;

export default Popular;