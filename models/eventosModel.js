var pool = require('./bd');

//lista los eventos con una consulta select * from bd

async function getEventos(){
    var query = 'select * from eventos';
    var rows = await pool.query(query);
    return rows;
}

async function deleteEventosById(id){
    var query = 'delete from eventos where id = ?';
    var rows = await pool.query(query, [id]);
    return rows;
}

async function insertEvento(obj){
    try{
        var query = 'insert into eventos set ?';
        var rows = await pool.query(query, [obj])
        return rows;

    }catch(error){
        console.log(error);
        throw error;
    }
}


async function getEventosById(id){
    var query = 'select * from eventos where id = ?';
    var rows = await pool.query(query,[id]);
    return rows[0];
}

//update eventos

async function modificarEventosById(obj, id){
    try{
        var query = 'update eventos set ? where id = ?'
        var rows = await pool.query(query,[obj,  id]);
        return rows;
    } catch(error){
        throw error;
    }
}






module.exports = {getEventos, deleteEventosById, insertEvento, getEventosById, modificarEventosById};