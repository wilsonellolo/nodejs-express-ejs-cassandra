var cassandra= require('cassandra-driver');
/*const path = require('path');
const bodyParser= require('body-parser');
const express = require('express');

const app = express();
app.set('port',process.env.PORT || 3000);
app.set('views',path.join(__dirname,'views'));
app.set('view engine','ejs' );
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));


app.get('/fecha',(req,res)=>{
    res.render('fechas',{ cosas:"contenido"});
});
app.post('/fecha',(req,res)=>{
    console.log(req.body.texto);
    res.render('fechas',{ cosas:{hola:1,adios:'adios'}});
});

app.get('/usuario',(req,res)=>{
    res.render('usuarioporfechas',{ cosas:{hola:1,adios:'adios'}});
});
app.post('/usuario',(req,res)=>{
    console.log(req.body.texto);
    res.render('usuarioporfechas',{ cosas:{hola:1,adios:'adios'}});
});


app.listen(app.get('port'),()=>{
    console.log("servidor corriendo en puerto: "+app.get('port'));
});
*/
var client= new cassandra.Client({
    contactPoints: ['localhost'],
    localDataCenter: 'dcl'
    });

client.connect(function(err,result){
    if(err){
        console.log("Hubo un error en la coneccion: "+err);
    }else{
        console.log('index: cassandra conectado');
    }
});

var get_todo="select * from prueba.nombre;";

client.execute(get_todo,[],function(err,result){
    if(err){
        console.log('Hubo un error :('+err);
    }else{
        console.log(result.rows[2].titulo);
        return;
    }
});

console.log("fin de la ejecucion");


