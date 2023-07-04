//node server which will handle our socket io connections
const port = process.env.PORT||8000;
const io = require("socket.io")(port, {
  cors: {
    origin: "*",
  },
});

const users = {};

io.on("connection", (socket) => {
  
  socket.on("new-user-joined", (name) => {
    users[socket.id] = name;
    socket.broadcast.emit("user-joined", name);
  });


  socket.on("send", (mess) => {
  socket.broadcast.emit("receive", {
    message: mess,
    name: users[socket.id],
  });
});

socket.on("disconnect", (mess) => {
  socket.broadcast.emit("left",users[socket.id]);
  delete users[socket.id];
});
  

});