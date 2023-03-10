const express = require("express")
const bodyParser = require("body-parser")

const app = express();

const titles = []
const contents = []

let newPostTitle = ''
let newPostContent = ''

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"))

app.set('view engine', 'ejs')

app.get("/", (req, res) => {
    res.render('index', {title: newPostTitle, content: newPostContent, titles: titles, contents: contents})

});

app.get("/about", (req, res) =>{
    res.render('about')
})

app.get("/contact", (req, res) =>{
    res.render('contact')
})

app.get("/compose", (req, res) =>{
    res.render('post')
})

app.post("/compose", (req, res) =>{
    titles.push(req.body.postTitle)
    contents.push(req.body.postContent)
    res.redirect('/')
})

app.get("/posts/:postTitle", function(req, res){
    const requestedTitle = req.params.postTitle
    let i = 0
    titles.forEach(function(title){
        const storedTitle = titles[i]
        const storedContent = contents[i]
        i = i+1
        if (storedTitle === requestedTitle){
            res.render("fullpost",{title: requestedTitle, content: storedContent})
        }
    })
})

app.listen(3000, () => {
  console.log('Listening on port ' + 3000);
});
