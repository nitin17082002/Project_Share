import React, { useState, useEffect } from "react";
import Styled from "styled-components";
import { useLocation, useNavigate } from "react-router-dom";
import Loader from "../components/Loader";
import { useSelector, useDispatch } from "react-redux";
import { validURL } from "../config/chatLogics";
import { toggleWarningBar } from "../redux/warningReducer";
import { Mobile } from "../responsive";
import axios from "axios";
const Container = Styled.div`

max-width:100vw;
`;
const Wrapper = Styled.div`
max-width:100%;
background-color:white;
border-radius:10px;
padding:5px 10px;
margin:10px 10px;
`;
const HeadContainer = Styled.div`

max-width:100%;
word-wrap:break-word;
`;
const Heading = Styled.h1`

font-size:26px;
margin:0px;
`;
const MiddleContainer = Styled.div`
display:flex;
margin-top:20px;
align-items:center;
justify-content:center;`;
const PeopleContainer = Styled.div`
flex:1;


`;
const ProfileContainer = Styled.div`
overflow:scroll;
&::-webkit-scrollbar{
  display:none;
}
flex:1;
display:flex;`;
const ImgContainer = Styled.div`
height:50px;
width:50px;
margin-right:10px;`;
const Image = Styled.img`
border:${(props) => props.admin && "solid 1px black"};
cursor:pointer;
object-fit:cover;
border-radius:50%;
height:50px;
width:50px;`;
const LinkContainer = Styled.div`
display:flex;
flex:1
`;
const Link = Styled.a``;
const BottomContainer = Styled.div``;
const Paragraph = Styled.p``;
const ButtonContainer = Styled.div`
display:flex;
align-items:center;
justify-content:center;
flex-direction:column;`;
const ButtonDelete = Styled.button`
margin:10px 30px;
padding:5px 12px;
font-size:24px;
border:none;
background-color:#0081B4;
color:white;
border-radius:10px;
transition:all 0.3s ease;
cursor:pointer;
${Mobile({
  margin: "10px 30px",
})}
&:hover{
    background-color:#0098B4;
}`;
const LabelContainer = Styled.div`
padding:5px 10px;`;
const Label = Styled.span`
color:grey;
font-size:18px;`;

const Project = () => {
  const navigate = useNavigate();
  let location = useLocation();
  location = location.pathname.split("/");
  let projectId = location[2];
  const dispatch = useDispatch();
  const [project, setProject] = useState({});
  const [loading, setLoading] = useState(false);
  const [loadingDelete, setLoadingDelete] = useState(false);
  const user = useSelector((state) => state.user.currentUser);
  const handleNotification = (message) => {
    dispatch(toggleWarningBar(message));
    setTimeout(() => {
      dispatch(toggleWarningBar(""));
    }, 3000);
  };
  useEffect(() => {
    const fetchProject = async () => {
      setLoading(true);
      try {
        const res = await axios.get(
          `https://projectshare.onrender.com/api/project/${projectId}`
        );

        setProject(res.data);
      } catch (err) {}
      setLoading(false);
    };
    fetchProject();
  }, [projectId]);
  const handleDelete = async () => {
    if (project.projectAdmin.toString() !== user._id) {
      handleNotification("You are not authorized");
      return;
    }
    setLoadingDelete(true);
    try {
      await axios.delete(
        `https://projectshare.onrender.com/api/project/${projectId}`,
        {
          headers: { Authorization: `Bearer ${user.accessToken}` },
        }
      );
      handleNotification("Project Deleted Successfully");
      navigate("/projects");
    } catch (err) {
      handleNotification("You are not authorized");
    }
    setLoadingDelete(false);
  };
  return (
    <Container>
      <Wrapper>
        {loading && <Loader />}
        <HeadContainer>
          <Heading>{project.title}</Heading>
        </HeadContainer>
        <MiddleContainer>
          <PeopleContainer>
            <LabelContainer>
              <Label>Members</Label>
            </LabelContainer>
            <ProfileContainer>
              {project.members?.map((item) => (
                <ImgContainer>
                  <Image
                    onClick={() => navigate(`/profile/${item._id}`)}
                    admin={item._id === project.projectAdmin}
                    src={
                      validURL(item.image)
                        ? item.image
                        : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
                    }
                  />
                </ImgContainer>
              ))}
            </ProfileContainer>
          </PeopleContainer>
          <LinkContainer>
            <Link href={project.link}>Link</Link>
          </LinkContainer>
        </MiddleContainer>
        <BottomContainer>
          <Paragraph>{project.description}</Paragraph>
        </BottomContainer>
        <ButtonContainer>
          <ButtonDelete onClick={() => handleDelete()}>
            {loadingDelete ? <Loader /> : "Delete Project"}
          </ButtonDelete>
          <ButtonDelete
            onClick={() => navigate(`/projects/update/${project._id}`)}
          >
            Update Project
          </ButtonDelete>
        </ButtonContainer>
      </Wrapper>
    </Container>
  );
};

export default Project;
