const express = require('express');
const fs=require('fs');
const app = express();
const parser = require('body-parser');

app.use(express.static('public'));
app.use(parser.json());

app.listen(3000, ()=> {
    console.log('Server running on port 3000');
});


app.get('/', (req, res) => {
    res.sendFile(__dirname + "/index.html");
});

app.get('/getPhotoPost', (req, res)=>{
    let photoPosts = JSON.parse (fs.readFileSync ('./server/data/posts.json', 'utf8'));
    let post = photoPosts.find((post) => String (req.query.id) === post.id);
    post ? res.send (post) : res.status (404).end();
});

app.post('/getPhotoPosts', (req,res)=>{
    let photoPosts = JSON.parse(fs.readFileSync('./server/data/posts.json', 'utf8'));
    let filterConfig = req.body;
    skip = req.query.skip || 0;
    top = req.query.top || 10;

    console.log ("parameters filterConfig: " + filterConfig.author);

    photoPosts.forEach ((post) => {post.createdAt = new Date (post.createdAt);});

    let result = [];
    if (filterConfig !== undefined && "author" in filterConfig) {
        photoPosts.forEach(function (value) {
            if (value.author === filterConfig.author) {
                result.push(value);
            }
        });
    }
    else if (filterConfig !== undefined && "createdAt" in filterConfig){
        photoPosts.forEach(function (value) {
            if (value.createdAt > filterConfig.createdAt) {
                result.push(value);
            }
        });
    }
    else {
        result = photoPosts.slice();
    }

    result.sort(function (a, b) {
        return b.createdAt - a.createdAt;
    });
    result = result.slice(skip, top);

    result ? res.send(result) : res.status(404).end();
});

app.post('/addPhotoPost', (req, res)=>{
    let photoPosts = JSON.parse(fs.readFileSync('./server/data/posts.json', 'utf8'));
    let newPost = req.body;
    newPost.createdAt = new Date (newPost.createdAt);

    let flag = true;
    photoPosts.forEach ((post) => {if (post.id === newPost.id){
    	flag = false;
    }});

    if (validatePhotoPost(newPost) && flag) {
        photoPosts.push(newPost);
        fs.writeFileSync('./server/data/posts.json', JSON.stringify(photoPosts));
        res.send ("Post was added.");
    }
    else{
    	res.send ("Post wasn't added.");
    }
    res.status(200).end();
});

let validatePhotoPost = function (post) {
        if (post === undefined) {
            return false;
        }
        if (!("id" in post && (typeof post.id === "string"))) {
            return false;
        }
        if (!("description" in post && (typeof post.description === "string") && post.description.length < 200)) {
            return false;
        }
        if (!("createdAt" in post && post.createdAt instanceof Date)) {
            return false;
        }
        if (!("author" in post && (typeof post.author === "string"))) {
            return false;
        }
        if (!("photoLink" in post && (typeof post.author === "string"))) {
            return false;
        }

        return true;
    };

app.put('/editPhotoPost', (req,res)=>{
    let photoPosts = JSON.parse(fs.readFileSync('./server/data/posts.json', 'utf8'));
    let post = req.body;
    if (!post) {
        res.status(404).end();
    }

    let result = photoPosts.find(function (item) {
        return item.id === String (req.query.id);
    });

    if (result === null) {
        res.send ("Don't find post with id = " + post.id);
    }
    else {
        if ("description" in post && (typeof post.description === "string") && post.description.length < 200) {
            result.description = post.description;
        }
        if ("photoLink" in post && (typeof post.photoLink === "string")) {
            result.photoLink = post.photoLink;
        }
        res.send ("Post successfully changed.");
    }
    res.status(200).end();
});

app.delete('/removePhotoPost', (req, res)=>{
    let photoPosts = JSON.parse(fs.readFileSync('./server/data/posts.json', 'utf8'));
    let result = photoPosts.find(function (item) {
        return item.id === String (req.query.id);
    });

    if (result === null) {
    	res.status(404).end();
        res.send ("Don't find post");
    }
    else {
        photoPosts.splice(photoPosts.indexOf(result), 1);
        res.send (result);
        res.status(200).end(); 
    }
});