import React from "react";
import Styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { validURL } from "../config/chatLogics";
import { Mobile } from "../responsive";
const ProjectContainer = Styled.div`
max-width:100vw;
color:black;
padding:7px 12px;
border:solid 1px lightgray;
cursor:pointer;
margin:10px 20px;
display:flex;
align-items:flex-start;
justify-content:center;
${Mobile({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flexDirection: "column",
})}
border-radius:10px;

transition:all 0.3s ease;
&:hover{

  transform:scale(1.005);
}

`;
const DetailContainer = Styled.div`
max-width:100%;

flex:1;
display:flex;
align-items:flex-start;
justify-content:center;
flex-direction:column;
${Mobile({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flexDirection: "column",
})}
`;

const TitleContainer = Styled.div`
font-weight:600;

word-wrap:break-word;
max-width:100%;
flex:1;`;
const TitleText = Styled.h1`


font-size:20px;`;

const PeopleContainer = Styled.div`
width:100%;
overflow:scroll;
&::-webkit-scrollbar{
  display:none;
};
margin-top:10px;
display:flex;

`;
const ImgContainer = Styled.div`
${Mobile({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flexDirection: "column",
})}

height:50px;
width:50px;
margin-right:10px;`;
const Image = Styled.img`
border:${(props) => props.admin && "solid 1px black"};
object-fit:cover;
border-radius:50%;
height:50px;
width:50px;`;

const LeaderContainer = Styled.div`
margin-top:10px;`;
const LeaderText = Styled.a``;

const DescriptionContainer = Styled.div`
text-align:justify;
color:grey;
font-weight:500;
${Mobile({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flexDirection: "column",
})}
flex:2;`;

const Projects = ({ item }) => {
  const navigate = useNavigate();

  return (
    <ProjectContainer
      onClick={() => {
        navigate(`/projects/${item._id}`);
      }}
    >
      <DetailContainer>
        <TitleContainer>
          <TitleText>{item.title}</TitleText>
        </TitleContainer>
        <PeopleContainer>
          {item.members?.map((memberitem) => (
            <ImgContainer>
              <Image
                admin={memberitem?._id === item.projectAdmin ? true : false}
                src={
                  validURL(memberitem.image)
                    ? memberitem.image
                    : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
                }
              />
            </ImgContainer>
          ))}
        </PeopleContainer>
        <LeaderContainer>
          <LeaderText href={item.link}>Link</LeaderText>
        </LeaderContainer>
      </DetailContainer>
      <DescriptionContainer>{item.description}</DescriptionContainer>
    </ProjectContainer>
  );
};

export default Projects;
