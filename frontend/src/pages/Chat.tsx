import React, { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { Avatar, Box, Button, IconButton, Typography, colors } from '@mui/material'
import { useAuth } from '../context/AuthContext'
import ChatItem from '../components/chat/ChatItem';
import { IoMdSend } from 'react-icons/io';
import { deleteUserChats, getUserChats, sendChatRequest } from '../helpers/api-communicator';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

// const chatMessages = [
//   { role: 'user', content: 'Hello, how can I help you?' },
//   { role: 'assistant', content: 'Hi there! I can help you with a variety of tasks. What do you need assistance with?' },
//   { role: 'user', content: 'I need help with setting up my profile.' },
//   { role: 'assistant', content: 'Sure, I can help with that. Could you please provide me with some more details?' },
//   { role: 'user', content: 'I want to change my profile picture.' },
//   { role: 'assistant', content: 'To change your profile picture, go to your profile settings and look for the option to upload a new picture.' },
//   // Add more chat messages as needed
// ];

type Message = {
  role: "user" | "assistant";
  content: string
}
const Chat = () => {
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement | null>(null)
  const auth = useAuth();
  const [chatMessages, setChatMessages] = useState<Message[]>([])
  const handleSubmit = async () => {
    const content = inputRef.current?.value as string;
    console.log(content)
    if(inputRef && inputRef.current){
      inputRef.current.value = "";
    }
    const newMessage: Message = {role:"user", content}
    setChatMessages((prev) => [...prev, newMessage])

    console.log(chatMessages)
    const chatData = await sendChatRequest(content);
    console.log("log",chatData)
    setChatMessages([...chatData?.chats])
  }

  const handleDeleteChats = async () => {
    try {
      toast.loading("Deleting chats", {id: "deletechats"})
      await deleteUserChats();
      setChatMessages([])
      toast.success("Successfully deleted all chats",{id:"deletechats"})
    } catch (error) {
      console.log("chat not deleted", error)
      toast.error("Deleting chats failed",{id:"deletechats"})
    }
  }

  useLayoutEffect(()=>{
    if(auth?.isLoggedIn && auth.user){
      toast.loading("Loading chats",{id: "loadchats"})
      getUserChats().then((data) => {
        setChatMessages([...data.chats])
        toast.success("Successfully loaded chats",{id:"loadchats"})
      }).catch(err => {
        console.log(err);
        toast.error("Loading Failed", {id:"loadchats"})
    })
    }
  },[auth])

  useEffect(()=>{
    if(!auth?.user){
      return navigate("/login")
    }
  },[auth])

  return (
    <Box
      sx={{
        display: "flex",
        flex: 1,
        width: "100%",
        height: "100%",
        mt: 3,
        gap: 3
      }}
    >
      <Box
        sx={{
          display: { md: "flex", xs: "none", sm: "none" }, flex: 0.2, flexDirection: "column"
        }}
      >
        <Box sx={{
          display: "flex",
          width: "100%",
          height: "60vh",
          bgcolor: "rgb(17,29,39)",
          borderRadius: 5,
          flexDirection: "column",
          mx: 3,
        }}>
          <Avatar sx={{
            mx: "auto",
            my: 2,
            bgcolor: "white",
            color: "black",
            fontWeight: 700
          }}>
            {auth?.user?.name[0]}
            {/* {auth?.user?.name.split(" ")[1][0]} */}
          </Avatar>
          <Typography sx={{ mx: "auto", fontFamily: "work sans" }}>
            You are talking to ChatBOT
          </Typography>
          <Typography sx={{ mx: "auto", fontFamily: "work sans", my: 4, p: 3 }}>
            You can ask some question related to knowledge, Business, Advices, Education, etc.But avoid sharing personal information.
          </Typography>
          <Button 
          onClick={handleDeleteChats}
          sx={{
            width: "200px",
            my: 'auto',
            color: 'white',
            fontWeight: "700",
            borderRadius: 3,
            mx: "auto",
            bgcolor: colors.red[300],
            ":hover": {
              bgcolor: colors.red.A400
            }
          }
          }>Clear converstation</Button>
        </Box>
      </Box>
      <Box sx={{ display: "flex", flex: { md: 0.8, xs: 1, sm: 1 }, flexDirection: "column", px: 3 }}>
        <Typography sx={{ fontSize: "40px", color: "white", mb: 2, mx: "auto", fontWeight: "600" }}>
          Model - GPT 3.5 Turbo
        </Typography>
        <Box sx={{ width: "100%", height: "60vh", borderRadius: 3, mx: "auto", display: "flex", flexDirection: "column", overflow: "scroll", overflowX: "hidden", overflowY: "auto", scrollBehavior: "smooth" }}>
          {chatMessages.map((chat, index) =>
          // @ts-ignore 
            <ChatItem content={chat.content} role={chat.role} key={index} />
          )}
        </Box>

        <div style={{ width: "100%", borderRadius: 8, backgroundColor: "rgb(17,27,39)", display: "flex", margin: "auto" }}>
          <input ref={inputRef} type="text" style={{ width: "100%", backgroundColor: "transparent", padding: "30px", border: "none", outline: "none", color: "white", fontSize: "20px" }} />
          <IconButton onClick={handleSubmit} sx={{ml:"auto", color:"white", mx:1}} >
            <IoMdSend/>
          </IconButton>
        </div>
      </Box>
    </Box>
  )
}

export default Chat