let express = require("express")

let app = express()

let bodyParser = require("body-parser")

let session = require('express-session')

let multer = require("multer")

/*
* use template ejs
*/
app.set('view engine', 'ejs')



 
/*
 * Midlewares 
 */

app.use(express.static("public"))

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())




app.use(session({
    secret: 'moudmah',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
  }))




  /**
 * Config multer
 */

let multerConf = {
  storage : multer.diskStorage({
      destination: (req,file,next)=>{
          next(null,'./public/images') 
      }    
      ,
      filename : (req, file,next)=>{
          let extension  = file.mimetype.split('/')[1]
          next(null,file.fieldname+'-'+ Date.now()+'.'+extension)
      }
  })
}



 /**
  * Routes
  */

  
app.get("/inscription", (req, res)=> {
    //response.send('Bonjour')
    
    
    console.log("erreur: "+req.session.error)
    if( req.session.error )  {
      res.locals.error = req.session.error
      console.log("erreur: "+req.session.error)
      req.session.error = undefined      
    }
    res.render("pages/inscription")
})





app.post('/inscription', multer(multerConf).single('photo'), (req , res )=> {
       
   

     let profil = require("./public/models/profil")
     let image = require('./public/models/post')
     let f = req.body
     console.log(f.nom)
     console.log(f.prenom)
     console.log(f.sexe)
     console.log(f.username) 
    profil.create(f.nom, f.prenom ,f.sexe, f.age, f.situation, f.description, f.pays, f.ville,f.taille,f.profession,f.interesse, f.pwd, f.username)
    

    profil.last_user((user)=>{
      last = user[0].last 
      if(req.file){
        image.create(req.file.filename,"Image de profile",0, last, new Date(),'i')
        profil.photo_profil(req.file.filename, last,"p")    
      }else{
        profil.photo_profil("default-user.png", last,"p")            
      }
        // p pour différencier entre photo de profile et image de fond
   })
         


     let flag = false
    profil.get_usernames((usernames) => {
        for(u of usernames ){            
            if( u.username == req.body.username  ){
              console.log("existe deja")
              req.session.error = "Nom d'utilisateur existe déjà"
              flag = true
              break
            }
        }

        if(flag) {
          res.redirect("inscription")
        }  else{
          res.redirect("connexion")
        }


      }) 
   
      
     //  res.redirect("/")  

        // req.session.error = "Nom d'utilisateur existe déjà"
   
})



app.post("/connexion",(req,res)=>{

  let profil = require("./public/models/profil")
    

  f= req.body
  profil.is_profil(f.username, f.pwd,(result)=>{
    if(result.length == 0 ) {
      res.locals.error =" Ce compte n'existe pas !"
      res.redirect("/connexion")
    }else {
      // récupération de la photo de profile
      req.session.profil = result[0]  

        profil.get_image(result[0].id_profil,"p", (i_profil)=>{
      
        let image = (i_profil.length == 0 )?undefined : "images/"+i_profil[0].id_image
        req.session.image_profil = image 
        req.session.posts = undefined 
        // get posts
        let post = require("./public/models/post")
        post.select_all_posts(result[0].id_profil,(posts)=>{
          console.log("are we here  ? ")
          if(posts.length == 0 ){
            res.render("pages/profil",{profil:result[0], image_profil :image})
          }else {
            // change  the image id , we have to eleminate the extention and the image-  
            
            req.session.posts = posts
            // get freinds 
            console.log("are we here now ?")
            profil.get_freinds(result[0].id_profil,(freinds)=>{ 
            req.session.freinds =freinds
            console.log(freinds)  
            res.render("pages/profil",{profil:result[0], image_profil :image, posts : posts, freinds :freinds })
          })    
          }
        })  
        
      })        
    }
  })

})


//affaicher une image TODO
app.get("/charger_image" , (req, res )=>{  
  res.render("pages/charger_image", {profil : req.session.profil,  image_profil : req.session.image_profil })

})




app.get("/profil",(req,res)=>{
  s = req.session 
  req.session.profils = undefined
  res.render("pages/profil",{profil: s.profil, image_profil : s.image_profil, freinds : s.freinds, posts :s.posts })
})




app.get("/connexion",(req,res)=>{
  res.render("pages/connexion")
})


// acceuil 
app.get("/", (req, res )=>{
  res.render("pages/accueil")
})





// charger toutes les images d'un profil 
app.get("/load", (req, res)=>{

    image =  require("./public/models/post")
    image.select_all(req.session.profil.id_profil ,(images) =>{
      i = (images.length == 0 ) ? undefined : images
      console.log(i)
      res.render("pages/load",{profil : req.session.profil ,image_profil : req.session.image_profil, images: i})
    })

})




app.post("/load", multer(multerConf).single('image'),(req,res)=> {

  image =  require("./public/models/post")
  console.log(req.session.profil.id_profil)
  console.log("filename :"+req.file.filename)
  image.create(req.file.filename,"",0, req.session.profil.id_profil, new Date(),'i' ) ; 
  req.session.selected = req.file.filename 
  res.render("./pages/profil",{profil : req.session.profil, image_profil : req.session.image_profil, selected_image :"images/"+req.file.filename })

})



app.post("/ajout_post", (req, res) => {

  post =  require("./public/models/post")
    

        if(!req.session.selected) {
          console.log("on vient jamais ici ? ")
          post.create(Date.now(), req.body.description,0, req.session.profil.id_profil, new Date(),'p')
          
        }else {
          post.update_desc( req.session.selected, req.body.description)
          req.session.selected = undefined
        }
      
      



      post.select_all_posts(req.session.profil.id_profil,(posts)=>{
        console.log("are we here  ? ")
        if(posts.length == 0 ){
          res.render("pages/profil",{profil:result[0], image_profil :image})
        }else {
            req.session.posts = posts
          res.render("./pages/profil",{profil : req.session.profil, image_profil: req.session.image_profil, posts : posts})
        }
      })  
   

    
      
})



app.get("/deconnexion",(req,res)=>{

  req.session.profil = undefined 
  req.session.image_profil = undefined 
  req.session.posts = undefined 
  req.session.freinds = undefined
  res.render("pages/accueil")

})



app.post('/like',(req,res)=>{
  
  /**
   * récupérer l'id du poste 
   */
  let id = req.body.id 
  

   /**
    * récuperer le contenu du bouton : si button == like +1 sinon -1 
    */
   let val = req.body.val

  /**
   * charger le model post 
   */

   let post = require("./public/models/post")
  /**
   * on va parcourir dans les postes à la recherche de l'id 
   */

   console.log(val)
  


   //console.log(req.session.posts)
   
  for(let i =0 ; i != req.session.visite ; i++ ){

    if(req.session.visite[i].id_image == id || req.session.visite[i].id_image == "image-"+id+".png" 
    || req.session.visite[i].id_image == "image-"+id+".jpg" || req.session.visite[i].id_image == "image-"+id+".jpeg" ){
      console.log(id)

      if( val == 'like' ){
        post.like(id , req.session.posts[i].likes + 1 )
      }else {
        post.like(id , req.session.posts[i].likes - 1 )
      }

      break;
    }

  }

  res.end("ok")
})



app.post("/recherche",(req,res)=>{

  profil = require("./public/models/profil")
  f =req.body 
  profil.search_profil(f.sexe, f.profession,f.age,f.interesse,(profils)=>{
    req.session.profils = profils 
    s = req.session 
    res.render("pages/profil",{profil: s.profil, image_profil : s.image_profil, freinds : s.freinds, profils : profils })
  })

})


app.post('/visite_profil',(req,res)=>{

  profil =  require("./public/models/post")

  profil.get_profil(req.body.id,(posts)=>{
    console.log("suis je ici ? ")
    console.log(posts)
    if(posts){
      req.session.visite = posts 
      res.send(posts)
    }else{
      res.send("")
    }
  })

})


app.post("/commentaires",(req,res)=>{

  let com =  require('./public/models/commentaire')

  let id  = req.body.id 
 
  if( req.body.ext){
    id+=".".ext
  }

  console.log(id)

  com.all(id,(result) =>{
    res.send(result)
  }) 

})


app.post("/users",(req,res)=>{

  console.log("je suis dans le users")

  profil = require("./public/models/profil") 
  
  profil.search(req.body.val,(result)=>{
    console.log(result)
    if (result) {
      console.log(result)
      res.send(result)
    }
  }) 

})  


app.get("/infos",(req,res)=>{
    console.log("je suis dans le infos ")
    console.log(req.session.profil)
    res.render("pages/infos",{profil: req.session.profil, freinds: req.session.freinds,image_profil: req.session.image_profil})
})


app.post("/modif",(req,res)=>{

  profil = require("./public/models/profil")
  console.log(req.body)
   
  console.log("id profil")
  console.log(req.session.profil.id_profil)

  profil.update( req.body.nom,req.body.prenom, req.body.age, req.body.situation,req.body.profession,req.body.description, req.session.profil.id_profil ) 

  


  profil.get_profil_by_id(req.session.profil.id_profil,(profil)=>{
    console.log("le nouveau profile")
    console.log(profil)
    req.session.profil=profil

    res.render("pages/infos",{profil: req.session.profil, freinds: req.session.freinds,image_profil: req.session.image_profil})
  })

  

})

app.listen(8080)