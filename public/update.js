var list_elems = document.getElementsByClassName('todo-list');

var update = (action) => {
    /*
        only two options- delete or mark
        delete - delete selected items
        mark - cross off selected items from list
    */

    //get checked off(selected) items from dom 
    let checked = [];
    for(var i = 0; i < list_elems.length; ++i){
        if(list_elems[i].childNodes[1].checked){
            checked.push(list_elems[i].childNodes[1].id);
        }
    }

    //create a post request to the route- pass all the checked items from dom into route - action specifies route
    console.log(checked);
    fetch('http://localhost:8000/' + action, {
        method: 'post',
        body: JSON.stringify(checked), 
        headers: { "Content-Type": 'application/json' }
    }).then(data => {
        console.log("success");
        //on success, refresh page
        location.reload();
    })
    .catch((err) => {
        console.log("erorr with: " + err);
    })
}
