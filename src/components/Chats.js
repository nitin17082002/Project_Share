import React from "react";
import Styled from "styled-components";
import LeftSideContainer from "./LeftSideContainer";
import ContentContainer from "./ContentContainer";
const Container = Styled.div`
position:sticky;
width:100%;
height:calc(100vh - 60px);

`;

const Chats = () => {
  return (
    <Container>
      <LeftSideContainer />
      <ContentContainer />
    </Container>
  );
};

export default Chats;
