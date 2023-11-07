import React from "react";
import Styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { validURL } from "../config/chatLogics";
import { Mobile } from "../responsive";

const PeopleContainer = Styled.div`
/* background-color:#f8f9fa; */
border:solid 1px lightgray;
color:black;
cursor:pointer;
margin:10px 20px;
display:flex;
align-items:center;
justify-content:center;
${Mobile({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flexDirection: "column",
})};

border-radius:10px;
padding:7px 12px;

&:hover{

  transform:scale(1.005);
}

`;
const DetailContainer = Styled.div`
flex:1.2;
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
const NameContainer = Styled.div`
word-wrap:break-word;`;
const NameText = Styled.span`

font-weight:600;
font-size:24px;`;

const RoleContainer = Styled.div``;
const RoleText = Styled.span`
font-size:20px;`;
const StatusContainer = Styled.div``;
const StatusText = Styled.span`
color:green;
font-size:18px;
font-weight:500;`;

const ProfileContainer = Styled.div`
flex:0.5;`;
const DescriptionContainer = Styled.div`
${Mobile({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flexDirection: "column",
})}
flex:2;`;
const ParagraphContainer = Styled.p`
color:grey;
font-weight:500;`;
const ImageContainer = Styled.div`
display:flex;
align-items:center;
justify-content:center;
`;
const Img = Styled.img`

width:100px;
height:100px;
object-fit:cover;

border-radius:50%;`;
const Projects = ({ item }) => {
  const navigate = useNavigate();
  return (
    <PeopleContainer onClick={() => navigate(`/profile/${item?.userId._id}`)}>
      <ProfileContainer>
        <ImageContainer>
          <Img
            src={
              validURL(item.userId?.image)
                ? item.userId?.image
                : "https://avatars.githubusercontent.com/u/92564357?s=400&u=58b28bd8ecfca5ffe4952d03c521b70fe047df68&v=4"
            }
          />
        </ImageContainer>
      </ProfileContainer>
      <DetailContainer>
        <NameContainer>
          <NameText>{item.name}</NameText>
        </NameContainer>
        <RoleContainer>
          <RoleText>{item.jobtitle}</RoleText>
        </RoleContainer>
        <StatusContainer>
          <StatusText>{item.status}</StatusText>
        </StatusContainer>
      </DetailContainer>

      <DescriptionContainer>
        <ParagraphContainer>
          {item.description.slice(0, 250)}....
        </ParagraphContainer>
      </DescriptionContainer>
    </PeopleContainer>
  );
};

export default Projects;
