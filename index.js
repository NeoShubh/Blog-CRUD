const express = require('express');
const path = require('path');
const app =  express();
const {v4:uuid} = require('uuid');
const port = 3000;

app.set('views',path.join(__dirname,'/views'));
app.set('view engine','ejs');
app.use(express.static(path.join(__dirname,'public')));
app.use(express.urlencoded({extended:true}));

let comments = [
    {      id:uuid(),
        username : "shubham",
        comment : "hello shubham how are you?"
    },
    {   id:uuid(),
        username : "sudanshu",
        comment : "hello sundashu how are you?"
    },
    {   id:uuid(),
        username : "shubhanshi",
        comment : "hello shubhanshi how are you?"
    },
    {  id:uuid(),
        username : "rudra",
        comment : "hello rudra how are you?"
    },
    {   id:uuid(),
        username : "rishabh",
        comment : "hello rishabh how are you?"
    }
]

app.get('/',(req,res)=>{
    res.render('home');
})

app.get('/comments',(req,res)=>{
    res.render('index',{comments});
})

app.get('/comments/new',(req,res)=>{
    res.render('form');
})


app.post('/comments',(req,res)=>{
    const newComment = {...req.body}; //we simply incremeting the id here id:commments.length+1
    comments.push(newComment);
    res.redirect('/comments')
    res.send("created a new comment");
})

app.get('/comments/:id',(req,res)=>{
    //  console.log(req.params);
    //  res.send("new id");
     const {id} = req.params;
    const matchedComment = comments.find((c)=>c.id === (id)); //it comes in string format so that we will write it like as parsInt(id) to convert it into int
     res.render('show',{matchedComment});
    })

    app.get('/comments/:id/edit',(req,res)=>{
        //  console.log(req.params);
        //  res.send("new id");
         const {id} = req.params;
        const  foundComment = comments.find((c)=>c.id === (id)); //it comes in string format so that we will write it like as parsInt(id) to convert it into int
         res.render('edit',{prevComment : foundComment.comment});
        })
    
    
 app.listen(port,()=>{
    console.log(`server connected & listening at port ${port}`)
 })

//  absolute URL/path : webpage 