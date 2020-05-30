const express = require('express');
const morgan = require('morgan');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
require('dotenv').config();
const slugify = require('slugify');
const medicineRoutes=require("./routes/medicine");
const { User } = require('./model/user');
const { auth } = require("./middleware/auth");

const config = require('./config/key')

mongoose.connect(config.mongoURI,
    {useNewUrlParser: true,useCreateIndex:true,useFindAndModify:false,useUnifiedTopology:
        true}).then(()=>console.log('DB connected'))
                            .catch(err=>console.error(err));



app.use(cors());
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended : true}));
app.use(bodyParser.json());
app.use(cookieParser());

app.use("/api",medicineRoutes);

app.get("/",(req,res)=>{
    res.json({
        "hello": "I am happy to deploy my application"
    })
})


app.get('/api/users/auth',auth,(req,res)=>{
    res.status(200).json({
        _id:req._id,
        isAuth:true,
        email:req.user.email,
        name:req.user.name,
        lastname:req.user.lastname,
        role:req.user.role
    })
})


app.post('/api/users/register',(req,res)=>{
    const user = new User(req.body);
    User.findOne({email: req.body.email},(err,user)=>{
        if(!user){
            user.save((err,doc)=>{
                if(err) return res.json({ success : false,err });
                return res.status(200).json({
                success:true,
                userData: doc
            });
        })
    }else{
        res.json({
            loginSuccess: false,
            message: "Auth failed, email is already registered."
        });
    }
});
});


app.post('/api/users/login',(req,res)=>{
    //findEmail
    User.findOne({email: req.body.email},(err,user)=>{
         if(!user)
         return res.json({
             loginSuccess: false,
             message: "Auth failed, email not found"
         });
    //comparePassword
         user.comparePassword(req.body.password,(err,isMatch)=>{
            if(!isMatch){
                return res.json({ loginSuccess : false, message: "wrong password"})
            }
         });
     //generateToken
         user.generateToken((err,user)=>{
             if(err) return res.status(400).send(err);
             res.cookie("x_auth",user.token)
                .status(200)
                .json({
                    loginSuccess: true
                });
         });
     });
});

app.get("/api/users/logout",(req,res)=>{
    User.findOneAndUpdate({_id:req.user._id},{token: ""},(err,cb)=>{
        if(err) return res.json({
            success:false, err
        });
        return res.status(200).send({
            success:true
        });
    });
});

const port = process.env.PORT || 5000;

app.listen(port,()=>{
    console.log(`Server Running at ${port}`) 
});
