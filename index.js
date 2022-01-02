const fs = require('fs')
const config = require('./config')
const postMethods = require('./post')
const utils = require('./utils')

const posts = fs
    .readdirSync(config.dev.postdir)
    .map((post) => post.slice(0, -3))
    .map((post) => postMethods.createPost(post))
    .sort(function(a, b) {
        return b.attributes.date - a.attributes.date;
    });

if(!fs.existsSync(`${config.dev.outdir}`)){fs.mkdirSync(`${config.dev.outdir}`)}

postMethods.writePosts(posts);
utils.addHomePage(posts[0]);
utils.createAbout();
utils.addPostsPage(posts);
// console.log(posts);