import React from "react";
import Navbar from "../components/Navbar";
import Styled from "styled-components";
import Sidebar from "../components/Sidebar";
import Content from "../components/Content";
const Container = Styled.div``;
const Wrapper = Styled.div`
position:relative;
display:flex;
align-items:flex-start;
justify-content:center;

`;

const Home = () => {
  const handleClick = (e) => {
    // console.log(e.target);
  };
  return (
    <Container>
      <Navbar />
      <Wrapper className="parent" onClick={(e) => handleClick(e)}>
        <Sidebar />
        <Content />
      </Wrapper>
    </Container>
  );
};

export default Home;
