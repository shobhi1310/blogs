const fs = require('fs')
const config = require('./config')

const homePage = (posts) =>`
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="description" content="${config.blogDescription}" />
        <title>${config.blogName}</title>
        <link rel="stylesheet" href="../assets/style.css" />
    </head>
    <body>
        <div class="grotesk">
            <header>
                <h1>${config.blogName}</h1>
                <p>—</p>
                <p>This blog is written by ${config.authorName}, ${config.authorDescription}. To find out what he's up to <a href="${config.authorTwitter}">follow him on twtter</a></p>
                <hr />
            </header>

            <div class="posts">
                ${posts
                  .map(
                    post => `<div class="post">
                    <h3><a href="./${post.path}.html">${
                      post.attributes.title
                    }</a></h3>
                        <small>${new Date(
                          parseInt(post.attributes.date)
                        ).toDateString()}</small>
                        <p>${post.attributes.description}</p>
                    </div>`
                  )
                  .join("")}
            </div>

            <footer>
                ${`<p>© ${new Date().getFullYear()} ${
                  config.authorName
                }, Find the code on <a href=${config.authorGithub}>GitHub</a></p>`}
            </footer>
        </div>
    </body>
</html>
`;

const addHomePage = (posts) => {
    fs.writeFile(`${config.dev.outdir}/index.html`, homePage(posts), (e) => {
        if (e) throw e;
        console.log(`index.html was created successfully`);
    });
}

module.exports = addHomePage;