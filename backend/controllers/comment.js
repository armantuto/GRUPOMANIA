const { Post } = require("../database/models/post");
const { User } = require("../database/models/user");
const { Comment } = require("../database/models/comments")

exports.get = async (req, res, next) => {
    try {
      
      // let postId = req.params.id;
      // if (!postId || isNaN(postId)) return res.status(400).send({ error: "Invalid ID" });
      const data = await Comment.findAll({
        where: {},
        order: [
          ['createdAt', 'ASC'],       
      ],
        include: [User, Post] });
      return res.status(200).json(data);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  };

  
  
exports.create = async (req, res, next) => {
    try { 
      const current_user=req.body.userId;
      const current_post = req.body.postId
        const posts = await Post.findOne({where: { id: current_post}})
      const users = await User.findOne({ where: { id: current_user} })
      if (!users) return res.status(400).json({ error: "user not found" });
      if (!posts) return res.status(400).json({ error: "user not found" });
    let comment  = await Comment.create({
        comment: req.body.comment,
        userId: current_user, // se debe agarrar del token.
        postId: current_post
})
 comment = await Comment.findOne({ where: { id: comment.id } });

      return res.status(200).json(comment);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  };
  


exports.delete = async (req, res, next) => {
  try {
    // Verificar si req.user está definido
    if (!req.user || !req.user.userId) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const current_user = req.user.userId;
    const id = req.params.id;

    console.log(id);
    const comment = await Comment.findOne({ where: { id: id } });

    if (!comment) {
      return res.status(400).json({ error: "Comment not found" });
    }

    // Verificar que el usuario logueado sea el que creó el comentario.
    if (current_user != comment.userId) {
      return res.status(400).json({ error: "Comment not created by the user logged" });
    }

    // Eliminar el comentario.
    await comment.destroy();
    return res.status(200).json({ message: "Comment deleted successfully" });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

exports.update = async (req, res, next) => {
  try {
    // Verificar si req.user está definido
    if (!req.user || !req.user.userId) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const current_user = req.user.userId;
    const id = req.params.id;

    console.log(id);
    const comment = await Comment.findOne({ where: { id: id } });

    if (!comment) {
      return res.status(400).json({ error: "Comment not found" });
    }

    // Verificar que el usuario logueado sea el que creó el comentario.
    if (current_user != comment.userId) {
      return res.status(400).json({ error: "Comment not created by the user logged" });
    }

    // Actualizar el comentario.
    await comment.update({
      comment: req.body.comment,
    });

    return res.status(200).json({ message: "Comment updated successfully" });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};



  exports.getCommentsByPostId = async (req, res, next) => {
    try {
      const postId = req.query.postId;
  
      if (!postId || isNaN(postId)) {
        return res.status(400).json({ error: "Invalid post ID" });
      }
  
      // Verifica si el post existe
      const post = await Post.findByPk(postId);
      if (!post) {
        return res.status(400).json({ error: "Post not found" });
      }
  
      // Obtiene los comentarios asociados al post
      const comments = await Comment.findAll({
        where: { postId: postId },
      });
  
      return res.status(200).json(comments);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  };
