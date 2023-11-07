import React, { useState, useEffect } from "react";
import Styled from "styled-components";
import SearchProject from "./SearchProject";
import SearchPeople from "./SearchPeople";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import Loader from "../components/Loader";

import axios from "axios";

const Container = Styled.div`
max-width:100vw;
background-color:white;
color:black;
position:sticky;
height:calc(100vh - 60px);

&::-webkit-scrollbar{
  display:none;
}

`;

const Header = Styled.div`
padding:10px 20px;
display:flex;
align-items:center;

justify-content:space-between;`;
const Loaders = Styled.div`
padding:10px 20px;
display:flex;
align-items:center;

justify-content:center;`;

const Select = Styled.select`
background-color:white;
color:black;
font-size:18px;
border:none;
padding:7px 12px;
&:focus{
  outline:none;
}`;
const Option = Styled.option`
padding:5px 9px;`;
const Warning = Styled.div`
padding:10px 20px;`;
const Home = () => {
  const user = useSelector((state) => state.user.currentUser);
  const [peopleLoading, setPeopleLoading] = useState(false);
  const [projectLoading, setProjectLoading] = useState(false);
  const [filter, setFilter] = useState("People");
  const [projects, setProjects] = useState([]);
  const [people, setPeople] = useState([]);

  let location = useLocation();
  location = location.pathname.split("/");
  let search = location[2];

  useEffect(() => {
    const fetchPeople = async () => {
      setPeopleLoading(true);
      try {
        const res = search
          ? await axios.get(
              `https://projectshare.onrender.com/api/profile?search=${search}`,
              {
                headers: { Authorization: `Bearer ${user.accessToken}` },
              }
            )
          : await axios.get("https://projectshare.onrender.com/api/profile", {
              headers: { Authorization: `Bearer ${user.accessToken}` },
            });
        setPeople(res.data);
      } catch (error) {}
      setPeopleLoading(false);
    };
    fetchPeople();
  }, [search, user.accessToken]);

  useEffect(() => {
    const fetchProjects = async () => {
      setProjectLoading(true);
      try {
        let res = search
          ? await axios.get(
              `https://projectshare.onrender.com/api/project?search=${search}`,
              {
                headers: { Authorization: `Bearer ${user.accessToken}` },
              }
            )
          : await axios.get("https://projectshare.onrender.com/api/project", {
              headers: { Authorization: `Bearer ${user.accessToken}` },
            });
        setProjects(res.data);
      } catch (error) {}
      setProjectLoading(false);
    };
    fetchProjects();
  }, [search, user.accessToken]);
  console.log(people, projects);
  return (
    <Container>
      <Header>
        <Select
          onChange={(e) => {
            setFilter(e.target.value);
          }}
        >
          <Option>People</Option>
          <Option>Projects</Option>
        </Select>
      </Header>
      {filter === "People" ? (
        <>
          {peopleLoading && (
            <Loaders>
              <Loader />
            </Loaders>
          )}
          {peopleLoading === false && people.length === 0 && (
            <Warning>no people found</Warning>
          )}
          {people?.map((item) => (
            <SearchPeople key={item._id} item={item} />
          ))}
        </>
      ) : (
        <>
          {projectLoading && (
            <Loaders>
              <Loader />
            </Loaders>
          )}
          {projectLoading === false && projects.length === 0 && (
            <Warning>no project found</Warning>
          )}
          {projects.map((item) => (
            <SearchProject key={item.id} item={item} />
          ))}
        </>
      )}
    </Container>
  );
};

export default Home;
