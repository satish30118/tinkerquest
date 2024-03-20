import React, { useEffect, useState } from "react";
import Layout from "../../../layout/Layout";
import AdminMenu from "../AdminMenu";
import { useAuth } from "../../../../contextAPI/authContext";
import axios from "axios";
import "./chat.css";

const Chat = () => {
  const [auth] = useAuth();
  const [message, setMessage] = useState("");
  const [allChat, setAllChat] = useState([]);
  const [users, setUsers] = useState();

  const sender = {
    senderId: auth?.user?._id,
    senderName: auth?.user?.name,
    city: auth?.user?.city,
  };

  const checkEnter = (e) => {
    // console.log(e.key)
    if (e.key === "Enter") {
      sendMessage(e);
    }
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

  /* TOTAL USER */
  const getTotalUsers = async () => {
    try {
      const { data } = await axios.get("/api/v1/auth/get-all-user");

      if (data) {
        setUsers(data?.allUser);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getTotalUsers();
    getAllChat();
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
              <u>Message</u>
            </h1>
          </div>
          <div style={{ display: "flex", paddingBottom: "30px" }}>
            <div
              className="chat-member"
              style={{ width: "30%", height: "70vh", overflow: "auto" }}
            >
              {users?.map((u) => (
                <div className="member-card">
                  <h3>{u?.name}</h3>
                  <p>
                    <i class="fa-solid fa-user"></i>{" "}
                    {u?.isAdmin ? "Admin" : "Lab Associate"}
                  </p>
                </div>
              ))}
            </div>

            <div
              className="chat"
              style={{
                backgroundImage:
                  "url(https://img.freepik.com/free-vector/clean-medical-background_53876-97927.jpg?w=826&t=st=1710503052~exp=1710503652~hmac=b18f19bc27a389b93f7bb81e03bc9d5ddc4ce7330ab5412b5349c1c10a6137b9)",
                width: "70%",
                borderRadius: "9px",
                // backgroundRepeat:"no-repeat",
                // backgroundSize:"cover",
                margin: "3px auto",
                height: "70vh",
                position: "relative",
                padding: "20px",
              }}
            >
              <div
                className="show-messages"
                style={{
                  height: "60vh",
                  overflow: "auto",
                  scrollBehavior: "smooth",
                  // background:"red"
                }}
              >
                {allChat?.map((chat) => (
                  <div
                    key={chat._id}
                    style={{
                      fontSize: "12px",
                      background: `${
                        chat?.sender?.senderId == auth?.user?._id
                          ? "rgba(0, 0, 255,0.4)"
                          : "rgba(12, 236, 15,0.6)"
                      }`,
                      // backgroundColor:"rgba(255, 255, 255,0.2)",
                      borderRadius: "8px",
                      margin: "5px 0",
                      width: "40%",
                      color: "white",
                      // fontWeight:"600",
                      padding: "10px 20px",
                      textAlign: `${
                        chat?.sender?.senderId == auth?.user?._id
                          ? "right"
                          : "left"
                      }`,
                      marginLeft: `${
                        chat?.sender?.senderId == auth?.user?._id ? "60%" : "0%"
                      }`,
                    }}
                  >
                    <p
                      style={{
                        fontSize: "20px",
                        fontWeight: "500",
                        // padding: "7px 0",
                      }}
                    >
                      {chat?.message}
                    </p>
                    <p>
                      <i class="fa-solid fa-user"></i>{" "}
                      {chat?.sender?.senderName}
                    </p>
                    <p>{chat?.sender?.city}</p>
                    {/* <p>{chat?.createdAt}</p> */}
                  </div>
                ))}
              </div>
              <div
                className="chat-message"
                style={{
                  position: "absolute",
                  bottom: "0",
                  left: "0",
                  width: "90%",
                  background: "white",
                }}
              >
                <input
                  type="text"
                  style={{
                    padding: "8px 10px",
                    // border: "3px solid black",
                    borderRadius: "9px",
                    outline: "none",
                    fontFamily: "poppins",
                    fontSize: "18px",
                    fontWeight: "460",
                    width: "100%",
                    // background:"red"
                  }}
                  placeholder="Message Here"
                  value={message}
                  onChange={(e) => {
                    setMessage(e.target.value);
                  }}
                  onKeyDown={checkEnter}
                />
                <i
                  class="fa-solid fa-paper-plane"
                  style={{
                    fontSize: "22px",
                    cursor: "pointer",
                    textAlign: "center",
                    color: "blue",
                    width: "10%",
                    position: "relative",
                    left: "-8%",
                  }}
                  id="m-btn"
                  onClick={sendMessage}
                ></i>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Chat;
