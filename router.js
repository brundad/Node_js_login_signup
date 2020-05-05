let data=[
    {username: "brunda",
    password:"12345"
},
{
    username:"brunda2021",
    password:"1003"
}
];
const fs=require("fs");
let lg;
const express1=require('express');
const bparser1=require('body-parser');
const path=require('path');
const router=express1.Router();
router.use(bparser1.urlencoded({extended:true}));
router.get("/registration",(req,res,next) =>res.sendfile(path.join(__dirname,"view","index.html")));
router.get("/signup",(req,res,next) =>res.sendfile(path.join(__dirname,"view","signup.html")));
router.get("/login",(req,res,next) =>res.sendfile(path.join(__dirname,"view","login.html")));
router.get("/download",(req,res,next) =>res.sendfile(path.join(__dirname,lg+".txt")));

module.exports=router;
router.post("/loginsuccess",(req,res,next)=>{
    console.log(req.body.username);
    let tempusername=req.body.username;
    let temppassword=req.body.password;
    for(let val of data)
    {
        let flag=true;
        if(flag==true)
        {
            if(val.username==tempusername && val.password==temppassword)
            {
                console.log("successfully loged in");
                res.sendfile(path.join(__dirname,"view","page.html"));
                lg=tempusername;
            }
        }
        else{
            res.status(301).redirect(301,'/signup');
        }
        
    }
    
});
router.post("/signupsuccess",(req,res,next)=>{
    console.log(req.body.username);
    let tempusername=req.body.username;
    let temppassword=req.body.password;
    let newuser={
        username:tempusername,
        password:temppassword
    }
    let flag=false;
    for(let val of data){
        if(val.username==tempusername )
        {
            flag=true;
            
        }
    }
    if(flag==false){
        data.push(newuser);
        let filename=tempusername+".txt";
        let filedata="name :"+tempusername+"\npassword:"+temppassword+" ";
        fs.writeFileSync(filename,filedata);
    }
    else{
        res.status(301).redirect(301,'/signup');
    }
    res.status(301).redirect(301,'/registration');
});

