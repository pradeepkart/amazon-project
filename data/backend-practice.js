const xhr = new XMLHttpRequest();

xhr.addEventListener('load',()=>{    /*asyncronus code send()*/ 
    console.log(xhr.response);
});
xhr.open('Get','https://supersimplebackend.dev');
xhr.send();
