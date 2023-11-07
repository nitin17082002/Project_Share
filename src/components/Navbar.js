import React, { useState } from "react";
import Styled from "styled-components";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";

import { useNavigate } from "react-router-dom";
import { Mobile } from "../responsive";
import { toggleSidebar } from "../redux/sideReducer";
import AccountContainer from "../components/AccountContainer";
import { useSelector, useDispatch } from "react-redux";

import { toggleAccountBar } from "../redux/accountReducer";
import { validURL } from "../config/chatLogics";

const Container = Styled.div`
display:flex;
align-items:center;
background-color:white;
color:black;

position:sticky;
z-index:2;
top:0px;
justify-content:center;
height:59px;
padding-left:20px;
padding-right:20px;
border-bottom:1px solid lightgrey;
`;
const Wrapper = Styled.div`
flex:1;
display:flex;
align-items:center;

justify-content:center;
`;
const Left = Styled.div`
flex:1;
display:flex;
align-items:center;;
justify-content:flex-start;

`;

const IconContainer = Styled.div`
display:flex;
align-items:center;
justify-content:center;
`;
const TitleContainer = Styled.div`
padding:0px 10px 0px 10px;


`;
const Title = Styled.h1`
margin: 0px auto 0px auto;
cursor:pointer;
font-size:32px;
${Mobile({ fontSize: "28px" })};`;

const Center = Styled.div`
flex:1.3;
display:flex;
align-items:center;
justify-content:center;`;

const InputContainer = Styled.div`
flex:9;
height:35px;
display:flex;
align-items:center;
jusify-content:center;
border:solid 2px gray;
border-top-left-radius:50px;
border-bottom-left-radius:50px;

background-color:white;
padding:2px 20px;
${Mobile({ padding: "2px 10px", width: "60px" })};
border-right:none;
`;

const Input = Styled.input`
background-color:white;
color:grey;
font-size: 18px;
font-size: 18px;
flex: 1;
border:none;
height: 30px;
outline:none;
 
&:focus{
 font-size: 18px;
font-size: 18px;
flex: 1;
border:none;
background-color:white;
    color:black;
height: 35px;
outline:none;
}
  &:-webkit-autofill,
&:-webkit-autofill:hover, 
&:-webkit-autofill:focus, 
&:-webkit-autofill:active{
   
    -webkit-box-shadow:0 0 0 30px #f6f9fa inset !important;
    -webkit-text-fill-color:black;
};
${Mobile({ width: "90%" })};

`;

const SearchIconContainer = Styled.div`
height:35px;
width:35px;
border-left:none;
display:flex;
align-items:center;
jusify-content:center;
border:solid 2px gray;
border-top-right-radius:50px;
border-bottom-right-radius:50px;
padding:2px 4px;
`;

const Right = Styled.div`
flex:1;
display:flex;
align-items:center;
justify-content:flex-end;`;

const UserContainer = Styled.div`
display:flex;
align-items:center;
height:40px;
width:40px;
border-radius:50%;
cursor:pointer;
display:flex;
align-items:center;
justify-content:center;
`;

const Img = Styled.img`
height:35px;
width:35px;
border-radius:50%;
object-fit:cover;
`;
const Span = Styled.span`
font-size:32px;
${Mobile({ display: "none" })};
color:#0081B4;`;
const Navbar = () => {
  const [search, setSearch] = useState("");

  const accountBar = useSelector((state) => state.accountbar.toggle);
  const user = useSelector((state) => state.user.currentUser);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSearch = () => {
    navigate(`/home/${search}`);
  };
  const IconStyle = {
    height: "35px",
    width: "35px",
    cursor: "pointer",
  };

  return (
    <Container>
      <AccountContainer toggle={accountBar} />
      <Wrapper>
        <Left>
          <IconContainer>
            <MenuRoundedIcon
              style={IconStyle}
              onClick={() => dispatch(toggleSidebar())}
            />
          </IconContainer>
          <TitleContainer>
            <Title>
              project
              <Span>Share</Span>
            </Title>
          </TitleContainer>
        </Left>
        <Center>
          <InputContainer>
            <Input
              placeholder="Search"
              className="NavbarInput"
              onChange={(e) => {
                setSearch(e.target.value);
              }}
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  handleSearch();
                }
              }}
            />
          </InputContainer>
          <SearchIconContainer>
            <SearchRoundedIcon
              onClick={() => handleSearch()}
              style={{
                height: "35px",
                width: "35px",
                cursor: "pointer",
                color: "gray",
              }}
            />
          </SearchIconContainer>
        </Center>
        <Right>
          <UserContainer clicked={true}>
            <Img
              onClick={() => {
                dispatch(toggleAccountBar());
              }}
              src={
                validURL(user.image)
                  ? user.image
                  : "https://cdn4.iconfinder.com/data/icons/man-user-human-person-business-profile-avatar/100/20-1User_13-512.png"
              }
            />
          </UserContainer>
        </Right>
      </Wrapper>
    </Container>
  );
};

export default Navbar;
