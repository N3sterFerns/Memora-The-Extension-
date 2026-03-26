import mongoose from "mongoose";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

const userSchema = mongoose.Schema({
    email: {
        type: String,
        unique: true
    },
    password: {
        type: String,
        select: false
    },
}, {timestamps: true})




userSchema.pre("save", async function () {
    if(!this.isModified("password")) return;
    
    const salt = await bcrypt.genSalt(10)
    
    this.password = await bcrypt.hash(this.password, salt)
})


userSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password)
}

userSchema.methods.generateToken = function(userId){
    return jwt.sign({_id: userId}, process.env.JWT_SECRET, {expiresIn: "7d"})
}

const userModel = mongoose.model("user", userSchema)


export {userModel}