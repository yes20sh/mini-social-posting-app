const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const userModel = require('./models/users');
const postModel = require('./models/posts');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')

app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({extended : true}));
app.use(cookieParser());

app.get("/", (req, res)=> {
    res.render('index')
});

app.post('/register', async (req, res) => {
    let {username, name, age, email, password} = req.body
    let user = await userModel.findOne({email});
    if (user) return res.status(500).send("user already registered!");
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(password, salt, (err, hash) => {
            let createUser = userModel.create({
                username,
                name,
                age,
                email,
                password : hash
            });
            let token = jwt.sign({email : email, userid : createUser._id}, "sshh");
            res.cookie('token', token);
            res.redirect('/profile')
        });
    });
});

app.get('/login', (req, res) => {
    res.render("login");
});
app.post('/login', async (req, res) => {
    let {email, password} = req.body;
    let user = await userModel.findOne({email});
    
    if (!user) return res.status(500).send("Something went wrong .");
    
    bcrypt.compare(password, user.password, (err, result)=> {
        if (result) {
            let token = jwt.sign({email : email, userid : user._id}, "sshh");
            res.cookie('token', token);
           res.status(200).redirect('/profile')
        } else {
            res.redirect('/login')
        };
    });
});

app.get('/logout', (req, res) => {
    res.cookie("token" , "");
    res.redirect('/login');
})

app.get('/profile', isLoggedIn, async (req, res) => {
    let user = await userModel.findOne({email : req.user.email}).populate("posts");
    res.render("profile", {user});
});

app.post('/post', isLoggedIn, async (req, res) => {
    let user = await userModel.findOne({email : req.user.email});
    let content = req.body.content;
    let post = await postModel.create({
        user: user._id,
        content
    });
    user.posts.push(post._id);
    await user.save();
    res.redirect("/profile");
});

app.get('/like/:id', isLoggedIn, async (req, res) => {
    let post = await postModel.findOne({ _id: req.params.id }).populate("user");
    const userId = req.user.userid;
    const index = post.likes.indexOf(userId);
    if (index === -1) {
        post.likes.push(userId); // Like
    } else {
        post.likes.splice(index, 1); // Unlike
    }
    await post.save();
    res.redirect("/profile");
});

app.get('/edit/:id', isLoggedIn, async (req, res) => {
    let post = await postModel.findOne({ _id: req.params.id }).populate("user");
    res.render('edit', {post});
});

app.post('/update/:id', isLoggedIn, async (req, res) => {
    let post = await postModel.findOneAndUpdate({ _id: req.params.id }, {content : req.body.content  })
    res.redirect('/profile');
});

app.get('/delete/:id', isLoggedIn, async (req, res) => {
    let post = await postModel.findOneAndDelete({ _id: req.params.id });
    res.redirect('/profile');
});

// middleware

function isLoggedIn (req, res, next) {
    if(req.cookies.token === "") res.redirect("login");
    else{
        let data = jwt.verify(req.cookies.token, "sshh");
        req.user = data
        next();
    };
};

app.listen('3000');