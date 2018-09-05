module.exports = (app, db) => {
    const session = require('express-session');
    const cookies = require('cookies');

    //create a session for the user to store temp data
    app.use(session({
        secret: 'titty cakes',
        resave: false,
        saveUninitialized: true,
        cookie: { secure: false },
    }))

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

    //signup
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

    //logout
    app.post('/logout', (req, res) => {
        req.session.user = undefined;
        res.redirect('/');
    })
}