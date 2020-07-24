const { Schema, model, connect, connection } = require("mongoose");
const mongoose = require("mongoose");

(async () => {
    try {
        const url = `mongodb+srv://alik:8Ps8wL2HvHkSzODP@cluster0.mpuj4.mongodb.net/shop?retryWrites=true&w=majority`;
        await connect(url, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false
        });
        console.log('connection.readyState', connection.readyState);

    } catch (e) {
        console.log('e', e);

    }
})();








// const userSchema = {
//     title : String
// }
// const postSchema = {
//     // req: "User"
//     title: {
//         type: String,
//         req: "User"

//     }
// }

// const User = model("User", userSchema);
// const Post = model("Post", postSchema);

// const user = new User({title: "Hello bro :)"});
// const post = new Post();




// user.save();
// post.save();






























/**
 * 
 * Populate (բնակեցնել)  - ObjectIds can now refer to another document in a collection within our database and be populate()d when querying. An example is helpful:
    * ObjectIds теперь могут ссылаться на другой документ в коллекции в нашей базе данных и быть populate () d при запросе.
 */


var UserSchema = new mongoose.Schema({
    name: String
});
const User = model("User", UserSchema)

var PostSchema = new mongoose.Schema({
    title: String,
    postedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    comments: [{
        text: String,
        postedBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }
    }]
});
const Post = model("Post", PostSchema);

//Now lets create two users:

var alex = new User({
    name: "Alex"
});

var joe = new User({
    name: "Joe"
})

alex.save();
joe.save();

// Now lets create two posts:
var post = new Post({
    title: "Hello World",
    postedBy: alex._id,
    comments: [{
        text: "Nice post!",
        postedBy: joe._id
    }, {
        text: "Thanks :)",
        postedBy: alex._id
    }]
});

post.save((err) => {
    if(!err) {
        // // find all documents
        // Post.find({}).populate("postedBy")
        Post.find({})
        .populate('postedBy')//specify id then get content of document
        // .populate('comments.postedBy')
        .exec(function(error, posts) {
            console.log(JSON.stringify(posts, null, "\t"))
        })
    }
});
