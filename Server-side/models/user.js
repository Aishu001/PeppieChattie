import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    fullName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    gender: { type: String, required: true, enum: ["male", "female"]},
    password: { type: String, required: true } ,
    profileImageUrl: { type: String , default: ''},
});

const User = mongoose.model('user', userSchema);

export default User;
