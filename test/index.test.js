import io from "socket.io-client";

const socket = io("http://localhost:5000");

socket.on("connect", () => {
  console.log("Connected to server");

  // Join a group
  socket.emit("joinGroup", {
    groupId: "eb4e9283-948e-4fb6-838c-9010b41714f7",
    username: "TestUser",
  });

  // Send a message
  setTimeout(() => {
    socket.emit("sendMessage", { text: "Hello from test client!" });
  }, 2000);
});

socket.on("newMessage", (message) => {
  console.log("Received message:", message);
});

socket.on("systemMessage", (message) => {
  console.log("System message:", message);
});

socket.on("error", (error) => {
  console.error("Error:", error);
});

socket.on("disconnect", () => {
  console.log("Disconnected from server");
});
