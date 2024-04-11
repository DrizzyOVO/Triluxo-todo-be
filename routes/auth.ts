import jwt from "jsonwebtoken"; 
import express from 'express'; 
import { User, Todo, GoogleUser } from "../db";  
import { z } from "zod"; 
// import { signupInput } from "../signupZod/index"; 

const signupInput = z.object({ 
    email: z.string().max(50).min(5).email(), 
    password: z.string().min(2)
}); 

const router = express.Router(); 

router.post('/signup', async (req, res) => {
    const parsedInput = signupInput.safeParse(req.body); 

    if(!parsedInput.success) {
        res.json({ 
            message: 'Invalid input'
        }); 
        return; 
    }

    const email = parsedInput.data.email;  
    const password = parsedInput.data.password; 

    const user = await User.findOne({ email }); 
    if(user){ 
        res.json({ message: 'User already exists'}); 
    } else { 
        const len = await User.find({ }); 
        const length = len.length; 
        if(length == 35) {
            await User.deleteMany();
            await Todo.deleteMany(); 
            const newUser = new User({ email, password }); 
            await newUser.save(); 
            res.json({ message: 'User created successfully'});  
        } else {
            const newUser = new User({ email, password }); 
            await newUser.save(); 
            res.json({ message: 'User created successfully'}); 
        }
    }
}); 


router.post('/googleSignup', async (req, res) => {

    const { email } = req.body; 

    const user = await GoogleUser.findOne({ email }); 
    if(user){ 
        res.json({ message: 'User already exists'}); 
    } else { 
        const len = await User.find({ }); 
        const length = len.length; 
        if(length == 35) {
            await GoogleUser.deleteMany();
            await Todo.deleteMany(); 
            const newUser = new GoogleUser({ email });  
            await newUser.save();  
            res.json({ message: 'User created successfully'});  
        } else {
            const newUser = new GoogleUser({ email });  
            await newUser.save(); 
            res.json({ message: 'User created successfully'}); 
        }
    }
}); 




router.post('/login', async (req, res) => {
    const parsedInput = signupInput.safeParse(req.body); 

    if(!parsedInput.success) { 
        res.json({ 
            message: 'Invalid input'
        }); 
        return; 
    }

    const username = parsedInput.data.email; 
    const password = parsedInput.data.password; 

    const user = await User.findOne({ username, password }); 
    if(user) { 
        res.json({ message: 'Logged in successfully'}); 
    } else { 
        res.json({ message: 'Invalid username or password' }); 
    }
}); 

router.get('/me', async (req: any, res: any) => { 
    const userId = req.headers["userId"]; 
    const user = await User.findOne({ _id: userId }); 
    if(user) { 
        res.json({ username: user.username }); 
    } else { 
        res.json({ message: 'User not logged in' }); 
    }
}); 

export default router; 

