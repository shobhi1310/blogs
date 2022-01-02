const config = require('./config')
const marked = require('marked')
const fm = require('front-matter')
const fs = require('fs')
const moment = require('moment')
const utils = require('./utils')

const posthtml = (data,prev,next) => `
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="description" content="${data.attributes.description}" />
        <title>${data.attributes.title}</title>
        <link rel="stylesheet" href="./assets/style.css" />
    </head>
    <body>
        <div class="wrapper">
                <h1 class="postTitle">${data.attributes.title}</h1>
            <p class="date">${moment(data.attributes.date).format('MMMM Do YYYY')}</p>
            ${data.body}
            <div class="controls">
                ${(prev)? (`<p>
                    <strong>Previous post</strong>: 
                    <a class="previous" href="./${prev.path}.html">${prev.attributes.title}</a>
                </p>`) : ('')}
                ${(next)? (`<p>
                    <strong>Next post</strong>: 
                    <a class="next" href="./${next.path}.html">${next.attributes.title}</a>
                </p>`) : ('')}
            </div>
        </div>
        ${utils.footer()}
    </body>
</html>
`;

const createPost = (postPath) => {
    const data = fs.readFileSync(`${config.dev.postdir}/${postPath}.md`,'utf-8');
    const content = fm(data);
    content.body = marked.parse(content.body);
    content.path = postPath;
    return content;
};

const writePosts = (posts) => {
    posts.forEach((post,ind,fullArray) => {
        if (!fs.existsSync(`${config.dev.outdir}`)) fs.mkdirSync(`${config.dev.outdir}`);

        fs.writeFile(`${config.dev.outdir}/${post.path}.html`,posthtml(post,fullArray[ind-1],fullArray[ind+1]),
        (e)=>{if(e)throw e; console.log(`${post.path}.html created succesfully`);})
    });
}

module.exports = {createPost,writePosts};