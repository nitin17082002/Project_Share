import React, { useState, useEffect } from "react";
import Styled from "styled-components";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { validURL } from "../config/chatLogics";
import { Mobile } from "../responsive";
import { useDispatch } from "react-redux";
import { toggleWarningBar } from "../redux/warningReducer";
import { useNavigate } from "react-router-dom";
import { toggleCreateGroup } from "../redux/createGroupReducer";
import { toggleSidebar } from "../redux/sideReducer";
import { setActiveChat } from "../redux/activeChatReducer";
import { toggleUpdateChat } from "../redux/updateChats";
import ChatBubbleIcon from "@mui/icons-material/ChatBubble";
import Loader from "../components/Loader";
const Container = Styled.div`
background-color:white;

color:black;`;

const Wrapper = Styled.div`
padding:10px;`;

const HeadContainer = Styled.div`
display:flex;
align-items:center;
justify-content:center;
flex-direction:column;
`;

const NameImgContainer = Styled.div`
display:flex;
align-items:center;
justify-content:center;
flex-direction:column;
`;

const ImgContainer = Styled.div`
display:flex;
align-items:center;
flex-direction:column;
justify-content:center;`;

const NameContainer = Styled.div``;

const Img = Styled.img`
margin-bottom:10px;
width:100px;
height:100px;
object-fit:cover;
border-radius:50%;`;

const Name = Styled.span`
font-weight:500;
font-size:28px;
`;
const JobTitleContainer = Styled.div`
display:flex;
align-items:center;
justify-content:center;`;
const JobTitleContainerText = Styled.span`
font-size:18px;`;
const StatusContainer = Styled.div`
display:flex;
align-items:center;
justify-content:center;`;
const StatusContainerText = Styled.span`
font-size:18px;`;

const DescriptionContainer = Styled.div`
text-align:justify;
width:85%;`;
const DescriptionContainerText = Styled.span`
font-size:18px;
color:grey;
`;

const Input = Styled.input``;

const Label = Styled.label`
font-weight:500;
display:flex;
align-items:center;
margin-bottom:10px;
justify-content:center;`;

const DetailContainer = Styled.div`
display:flex;
align-items:center;
justify-content:center;
flex-wrap:wrap;
`;

const DetailHeadingContainer = Styled.div`
margin-top:20px;
margin-bottom:20px;
display:flex;
align-items:center;
justify-content:center;`;

const DetailHeading = Styled.span`
font-size:30px;
font-weight:500;
color:black;`;

const DetailInput = Styled.div`
width:40%;
${Mobile({ width: "80%" })}
margin:10px 20px;`;

const InputContainer = Styled.div`
margin-top:10px;
padding:2px 3px;

border-radius:5px;
display:flex;
align-items:center;
justify-content:center;
`;

const EducationDetails = Styled.div`
overflow:scroll;
&::-webkit-scrollbar{
  display:none;
}
display:flex;
align-items:center;
justify-content:center;
flex-direction:column;`;

const EducationDetailsHead = Styled.div`
display:flex;

align-items:center;
justify-content:center;

width:85%;`;

const EducationDetailsHeading = Styled.span`
font-size:24px;`;

const Qualification = Styled.div`
flex:1;
display:flex;
align-items:center;
justify-content:center;
`;

const Institution = Styled.div`
flex:3;
display:flex;
align-items:center;
justify-content:center;`;

const Score = Styled.div`
flex:1;
display:flex;
align-items:center;
justify-content:center;`;

const Year = Styled.div`
flex:1;
display:flex;
align-items:center;
justify-content:center;`;

const EducationDetailsContent = Styled.div`
display:flex;
align-items:center;
justify-content:center;
width:85%;
margin-top:10px;
`;

const EducationDetailsData = Styled.span`
font-size:18px;`;

const Section = Styled.div`
border-radius:10px;
padding:7px 12px;
margin-bottom:10px;
background-color:white;
`;

const SocialContainer = Styled.div`
`;

const ProjectsContainer = Styled.div`

`;
const ProjectHeadContainer = Styled.div`
width:80%;
display:flex;
justify-content:space-between;
align-items:center;
`;
const ProjectTitleContainer = Styled.div`
align-items:center;
display:flex;
justify-content:center;`;

const ProjectDateContainer = Styled.div`
width:80%;
margin-top:20px;`;

const DateSpan = Styled.div``;

const ProjectLinkContainer = Styled.div`
width:80%;
margin-top:20px;`;

const Linked = Styled.a``;

const ProjectDescriptionContainer = Styled.div`
width:80%;
`;
const LinkContainer = Styled.div`
  flex:5;

`;
const LinkText = Styled.a`

font-size:20px;`;
const Paragraph = Styled.p`
text-align:justify;
align:left;`;

const SkillsContainer = Styled.div`
width:100%;`;

const SkillText = Styled.span`
font-size:18px;
color:black;
`;

const SkillDescription = Styled.div`

margin:10px 20px;
display:flex;
align-items:center;
justify-content:center;
flex-wrap:wrap;
`;
const SkillName = Styled.div`
flex:3;

`;
const SkillRating = Styled.div`
display:flex;
flex:1;
align-items:center;
justify-content:center;`;

const Profile = () => {
  let location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  let userId = location.pathname.split("/")[2];

  const [loading, setLoading] = useState(false);
  const IconStyle = {
    height: "35px",
    width: "35px",
    cursor: "pointer",
  };
  const [profile, setProfile] = useState();
  const user = useSelector((state) => state.user.currentUser);

  useEffect(() => {
    const getUserProfile = async () => {
      setLoading(true);
      try {
        const res = await axios.get(
          `https://projectshare.onrender.com/api/profile/${userId}`,
          { headers: { Authorization: `Bearer ${user.accessToken}` } }
        );

        setProfile(res.data);
      } catch (error) {}
      setLoading(false);
    };
    getUserProfile();
  }, [user.accessToken, userId]);
  const ManageNotification = (message) => {
    dispatch(toggleWarningBar(message));
    setTimeout(() => {
      dispatch(toggleWarningBar(""));
    }, 3000);
  };
  const createChat = async (userId) => {
    try {
      const { data } = await axios.post(
        "https://projectshare.onrender.com/api/chat/",
        { userId: userId },
        {
          headers: {
            Authorization: `Bearer ${user.accessToken}`,
          },
        }
      );
      dispatch(setActiveChat(data));
      dispatch(toggleUpdateChat());
      navigate("/chats");
    } catch (err) {
      ManageNotification("couldn't create a chat");
    }
  };
  return (
    <Container>
      {!profile ? (
        loading ? (
          <Wrapper>
            <Loader />
          </Wrapper>
        ) : (
          <Wrapper>
            <DetailHeadingContainer>
              <DetailHeading>profile doesn't exist</DetailHeading>
            </DetailHeadingContainer>
          </Wrapper>
        )
      ) : (
        <Wrapper>
          <Section>
            <HeadContainer>
              <NameImgContainer>
                <ImgContainer>
                  <Img
                    src={
                      validURL(profile?.userId?.image)
                        ? profile.userId?.image
                        : "https://wallpapers.com/images/high/deadpool-logo-cool-profile-picture-g2sv7i8j6nzd7tfa.webp"
                    }
                  />
                  <Input id="image" type="file" hidden />
                </ImgContainer>
                <NameContainer>
                  <Name>{profile?.name}</Name>
                </NameContainer>
              </NameImgContainer>
            </HeadContainer>

            <DetailContainer>
              <DetailInput>
                <JobTitleContainer>
                  <JobTitleContainerText>
                    {profile?.jobtitle}
                  </JobTitleContainerText>
                </JobTitleContainer>
              </DetailInput>
              <DetailInput>
                <StatusContainer>
                  <StatusContainerText>{profile?.status}</StatusContainerText>
                </StatusContainer>
              </DetailInput>
              <DetailInput>
                <StatusContainer>
                  <ChatBubbleIcon
                    disabled
                     onClick={() => {
                     createChat(profile.userId);
                    }}
                    style={IconStyle}
                  />
                </StatusContainer>
              </DetailInput>

              <DescriptionContainer>
                <DescriptionContainerText>
                  {profile?.description}
                </DescriptionContainerText>
              </DescriptionContainer>
            </DetailContainer>
          </Section>
          <Section>
            <DetailHeadingContainer>
              <DetailHeading>Education Details</DetailHeading>
            </DetailHeadingContainer>
            <EducationDetails>
              <EducationDetailsHead>
                <Qualification>
                  <EducationDetailsHeading>Title</EducationDetailsHeading>
                </Qualification>
                <Institution>
                  <EducationDetailsHeading>Institution</EducationDetailsHeading>
                </Institution>
                <Score>
                  <EducationDetailsHeading>Score</EducationDetailsHeading>
                </Score>
                <Year>
                  <EducationDetailsHeading>Year</EducationDetailsHeading>
                </Year>
              </EducationDetailsHead>
              {profile?.education?.map((item) => (
                <EducationDetailsContent>
                  <Qualification>
                    <EducationDetailsData>{item?.title}</EducationDetailsData>
                  </Qualification>
                  <Institution>
                    <EducationDetailsData>
                      {item?.institution}
                    </EducationDetailsData>
                  </Institution>
                  <Score>
                    <EducationDetailsData>{item?.score}</EducationDetailsData>
                  </Score>
                  <Year>
                    <EducationDetailsData>{item?.year}</EducationDetailsData>
                  </Year>
                </EducationDetailsContent>
              ))}
            </EducationDetails>
          </Section>
          <Section>
            <DetailHeadingContainer>
              <DetailHeading>Social Media Links</DetailHeading>
            </DetailHeadingContainer>
            <SocialContainer>
              <DetailContainer>
                {profile?.links?.map((item) => (
                  <DetailInput>
                    <InputContainer>
                      <LinkContainer>
                        <LinkText href={item?.link}>{item?.website}</LinkText>
                      </LinkContainer>
                    </InputContainer>
                  </DetailInput>
                ))}
              </DetailContainer>
            </SocialContainer>
          </Section>
          <Section>
            <DetailHeadingContainer>
              <DetailHeading>Projects</DetailHeading>
            </DetailHeadingContainer>
            <ProjectsContainer>
              {profile?.projects?.map((item) => (
                <DetailContainer>
                  <ProjectHeadContainer>
                    <ProjectTitleContainer>
                      <Label>{item?.title}</Label>
                    </ProjectTitleContainer>
                  </ProjectHeadContainer>
                  <ProjectDateContainer>
                    <DateSpan>
                      {item?.from.split("T")[0]} to {item?.to.split("T")[0]}
                    </DateSpan>
                  </ProjectDateContainer>
                  <ProjectLinkContainer>
                    <Linked href={item?.link}>Link</Linked>
                  </ProjectLinkContainer>
                  <ProjectDescriptionContainer>
                    <Paragraph>{item?.description}</Paragraph>
                  </ProjectDescriptionContainer>
                </DetailContainer>
              ))}
            </ProjectsContainer>
          </Section>
          <Section>
            <DetailHeadingContainer>
              <DetailHeading>Skills</DetailHeading>
            </DetailHeadingContainer>
            <SkillsContainer>
              <DetailContainer>
                {profile?.skills?.map((item) => (
                  <DetailInput>
                    <SkillDescription>
                      <SkillName>
                        <SkillText style={{ fontWeight: "500" }}>
                          {item?.skill}
                        </SkillText>
                      </SkillName>
                      <SkillRating>
                        <SkillText>{item?.rating}</SkillText>
                      </SkillRating>
                    </SkillDescription>
                  </DetailInput>
                ))}
              </DetailContainer>
            </SkillsContainer>
          </Section>
        </Wrapper>
      )}
    </Container>
  );
};

export default Profile;
