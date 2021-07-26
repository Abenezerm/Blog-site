const router = require('express').Router();
//import models to use CRUD on data...
const { Post, Comment, User } = require('../models/');


//GET: all posts...
router.get('/', async (req, res) =>{

  //try catch, gives responce if there was a network error, makes debugging much easier and faster
  try{
    //finds all posts including data from the user associated...
    const postData = await Post.findAll({
      include: [User],
    });

  //Map() will itterate over data, then .get({ plain: true }) will serialize it...
  const posts = postData.map((post) => post.get({ plain: true}));
  //renders the handlebars templete "all-posts" using data
  res.render('all-posts', { posts });

  }catch (err) {
    //responds with a 500 status if code fails without compiling any of the above...
    res.status(500).json(err);
  }
});


//GET: a single post by ID...
router.get('/post/:id', async (req, res) => {
  //get post by id, also pulls commments and users associated data....
  try{
    //looks for post based on id param..
    const postData = await Post.findByPk(req.params.id, {
      include: [
        User,
        {
          model: Comment,
          include: [User],
        },
      ],
    });

    //if the post data doesn't exsit, this will return a 404 status.
    if(!postData){
      res.status(404).json({ msg: 'This post has cannot be found, or does not exist!' });
      return;
    }

    //gets data and serializes it.
    const post  = postData.get({ plain: true });
    //renders to handlebars templete 'single-post'....
    res.render('single-post', { post });

  }catch (err){
    res.status(500).json(err);
  }
});

router.get('/login', (req, res) =>{
  //Takes the user to all posts if they are logged in already...
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }
  //renders the login handlebars if they are not...
  res.render('login');
});

router.get('/signup', (req, res) =>{
  //Takes the user to all posts if they are logged in already...
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }
  //renders the signin handlebars if they are not...
  res.render('signup');
});

module.export = router;
