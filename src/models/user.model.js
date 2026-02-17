import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true
    }})

    userSchema.pre("save", async function(next){
        if(!this.isModified("password")) return next();
        this.password = await bcrypt.hash(this.password, 10);
        next();
    })
    userSchema.methods.comparePassword = async function(password){
        return await bcrypt.compare(password, this.password)
    }

    userSchema.methods.generateToken = function(){
        return jwt.sign(
            {id: this._id, 
            username: this.username
            },
            process.env.JWT_SECRET,
            {expiresIn: "1d"}
        )
    }

const User = mongoose.model("user", userSchema);

export default User;
