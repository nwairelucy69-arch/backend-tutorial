import mongoose from "mongoose";
const omalucycoutureSchema = new mongoose.Schema(
    {
        name:{type:String, required:true},
        email:{type:String, required:true},
        phoneNumber:{type:String, required:true, unique:true},
        password:{type:String, required:true},
        country:{type:String, required:true},
        state:{type:String, required:true},
        address:{type:String, required:true},
        name:{type:String, required:true},

    },
    {timestamps:true}
)

const  omalucycouture = mongoose.model ("omalucycouture",
    omalucycoutureSchema)
    export default omalucycouture
