import mongoose from "mongoose"; 

const userSchema = new mongoose.Schema({ 
    email: String, 
    password: String, 
}); 

const googleSchema = new mongoose.Schema({ 
    email: String 
})

const todoSchema = new mongoose.Schema({ 
    title: String, 
    done: Boolean, 
    email: String, 
}); 

export const User = mongoose.models.User || mongoose.model('User', userSchema); 
export const Todo = mongoose.models.Todo || mongoose.model('Todo', todoSchema); 
export const GoogleUser = mongoose.models.GoogleUser || mongoose.model('GoogleUser', googleSchema); 
