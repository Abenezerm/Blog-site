const router = require('express').Router();
const { Post } = require('../models/');
//checks to see if user is logged in before executing
const withAuth = require('../utils/auth');

router.get('/', withAuth, async (req, res) => {
  try{
    //finds all posts made by current user...
    const postData = await Post.findAll({
      where: {
        userId: req.session.userId,
      },
    });

    //Map and serialize posts...
    const posts = postData.map((post) => post.get({ plain: true}));

    //render dashboard handlebars with all-post-admin handlebars...
    res.render('all-posts-admin', {
      layout: 'dashboard',
      posts,
    });

  }catch (err){
    //fatal error redirects to login page...
    res.redirect('login');
  }
});

//renders new post template
router.get('/new', withAuth, (req, res) => {
  res.render('new-post', {
    layout: 'dashboard',
  });
});

//renders edit handlebars...
router.get('edit/:id', withAuth, async (req, res) => {
  try {
    //finds post by id param
    const postData = await Post.findByPk(req.params.id);

    //if the post exists it will render edit handlbars or it will return a 404 status...
    if (postData) {
      const post = postData.get({ plain: true });

      res.render('edit-post', {
        layout: 'dashboard',
        post,
      });
    } else {
      res.status(404).end();
    }
  } catch (err) {
    res.redirect('login');
  }
});

module.exports = router;
