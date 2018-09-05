module.exports = (app, db) =>{    
    const session = require('express-session');
    const cookies = require('cookies');

    app.get('/', (req, res) => {
        if(req.session.user){
            res.redirect('/home');
        }else{
            res.render('index');
        }
    }) 

    app.get('/home', (req, res) =>{
        //retrieve posts and let user view them
        db.all(`SELECT * FROM posts WHERE username = "${req.session.user}"` , (err, row) =>{
            if(err){
                console.log(err);
            }else{
                res.render('home', {posts: row, user: req.session.user})
            }
        })
    })

    app.get('/signup', (req, res) => {
        res.render('signup');
    })

    
}