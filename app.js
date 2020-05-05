const express=require('express');
const bparser=require('body-parser');
const router=require('./router');
const app=express();
app.use(
    bparser.urlencoded({extended:true})
);
app.use(router);
app.listen(3000);





