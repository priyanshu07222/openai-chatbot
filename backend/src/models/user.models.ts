import mongoose, {Schema} from 'mongoose'
// imkport { randomUUID} from "crypto";
const chatSchema = new Schema({
    role: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
})

const userSchema = new Schema({
    name:{
        type:String,
        required: true
    },
    email:{
        type:String,
        required: true,
        unique: true
    },
    password:{
        type:String,
        required: true,
    },
    chats: [chatSchema]
});

const User =  mongoose.model("User", userSchema)

export default User;