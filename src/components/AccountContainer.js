import React from "react";
import Styled from "styled-components";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import { useDispatch, useSelector } from "react-redux";
import { toggleAccountBar } from "../redux/accountReducer";
import { useNavigate } from "react-router-dom";
import { validURL } from "../config/chatLogics";
import { logout } from "../redux/userReducer";
import { resetActiveChat } from "../redux/activeChatReducer";
import { Mobile } from "../responsive";
const ParentContainer = Styled.div`
position:absolute;
top:0px;
left:0px;
z-index:5;
background-color:${(props) =>
  props.toggle ? "rgba(0,0,0,0.4)" : "rgba(0,0,0,0.2)"};
height:100vh;
width:100vw;
visibility:${(props) => (props.toggle ? "visible" : "hidden")};
display:flex;
align-items:center;
justify-content:center;
transition:background-color 0.5s ease;

`;

const Container = Styled.div`
background-color:white;
height:content-fit;
border-radius:10px;

box-shadow:0px 0px 20px grey;
width:400px;

${Mobile({ maxWidth: "300px" })};`;

const HeadingContainer = Styled.div`
height:25%;
display:flex;
align-items:center;
justify-content:center;`;
const Heading = Styled.h1`
display:flex;
align-items:center;
justify-content:center;
margin:10px auto;`;
const ImageContainer = Styled.div`
display:flex;
align-items:center;
height:35%;
display:flex;
align-items:center;
justify-content:center;
justify-content:center;`;
const Image = Styled.img`
height:100px;
margin:0px;
width:100px ;
border-radius:50%;
object-fit:cover;

`;
const IconContainer = Styled.div`
width:30px;
height:30px;
border-radius:5px;
display:flex;
align-items:center;
justify-content:center;
background-color:#ff0506;
color:white;`;

const EmailContainer = Styled.div`
display:flex;
align-items:center;
justify-content:center;
height:25%;`;
const HeadingEmail = Styled.h1`
color:grey;
margin:10px auto;`;
const CloseContainer = Styled.div`
display:flex;
align-items:center;
justify-content:center;`;
const Button = Styled.button`
font-size:18px;
padding:5px 12px;
border:none;
border-radius:5px;
margin-bottom:20px;
cursor:pointer;
background-color:#0081B4;
color:white;
height:15%;`;

const CloseIconContainer = Styled.div`
padding-top:5px;
padding-right:5px;
display:flex;
align-items:center;
justify-content:flex-end;
height:10%;
`;
const PersonContainer = ({ toggle }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.currentUser);
  const handleClick = (e) => {
    if (e.target.classList.contains("parent")) {
      dispatch(toggleAccountBar());
    }
  };
  const handleLogout = () => {
    dispatch(logout());
    dispatch(toggleAccountBar());
    dispatch(resetActiveChat());
    navigate("/login");
  };

  return (
    <ParentContainer
      className="parent"
      onClick={(e) => {
        handleClick(e);
      }}
      toggle={toggle}
    >
      <Container>
        <CloseIconContainer>
          <IconContainer>
            <CloseRoundedIcon
              style={{
                height: "30px",
                width: "30px",
                cursor: "pointer",
              }}
              onClick={() => {
                dispatch(toggleAccountBar());
              }}
            />
          </IconContainer>
        </CloseIconContainer>
        <HeadingContainer>
          <Heading>{user?.name}</Heading>
        </HeadingContainer>
        <ImageContainer>
          <Image
            src={
              validURL(user?.image)
                ? user?.image
                : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
            }
          />
        </ImageContainer>
        <EmailContainer>
          <HeadingEmail>{user?.email?.slice(0, 10)}</HeadingEmail>
        </EmailContainer>
        <CloseContainer>
          <Button
            onClick={() => {
              handleLogout();
            }}
          >
            Logout
          </Button>
        </CloseContainer>
      </Container>
    </ParentContainer>
  );
};

export default PersonContainer;
