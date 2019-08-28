let connection = require("./connection")




class Commentaire {




static create(id_profil,id_image,content, cb) {
    connection.query("insert into commentaire(id_profil, id_image, com_at, content) values (?,?,?,?)  ; ",
    [id_profil,id_image, new Date(), content ] , (error, results) => {
        if (error) throw error
        cb(results)
      })
}

static all(id_profil, cb){

    let query = "SELECT c.content,pi.id_image, p.username,p.id_profil from  commentaire as c, profil_img as pi , profil as pwhere pi.id_profil = p.id_profil and c.id_profil = p.id_profil and id_image=? ;"
    connection.query(query,[id_profil],(err,rows)=>{
        if(err) throw err + " erreur au niveau commentaire.all"
        cb(rows)
    })
}


}


module.exports = Commentaire 