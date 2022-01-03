const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");

//middlware using cors body-parser can get to work
app.use(cors());
app.use(express.json());


//businsess search
app.get("/search",async(request,response) => {

    try {
        const{business_name} = request.query;

        const names = await pool.query(
        'SELECT\
        b.business_name,\
        b.business_id, \
        s.inspection_result, \
        l.us_state, \
        l.latitude, \
        l.longitude\
        FROM business b\
        INNER JOIN certificate p\
        ON p.certificate_id = b.certificate\
        INNER JOIN "Inspection" s \
        ON p.record = s.record_id\
        INNER JOIN "location" l \
        ON b.location = l.location_id\
        WHERE b.business_name ILIKE $1 LIMIT 100',[`%${business_name}%`])

        response.json(names.rows);
    
    } catch (error) {
        
    }
    

})

//get business
app.get("/getBusinessInfo/:business_id",async(request, response) =>{

   try{
       const {business_id} = request.params;
    
       const allBusiness = await pool.query('SELECT\
       b.business_name,\
       s.inspection_result\
       FROM\
       business b\
       INNER JOIN certificate p \
       ON p.certificate_id = b.certificate\
       INNER JOIN "Inspection" s \
       ON p.record = s.record_id\
       WHERE b.business_id= $1',[business_id]);
       response.json(allBusiness.rows)
   }
   catch(err){
       console.error(err.message)
   }
 
});

//function that gets a business by its state
app.get("/state/:us_state",async(request,response) => {

   try {
       const {us_state} = request.params;
       const bState = await pool.query('SELECT\
       b.business_name,\
       s.inspection_result,\
       l.us_state\
       FROM\
       business b\
       INNER JOIN certificate p\
       ON p.certificate_id = b.certificate\
       INNER JOIN "Inspection" s \
       ON p.record = s.record_id\
       INNER JOIN "location" l \
       ON b.location = l.location_id\
       Where l.us_state = $1',[us_state])

       response.json(bState.rows)
   } catch (err) {
       console.error(err.message)
   }

});

//function to create put request to be able to insert data into database in this case a new user
app.post("/user", async (request,response) =>{

   try {
       const {UserName, Password} = request.body
       const newUser = await pool.query('INSERT INTO user (UserName, Password) \
       VALUES($1,$2)',[UserName,Password]);
       response.json(newUser);

   } catch (err) {
       console.error(err.message)
   }
   
   
});

//fuction that gets business id lat and long from a business to be used for google maps api
app.get("/location",async(request, response) =>{

   try{

       const location = await pool.query('SELECT\
       b.business_id,\
       c.latitude,\
       c.longitude\
       FROM\
       business b\
       INNER JOIN "location" c  \
       ON c.location_id = b.location'); 
       response.json(location.rows)
   }
   catch(err){
       console.error(err.message)
   }
 
});

app.post("/review",async(request,response) => {

   try {

       const {comment} = request.body
       const {businessId} = request.body
       const review = await pool.query(
           'INSERT INTO comment (comment,"businessId") VALUES($1,$2) RETURNING *',
           [comment,businessId]);
       response.json(review.rows[0])

   } catch (err) {
       console.error(err.message)
   }

});

app.get("/businessReview/:businessId",async(request,response) => {
   
   try {
       const {businessId} = request.params;
       const reviews = await pool.query('SELECT comment FROM comment \
       WHERE "businessId" = $1',[businessId])
       response.json(reviews.rows)
   } catch (error) {
       console.error(err.message)
   }
});

app.get("/getAllReviews",async(request,response) => {
   
   try {
       const reviews = await pool.query('SELECT * FROM Comment')
       response.json(reviews.rows)
   } catch (error) {
       
   }
});




//default json argument to show connection works
//app.get('/',(request, response) => {
   // response.json({info: 'Node.js, Express, and Postgres API'})
//})

//app.get('/',function(request, response){
   //response.sendFile('InspectionHome.html', { root: '../PresentationLayer'});
//})

//listener if the port is online
app.listen(5000, () => {
    console.log(`App is running on port 5000`)
})

