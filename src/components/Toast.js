import React, { useState, useEffect } from "react";
import Styled from "styled-components";
import { useSelector } from "react-redux";
const ParentContainer = Styled.div`

position:absolute;
top:0px;
left:0px;
right:0px;
bottom:0px;
height:100vh;
width:100vw;
visibility:${(props) => (props.visibility === true ? "visible" : "hidden")};
overflow:hidden;
z-index:10;
display:flex;
justify-content:flex-end;

`;
const Container = Styled.div`
position:absolute;
height:50px;
width:300px;
color:white;
background-color:#0081B4;
z-index:8;
top:65px;
right:${(props) => (props.visibility ? "20px" : "-600px")};
transition:all 0.5s ease;
border-radius:5px;
display:flex;align-items:center;
justify-content:center;
display:flex;
align-items:center;
justify-content:center;
padding:5px 12px;
`;
const ContainerText = Styled.span`
font-size:20px;
color:white;`;

const Toast = () => {
  const [visible, setVisible] = useState(false);
  const warning = useSelector((state) => state.warning);
  useEffect(() => {
    setTimeout(() => {
      setVisible(true);
      setFalse();
    }, 100);
  }, []);

  const setFalse = () => {
    setTimeout(() => {
      setVisible(false);
    }, 2000);
  };

  return (
    <ParentContainer visibility={visible}>
      <Container visibility={visible}>
        {/* <WarningIcon style={{ marginRight: "20px" }} /> */}
        <ContainerText>{warning.warning}</ContainerText>
      </Container>
    </ParentContainer>
  );
};

export default Toast;
