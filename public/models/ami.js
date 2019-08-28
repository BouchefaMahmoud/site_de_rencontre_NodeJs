let connection = require("./connection")


class Ami{

    /**
     * id_pers
     * id_profil 
     */

    constructor(row){
        this.row = row 
    }


    get get_id_pers(){
        return this.row.id_pers
    }


    get get_id_profil(){
        return this.row.id_profil
    }

    static create(id_pers,id_profil){
        connection.query("insert into ami(id_pers,id_profil) values (?,?) ; ",[id_pers,id_profil],(error,result)=>{
            if(error) throw error
        })
    }

    static select(id_pers, cb){
        connection.query("select id_profil from ami where id_pers= ? ;",(error,result)=>{
            if(error)throw error +" récuperation des amis d'un profil ami.select"
            cb(result)
        })
    }

}


