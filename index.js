const express= require("express");
const app= express();
const port= 8080;
const path = require("path");
const { v4: uuidv4 } = require('uuid');
const methodOverride = require("method-override");

app.use(express.urlencoded({extended:true}));
app.use(methodOverride('_method'));

app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.static(path.join(__dirname,"public")));

let posts = [
    {
        id:uuidv4(),
        username: "NishuKumari",
        content: "The future belongs to those who believe in the beauty of their dreams"
    },
    {
        id:uuidv4(),
        username: "AdarshPatel",
        content: "You must be the change you wish to see in the world."
    },
    {
        id:uuidv4(),
        username: "RamaShankar",
        content: "Being consistent is the main thing!"
    },
    {
        id:uuidv4(),
        username: "ShanyaSharma",
        content: "Do one thing every day that scares you."
    },
    {
        id:uuidv4(),
        username: "KartikAaryan",
        content: "The best and most beautiful things in the world cannot be seen or even touched - they must be felt with the heart."
    },
    {
        id:uuidv4(),
        username: "AbhishekGautam",
        content: "It is during our darkest moments that we must focus to see the light."
    }
];

app.get("/posts",(req,res) =>{
    res.render("index.ejs",{posts});
});

app.get("/posts/new",(req,res) =>{
    res.render("new.ejs");
});

app.post("/posts",(req,res) =>{
    let{username,content}=req.body; //CREATING NEW POSTS
    let id=uuidv4();
    posts.push({id,username,content});
    res.redirect("/posts");
});

app.get("/posts/:id",(req,res) =>{
    let {id}=req.params;
    let post=posts.find((p)=> id==p.id);
    res.render("show.ejs",{post});
});

app.patch("/posts/:id",(req,res)=>{
    let{id}=req.params;
    let newContent=req.body.content;
    let post=posts.find((p) => id==p.id);
    post.content=newContent;
    console.log(post);
    res.redirect("/posts");
});

app.delete("/posts/:id",(req,res)=>{
    let{id}=req.params;
    posts=posts.filter((p) => id !== p.id);
    res.redirect("/posts");
});

app.get("/posts/:id/edit",(req,res) =>{
    let{id}=req.params;
    let post=posts.find((p) => id==p.id);
    res.render("edit.ejs",{post});
})




//const ipv6Address = "2401:4900:3b27:28a2:805c:f7f8:70f9:e923";
app.listen(port, '0.0.0.0', () => {
    console.log(`Server running on http://localhost:${port}`);
});