var list_elems = document.getElementsByClassName('todo-list');

function crossOff(){
    for(var i = 0; i < list_elems.length; ++i){
        if(list_elems[i].childNodes[1].checked){
            list_elems[i].style.textDecorationLine = "line-through";
        }
    }
}

function deletePost(){
    let checked = [];
    for(var i = 0; i < list_elems.length; ++i){
        if(list_elems[i].childNodes[1].checked){
            checked.push(list_elems[i].childNodes[1].id);
        }
    }

    console.log(checked);
    fetch('http://localhost:8000/delete', {
        method: 'post',
        body: JSON.stringify(checked), 
        headers: { "Content-Type": 'application/json' }
    }).then(data => {
        console.log("success with: " + data);
        location.reload();
    })
    .catch((err) => {
        console.log("erorr with: " + err);
    })
}

