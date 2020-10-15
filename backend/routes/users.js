const router = require('express').Router();
const jwt = require('jsonwebtoken')
const bcryptjs = require('bcryptjs')
const {check, validationResult} = require('express-validator')
const UserSchema = require('../schemas/User')
require('dotenv').config();
const auth = require('../middleware/auth')

const jwtSecret = process.env.jwtSecret;


/*router.get(
    '/',
    (req,res) => {
        res.send("Users")
    }
)*/

router.get(
    '/',
    auth,
    async(req, res) => {
        try{
            const user = await UserSchema.findById(req.user.id).select('-password');
            res.json(user); 
        } catch(error){
            console.log(error.message);
            return res.status(500).json({ msg: "server Error..." });
        }
    }
)

router.post(
    '/register',
    [
        check('email', 'E-mail is required').isEmail(),
        check('password', 'password is required').not().isEmpty()
    ],
    async (req, res) => {
        try {
            let {email, password} = req.body;
            let user = await UserSchema.findOne({email});
            const errors = validationResult(req);
            if(!errors.isEmpty()){
                return res.status(401).json({errors: errors.array()})
            }

            if(user){
                return res.status(401).json({msg:"There is already user with this e-mail"});
            }

            const salt = await bcryptjs.genSalt(10);//the bigger the number the safer the password is, but it will slow down the app
            password = await bcryptjs.hash(password,salt);

            user = new UserSchema({
                email,
                password
            });

            await user.save();

            const payload = {
                user:{
                    id: user.id
                }
            }

            jwt.sign(
                payload,
                jwtSecret,
                //expires(30000)
                (err, token) => {
                    if(err) throw err;
                    res.json({token});
                }
                
            )

        } catch (error) {
            console.log(error.message);
            return res.status(500).json({ msg: "server Error..." });
        }
    }
)

router.post(
    '/login',
    [
        check('email', 'Type proper e-mail').isEmail(),
        check('password', 'password is required').not().isEmpty()
    ],
    async (req,res) => {
        try{
            let{password, email} = req.body;
            const errors = validationResult(req);
            let user = await UserSchema.findOne({email})

            if (!errors.isEmpty()) {
                return res.status(401).json({ errors: errors.array() })
            }

            if(!user){
                return res.status(401).json({msg: "There is no user with this e-mail"})
            }

            let isPasswordMatch = await bcryptjs.compare( password, user.password/**Hashed Password in db */)

            if(isPasswordMatch){
                const payload = { 
                    user: {
                        id: user.id
                    }
                }

                jwt.sign(
                    payload,
                    jwtSecret,
                    //expires(30000)
                    (err, token) => {
                        if (err) throw err;
                        res.json({ token });
                    }
                )
            } else res.status(401).json({msg: "Password doesn't match"})  //res.send("nope")

        } catch (error) {
            console.log(error.message);
            return res.status(500).json({ msg: "server Error..." });
        }
    } 
)   


module.exports = router