'use strict';
module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define('Comment', {
    title: DataTypes.STRING,
    body: DataTypes.STRING,
    isPublished: DataTypes.BOOLEAN,
    postId: DataTypes.INTEGER
  }, {});
  Comment.associate = function(models) {
    Comment.belongsTo(models.Post,{
      as:'post',
      foreignKey: 'postId'
    })
  };
  return Comment;
};
