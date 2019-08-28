let connection = require("./connection")


class Like_img{

    /**
     * id_img
     * id_profil
     */

    constructor(row){
        this.row = row 
    }

    /**
     * Getters
     */
    get get_id_img(){
        return this.row.id_img  
    }
    

    get get_id_profil(){
        return this.row.get_id_profil 
    }

    /**
     * Functions
     */

    static create(id_img, id_profil) {
        connection.query("insert into like_img values(?,?);",[id_img,id_profil],(error,result)=>{
            if(error) throw error  
        })
    }

    static select(cb) {
        connection.query("select * from like_img ;",(error,result)=>{
            if(error) throw error  
            cb(result)
        })
    }



}

module.exports = Like_img