const { User } = require("../database/models/user");
const { Post } = require("../database/models/post");
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken");
const SECRET = require("../config");
const fs = require("fs");
// incluir codigo para cargar y modificar la imagen del usuario

exports.signup = async (req, res, next) => {
  try {
    const password = await bcrypt.hash(req.body.password, 10)

    const user = await User.create({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: password,
    });
    return res.status(201).json(user);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

exports.login = async (req, res, next) => {
  try {
    const email = req.body.email;

    const user = await User.findOne({ where: { email: email } })

    if (!user) {
      return res.status(400).json({ error: "wrong email" })
    }
    console.log(user)
    console.log(req.body.password)
    //const valid=bcrypt.hash(req.body.password,10) === user.password
    const valid = await bcrypt.compare(req.body.password, user.password)

    if (!valid) return res.status(400).json({ error: "wrong password" })
    console.log(valid)
    const token = jwt.sign({ userId: user.id }, SECRET, { expiresIn: "24h" });

    return res.status(200).json(token); // devolver token.

  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};


exports.delete = async (req, res, next) => {
  try {
    const current_user = req.user.userId;
    console.log("Userid", current_user);

    const id = req.params.id;
    console.log(id);
    const user = await User.findOne({ where: { id: id } });
    if (!user) {
      return res.status(400).json({ error: "user not found" });
    }
    if (current_user != user.id) res.status(400).json({ error: "The user is not you, only can delete yourself" });

    // Obtén la ruta de la imagen del usuario antes de eliminar el usuario
  

    // Elimina la foto del usuario si existe
    if (user.image) {
      
      const previousImagePath = `imagesUsers/${user.image.split('/imagesUsers/')[1]}`;
      fs.unlink(previousImagePath, (err) => {
        if (err) {
          console.error('Error deleting previous image:', err);
        }
      })
    }

    await User.destroy({ where: { id: id } });
    return res.status(200).json(user);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};


exports.get = async (req, res, next) => {
  try {
    const users = await User.findAll();
    return res.status(200).json(users);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

exports.update = async (req, res, next) => {
  try {
    const current_user = req.user.userId;
    console.log("Userid", current_user)

    const userdb = await User.findOne({where:{ id: current_user} });
    if (!userdb) {
      return res.status(400).json({ error: "user not found" })
    }
    if (current_user != userdb.id) return res.status(400).json({ error: "The user is not you, only can edit yourself" })

    let imageUrl = userdb.image;
    if (req.file) {
      console.log("here update")
      // Eliminar la imagen anterior asociada al producto
      if(userdb.image){

        const previousImagePath = `imagesUsers/${userdb.image.split('/imagesUsers/')[1]}`;
        fs.unlink(previousImagePath, (err) => {
          if (err) {
            console.error('Error deleting previous image:', err);
          }
        })
      }

      const url = req.protocol + '://' + req.get('host');
      imageUrl = url + '/imagesUsers/' + req.file.filename;

    }
    
    await userdb.update({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      image: imageUrl,
    })

    await userdb.save()

    return res.status(200).json(userdb);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

exports.getUserId = async (req, res, next) => {
  try {
    const current_user = req.user.userId;
    console.log(current_user)
    const id = req.params.id;
   
      const userId = await User.findOne({ where: { id: current_user },include:{model:Post} });
     
        return res.status(200).json(userId)
        console.log(userId)
    
    
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

exports.getById = async (req, res, next) => {
  try {
    const id = req.params.id;
    console.log(id)
    
   
      const user = await User.findOne({ where: { id: id },include:{model:Post} });
     
        return res.status(200).json(user)        
    
    
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};
