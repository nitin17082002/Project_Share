import React, { useState, useEffect } from "react";
import Styled from "styled-components";
import UploadIcon from "@mui/icons-material/Upload";
import DeleteIcon from "@mui/icons-material/Delete";
import { useSelector, useDispatch } from "react-redux";
import { validURL } from "../config/chatLogics";
import { toggleWarningBar } from "../redux/warningReducer";
import { loginSuccess } from "../redux/userReducer";
import { Mobile } from "../responsive";
import axios from "axios";
import Loader from "../components/Loader";

const Container = Styled.div`

background-color:white;
color:black;
`;

const Wrapper = Styled.div`

padding:10px;`;

const HeadContainer = Styled.div`

display:flex;
align-items:center;
justify-content:center;
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
object-fit:cover;
margin-bottom:10px;
width:100px;
height:100px;
border-radius:50%;`;

const Name = Styled.span`
font-weight:500;
font-size:28px;
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
   
    -webkit-box-shadow: 0 0 0 30px white inset !important;
    -webkit-text-fill-color: black;
}
  `;

const Label = Styled.label`
color:grey;
font-weight:500;
display:flex;
align-items:center;
margin-bottom:10px;
justify-content:center;`;

const DetailContainer = Styled.div`
width:100%;
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
color:#5A5A5A;`;
const DetailInput = Styled.div`
${Mobile({ width: "80%" })};
width:40%;
margin:10px 20px;`;
const DetailText = Styled.span`
font-weight:500;

color:grey;
font-size:18px;
`;
const TitleContainer = Styled.div``;

const InputDetail = Styled.input`
padding:7px 12px;
background-color:white;
color:grey;
&:focus{
  outline:none;
  background-color:white;
  color:black;
  border-bottom:1px solid blue;
   
};

font-size:15px;
border:none;
border-bottom:1px solid grey;
flex:4;
&:-webkit-autofill,
&:-webkit-autofill:hover, 
&:-webkit-autofill:focus, 
&:-webkit-autofill:active{
  
  -webkit-box-shadow:0 0 0 30px white inset !important;
    -webkit-text-fill-color:black;
  }

 
  `;
const InputDetailAdd = Styled.input`
width:50%;
padding:7px 12px;
background-color:white;
color:grey;
&:focus{
  outline:none;
  background-color:white;
  color:black;
  border-bottom:1px solid blue;
   
};

font-size:15px;
border:none;
border-bottom:1px solid grey;
flex:4;
&:-webkit-autofill,
&:-webkit-autofill:hover, 
&:-webkit-autofill:focus, 
&:-webkit-autofill:active{
  
  -webkit-box-shadow:0 0 0 30px white inset !important;
    -webkit-text-fill-color: black;
  }

 
  `;
const InputContainer = Styled.div`
  margin-top:10px;
  padding:2px 3px;
  border:none;
 background-color:white;
  display:flex;
  align-items:center;
  justify-content:center;
  
  
  `;
const Select = Styled.select`
  padding:7px 12px;
  background-color:white;
&:focus{
  outline:none;
};
border:none;
flex:1;`;
const TextArea = Styled.textarea`
font-family: 'Roboto', sans-serif;
border:None;
background-color:white;
  color:grey;

&:focus{
  outline:none;
  background-color:white;
  
};
width:100%;
  &:-webkit-autofill,
&:-webkit-autofill:hover, 
&:-webkit-autofill:focus, 
&:-webkit-autofill:active{
   
    -webkit-box-shadow: 0 0 0 30px white inset !important;
    -webkit-text-fill-color:black;
}
`;

const Option = Styled.option`
padding:7px 12px;`;

const EducationDetails = Styled.div`
overflow:scroll;
&::-webkit-scrollbar{display:none};
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

const Delete = Styled.div`
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
const EducationDetailsInput = Styled.div`

margin-top:20px;
display:flex;
align-items:center;
justify-content:center;
flex-wrap:wrap;
`;
const AddContainer = Styled.div`
margin-top:20px;
display:flex;
align-items:center;
justify-content:center;
flex-wrap:wrap;
width:85%;
`;
const SubmitContainer = Styled.div`
margin-top:20px;
display:flex;
align-items:center;
justify-content:center;
flex-wrap:wrap;
width:100%;
`;
const IconContainer = Styled.div`
flex:1;
display:flex;
align-items:center;
justify-content:center;
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
const ProjectIconContainer = Styled.div`
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
const Paragraph = Styled.p`
align:left;`;
const ProjectsInputContainer = Styled.div`
margin-top:20px;
display:flex;
align-items:center;
justify-content:center;
flex-wrap:wrap;`;

const SkillsContainer = Styled.div`
width:100%;
display:flex;
align-items:center;
justify-content:center;
flex-direction:column;`;
const SkillText = Styled.span`
font-size:18px;
color:black;
`;
const SkillDescription = Styled.div`

margin:10px 20px;
display:flex;
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

const AddSectionButton = Styled.button`
margin-top:20px;
padding:3px 5px;
border:none;
background-color:#0081B4;
color:white;
border-radius:5px;
font-size:24px;
transition:all 0.2s ease;

cursor:pointer;
&:hover{
  transform:scale(1.05);
  background-color:#3C84FF;
}
`;
const AddButton = Styled.button`

margin-top:20px;
padding:3px 5px;
border:none;
background-color:#0081B4;
color:white;
border-radius:5px;
font-size:24px;
transition:all 0.2s ease;

cursor:pointer;
&:hover{
  transform:scale(1.05);
  background-color:#0081B4;
}
`;
const AddButtonSingle = Styled.button`


padding:3px 5px;
border:none;
background-color:#0081B4;
color:white;
border-radius:5px;
font-size:24px;
transition:all 0.2s ease;

cursor:pointer;
&:hover{
  transform:scale(1.05);
  background-color:#3C84FF;
}
`;
const LinkContainer = Styled.div`
  flex:5;

`;
const LinkText = Styled.a`

font-size:20px;`;

const CreateButton = Styled.button`
margin-top:20px;
margin-bottom:20px;
margin-right:20px;
padding:5px 12px;
border:none;
background-color:#0081B4;
color:white;
border-radius:5px;
font-size:24px;
transition:all 0.2s ease;

cursor:pointer;
&:hover{
  transform:scale(1.06);
}`;
const UpdateButton = Styled.button`
margin-top:20px;
margin-bottom:20px;
padding:5px 12px;
border:none;
background-color:#0081B4;
color:white;
border-radius:5px;
font-size:24px;
transition:all 0.4s ease;
cursor:pointer;
&:hover{
   transform:scale(1.06);;
}`;
const Section = Styled.div`

border-radius:10px;
padding:7px 12px;
margin-bottom:10px;
background-color:white;
border:solid 1px lightgray;
`;
const Profile = () => {
  const user = useSelector((state) => state.user.currentUser);
  const dispatch = useDispatch();
  const [profileloading, setProfileLoading] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [existingProfile, setExistingProfile] = useState(false);
  const [personalDetails, setPersonalDetails] = useState({});
  const [educationDetails, setEducationDetails] = useState({
    title: "",
    college: "",
    score: "",
    year: "",
  });
  const [educationArray, setEducationArray] = useState([]);
  const [social, setSocial] = useState({ website: "", link: "" });
  const [socialArray, setSocialArray] = useState([]);
  const [projects, setProjects] = useState({
    title: "",
    link: "",
    from: "",
    to: "",
    description: "",
  });
  const [projectsArray, setProjectsArray] = useState([]);
  const [skills, setSkills] = useState({ skill: "", rating: "" });
  const [skillsArray, setSkillsArray] = useState([]);
  const [loading, setLoading] = useState(false);
  const [imgLink, setImgLink] = useState(user.image);
  const handleNotification = (message) => {
    dispatch(toggleWarningBar(message));
    setTimeout(() => {
      dispatch(toggleWarningBar(""));
    }, 3000);
  };
  const handlePersonalDetails = (e) => {
    setPersonalDetails({ ...personalDetails, [e.target.name]: e.target.value });
  };
  const handleEducationDetails = (e) => {
    setEducationDetails({
      ...educationDetails,
      [e.target.name]: e.target.value,
    });
  };
  const deleteEducationDetail = (item) => {
    setEducationArray(educationArray.filter((i) => i !== item));
  };
  const addEducationDetails = () => {
    if (
      !educationDetails.title ||
      !educationDetails.institution ||
      !educationDetails.score ||
      !educationDetails.year
    ) {
      handleNotification("Plese fill all the details");
      return;
    }
    setEducationArray([...educationArray, educationDetails]);
    setEducationDetails({});
    setEducationDetails({
      title: "",
      college: "",
      score: "",
      year: "",
    });
  };
  const handleSocialLinks = (e) => {
    setSocial({ ...social, [e.target.name]: e.target.value });
  };
  const addSocialArray = () => {
    if (!social.website || !social.link) {
      handleNotification("Plese fill all the details");
      return;
    }
    setSocialArray([...socialArray, social]);
    setSocial({ website: "", link: "" });
  };
  const deleteSocialLinks = (item) => {
    setSocialArray(socialArray.filter((i) => i !== item));
  };
  const handleProjects = (e) => {
    setProjects({ ...projects, [e.target.name]: e.target.value });
  };
  const addProjectsArray = () => {
    if (
      !projects.title ||
      !projects.link ||
      !projects.from ||
      !projects.to ||
      !projects.description
    ) {
      handleNotification("Plese fill all the details");
      return;
    }
    setProjectsArray([...projectsArray, projects]);
    setProjects({
      title: "",
      link: "",
      from: "",
      to: "",
      description: "",
    });
  };
  const deleteProjectsArray = (item) => {
    setProjectsArray(projectsArray.filter((i) => i !== item));
  };
  const handleSkills = (e) => {
    setSkills({ ...skills, [e.target.name]: e.target.value });
  };
  const addSkillsArray = () => {
    if (!skills.skill || !skills.rating) {
      handleNotification("Plese fill all the details");
      return;
    }
    setSkillsArray([...skillsArray, skills]);
    setSkills({ skill: "", rating: "" });
  };
  let userProfile = {};
  const deleteSkillsArray = (item) => {
    setSkillsArray(skillsArray.filter((i) => i !== item));
  };

  useEffect(() => {
    const getUserData = async () => {
      setProfileLoading(true);
      try {
        const savedUserProfile = await axios.get(
          `https://projectshare.onrender.com/api/profile/${user._id}`
        );
        let existingUserProfile = savedUserProfile.data;

        if (existingUserProfile) {
          setExistingProfile(true);
          setPersonalDetails({
            name: existingUserProfile.name,
            jobtitle: existingUserProfile.jobtitle,
            status: existingUserProfile.status,
            description: existingUserProfile.description,
          });
          setEducationArray(existingUserProfile.education);
          setSocialArray(existingUserProfile.links);
          setSkillsArray(existingUserProfile.skills);
          setProjectsArray(existingUserProfile.projects);
        } else {
        }
      } catch (error) {}
      setProfileLoading(false);
    };
    getUserData();
  }, [user._id]);
  const handleCreateProfile = async () => {
    userProfile = {
      userId: user._id,
      ...userProfile,
      ...personalDetails,
      education: educationArray,
      links: socialArray,
      projects: projectsArray,
      skills: skillsArray,
    };
    const config = {
      headers: {
        Authorization: `Bearer ${user.accessToken}`,
      },
    };
    const validUserProfile = (userProfile) => {
      if (
        userProfile.userId === "" ||
        userProfile.name === "" ||
        userProfile.jobtitle === "" ||
        userProfile.status === "" ||
        userProfile.description === "" ||
        userProfile.education.length === 0 ||
        userProfile.links.length === 0 ||
        userProfile.projects.length === 0 ||
        userProfile.skills.length === 0
      ) {
        return false;
      }
      return true;
    };
    setSubmitLoading(true);
    try {
      if (!validUserProfile(userProfile)) {
        handleNotification("please fill all the details");
        return;
      }
      const res = await axios.post(
        "https://projectshare.onrender.com/api/profile",
        userProfile,
        config
      );
      handleNotification("Profile created successfully");
    } catch (err) {}
    setSubmitLoading(false);
  };
  const handleUpdateProfile = async () => {
    userProfile = {
      userId: user._id,
      ...userProfile,
      ...personalDetails,
      education: educationArray,
      links: socialArray,
      projects: projectsArray,
      skills: skillsArray,
    };
    const config = {
      headers: {
        Authorization: `Bearer ${user.accessToken}`,
      },
    };
    const validUserProfile = (userProfile) => {
      if (
        userProfile.userId === "" ||
        userProfile.name === "" ||
        userProfile.jobtitle === "" ||
        userProfile.status === "" ||
        userProfile.description === "" ||
        userProfile.education.length === 0 ||
        userProfile.links.length === 0 ||
        userProfile.projects.length === 0 ||
        userProfile.skills.length === 0
      ) {
        return false;
      }
      return true;
    };
    setSubmitLoading(true);
    try {
      if (!validUserProfile(userProfile)) {
        handleNotification("please fill all the details");
        return;
      }
      const res = await axios.put(
        "https://projectshare.onrender.com/api/profile",
        userProfile,
        config
      );
      let existingUserProfile = res.data;
      setPersonalDetails({
        name: existingUserProfile.name,
        jobtitle: existingUserProfile.jobtitle,
        status: existingUserProfile.status,
        description: existingUserProfile.description,
      });
      setEducationArray(existingUserProfile.education);
      setSocialArray(existingUserProfile.links);
      setSkillsArray(existingUserProfile.skills);
      setProjectsArray(existingUserProfile.projects);
      handleNotification("profile updated successfully");
    } catch (err) {
      handleNotification("server error");
    }
    setSubmitLoading(false);
  };
  const setFiles = (img) => {
    setLoading(true);
    if (img === undefined) {
      handleNotification("Please select the image");
      setLoading(false);
      return;
    }

    if (img.type === "image/jpeg" || img.type === "image/png") {
      const data = new FormData();
      data.append("file", img);
      data.append("upload_preset", "react-chat-app");
      data.append("cloud_name", "dcvv2vevf");
      fetch("https://api.cloudinary.com/v1_1/dcvv2vevf/image/upload", {
        method: "post",
        body: data,
      })
        .then((resp) => resp.json())
        .then((data) => {
          const getUserData = async () => {
            const config = {
              headers: {
                Authorization: `Bearer ${user.accessToken}`,
              },
            };
            let imagelink = data.url.toString();

            try {
              const res = await axios.put(
                `https://projectshare.onrender.com/api/user/register`,
                { image: imagelink },
                config
              );

              setImgLink(data.url.toString());
              handleNotification("image updated successfully");
              dispatch(loginSuccess(res.data));
            } catch (error) {
              handleNotification("image couldn't be updated");
            }
            setLoading(false);
          };
          getUserData();
        })
        .catch((err) => {
          setLoading(false);
        });
    }
  };

  return (
    <Container>
      <Wrapper>
        {profileloading === false ? (
          <>
            <Section>
              <HeadContainer>
                <NameImgContainer>
                  <ImgContainer>
                    <Img
                      src={
                        validURL(imgLink)
                          ? imgLink
                          : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
                      }
                    />
                    <Input
                      id="image"
                      type="file"
                      onChange={(e) => setFiles(e.target.files[0])}
                      hidden
                    />
                    <Label htmlFor="image">
                      {loading ? "uploading..." : "Upload Image"} <UploadIcon />
                    </Label>
                  </ImgContainer>
                </NameImgContainer>
              </HeadContainer>

              <DetailHeadingContainer>
                <DetailHeading>Personal Details</DetailHeading>
              </DetailHeadingContainer>
              <DetailContainer>
                <DetailInput>
                  <TitleContainer>
                    <DetailText>Name</DetailText>
                  </TitleContainer>
                  <InputContainer>
                    <InputDetail
                      type="text"
                      name="name"
                      value={personalDetails.name}
                      onChange={(e) => handlePersonalDetails(e)}
                      placeholder={"name"}
                    />
                  </InputContainer>
                </DetailInput>
                <DetailInput>
                  <TitleContainer>
                    <DetailText>Job Title</DetailText>
                  </TitleContainer>
                  <InputContainer>
                    <InputDetail
                      type="text"
                      name="jobtitle"
                      value={personalDetails.jobtitle}
                      placeholder={"SDE 2 Amazon"}
                      onChange={(e) => handlePersonalDetails(e)}
                    />
                  </InputContainer>
                </DetailInput>
                <DetailInput>
                  <TitleContainer>
                    <DetailText>Status</DetailText>
                  </TitleContainer>
                  <InputContainer>
                    <InputDetail
                      type="text"
                      name="status"
                      value={personalDetails.status}
                      placeholder={"Available"}
                      onChange={(e) => handlePersonalDetails(e)}
                    />
                  </InputContainer>
                </DetailInput>
                <DetailInput>
                  <TitleContainer>
                    <DetailText>About Myself</DetailText>
                  </TitleContainer>
                  <InputContainer>
                    <TextArea
                      spellCheck="false"
                      name="description"
                      value={personalDetails.description}
                      placeholder="Introduction and career Objective"
                      onChange={(e) => handlePersonalDetails(e)}
                    ></TextArea>
                  </InputContainer>
                </DetailInput>
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
                    <EducationDetailsHeading>
                      Institution
                    </EducationDetailsHeading>
                  </Institution>
                  <Score>
                    <EducationDetailsHeading>Score</EducationDetailsHeading>
                  </Score>
                  <Year>
                    <EducationDetailsHeading>Year</EducationDetailsHeading>
                  </Year>

                  <Delete>
                    <EducationDetailsHeading>Delete</EducationDetailsHeading>
                  </Delete>
                </EducationDetailsHead>
                {educationArray?.map((item) => (
                  <EducationDetailsContent>
                    <Qualification>
                      <EducationDetailsData>{item.title}</EducationDetailsData>
                    </Qualification>
                    <Institution>
                      <EducationDetailsData>
                        {item.institution}
                      </EducationDetailsData>
                    </Institution>
                    <Score>
                      <EducationDetailsData>{item.score}</EducationDetailsData>
                    </Score>
                    <Year>
                      <EducationDetailsData>{item.year}</EducationDetailsData>
                    </Year>

                    <Delete>
                      <EducationDetailsData>
                        <DeleteIcon
                          onClick={() => deleteEducationDetail(item)}
                          style={{ color: "red", cursor: "pointer" }}
                        />
                      </EducationDetailsData>
                    </Delete>
                  </EducationDetailsContent>
                ))}
              </EducationDetails>
              <EducationDetailsInput>
                <DetailInput>
                  <TitleContainer>
                    <DetailText>Title:</DetailText>
                  </TitleContainer>
                  <InputContainer>
                    <InputDetail
                      name="title"
                      onChange={(e) => {
                        handleEducationDetails(e);
                      }}
                      value={educationDetails.title}
                      type="text"
                      placeholder={"B. Tech"}
                    />
                  </InputContainer>
                </DetailInput>
                <DetailInput>
                  <TitleContainer>
                    <DetailText>Institution</DetailText>
                  </TitleContainer>
                  <InputContainer>
                    <InputDetail
                      name="institution"
                      onChange={(e) => {
                        handleEducationDetails(e);
                      }}
                      value={educationDetails.institution}
                      type="text"
                      placeholder={"Abc College"}
                    />
                  </InputContainer>
                </DetailInput>
                <DetailInput>
                  <TitleContainer>
                    <DetailText>Score</DetailText>
                  </TitleContainer>
                  <InputContainer>
                    <InputDetail
                      type="text"
                      name="score"
                      onChange={(e) => {
                        handleEducationDetails(e);
                      }}
                      value={educationDetails.score}
                      placeholder={"A+"}
                    />
                  </InputContainer>
                </DetailInput>
                <DetailInput>
                  <TitleContainer>
                    <DetailText>Year</DetailText>
                  </TitleContainer>
                  <InputContainer>
                    <InputDetail
                      name="year"
                      onChange={(e) => {
                        handleEducationDetails(e);
                      }}
                      value={educationDetails.year}
                      type="text"
                      placeholder={"2020"}
                    />
                  </InputContainer>
                </DetailInput>

                <AddContainer>
                  <IconContainer>
                    <AddSectionButton onClick={() => addEducationDetails()}>
                      Add
                    </AddSectionButton>
                  </IconContainer>
                </AddContainer>
              </EducationDetailsInput>
            </Section>
            <Section>
              <DetailHeadingContainer>
                <DetailHeading>Projects</DetailHeading>
              </DetailHeadingContainer>
              <ProjectsContainer>
                {projectsArray?.map((item) => (
                  <DetailContainer>
                    <ProjectHeadContainer>
                      <ProjectTitleContainer>
                        <Label>{item.title}</Label>
                      </ProjectTitleContainer>
                      <ProjectIconContainer>
                        <DeleteIcon
                          onClick={() => deleteProjectsArray(item)}
                          style={{
                            color: "red",
                            cursor: "pointer",
                            marginRight: "20px",
                          }}
                        />
                      </ProjectIconContainer>
                    </ProjectHeadContainer>
                    <ProjectDateContainer>
                      <DateSpan>
                        {item.from.split("T")[0]} <strong>to</strong>{" "}
                        {item.to.split("T")[0]}
                      </DateSpan>
                    </ProjectDateContainer>
                    <ProjectLinkContainer>
                      <Linked href={item.link}>Link</Linked>
                    </ProjectLinkContainer>
                    <ProjectDescriptionContainer>
                      <Paragraph>{item.description}</Paragraph>
                    </ProjectDescriptionContainer>
                  </DetailContainer>
                ))}
              </ProjectsContainer>
              <ProjectsInputContainer>
                <DetailContainer>
                  <DetailInput>
                    <TitleContainer>
                      <DetailText>Title</DetailText>
                    </TitleContainer>
                    <InputContainer>
                      <InputDetail
                        type="text"
                        name="title"
                        value={projects.title}
                        onChange={(e) => handleProjects(e)}
                        placeholder={"Image Inpainting"}
                      />
                    </InputContainer>
                  </DetailInput>
                  <DetailInput>
                    <TitleContainer>
                      <DetailText>Duration</DetailText>
                    </TitleContainer>
                    <InputContainer>
                      <span>From</span>
                      <InputDetail
                        name="from"
                        value={projects.from}
                        onChange={(e) => handleProjects(e)}
                        type="date"
                      />
                      <span>To</span>
                      <InputDetail
                        name="to"
                        value={projects.to}
                        onChange={(e) => handleProjects(e)}
                        type="date"
                      />
                    </InputContainer>
                  </DetailInput>
                  <DetailInput>
                    <TitleContainer>
                      <DetailText>Link</DetailText>
                    </TitleContainer>
                    <InputContainer>
                      <InputDetail
                        type="text"
                        name="link"
                        value={projects.link}
                        onChange={(e) => handleProjects(e)}
                        placeholder={"http://localhost:3000"}
                      />
                    </InputContainer>
                  </DetailInput>
                  <DetailInput>
                    <TitleContainer>
                      <DetailText>Description</DetailText>
                    </TitleContainer>
                    <InputContainer>
                      <TextArea
                        onChange={(e) => handleProjects(e)}
                        value={projects.description}
                        name="description"
                        placeholder="about project"
                      ></TextArea>
                    </InputContainer>
                  </DetailInput>
                </DetailContainer>

                <AddContainer>
                  <IconContainer>
                    <AddSectionButton onClick={() => addProjectsArray()}>
                      Add
                    </AddSectionButton>
                    {/* <AddIcon
              style={{
                color: "green",
                height: "70px",
                width: "70px",
                cursor: "pointer",
              }}
            /> */}
                  </IconContainer>
                </AddContainer>
              </ProjectsInputContainer>
            </Section>
            <Section>
              <DetailHeadingContainer>
                <DetailHeading>Skills</DetailHeading>
              </DetailHeadingContainer>
              <SkillsContainer>
                <DetailContainer>
                  {skillsArray?.map((item) => {
                    return (
                      <DetailInput>
                        <SkillDescription>
                          <SkillName>
                            <SkillText style={{ fontWeight: "500" }}>
                              {item.skill}
                            </SkillText>
                          </SkillName>
                          <SkillRating>
                            <SkillText>{item.rating}</SkillText>
                          </SkillRating>
                          <IconContainer>
                            <DeleteIcon
                              onClick={() => deleteSkillsArray(item)}
                              style={{
                                color: "red",
                                cursor: "pointer",
                                marginRight: "10px",
                              }}
                            />
                          </IconContainer>
                        </SkillDescription>
                      </DetailInput>
                    );
                  })}

                  <DetailInput>
                    <InputContainer>
                      <InputDetailAdd
                        type="text"
                        name="skill"
                        value={skills.skill}
                        onChange={(e) => {
                          handleSkills(e);
                        }}
                        placeholder={"javascript"}
                      />

                      <Select
                        name="rating"
                        value={skills.rating}
                        onChange={(e) => {
                          handleSkills(e);
                        }}
                      >
                        <Option value="" default="true">
                          --select--
                        </Option>
                        <Option>Beginner</Option>

                        <Option>Intermediate</Option>
                        <Option>Advanced</Option>
                        <Option>Professional</Option>
                      </Select>
                      <IconContainer>
                        {/* <AddIcon
                    style={{
                      color: "green",
                      height: "30px",
                      width: "30px",
                      cursor: "pointer",
                    }}
                  /> */}
                        <AddButtonSingle onClick={() => addSkillsArray()}>
                          Add
                        </AddButtonSingle>
                      </IconContainer>
                    </InputContainer>
                  </DetailInput>
                </DetailContainer>
              </SkillsContainer>
            </Section>
            <Section>
              <DetailHeadingContainer>
                <DetailHeading>Social Media Links</DetailHeading>
              </DetailHeadingContainer>
              <SocialContainer>
                <DetailContainer>
                  {socialArray?.map((item) => (
                    <DetailInput>
                      <InputContainer>
                        <LinkContainer>
                          <LinkText href={item.link}>{item.website}</LinkText>
                        </LinkContainer>

                        <IconContainer>
                          <DeleteIcon
                            onClick={() => deleteSocialLinks(item)}
                            style={{
                              color: "red",
                              cursor: "pointer",
                              marginRight: "10px",
                            }}
                          />
                        </IconContainer>
                      </InputContainer>
                    </DetailInput>
                  ))}

                  <DetailInput>
                    <InputContainer>
                      <Select
                        name="website"
                        onChange={(e) => {
                          handleSocialLinks(e);
                        }}
                      >
                        <Option value="" default="true">
                          --select--
                        </Option>
                        <Option>LinkedIn</Option>
                        <Option>Instagram</Option>
                        <Option>Github</Option>
                        <Option>LeetCode</Option>
                        <Option>Medium</Option>
                        <Option>Dev.to</Option>
                      </Select>
                      <InputDetailAdd
                        type="link"
                        name="link"
                        value={social.link}
                        onChange={(e) => handleSocialLinks(e)}
                        placeholder={"sdlfkjdsf@cga.co"}
                      />
                      <IconContainer>
                        {/* <AddIcon
                    style={{
                      color: "green",
                      height: "30px",
                      width: "30px",
                      cursor: "pointer",
                    }}
                  /> */}
                      </IconContainer>
                      <AddButton
                        onClick={() => {
                          addSocialArray();
                        }}
                      >
                        Add
                      </AddButton>
                    </InputContainer>
                  </DetailInput>
                </DetailContainer>
              </SocialContainer>
            </Section>

            <Section>
              <SubmitContainer>
                <IconContainer>
                  {existingProfile === false ? (
                    <CreateButton
                      onClick={() => {
                        handleCreateProfile();
                      }}
                    >
                      {submitLoading ? <Loader /> : "Create"}
                    </CreateButton>
                  ) : (
                    <UpdateButton
                      onClick={() => {
                        handleUpdateProfile();
                      }}
                    >
                      {submitLoading ? <Loader /> : "Update"}
                    </UpdateButton>
                  )}
                </IconContainer>
              </SubmitContainer>
            </Section>
          </>
        ) : (
          <Loader />
        )}
      </Wrapper>
    </Container>
  );
};

export default Profile;
