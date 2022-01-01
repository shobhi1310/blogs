const config = require('./config')
const marked = require('marked')
const fm = require('front-matter')
const fs = require('fs')
const moment = require('moment')

const footer = () =>{
    return `<footer class="footer">
    <div class="links">
        <a href="/">Home</a>
        <span class="divider">|</span>
        <a href="./posts.html">Posts</a>
        <span class="divider">|</span>
        <a href="./about.html">About</a>
    </div>
    </footer>`
}

const abouthtml = (data) => `
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="description" content="${data.attributes.description}" />
        <title>${data.attributes.title}</title>
        <link rel="stylesheet" href="../assets/style.css" />
    </head>
    <body>
        <div class="content">
                <h1 class="postTitle">${data.attributes.title}</h1>
            ${data.body}
        </div>
        ${footer()}
    </body>
</html>
`;

const createAbout = () => {
    const data = fs.readFileSync(`${config.dev.authorAbout}`,'utf-8');
    const content = fm(data);
    content.body = marked.parse(content.body);

    if (!fs.existsSync(`${config.dev.outdir}`)) fs.mkdirSync(`${config.dev.outdir}`);

    fs.writeFile(`${config.dev.outdir}/about.html`,abouthtml(content),
    (e)=>{if(e)throw e; console.log(`about.html created succesfully`);})
};

const postsPage = (posts) =>`
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="description" content="All posts" />
        <title>Posts</title>
        <link rel="stylesheet" href="../assets/style.css" />
    </head>
    <body>
    <div class="wrapper">
        <h1 class="postTitle">All the Posts</h1>
        <ul class="posts">
            ${posts
                .map(
                post => `<li class="post">
                <small>${moment(post.attributes.date).format('MMMM Do YYYY')} - </small>
                <a href="./${post.path}.html">${
                    post.attributes.title
                }</a>
                </li>`
                )
                .join("")}
        </ul>
    </div>
    ${footer()}
    </body>
</html>
`;

const addPostsPage = (posts) => {
    fs.writeFile(`${config.dev.outdir}/posts.html`, postsPage(posts), (e) => {
        if (e) throw e;
        console.log(`posts.html was created successfully`);
    });
}
module.exports = {createAbout,footer,addPostsPage};