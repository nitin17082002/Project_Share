import React, { useState, useEffect } from "react";
import Styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import SearchProjects from "./SearchProject";
import Loader from "../components/Loader";
import axios from "axios";
const Container = Styled.div`
`;
const Wrapper = Styled.div`
`;
const Header = Styled.div`
margin:10px 20px;
display:flex;
align-items:center;
justify-content:space-between;`;
const Heading = Styled.h1`
margin:0px;`;
const Button = Styled.button`
border:none;
font-size:24px;
background-color:#0081B4;
border-radius:10px;
color:white;
transition:all 0.3s ease;
&:hover{
  transform:scale(1.01);
  cursor:pointer;
}
padding:8px 15px;`;

const Projects = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  let user = useSelector((state) => state.user.currentUser);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const fetchProjects = async () => {
      setLoading(true);
      try {
        let res = await axios.get(
          "https://projectshare.onrender.com/api/project/user",
          {
            headers: { Authorization: `Bearer ${user.accessToken}` },
          }
        );
        setData(res.data);
      } catch (error) {}
      setLoading(false);
    };
    fetchProjects();
  }, [user.accessToken]);

  return (
    <Container>
      <Wrapper>
        <Header>
          <Heading>My Projects</Heading>
          <Button
            onClick={() => {
              navigate("new");
            }}
          >
            Create
          </Button>
        </Header>
        {loading && <Loader />}
        {data?.map((item) => (
          <SearchProjects item={item}></SearchProjects>
        ))}
      </Wrapper>
    </Container>
  );
};

export default Projects;
