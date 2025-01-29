const express = require('express');
const router = express.Router();
const {body, validationResult} = require('express-validator');
//  {/user/test}
const userModel = require("../models/user.model") ;
const bcrypt = require('bcrypt'); //to save hashed password
const jwt = require('jsonwebtoken');


router.get('/test', (req,res)=>{
    res.send('user test route')
})

router.get('/register', (req,res)=>{
    res.render('register.ejs');
})

router.post('/register',
    body('email').trim().isEmail().isLength({min:10}),
    body('password').trim().isLength({min:6}),
    body('username').trim().isLength({min:3}),
    
    async (req,res)=>{
        const errors = validationResult(req);
        // console.log(errors);
        if(!errors.isEmpty()){
           return  res.status(400).json({
            message: 'Invalid data entered',
            errors: errors.array()
           });
        }
        // else{
        //     res.send("User Successfully Registered");
        // }
        //dereferencing
        const {username, email, password} = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await userModel.create({
            email:email,
            username: username,
            password:hashedPassword
        })
        // .then(
            res.json(newUser)
        // )
        // .catch( 
        //     res.status(500).json({message:"Error creating user"})
        // );
});
 
router.get('/login', (req,res)=>{
    res.render('login.ejs');
})

router.post('/login',
    body('email').trim().isEmail().isLength({min:10}),
    body('email').trim().isLength({min:6}),
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                message: 'Invalid data entered',
                errors: errors.array()
            });
        }
        const { email, password } = req.body;
        const user = await userModel.findOne({
             email: email
        });

        if(!user){
            return res.status(401).json({
                message: 'Invalid email or password'
            });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        //                      pass from req.body^       ^hashedPassword(in DB)
        
        if(!isMatch){
            return res.status(401).json({
                message: 'Invalid email or password'
            });
        }
        
        /* jsonwebtoken */
        const token = jwt.sign({
            userId: user._id,
            email: user.email,
            username: user.username
        },
            process.env.JWT_SECRET,
        )
        res.cookie('token', token);;
        res.send('Logged in successfully');
    }
);
module.exports = router;