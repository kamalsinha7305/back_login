import express from "express"
//const express =require("express") 
import bcrypt from "bcrypt"
 import cors from "cors"

//const cors =require("cors")
import mongoose from "mongoose"
const app=express()
app.use(express.json())
app.use(express.urlencoded())
app.use(cors())

mongoose.connect("mongodb://127.0.0.1:27017/pro7")

.then(()=>{
console.log("mongodb connected");
})
.catch(()=>{
console.log('failed');
})

const newSchema=new mongoose.Schema({
email:{
type: String,
required: true
},
password: {
type: String,
required: true
}
})

const collection=mongoose.model("collection",newSchema)


app.get("/",cors(),(req,res)=>{
  
})

app.post("/", async(req,res)=>{
    const{email, password}=req.body



    try{
        const check=await collection.findOne({email: email,password:password})

        if(check){
            
          

            const passwordMatch = bcrypt.compare(password, check.password);
    
            if (passwordMatch) {
                console.log("Password is correct.");
                res.json("exist");
            }else {
                console.log("Incorrectpassword");
                res.json("Inncorrectpassword");
            
            }

        }

        else{
            res.json("Not exist")
            
        }
   
   
   
    }

    catch(e){
        res.json("notexist")
        console.log("other error")

    }
})




app.post("/signup",async(req,res)=>{
    const{email,password}=req.body

      const data={
        email:email,
        password:password

      }

    try{
        const check=await collection.findOne({email:email})

        if(check){
            res.json("exist")
        }
        else{
            res.json("Not exist")
            await collection.insertMany([data])
        }
    }

    catch(e){
        res.json("notexist")

    }
})


app.listen(8000,()=> {
    console.log("port connected")
})