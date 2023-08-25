const postBlog = require('./postBlog');
const retrievePostedBlogs = require('./retrievePostedBlogs');

module.exports = async (message) => {
    if (message.author.bot) return;

    const args = message.content.trim().split(/ +/g);
    const command = args.shift().toLowerCase();

    if (command === '!!postblog') {
        postBlog(message);
    }
};
