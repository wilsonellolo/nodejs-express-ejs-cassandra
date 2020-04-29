var cassandra= require('cassandra-driver');
const path = require('path');
const bodyParser= require('body-parser');
const express = require('express');

const app = express();
app.set('port',process.env.PORT || 3000);
app.set('views',path.join(__dirname,'views'));
app.set('view engine','ejs' );
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

var client= new cassandra.Client({
    contactPoints: ['64.225.119.67'],
    localDataCenter: 'dcl'
});

client.connect(function(err,result){
    if(err){
        console.log("Hubo un error en la coneccion: "+err);
    }else{
        console.log('index: cassandra conectado');
    }
});


app.get('/fecha',(req,res)=>{
    res.render('fechas',{result:[]});
});
app.post('/fecha',(req,res)=>{
    var get_todo="select * from practica.ticket where fecha>='"+req.body.anioi+"-"+req.body.mesi+"-"+req.body.diai+"' and fecha<='"+req.body.aniof+"-"+req.body.mesf+"-"+req.body.diai+"'  allow filtering;";
    client.execute(get_todo,[],function(err,result){
        if(err){
            console.log('Hubo un error :'+err);
        }else{


            res.render('fechas',{ result:result});        }
    });

});

app.get('/usuario',(req,res)=>{
    res.render('usuarioporfechas',{ result:[]});
});
app.post('/usuario',(req,res)=>{
    var get_todo="select * from practica.ticket where correo='"+req.body.correo+"' and fecha>='"+req.body.anioi+"-"+req.body.mesi+"-"+req.body.diai+"' and fecha<='"+req.body.aniof+"-"+req.body.mesf+"-"+req.body.diai+"';";
    client.execute(get_todo,[],function(err,result){
        if(err){
            console.log('Hubo un error :'+err);
        }else{
            res.render('usuarioporfechas',{ result:result});        
        }
    });
});

app.listen(app.get('port'),()=>{
    console.log("servidor corriendo en puerto: "+app.get('port'));
});