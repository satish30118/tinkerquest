import React, { useEffect, useState } from "react";
import Layout from "../../../layout/Layout";
import AdminMenu from "../AdminMenu";
import { useAuth } from "../../../../contextAPI/authContext";
import axios from "axios";

const Chat = () => {
  const [auth] = useAuth();
  const [message, setMessage] = useState("");
  const [allChat, setAllChat] = useState([]);

  const sender = {
    senderId: auth?.user?._id,
    senderName: auth?.user?.name,
    city: auth?.user?.city,
  };

  // SENDING NEW MESSAGE //
  const sendMessage = async (e) => {
    e.preventDefault();
    if (!message) {
      return;
    }
    try {
      const { data } = await axios.post(`/api/v1/chat/create-chat`, {
        message,
        sender,
      });

      if (data) {
        getAllChat();
        setMessage("");
        return;
      }
    } catch (error) {
      console.log(error);
    }
  };

  // GETTING ALL CHAT
  const getAllChat = async () => {
    try {
      const { data } = await axios.get(`/api/v1/chat/get-all-chat`);

      if (data) {
        setAllChat(data?.chats);
      }
      return;
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllChat()
  }, []);

  return (
    <Layout>
      <div className="admin-dashboard">
        <div className="menu">
          <AdminMenu />
        </div>
        <div className="content">
          <div className="dashboard-heading">
            <h1 className="dashboard-heading">
              <u>Communicate with lab associates and admins</u>
            </h1>
          </div>
          <div
            className="chat"
            style={{
              width: "85%",
              border: "2px solid gray",
              borderRadius: "6px",
              margin: "10px auto",
              height: "70vh",
              position: "relative",
              background: "lightgray",
              padding: "20px",
            }}
          >
            <div
              className="show-messages"
              style={{
                height: "60vh",
                overflow: "auto",
                scrollBehavior: "smooth",
              }}
            >
              {allChat?.map((chat) => (
                <div
                  key={chat._id}
                  style={{
                    fontSize: "13px",
                    background: "gray",
                    borderRadius: "8px",
                    margin: "5px 0",
                    width: "40%",
                    padding: "10px 20px",
                    // textAlign:`${chat?.sender?._id == auth?.user?._id ? "right" : "left"}`,
                    marginLeft: `${
                      chat?.sender?.senderId == auth?.user?._id ? "60%" : "0%"
                    }`,
                  }}
                >
                  <p
                    style={{
                      fontSize: "20px",
                      fontWeight: "500",
                      padding: "7px 0",
                    }}
                  >
                    {chat?.message}
                  </p>
                  <p>{chat?.sender?.senderName}</p>
                  <p>{chat?.sender?.city}</p>
                  <p>{Date(chat?.createdAt)}</p>
                </div>
              ))}
            </div>
            <div
              className="chat-message"
              style={{
                position: "absolute",
                bottom: "0",
                left: "0",
                width: "100%",
                background: "white",
              }}
            >
              <input
                type="text"
                style={{
                  padding: "8px 10px",
                  border: "none",
                  outline: "none",
                  fontFamily: "poppins",
                  fontSize: "18px",
                  fontWeight: "460",
                  width: "90%",
                }}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
              <i
                class="fa-solid fa-paper-plane"
                style={{
                  fontSize: "22px",
                  cursor: "pointer",
                  textAlign: "center",
                  color: "blue",
                  width: "10%",
                }}
                onClick={sendMessage}
              ></i>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Chat;
