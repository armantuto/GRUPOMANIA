const { Post } = require("../database/models/post");
const { User } = require("../database/models/user");
const { Comment } = require("../database/models/comments");
const fs = require("fs");
const { Like } = require("../database/models/likes");

exports.create = async (req, res, next) => {
  try {
    const current_user = req.user.userId;
    console.log("<Create user id>", current_user)

    const url = req.protocol + '://' + req.get('host');
    const imageUrl = url + '/images/' + req.file.filename;

    const user = await User.findOne({ where: { id: current_user } }); // Dobbiamo prenderlo dal token , chi fa la richiesta.

    if (!user) return res.status(400).json({ message: "user not found" });

    let post = await Post.create({
      content: req.body.content,
      imageUrl: imageUrl,
      userId: current_user, // Dobbiamo prenderlo dal token , chi fa la richiesta.
    });

    post = await Post.findOne({ where: { id: post.id }, include: User });

    res.status(201).json({ post });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error });
  }
};

exports.get = async (req, res, next) => {
  try {
    const data = await Post.findAll({
      include: [{ model: Comment, include: [User] }, User,Like], //[User, Comment]
      order: [[{ model: Comment }, 'createdAt', 'DESC']]
    }
    );
    console.log(data)
    return res.status(200).json(data);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

exports.getById = async (req, res, next) => {
  try {
    const id = req.params.id;
    const data = await Post.findOne({
      where: { id: id },
      include: [{ model: Comment, include: [User] }, User], //[User, Comment]
      order: [[{ model: Comment }, 'createdAt', 'DESC']]
    }
    );
    console.log(data)
    return res.status(200).json(data);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

exports.delete = async (req, res, next) => {
  try {

    const current_user = req.user.userId;
    console.log("Userid", current_user)

    const id = req.params.id;
    console.log(id);
    const post = await Post.findOne({ where: { id: id } });
    if (!post) {
      return res.status(400).json({ error: "post not found" })
    }
    //verifico che el usuario logged sea el que creo el post.
    if (current_user != post.userId) res.status(400).json({ error: "Post not created by the user logged" })

    await Post.destroy({ where: { id: id } })

    const filename = post.imageUrl.split("/images/")[1]
    fs.unlink("images/" + filename, () => console.log("deleted"))

    return res.status(200).json(post);

  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

exports.update = async (req, res, next) => {
  try {
    const current_user = req.user.userId;
    console.log("Userid", current_user)

    const id = req.params.id;
    const post = await Post.findOne({ where:{id: id} });
    if (!post) {
      return res.status(400).json({ error: "post not found" })
    }
    
    console.log("Userid", current_user)
    console.log("postUser", post.userId)
    if (current_user != post.userId) return res.status(400).json({ error: "Post not created by the user logged" })
    let imageUrl = post.imageUrl;
    if (req.file) {
      // Eliminar la imagen anterior asociada al producto
      const previousImagePath = `images/${post.imageUrl.split('/images/')[1]}`;
      fs.unlink(previousImagePath, (err) => {
        if (err) {
          console.error('Error deleting previous image:', err);
        }
      })

      const url = req.protocol + '://' + req.get('host');
      imageUrl = url + '/images/' + req.file.filename;

    }

    await post.update({
      content: req.body.content,
      imageUrl: imageUrl,
    })

    await post.save()
    return res.status(200).json(post);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};


exports.getPostOfuser = async (req, res, next) => {
  try {
    const current_user = req.params.id;
    console.log("this", current_user);

    // Obtén el usuario actual y sus posts asociados
    const userWithPosts = await Post.findAll({
      where: { userId: current_user },
      order: [[{ model: Comment }, 'createdAt', 'DESC']],
      include: [{ model: Comment, include: [User] }, User,Like], //[User, Comment]
      // include: Post, // Esto carga los posts asociados al usuario
    });

    if (!userWithPosts) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    return res.status(200).json(userWithPosts); // Devuelve los posts asociados al usuario

  } catch (error) {
    console.error('Error en getPostId:', error);
    return res.status(500).json({ error: error.message });
  }
};
