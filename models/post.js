'use strict';
module.exports = (sequelize, DataTypes) => {
  const Post = sequelize.define('Post', {
    title: DataTypes.STRING,
    body: DataTypes.STRING,
    category: DataTypes.STRING,
    isPublished: DataTypes.BOOLEAN
  }, {});
  Post.associate = function(models) {
    Post.hasMany(models.Comment,{
      as: 'comments',
      foreignKey: 'postId'
    })
  };
  return Post;
};
