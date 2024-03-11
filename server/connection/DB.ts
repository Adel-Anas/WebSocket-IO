import mongoose from "mongoose";

mongoose.connect("mongodb+srv://adelanas2000:anas@websocket.329dmws.mongodb.net/chat")
mongoose.connection.on("error", () => {
    console.log("Error connecting to MongoDB")
})

mongoose.connection.on("connected", () => {
    console.log("Connected to MongoDB")
})