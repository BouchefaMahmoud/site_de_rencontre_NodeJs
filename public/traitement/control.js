
  $(()=>{

          
    $("#pwd").click(()=>{
      $("#pwd").css("border-color", "#00bfa5");
    })

    $("#vpwd").click(()=>{

      var pwd = $("#pwd").val();
      var vpwd =$("#vpwd").val() 


      if( pwd == ""){
        
        $("#pwd").css("border-color", "red");
        $("#pwd").css("background-color", "#ffebee");
        $("#wpwd").css("border-color", "red");
        $("#vpwd").css("background-color", "#ffebee");
      }
     // console.log(vpwd)   
    })

    $('select').formSelect();

    
    
    
    
    $( "#nav-btn" ).click(function() {
      $( "nav" ).toggle( "slow" );
    });

    
    $('.modal').modal();

    //sidebar  
    $('.sidenav').sidenav();
    
  // zoom image
  $('.materialboxed').materialbox();


  
  

    





  

})