const multer = require("multer");
const fs = require("fs");
const path = require("path");

const destinationFolder = "imagesUsers";

const MIME_TYPES = {
    'image/jpg':'jpg',
    'image/jpeg':'jpg',
    'image/png':'png'
};

const storage = multer.diskStorage({
    destination: (req, file, callback) =>{
        const uploadPath = path.join(__dirname, "../" + destinationFolder);

            // Verifica si la carpeta existe, si no, créala
            if (!fs.existsSync(uploadPath)) {
                fs.mkdirSync(uploadPath);
            }
            callback(null, uploadPath);
    },
    filename: (req,file,callback) => {
        const name = file.originalname.split(" ").join("-")
        const extension = MIME_TYPES[file.mimetype];
        callback(null, name + Date.now() + '.' + extension)
    }
})

module.exports = multer({storage: storage}).single("image");;