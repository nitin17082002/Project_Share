import React from "react";
import Styled from "styled-components";
import Home from "../components/Home";
import Profile from "../components/Profile";
import ViewProfile from "../components/ViewProfile";
import Chats from "../components/Chats";
import Projects from "../components/Projects";
import CreateProject from "../components/CreateProject";
import UpdateProject from "../components/UpdateProject";
import Project from "../components/Project";
import CreateGroup from "../components/CreateGroup";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

const Container = Styled.div`
flex:3.5;
top:60px;
position:sticky;
overflow:scroll;

height:calc(100vh - 60px);
&::-webkit-scrollbar{
  display:none;
}
`;

const Content = () => {
  let Location = useLocation();
  const createGroup = useSelector((state) => state.creategroup.group);
  Location = Location.pathname.split("/");

  let page = Location[1];

  return (
    <Container>
      {createGroup && <CreateGroup />}
      {page === "home" && <Home />}
      {page === "profile" && Location.length <= 2 && <Profile />}
      {page === "profile" && Location.length > 2 && <ViewProfile />}
      {page === "chats" && <Chats />}

      {page === "projects" && Location.length <= 2 && <Projects />}
      {page === "projects" && Location.length > 2 && Location[2] === "new" && (
        <CreateProject />
      )}

      {page === "projects" &&
        Location.length > 2 &&
        Location[2] === "update" && <UpdateProject />}
      {page === "projects" &&
        Location.length > 2 &&
        Location[2] !== "update" &&
        Location[2] !== "new" && <Project />}
    </Container>
  );
};

export default Content;
