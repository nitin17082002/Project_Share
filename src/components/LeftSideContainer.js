import React, { useState } from "react";
import Styled from "styled-components";
import SearchBar from "../components/SearchBar";
import { useSelector } from "react-redux";
import { Mobile } from "../responsive";
import Sidebar from "../components/SidebarContainer";
const Container = Styled.div`
width:40%;
flex:2;
position:sticky;

height:calc(100vh - 60px);
overflow:scroll;
&::-webkit-scrollbar {
  display: none;
};
background-color:#f8f9fa;

display:${(props) => (props.active ? "none" : "")};
${Mobile({
  width: "100%",
})}
${Mobile((props) =>
  props.active ? { display: "none", flex: "0" } : { flex: "1" }
)};
`;

const SwitchDiv = Styled.div`
position:sticky;


display:flex;
align-items:center;
padding-left:5px;
padding-right:5px;
height:50px;
justify-content:center;
cursor:pointer;
`;
const SidebarsContainer = Styled.div`
background-color:#f6f9fa;
display:flex;
height:50px;
align-items:center;
justify-content:center;
border:${(props) => props.active && "solid 1px lightgrey"};
border-top-right-radius:${(props) => props.active && "5px"};
border-top-left-radius:${(props) => props.active && "5px"};
border-bottom: ${(props) => props.active && "none"};
flex:1;`;
const SearchBarContainer = Styled.div`
background-color:#f6f9fa;
flex:1;
height:50px;
display:flex;
align-items:center;
justify-content:center;
border:${(props) => !props.active && "solid 1px lightgrey"};
border-top-right-radius:${(props) => !props.active && "5px"};
border-top-left-radius:${(props) => !props.active && "5px"};
border-bottom: ${(props) => !props.active && "none"};
`;
const Span = Styled.span`
font-size:24px;
color:grey;
font-weight:500;`;

const SidebarContainer = () => {
  const [currentChat, setCurrentChat] = useState(true);
  const activeChat = useSelector((item) => item.activechat.active);
  const activeStyle = {};

  return (
    <Container active={activeChat === null ? false : true}>
      <SwitchDiv>
        <SidebarsContainer
          active={currentChat}
          onClick={() => {
            !currentChat && setCurrentChat(true);
          }}
        >
          <Span>Your Chats</Span>
        </SidebarsContainer>
        <SearchBarContainer
          style={activeStyle}
          active={currentChat}
          onClick={() => {
            currentChat && setCurrentChat(false);
          }}
        >
          <Span>Add Chats</Span>
        </SearchBarContainer>
      </SwitchDiv>

      {currentChat ? <Sidebar /> : <SearchBar />}
    </Container>
  );
};

export default SidebarContainer;
