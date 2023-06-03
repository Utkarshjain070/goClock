const mongoose = require('mongoose');
const userDetailsSchema= new mongoose.Schema(
    {      
        name : String,
        email: {type: String, unique:true},
        password: String,
        userType : String,

    },
    {
        collection: "goClockuserInfo"
    },
    {
        timestamps: true
    }
)

mongoose.model("goClockuserInfo",userDetailsSchema);
module.exports = mongoose.model('goClockuserInfo', userDetailsSchema);