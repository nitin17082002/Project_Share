import React, { useState } from "react";
import Styled from "styled-components";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Loader from "../components/Loader";
import { loginStart, loginSuccess, loginFailure } from "../redux/userReducer";
import { useSelector, useDispatch } from "react-redux";
import { toggleWarningBar } from "../redux/warningReducer";

import axios from "axios";

const Container = Styled.div`
height:100vh;

background-color:#f8f9fa;
color:black;
display:flex;
align-items:center;
justify-content:center;

`;

const Wrapper = Styled.div`
display:flex;
align-items:center;
justify-content:center;
flex-direction:column;
width:300px;
border-radius:10px;

padding:40px 40px;
background-color:white;

`;
const Title = Styled.h1`
font-size:35px;
margin-top:10px;
margin-bottom:10px;
`;
const Span = Styled.span`
color:#0081B4;
font-size:35px;
`;

const LoginText = Styled.span`
font-size: 25px;
margin-bottom:20px;
margin-top:10px;
`;

const InputContainer = Styled.div`
  display:flex;
  align-items:center;
  justify-content:center;
  padding:10px 5px;
  height:30px;
  background-color:white;
  border:solid gray 1px;
  border-top:${(props) => props.name === "password" && "none"};
  border-top-left-radius:${(props) => props.name === "username" && "5px"};
  border-top-right-radius:${(props) => props.name === "username" && "5px"};
  border-bottom-right-radius:${(props) => props.name === "password" && "5px"};
  border-bottom-left-radius:${(props) => props.name === "password" && "5px"};
  width:90%;
`;
const Input = Styled.input`
  font-size:18px;
  background-color:white;
  color:grey;
  width:90%;
  height:90%;
  border:none;
  &:focus{
    width:90%;
    height:90%;
    border:none;
    background-color:white;
    color:black;
    outline:none;
  }
  &:-webkit-autofill,
&:-webkit-autofill:hover, 
&:-webkit-autofill:focus, 
&:-webkit-autofill:active{
   
    -webkit-box-shadow:0 0 0 30px white inset !important;
    -webkit-text-fill-color: black;
}
`;
const CheckboxContainer = Styled.div`
width:90%;
display:flex;
padding:10px;
align-items:center;
justify-content:center;
margin-top:10px;
margin-bottom:10px;
`;

const Button = Styled.button`
padding:10px 5px;
height:50px;
width:97%;
border:none;
border-radius:10px;
background-color:#0d6efd;
display:flex;
align-items:center;
justify-content:center;
font-size:20px;
color:white;
cursor:pointer;
&:hover{
    background-color:#0d6ee5;
}`;

const Warning = Styled.span`
margin-top:10px;`;
const Login = () => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleNotification = (message) => {
    dispatch(toggleWarningBar(message));
    setTimeout(() => {
      dispatch(toggleWarningBar(""));
    }, 3000);
  };
  const user = {
    username: userName,
    password: password,
  };
  const dispatch = useDispatch();
  const handleClick = async (e) => {
    e.preventDefault();
    if (!password || !userName) {
      handleNotification("Please fill all the details");
      return;
    }
    setLoading(true);
    try {
      dispatch(loginStart());
      const res = await axios.post(
        "https://projectshare.onrender.com/api/user/login",
        user
      );

      dispatch(loginSuccess(res.data));

      navigate("/home");
    } catch (err) {
      handleNotification("Incorrect username or password");
      dispatch(loginFailure());
    }
    setLoading(false);
  };

  return (
    <Container>
      <Wrapper>
        <Title>
          project<Span>Share</Span>
        </Title>
        <LoginText>Please Login</LoginText>
        <InputContainer name="username">
          <Input
            placeholder="Username"
            onChange={(e) => {
              setUserName(e.target.value);
            }}
          />
        </InputContainer>
        <InputContainer name="password">
          <Input
            type="password"
            placeholder="Password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </InputContainer>
        <CheckboxContainer>
          {/* <Input
            style={{ width: "20px", marginRight: "10px" }}
            type="checkbox"
          /> */}
          {/* <label>Remember Me</label> */}
        </CheckboxContainer>
        <Button
          type="submit"
          onClick={(e) => {
            handleClick(e);
          }}
        >
          {loading ? <Loader /> : "Login"}
        </Button>

        <Warning>
          Don't have an account?{" "}
          <Link to="/register" style={{ all: "unset", cursor: "pointer" }}>
            Register
          </Link>
        </Warning>
      </Wrapper>
    </Container>
  );
};

export default Login;
