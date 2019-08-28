let connection = require("./connection")
 


class Post {

/**
 * id_img
 * description
 * likes
 * id_profil
 * date_img
 */

 constructor(row){
     this.row = row 
 }


 /*
    Getters
 */


 /**
  * Functions
  */

static create(id,description,likes,id_profil,post_at,type) {
    connection.query("insert into image(id_image, description, likes,id_profil,date_img,type) values(?,?,?,?,?,?);",[id,description,likes,id_profil,post_at, type],(error)=>{
        if(error) throw error +" creating post error"    
    })
}


//select all images

static select_all(id_profil,cb){
   connection.query("select * from image  where id_profil=? and type='i' ORDER BY date_img DESC  ;" , [id_profil], (error, result) => {
      if(error) throw error  + " erreur de récupération des images d'un profil "
      cb(result)
   })
}



// select all posts: images + text
static select_all_posts(id_profil,cb){
   connection.query("select * from image  where id_profil=? ORDER BY date_img DESC ;" , [id_profil], (error, result) => {
      if(error) throw error  + " erreur de récupération des images d'un profil "
      cb(result)
   })

}

static update_desc(id_post , desc){
   connection . query("update image set description=? where id_image=? ;",[desc,id_post],(error)=>{
      if(error) throw error + " erreur dans update_descr "
   })

}  


static like(id_post ,val ){

   connection.query('update image set likes=? where id_image=? ; ',[val,id_post],(error)=>{
      if(error) throw error + " erreur dans post.like "
   })   
}

static get_profil(id,cb) {

  let query = "select * from image where id_profil=? ;"
   
   connection.query(query,[id],(error,results)=>{
      if(error) throw error + " récupération des postes d'un profile visité " 
      cb(results)
   })

}



}






module.exports = Post