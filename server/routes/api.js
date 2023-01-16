const express = require("express");
const router = express.Router();


//These are all the Request pathways below
//Get this is a test of the get all resturants
router.get("/tests",async(req,res)=>{
    //prints the number/id in the link
    //INSERT INTO users VALUES (1, 'Cheese', 9.99);
   /* This is the test way 
   But we want to return a data object instead
   console.log(results);
    res.send(results);
    */
})


//Get all Contacts
router.get("contacts",async (req,res)=>{
    
    try{
        const results = await db.query("SELECT * FROM users2 order by id;");
        res.status(200).json({
            status:"success",
            results:results.rows.length,
            data:{
                users:results.rows
            }
        }) 
    }
    catch(err){
        res.sendStatus(404);
    }
})



//Get a single contact
//id is a parameter under express. We will use this for content ids
router.get("/api/v1/contacts/:id",async(req,res)=>{

    //prints the number/id in the link
    console.log(req.params);

    try{
        //const results = await db.query(`SELECT * FROM users2 where id = ${req.params.id}`);
        //NEVER DO THIS, SQL Injection attacks
        //USE A 'PARAMETERIZED QUERY'


        console.log(req.params.id);
        const results = await db.query("SELECT * FROM users2 WHERE id = $1",[req.params.id]);
        //const results = await db.query("SELECT $2 FROM users2 WHERE id = $1",[req.params.id],column); you can use a variable to let the user choose what to show in the record.
        //Future feature?

        res.status(200).json({
            status:"success", 
            data:{
                user:results.rows[0]
            }
        })
    }

    catch(err){
        console.log(err);
        res.status(404).json({
            status:"failure",
            data:{
                errorCode:err
            }

        });
    }



})

//GET Duplicates
router.get(" duplicates",async(req,res)=>{

    try{
        const results = await db.query("SELECT * FROM users2 a USING users2 b WHERE a.id > b.id and a.name = b.name;");
        console.log(results);
        res.status(201).json({

            status:"success",
            data:{
                user:results
            }
    
        })
    }

    catch{
        res.status(404)
    }
})







//Create a resturant
router.post("/api/v1/contacts",async(req,res)=>{
    

    try{
        const newestID = await db.query("select * from users2 order by id desc limit 1");
        /*let id = 0;
        console.log(id);
        try{
            id = newestID.rows[0].id;
        }

        catch{
            id = 1;
        }
        console.log(newestID.rows[0].id);
        console.log("test"+newestID.rows[0]);

        Different implementation but the one below works better
        */

       try{
        id = newestID.rows[0].id+1;}

        catch{
            id=1;
        }
        //The above increments the id so that none of the ids are duplicates even if the contacts are duplicates

        const results = await db.query("INSERT INTO users2(id,name,newuser,phone) VALUES($1,$2,$3,$4)",[id,req.body.name,req.body.newuser,req.body.phone]);
        //INSERT INTO table_name (column1, column2, column3, ...)
        //VALUES (value1, value2, value3, ...); 
        res.status(201).json({
            status:"User Created Success",
            data:{
                "id":req.body.id,
                "name":req.body.name,
                "newuser":req.body.newuser,
                "phone":req.body.phone

            }
        })

    }

    catch(err){
        res.status(404).json({
            status:"failure",
            data:{
                errorCode:err
            }

        });

    }


})

//Update a resturant
router.put("/api/v1/contacts/:id",async(req,res)=>{
    /*
    UPDATE Customers
    SET ContactName = 'Alfred Schmidt', City= 'Frankfurt'
    WHERE CustomerID = 1;*/
    try{

        console.log(req.body);
        const results = await db.query("UPDATE users2 SET name = $1, newUser = $2,phone=$3 WHERE id = $4 returning *" ,[req.body.name,req.body.newuser,req.body.phone,req.params.id]);
        
        res.status(200).json({
            status:"success",
            data:{
                "id":req.body.id,
                "name":req.body.name,
                "newuser":req.body.newuser,
                "phone":req.body.phone
            }
    
        })
        


   }


   catch(err){
        console.log('Test');
   }




   

  




})

//Delete a user
router.delete("/api/v1/contacts/:id",async(req,res)=>{
    try{

        console.log(req.params.id);
        
        const results = await db.query("DELETE FROM users2 WHERE id = $1 returning *;" ,[req.params.id]);
        res.sendStatus(204);
        console.log("deleted");
        /*
        if(results.row != undefined){
            
        }

        else if (rez==undefined){
            res.sendStatus(404);
            return;
        
        }
        */
    }
    catch(err){
        res.status(404);
        console.log('Test');
    }
    
    
})



//delete duplicates
router.delete("/api/v1/duplicates",async(req,res)=>{

    try{
        const results = await db.query("DELETE FROM users2 a USING users2 b WHERE a.id > b.id and a.name = b.name returning *  ;");
        console.log(results);
        res.status(201).json({

            status:"success",
            data:{
                user:results.rows
            }
    
        })
    }

    catch{
        res.status(404)
    }
})
/*
DELETE FROM users2 a USING users2 b
WHERE a.id > b.id and a.name = b.name;
*/

module.exports = router;