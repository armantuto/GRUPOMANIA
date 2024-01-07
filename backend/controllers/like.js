const { Post } = require("../database/models/post");
const { User } = require("../database/models/user");
const { Like } = require("../database/models/likes");



exports.create = async (req, res, next) => {
    try {
        const current_user = req.user.userId;
        console.log("Userid", current_user)
        const current_post = req.body.postId
        const posts = await Post.findOne({ where: { id: current_post } })
        const users = await User.findOne({ where: { id: current_user } })
        if (!users) return res.status(400).json({ error: "user not found" });
        if (!posts) return res.status(400).json({ error: "post not found" });

        const exist = await Like.findOne({ where: { userId: current_user, postId: current_post } })

        if (!exist) {

            let like = await Like.create({
                userId: current_user, // se debe agarrar del token.
                postId: current_post
            })
            await like.save()            
        }else{
            await exist.destroy();
        }

        return res.status(200).json({});
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};
