import React, { useState, useEffect } from "react";
import Styled from "styled-components";
import EditIcon from "@mui/icons-material/Edit";
import { useSelector, useDispatch } from "react-redux";
import { toggleWarningBar } from "../redux/warningReducer";
import { validURL } from "../config/chatLogics";
import { useLocation } from "react-router-dom";
import { Mobile } from "../responsive";
import axios from "axios";
import Loader from "../components/Loader";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";

const Container = Styled.div`

`;

const Wrapper = Styled.div`
background-color:#f6f8fa;
border-radius:10px;
margin:10px 10px;`;
const Header = Styled.div`

display:flex;
align-items:center;
justify-content:center;`;
const Heading = Styled.h1`
margin:0px;`;
const MiddleContainer = Styled.div`
display:flex;
align-items:center;
justify-content:center;
flex-wrap:wrap;`;

const InputItem = Styled.div`
${Mobile({ width: "100%" })};
margin:10px 20px;
width:45%;`;
const InputItemDescription = Styled.div`

margin:10px 20px;
width:95%;`;

const Label = Styled.label``;
const InputContainer = Styled.div`

  margin-top:10px;
  padding:2px 3px;
  border:none;
  background-color:#f6f8fa;
  `;
const InputContainerDescription = Styled.div`
margin-top:10px;
border-radius:5px;
border:solid 1px grey;
padding:5px 12px;`;

const MemberInputContainer = Styled.div`
display:flex;
border-radius:5px;
padding:5px 12px;
position:relative;
`;
const SearchMemberInputContainer = Styled.div`
width:100%;
border-radius:5px;
background-color:#f6f8fa;
`;
const Input = Styled.input`
width:80%;
padding:7px 12px;
background-color:#f6f8fa;
color:grey;
&:focus{
  outline:none;
  background-color:#f6f8fa;
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
  
  -webkit-box-shadow:0 0 0 30px #f6f8fa inset !important;
    -webkit-text-fill-color: black;
  }`;
const MembersInput = Styled.input`
width:80%;
padding:7px 12px;
background-color:#f6f8fa;
color:grey;
border:none;
&:focus{
  outline:none;
  
  color:black;
 background-color:#f6f8fa;
   
};

font-size:15px;


flex:4;
&:-webkit-autofill,
&:-webkit-autofill:hover, 
&:-webkit-autofill:focus, 
&:-webkit-autofill:active{
  
  -webkit-box-shadow:0 0 0 30px white inset !important;
    -webkit-text-fill-color: black;
  }`;
const Select = Styled.select`
background-color:#f6f8fa;
border:none;
&:focus{
    outline:none;
}`;
const Option = Styled.option``;
const ImgContainer = Styled.div`

display:flex;
align-items:center;
justify-content:center;
height:50px;
width:50px;
margin-right:10px;`;
const Image = Styled.img`
object-fit:cover;
border-radius:50%;
height:50px;
width:50px;`;

const DescriptionContainer = Styled.div`
display:flex;
align-items:center;
justify-content:center;
`;

const Paragraph = Styled.textarea`
font-family: 'Roboto', sans-serif;
border:None;
background-color:#f6f8fa;
  color:grey;

&:focus{
  outline:none;
  background-color:#f6f8fa;
    
};
width:100%;
  &:-webkit-autofill,
&:-webkit-autofill:hover, 
&:-webkit-autofill:focus, 
&:-webkit-autofill:active{
   
    -webkit-box-shadow:0 0 0 30px #f6f8fa inset !important;
    -webkit-text-fill-color: black;
}`;

const BottomContainer = Styled.div`
display:flex;
align-items:center;
justify-content:flex-end;
`;
const CreateButton = Styled.button`
margin:10px 30px;
padding:5px 12px;
font-size:24px;
background-color:#0081B4;
border:none;
color:white;
border-radius:10px;
transition:all 0.3s ease;
cursor:pointer;
&:hover{
    transform:scale(1.1);
}

`;
const SearchMember = Styled.div`
background-color:#f6f8fa;
border:solid 1px grey;
border-top:none;
padding:5px 12px;
position:absolute;
border-bottom-right-radius:5px;
border-bottom-left-radius:5px;
${Mobile({ width: "70%" })};
width:41%;`;
const SearchContainer = Styled.div`
display:flex;`;

const UserContainer = Styled.div`
`;
const SearchUserContainer = Styled.div`
max-height:25vh;
height:content-fit;
padding:7px 12px;
overflow:scroll;
&::-webkit-scrollbar{
    display:none;
}

align-items:start;
flex-direction:column;
justify-content:center;
flex:1;
`;
const Item = Styled.div`
flex:1;
width:80%;
margin:0 auto;
cursor:pointer;
&:hover{
  box-shadow:0px 0px 10px grey;
}
transition:all 0.5s ease;
border-radius:10px;
padding:5px 12px;

display:flex;
align-items:center;
justify-content:center;


`;
const UserIconContainer = Styled.div`
display:flex;
align-items:center;
justify-content:center;

flex:1;`;
const UserDetails = Styled.div`
flex:3;
flex-direction:column;`;
const SecondHeading = Styled.span`
font-size:22px;
color:black;`;
const Br = Styled.br``;
const Username = Styled.span`
font-size:18px;
color:grey;`;
const CloseIconContainer = Styled.div`
width:10%;
display:flex;
align-items:center;
justify-content:center;
`;
const UsersInputContainer = Styled.div`
width:90%;
display:flex;
align-items:center;
justify-content:center;
border:solid 1px grey;
border-radius:5px;`;
const UpdateProject = () => {
  let location = useLocation();
  location = location.pathname.split("/");
  const projectId = location[3];
  let [project, setProject] = useState({});
  const [search, setSearch] = useState("");
  const [data, setData] = useState([]);
  const [loadingFetch, setLoadingFetch] = useState(false);
  const [loadingUpdate, setLoadingUpdate] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchProject = async () => {
      setLoadingFetch(true);
      try {
        const { data } = await axios.get(
          `https://projectshare.onrender.com/api/project/${projectId}`
        );
        const { createAt, updatedAt, __v, ...others } = data;
        setProject(others);
      } catch (error) {}
      setLoadingFetch(false);
    };
    fetchProject();
  }, [projectId]);

  const handleProject = (e) => {
    setProject({ ...project, [e.target.name]: e.target.value });
  };

  const user = useSelector((state) => state.user.currentUser);

  const [members, setMembers] = useState([
    {
      name: user.name,
      email: user.email,
      image: user.image,
      _id: user._id,
      username: user.username,
    },
  ]);
  const addMember = (item) => {
    if (members.indexOf(item) === -1) {
      setMembers([...members, item]);
    }
  };
  const deleteMember = (member) => {
    if (member._id === user._id) {
      return;
    }
    setMembers(members.filter((item) => item._id !== member._id));
  };
  const [toggleUsers, setToggleUsers] = useState(true);
  const IconStyle = {
    color: "grey",
    height: "40px",
    width: "40px",
    cursor: "pointer",
  };
  const CloseIconStyle = {
    color: "red",
    height: "40px",
    width: "40px",
    cursor: "pointer",
  };
  const handleNotification = (message) => {
    dispatch(toggleWarningBar(message));
    setTimeout(() => {
      dispatch(toggleWarningBar(""));
    }, 3000);
  };
  const handleChange = (e) => {
    setSearch(e.target.value);
    handleClickSearch();
  };
  const handleClickSearch = async () => {
    try {
      const { data } = await axios.get(
        `https://projectshare.onrender.com/api/user?search=${search}`,
        { headers: { Authorization: `Bearer ${user.accessToken}` } }
      );
      setData(data);
    } catch (error) {}
  };
  const createProject = async () => {
    setLoadingUpdate(true);
    if (project.projectAdmin !== user._id) {
      handleNotification("You are not authorized");
      return;
    }
    let projectMembers = [];
    members.map((item) => projectMembers.push(item._id));
    project.projectAdmin = user._id;
    project.members = projectMembers;

    if (
      !project.title ||
      !project.visibility ||
      !project.description ||
      !project.projectAdmin ||
      !project.members
    ) {
      handleNotification("Please Fill All Fields");
      return;
    }

    try {
      let { data } = await axios.put(
        "https://projectshare.onrender.com/api/project",
        project,
        { headers: { Authorization: `Bearer ${user.accessToken}` } }
      );
      handleNotification("Project Updated Successfully");
    } catch (error) {
      handleNotification("couldn't update project");
    }
    setLoadingUpdate(false);
  };

  return (
    <Container>
      <Wrapper>
        <Header>
          <Heading>Update Project</Heading>
        </Header>
        <MiddleContainer>
          <InputItem>
            <Label>Title</Label>
            <InputContainer>
              <Input
                name="title"
                value={project.title}
                onChange={(e) => handleProject(e)}
                type="text"
                placeholder="title"
              />
            </InputContainer>
          </InputItem>
          <InputItem>
            <Label>Visibility</Label>
            <InputContainer>
              <Select
                name="visibility"
                value={project.visibility}
                onChange={(e) => handleProject(e)}
              >
                <Option value="" default="true">
                  --select--
                </Option>
                <Option>public</Option>
                <Option>private</Option>
              </Select>
            </InputContainer>
          </InputItem>
          <InputItem>
            <Label>Link</Label>
            <InputContainer>
              <Input
                onChange={(e) => handleProject(e)}
                name="link"
                value={project.link}
                type="text"
                placeholder="https://www.github.com/sdlfkjsdf"
              />
            </InputContainer>
          </InputItem>
          <InputItem>
            <Label>Members</Label>
            {toggleUsers ? (
              <MemberInputContainer>
                {members.map((item) => (
                  <ImgContainer>
                    <Image src={item.image} />
                  </ImgContainer>
                ))}

                <ImgContainer>
                  <EditIcon
                    onClick={() => {
                      setToggleUsers((item) => !item);
                    }}
                    style={IconStyle}
                  />
                </ImgContainer>
              </MemberInputContainer>
            ) : (
              <SearchMemberInputContainer>
                <MemberInputContainer>
                  {members.map((item) => (
                    <ImgContainer>
                      <Image
                        onClick={() => {
                          deleteMember(item);
                        }}
                        src={item.image}
                      />
                    </ImgContainer>
                  ))}
                </MemberInputContainer>
                <SearchMember>
                  <SearchContainer>
                    <UsersInputContainer>
                      <MembersInput
                        placeholder="search users"
                        onChange={(e) => handleChange(e)}
                      />
                    </UsersInputContainer>
                    <CloseIconContainer>
                      <CloseRoundedIcon
                        onClick={() => {
                          setToggleUsers((item) => !item);
                        }}
                        style={CloseIconStyle}
                      />
                    </CloseIconContainer>
                  </SearchContainer>
                  <UserContainer>
                    {search && (
                      <SearchUserContainer>
                        {data?.map((item) => (
                          <Item
                            onClick={() => {
                              addMember(item);
                            }}
                          >
                            <UserIconContainer>
                              <Image
                                src={
                                  validURL(item.image)
                                    ? item.image
                                    : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
                                }
                              />
                            </UserIconContainer>
                            <UserDetails>
                              <SecondHeading>{item.name}</SecondHeading>
                              <Br />
                              <Username>{item.username.slice(0, 18)}</Username>
                            </UserDetails>
                          </Item>
                        ))}
                      </SearchUserContainer>
                    )}
                  </UserContainer>
                </SearchMember>
              </SearchMemberInputContainer>
            )}
          </InputItem>
        </MiddleContainer>

        <DescriptionContainer>
          <InputItemDescription>
            <Label>Description</Label>
            <InputContainerDescription>
              <Paragraph
                spellCheck="false"
                onChange={(e) => handleProject(e)}
                value={project.description}
                name="description"
                placeholder="Description of Project"
              />
            </InputContainerDescription>
          </InputItemDescription>
        </DescriptionContainer>
        <BottomContainer>
          <CreateButton
            onClick={() => {
              createProject();
            }}
          >
            {loadingUpdate ? <Loader /> : "Update"}
          </CreateButton>
        </BottomContainer>
      </Wrapper>
    </Container>
  );
};

export default UpdateProject;
