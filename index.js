const cors = require("cors");

const app = require("express")();
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");

app.use(cors());

const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

//Port number
const port = process.env.PORT || 3000;

io.on("connection", (socket) => {
  console.log(`⚡: ${socket.id} user just connected!`);
  socket.on("disconnect", () => {
    console.log(`🔥: User ${socket.id} disconnected`);
  });

  socket.on("data", function (data) {
    io.emit("svgDataLoaded", data);
  });

  socket.on("clear", (clearData) => {
    if (clearData.clear) {
      io.emit("clearAll", true);
    }
  });
});

app.get("/", (req, res) => {
  res.send({
    status: 200,
    message: "Ohio",
  });
});

server.listen(port, (req, res) => {
  console.log(`Server started on port : ${port}`);
});
