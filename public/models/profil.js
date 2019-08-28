
let connection = require("./connection")



class Profil {


    constructor (row){
        this.row =row 
    }



    get username(){
        return this.row.username 
    }


 static create(nom,prenom ,sexe, age, situation, description, pays, ville,taille,profession,interesse, pwd, username){
           console.log(pwd)
           console.log(username)
    

        connection.query("insert into profil(nom,prenom ,sexe, age, situation, description, pays, ville,taille,"+
        " profession,interesse, pwd, username ) values ( ?, ?, ?,  ?, ?, ?,  ?, ?, ?,  ?, ? , ?,  ? )  ; ",
        [nom,prenom ,sexe, age, situation, description, pays, ville,taille,profession,interesse, pwd, username ] , (error, results, fields) => {
            if (error) throw error +" creating profil error"
        })
           
 }


 static get_usernames(cb){
     connection.query(" select * from profil ; ",(err, rows ) =>{
         if(err) throw err +" getting all usernames "
         cb(rows.map((row) => new Profil(row))) 
     })
         
 }


 static last_user(cb) {
     connection.query('select MAX(id_profil) as last from profil ; ',(error, result )=>{
         if(error ) throw erro +" getting the last id_profil"
         cb(result)
     })
 }



 static photo_profil(id_image,id_profil, type){
     let query = "insert into profil_img(id_profil, id_image,type) values(?,?,?) ; "
     connection.query(query,[id_profil,id_image,type],(error,result, fields)=>{
        if(error ) throw error +" insert image profil "
    })
}


static is_profil(username,pwd,cb){

    connection.query("select * from profil where username = ? and pwd = ? ;",[username,pwd],(error,result)=>{
        if(error) throw error + " Erreur récupération usernames et pwd "
        cb(result)
    })
}

//get freinds
static get_freinds(id_profil,cb){
    let query = "select p.`id_profil`, p.`nom`, p.`prenom`, p.`sexe`, p.`age`, p.`situation`, p.`description`, p.`pays`, p.`ville`, p.`taille`, p.`profession`, p.`interesse`, p.`pwd`, p.`username`, pi.id_image from profil as p, profil_img as pi   where p.id_profil in (select ami.id_profil from ami where id_pers=? ) and p.id_profil = pi.id_profil;" ;

    connection.query(query,[id_profil],(error,results) =>{
        if(error) throw "get all freinds of profil profil.get_freinds"
        cb(results)
    })
}

static get_image(id_profil,type,cb){
     //  cb("photo-1552503627943.jpeg") 
    
      let query = "select id_image from profil_img where id_profil=? and type=?  ;"  
     connection.query(query,[id_profil,type], (error, result)=>{
        if(error) throw error +" Erreur de récupation de l'image"
        cb(result)
    })

}


static search_profil(sexe,profession, age, interesse,cb){
    let query ="select p.id_profil, p.username, pi.id_image from profil as p, profil_img as pi where  "
    let i = 0 
    let val =[]

    if(sexe ){
        query+= "p.sexe=? and "
        val[i]=sexe
        i++
    }

    if(profession ){
        query+= "p.profession=? and "
        val[i]=profession
        i++
    }

    if(age ){
        query+= "p.age=? and "
        val[i]=age
        i++
    }

    if(interesse ){
        query+= "p.interesse=? and "
        val[i]=interesse
        i++
    }

    query+=" p.id_profil = pi.id_profil"
  
    connection.query(query,val, (error,results)=>{
        if(error) throw error + " récupération des données de la recherche profil.search"
        cb(results)
    })

}


static search(val, cb) {
    let v='%'+val+'%'
    let query = " select p.username, p.id_profil, pi.id_image from profil as p, profil_img as pi where p.id_profil = pi.id_profil and  p.username like ?;"
    connection.query(query,[v],(error,results)=>{
        if(error) throw error + " erreur profil.username_search"
        cb(results)
    })
    
}

static get_profil_by_id(id,cb){
    connection.query("select * from profil where id_profil=?",[id],(error,result)=>{
        if(error) throw error+" profil.get_profil_by_id"
        cb(result)
    })
}

static update(nom,prenom, age, situation,profession,description,id ) {
    let query= "UPDATE profil SET nom=?,prenom=?,age=?,situation=?,profession=?,description=? WHERE id_profil=? ;" 
    connection.query( query,[nom,prenom, age, situation,profession,description,id ],(error)=>{
        if(error) throw error +" in profil.update"
    })
}

}


module.exports = Profil 