const express=require('express');
const app=express();
const posts=require('./routes/post.js');
const users=require('./routes/user.js');
const session=require('express-session');
const flash=require('connect-flash');
const path=require('path');
app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));
const sessionOptions={
    secret:'secretcode',resave:false,saveUninitialized:true
}
app.use(session(sessionOptions));
app.use(flash());
app.use((req,res,next)=>{
    res.locals.successMsg=req.flash('success');
    res.locals.errorMsg=req.flash('error');
    next();
})
app.get('/register',(req,res)=>{
        let {name='anomynus'}=req.query;
        req.session.name=name;
        if(req.session.name==='anomynus'){
            req.flash('error','user not registerd');
        }
        else{
            req.flash('success','user registered successfuly');
        }
        res.redirect('/hello');
})

app.get('/hello',(req,res)=>{

    res.render('new.ejs',{name:req.session.name})
   
})

// app.get('/reqcount',(req,res)=>{
//     if(req.session.count){
//         req.session.count++;
//     }
//     else{
//         req.session.count=1;
//     }
//         req.session.count
//     res.send(`your req counts is ${req.session.count}`);
// })
// const cookieParser=require('cookie-parser');

// app.use(cookieParser('secretcode'));

// app.get('/getcookies',(req,res)=>{
//     res.cookie('greet','hello');
//     res.cookie('name','sarb');
//     res.send('sent you some cookies');
// })

// app.get('/',(req,res)=>{
//     console.dir(req.cookies);
//     res.send('hi i am root');
// })
// app.get('/greet',(req,res)=>{
//     let {name='waheguru'}=req.cookies;
//     res.send(`HI name is ${name}`);
// })
// app.get('/getsignedcookies',(req,res)=>{
//    res.cookie('made-In','india',{signed:true});
//    res.send('signed cookies sent succesfully');
// })

// app.get('/verify',(req,res)=>{
//     console.log(req.signedCookies);
//     res.send('verified');
// })

app.use('/users',users);
app.use('/posts',posts);

app.listen(3030,()=>{
    console.log('server is listening at 3030');
})