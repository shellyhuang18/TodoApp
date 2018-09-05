module.exports = (app, db) => {
    //creating a todo list item
    app.post('/home', (req, res) => {
        db.run(`INSERT INTO posts(post, username, finished) VALUES(?, ?, ?)`, [req.body.list_item, req.session.user, 0], (err) => {
            if(err){
                console.log(err);
                console.log("There was an error creating the post");
            }else{
                console.log("Successfully created blog post for user: " + req.session.user);
            }
            res.redirect('home');
        });
    })

    //delete items
    app.post('/delete', (req, res) => {
        console.log("it worked");
        for(item of req.body){
            db.run(`DELETE from posts WHERE id = "${item}"`, (err) => {
                if(err){
                    console.log(err);
                }else{
                    console.log("ok");
                }
            });
        }
        res.status(200).send();
    })

    updateDb = (value, item) => {
        db.run(`UPDATE posts SET finished = ? WHERE id ="${item}"`, [value] , (err, row) => {
            if(err){
                console.log(err);
            }else{
                console.log("updated successfully");
            }
        });


    }

    //cross off items
    app.post('/mark', (req, res) => {
        console.log("routed to mark");
        for(item of req.body){
            console.log(item);
            (function (item) {
                db.get(`SELECT * FROM posts WHERE id = "${item}"`, (err, row) => {
                    if(row.finished) updateDb(0, item)
                    else updateDb(1, item)
                    
                })
            })(item)
                
        }
        res.status(200).send();
    })
}