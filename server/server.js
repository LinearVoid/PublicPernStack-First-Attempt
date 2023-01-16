if(process.env.NODE_ENV != 'production'){
    require("dotenv").config() //If not in production ie development then we require the dotenv
}

//Imports

const db = require("./db")
const express = require("express")
const app = express()//defining the express instance
let pathy = require('path') //this allows us to define locations relative to the dirname
const port = process.env.PORT||6969//using environment variables for port. You must import dotenv for this to work well
console.log(process.env.PORT)

//Future imports (for testing.)

//const flash =  require("express-flash") this is for browser storage and sessions, but I haven't gotten that worked out yet
//const session = require('express-session')



//Setting up the settings 

//Sets the static fold, this allows us to render .htmls with send file and the css just works if linked right
app.use(express.static(pathy.join(__dirname,'..', 'client','static')))
app.use(express.urlencoded({extended:false}))
app.set('view engine','ejs') //Setting our app to use ejs and actually render the pages within views
//setting the views directory of our ejs
app.set('views',pathy.join(__dirname, '..','client','views'))//This was the most God darn annoying thing that i've ever had to deal with on this freaking thing holy crap man




//ALL HANDLING BELOW

//Routers established
const apiRouter = require("./routes/api")//setting up a router for the api
app.use("/api/v1/",apiRouter)
app.use(express.json()) // This enables us to parse the json sent by express
//This allows us to use req.body to parse the stuff sent

//Setting up Frontend handling. 
const { appendFile } = require("fs")
const { nextTick } = require("process")
const { response } = require("express")
const users = []//NOT FOR PRODUCTION
//This gets the main page
app.get("/",(req,res)=>{
    res.render("index.ejs")

})

app.get("/helpme",(req,res)=>{
    //res.render("homepage.ejs")
    //console.log(users)
    console.log(users[0].username)

    

})

//This is how to get to the register page, this is a dev page
app.get("/register",async(req,res)=>{
    res.render("register.ejs")
    
    //res.sendFile(path.join(__dirname,'..','..', 'client','static','atrib','trees-5895153.jpg'))
})


//This adds to the register
app.post("/register",async(req,res)=>{
    console.log(req.body.username)
    console.log(req.body.password)
    console.log("running")
        try{
            //await bcrypt.hash(req.body.password,saltRounds)
            users.push({
                dateNow:Date.now().toString(),
                username: req.body.username,
                password: req.body.password
                
            })
            res.redirect('/')
    }

    catch{
        res.redirect('/register')
        

    }
    

    //res.sendFile(path.join(__dirname,'..','..', 'client','static','atrib','trees-5895153.jpg'))
    console.log(users)
    
})



//Now we gonna login

app.post("/login",async(req,res)=>{
    console.log("post")
    console.log(req.body.username)
    console.log(req.body.password)
    const user = req.body.username
    const pass = req.body.password
    try{
        console.log("trying")
        for (user in users){
            console.log(users[user].username)
            console.log(req.body.username)
            console.log(typeof users[user].username)

            if(user[user].username == user){
                console.log("huzzah")
                res.render("homepage.ejs")
            }

                /*
            if(user == "yeet" && pass == "secret"){
                console.log("yay")
                res.render("homepage.ejs")
            }

            */
           else{
             
           }
            
        }
        
        /*
        function login (username,password){
            for (user in users){
                console.log(users[user].username)
                console.log(req.body.username)
                console.log(typeof users[user].username)
                if(user[user].username == username){
                    console.log("huzzah")
                }
                else{
                    console.log("you failed")
                    console.log(users[user].username)
                    console.log(typeof users[user].username)
                    console.log(typeof req.body.username)
                    console.log(username)
                    break
                }
            }

        }
        */
        //login(req.body.username)
    }

    catch{
        res.redirect('/register')

    }
    

    //res.sendFile(path.join(__dirname,'..','..', 'client','static','atrib','trees-5895153.jpg'))
    console.log(users)
    
})












app.listen(port,()=>{
    console.log(`hello ${port} test`)

})



