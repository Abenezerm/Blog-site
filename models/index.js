const User = require('./User');
const Post = require('./Post');
const Comment = require('./Comment');

 //Set up connections between tables in db....
 Post.belongsTo(User, {
   foreignKey: 'userId',
   onDelete: 'CASCADE'
 });

 Post.hasMany(Comment, {
   foreignKey: 'postID',
   onDelete: 'CASCADE'
 });

 Comment.belongsTo(User, {
   foreignKey: 'userId',
   onDelete: 'CASCADE'
 })


module.exports = {
  User,
  Comment,
  Post
}
