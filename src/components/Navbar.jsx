import styled from "styled-components"
import logo from "./logo.png"
import bell from "./bell.png"
import search from "./search.png"
import netflixAvatar from "./Netflix-avatar.png"
import { useState, useEffect } from "react"


function Navbar() {

    const [show, handleShow] = useState(false)


    useEffect(() => {
        window.addEventListener("scroll", () => {
            if(window.scrollY > 100) {
                handleShow(true)
            }else handleShow(false)
        });
    }, []);
   
    return ( 
    <Nav className="nav" style={{backgroundColor: show && 'rgb(20,20,20)'}}>
        <Left>
            <Logo>
                <img className={logo} src={logo} alt="nope" />
            </Logo>
            <Links>
            <h4 className="browse">Browse</h4>
             <ul className="links">
                <li>Home</li> 
                <li>Series</li>
                <li>Films</li>
                <li>New and popular</li>
                <li>My list</li>
            </ul>
            </Links>
        </Left>
        <Right>
            <Icons>
                <img  src={search} alt="search" />
                <img src={bell} alt="notification" />
               
            </Icons>
            <Profile>
            <img src={netflixAvatar} alt="profile" />
            </Profile>
        </Right>

    </Nav> );
}

const Logo = styled.div`
img{
    margin: 1.1rem 1rem 0rem 2rem;
    width: 4rem;
}
@media (max-width: 768px){
    img{
        margin: .5rem 1rem 0rem 2rem;
    }
}

`;

const Links = styled.div`
ul{
  display: flex; 
  list-style: none; 
  font-size: 9px;
}
 li{
    color: white;
    margin: .7rem;
 }

 .browse{
     color: white;
     font-size: 10px;
     margin: .7rem 2rem 0rem;
     display: none;
 }
 @media (max-width: 768px){
     .links{
         display none
     }
     .browse{
         display: flex;
     }
     @media (max-width: 768px){
         .browse{
            margin: .7rem 0rem 0rem;
         }
     }
 }
`;

const Nav = styled.div`
display: flex;
justify-content: space-between;
align-items: center;
position: fixed;
z-index: 1;
width: 100%;
opacity: 1;
transition: all .5s;

`;

const Left = styled.div`
display: flex;
`;

const Right = styled.div`
display: flex;
margin: 1rem;
align-item: center;
`;

const Icons = styled.div`
display: flex;

img{
   width: 1rem;
   height: 1rem; 
   margin: .3rem .3rem; 
   cursor: pointer;
}
`;
const Search = styled.form`
`;

const Profile = styled.div`
img{
    width: 1.7rem;
}

margin: 0rem .5rem;
border-radius: 2px;
`;

export default Navbar;