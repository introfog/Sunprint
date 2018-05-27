const express = require('express');
const fs = require('fs');

const app = express();
const parser = require('body-parser');

app.use(express.static(`${__dirname}/public/`));
app.use(parser.json());

app.listen(3000, () => {
  console.log('Server running on port 3000');
});


app.get('/', (req, res) => {
  res.sendFile(`${__dirname}/public/index.html`);
});

app.get('/read', (req, res) => {
  res.end(fs.readFileSync('./server/data/posts.json', 'utf8'));
});

app.post('/write', (req, res) => {
  fs.writeFileSync('./server/data/posts.json', `${JSON.stringify(req.body)}`);
  res.end();
});

app.get('/getPhotoPost', (req, res) => {
  const photoPosts = JSON.parse(fs.readFileSync('./server/data/posts.json', 'utf8'));
  const post = photoPosts.find(post => String(req.query.id) === post.id);

  if (post) {
    res.send(post);
    res.status(200).end();
  } else {
    res.status(404).end();
  }
});

app.post('/getPhotoPosts', (req, res) => {
  const photoPosts = JSON.parse(fs.readFileSync('./server/data/posts.json', 'utf8'));
  const filterConfig = req.body;
  skip = req.query.skip || 0;
  top = req.query.top || 10;

  // console.log ("parameters filterConfig: " + filterConfig.author);

  photoPosts.forEach((post) => { post.createdAt = new Date(post.createdAt); });

  let result = [];
  if (filterConfig !== undefined && 'author' in filterConfig) {
    photoPosts.forEach((value) => {
      if (value.author === filterConfig.author) {
        result.push(value);
      }
    });
  } else if (filterConfig !== undefined && 'createdAt' in filterConfig) {
    photoPosts.forEach((value) => {
      if (value.createdAt > filterConfig.createdAt) {
        result.push(value);
      }
    });
  } else {
    result = photoPosts.slice();
  }

  result.sort((a, b) => b.createdAt - a.createdAt);
  result = result.slice(skip, top);

  if (result) {
    res.send(result);
    res.status(200).end();
  } else {
    res.status(404).end();
  }
});

app.post('/addPhotoPost', (req, res) => {
  const photoPosts = JSON.parse(fs.readFileSync('./server/data/posts.json', 'utf8'));
  const newPost = req.body;
  newPost.createdAt = new Date(newPost.createdAt);

  let flag = true;
  photoPosts.forEach((post) => {
    if (post.id === newPost.id) {
      flag = false;
    }
  });

  if (validatePhotoPost(newPost) && flag) {
    photoPosts.push(newPost);
    fs.writeFileSync('./server/data/posts.json', JSON.stringify(photoPosts));
    res.send('Post was added.');
    res.status(200).end();
  } else {
    res.send("Post wasn't added.");
    res.status(404).end();
  }
});

let validatePhotoPost = function (post) {
  if (post === undefined) {
    return false;
  }
  if (!('id' in post && (typeof post.id === 'string'))) {
    return false;
  }
  if (!('description' in post && (typeof post.description === 'string') && post.description.length < 200)) {
    return false;
  }
  if (!('createdAt' in post && post.createdAt instanceof Date)) {
    return false;
  }
  if (!('author' in post && (typeof post.author === 'string'))) {
    return false;
  }
  if (!('photoLink' in post && (typeof post.author === 'string'))) {
    return false;
  }

  return true;
};

app.put('/editPhotoPost', (req, res) => {
  const photoPosts = JSON.parse(fs.readFileSync('./server/data/posts.json', 'utf8'));
  const post = req.body;
  if (!post) {
    res.status(404).end();
  }

  const result = photoPosts.find(item => item.id === String(req.query.id));

  if (result === null) {
    res.send(`Don't find post with id = ${post.id}`);
    fs.writeFileSync('./server/data/posts.json', JSON.stringify(photoPosts));
    res.status(404).end();
  } else {
    if ('description' in post && (typeof post.description === 'string') && post.description.length < 200) {
      result.description = post.description;
    }
    if ('photoLink' in post && (typeof post.photoLink === 'string')) {
      result.photoLink = post.photoLink;
    }
    res.send('Post successfully changed.');
    fs.writeFileSync('./server/data/posts.json', JSON.stringify(photoPosts));
    res.status(200).end();
  }
});

app.delete('/removePhotoPost', (req, res) => {
  const photoPosts = JSON.parse(fs.readFileSync('./server/data/posts.json', 'utf8'));
  const result = photoPosts.find(item => item.id === String(req.query.id));

  if (result === null) {
    res.status(404).end();
    res.send("Don't find post");
  } else {
    photoPosts.splice(photoPosts.indexOf(result), 1);
    res.send(result);
    res.status(200).end();
  }
  fs.writeFileSync('./server/data/posts.json', JSON.stringify(photoPosts));
});
