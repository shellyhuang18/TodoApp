module.exports = (app, db) =>{    
    const session = require('express-session');
    const cookies = require('cookies');

    //create a session for the user to store temp data
    app.use(session({
        secret: 'titty cakes',
        resave: false,
        saveUninitialized: true,
        cookie: { secure: false },
    }))

    app.get('/', (req, res) => {
        console.log(req.session.user + "ffff");
        if(req.session.user){
            console.log("wait");
            res.redirect('/home');
        }else{
            res.render('index');
        }
    })

    app.get('/home', (req, res) =>{
        //retrieve posts and let user view
        db.all(`SELECT * FROM posts WHERE username = "${req.session.user}"` , (err, row) =>{
            if(err){
                console.log(err);
            }else{
                res.render('home', {posts: row, user: req.session.user})
            }
        })
    })

    //creating a todo list item
    app.post('/home', (req, res) => {
        db.run(`INSERT INTO posts(post, username) VALUES(?, ?)`, [req.body.list_item, req.session.user], (err) => {
            if(err){
                console.log(err);
                console.log("There was an error creating the post");
            }else{
                console.log("Successfully created blog post for user: " + req.session.user);
            }
            res.redirect('home');
        });
    })

    //login
    app.post('/', (req, res)=>{
        db.get(`SELECT * FROM users WHERE username = "${req.body.userLogin}"`, (err, row) => {
            //user matches login information
            if(row != null){
                req.session.user = req.body.userLogin;
                res.redirect('/home');
            }else{  
                res.redirect('/');
            }
        })
    })
    


    app.get('/signup', (req, res) => {
        res.render('signup');
    })

    app.post('/signup', (req, res) => {
        //insert inputted username into database(first check if user exists)
        db.get(`SELECT * FROM users WHERE username = "${req.body.userSignup}"`, (err, row) => {
            if(row == undefined){
                db.run(`INSERT INTO users(username) VALUES(?)`, [req.body.userSignup]);
                console.log("Inserted user into database");

                req.session.user = req.body.userSignup;
                res.redirect('/home');
            }else{
                console.log("user already signed up");
                res.redirect('/signup');
            }
        })
    })

    app.post('/logout', (req, res) => {
        req.session.user = undefined;
        res.redirect('home');
    })
    
}