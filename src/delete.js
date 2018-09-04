module.exports = (app, db) => {
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
}