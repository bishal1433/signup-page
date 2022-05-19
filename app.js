//jshint esversion:6

const express=require(`express`);
const request=require(`request`);
const https=require(`https`);
const bodyParser=require(`body-parser`);

const app=express();

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));


app.get('/',function(req,res){
  res.sendFile(__dirname+"/signup.html");
});

app.post("/",function(req,res){
  var email=req.body.your_email;
  var password=req.body.your_pass;

  console.log("your email is: "+email);
  console.log("your password is: "+password);



  const data={
          members:[
              {
                  email_address:email,
                  status:"subscribed",
                  merge_fields:{
                      PASS: password,
                  }
                }

          ]
  };

  var jsondata=JSON.stringify(data);

  const url="https://us6.api.mailchimp.com/3.0/lists/9c90d1e883";
  var options={
    method:"POST",
    auth:"Bishal1:4abf9d67f81c83f8d25b88923e7d4c06-us6"
  }

var request=https.request(url,options,function(response){

    if(response.statusCode===200){
      res.sendFile(__dirname+"/success.html");
    }
    else{
      res.sendFile(__dirname+"/failure.html");
    }

    response.on("data",function(data){
      console.log(JSON.parse(data));
    })
  })

  request.write(jsondata);
  request.end();
});


app.post('/failure',function(req,res){
  res.redirect('/');
});


app.listen(process.env.PORT||3000,function(){
  console.log("Your Server is up at port 3000");
});

// API KEY: 4abf9d67f81c83f8d25b88923e7d4c06-us6
//unique id: 9c90d1e883
