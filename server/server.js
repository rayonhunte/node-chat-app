const path = require('path');
const express = require('express');

//int express app 
const app = express();

//serve public
const publicPath = path.join(__dirname, '../public');
const port = process.env.port || 3000; 

console.log(publicPath);
app.use(express.static(publicPath));



app.listen(port, ()=>{
    console.log(`express started on port ${port}` );
});


module.exports = {app};
