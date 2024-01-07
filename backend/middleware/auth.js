const jwt = require("jsonwebtoken");
const SECRET = require("../config");

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        const decodeToken = jwt.verify(token, SECRET);
        const userId = decodeToken.userId;
        //creo un objeto nuovo que estara disponible en los controlladores
        //re.user.userId
        req.user = { userId };

        next();
    } catch {
        res.status(401).json({
            error: "Invalid Token"
        })
    }
}