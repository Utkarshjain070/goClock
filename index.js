var express = require('express');
var mongoose = require('mongoose')
var app = express();
var PORT = process.env.PORT || 8080
const cors = require("cors");
const mongoUrl =
  "mongodb+srv://Utkarsh_2002:REyA3tN*EdKx*Zh@cluster0.ptpvesm.mongodb.net/?retryWrites=true&w=majority";
  mongoose.connect(mongoUrl, {
    useNewUrlParser: true,
  })
  .then(() => {
    console.log("Connected to database");
  })
  .catch((e) => console.log(e));
  require("./userdetails.js");
const user = mongoose.model("goClockuserInfo");


app.use(cors());
app.use(express.json())

app.get("/", (req,res)=>{
    res.send("working")
})

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const JWT_SECRET ="sdffsdfjsdkfhsj dfusdihfsdjkfhuif";

app.post("/login", async (req,res)=>{
   const {email, password} = req.body;
   
   try {
    const loginUser =await user.findOne({email});
    console.log(loginUser)
    if(!loginUser){
    return res.send({error:"user not found"})
    }
    if(await bcrypt.compare(password, loginUser.password)){
       const token = jwt.sign({loginUser}, JWT_SECRET);
       
       if(res.status(200)){
        return res.send({status: "ok", data: {token,loginUser}})
       }
       else{
        return res.send({error:"error"})
       }
    }
    
    return res.send({ status: "error", error: "Invalid Password" });
    
   } catch (error) {
    console.log(error);
    res.send({ error: "error" });
   }
   
    


})
app.post("/register", async (req,res)=>{
    const {email, password, name, userType } = req.body;
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    const encryptedPassword = await bcrypt.hash(password, salt);

    try {
        const olduser = await user.findOne({ email });
    if (olduser) {
      return res.send({ error: "user exist" });
    }

    await user.create({
      name,
      email,
      password : encryptedPassword,
      userType
    });
   
      res.send({ status: "ok" });

    } catch (error) {
        res.send(error)
    }
    

 
 
 });


app.listen(PORT, console.log(`Server started on port ${PORT}`));