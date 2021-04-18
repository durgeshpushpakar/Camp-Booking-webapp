const express    =     require("express"),
	    app        =     express(),
	    bodyParser =     require("body-parser"),
	    mongoose   =     require("mongoose");

//database things
//27017 is the default port for mongodb connection
mongoose.connect("mongodb://localhost:27017/yelp_camp",{useNewUrlParser:true, useUnifiedTopology:true});
let campSchema=new mongoose.Schema({
	name:String,
	image:String,
	description:String
});
let Camp=mongoose.model("Camp", campSchema);

// Camp.create({
// 	name:"Granite Hill",
// 	image:"https://images.unsplash.com/photo-1537565266759-34bbc16be345?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=600&q=60",
// 	description:"This camp has no Toilets!!"
// },(err,incamp)=>{
// 	if(err)console.log(err);
// 	else console.log("successful !");
// });
	

app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine", "ejs");
app.use(express.static("public"));
app.get("/",(req,res)=>{
  res.render("home");
})
//form
app.get("/campground/new",(req,res)=>{
  res.render("campform");
});

//show route
app.get("/campground/:id",(req,res)=>{
	Camp.findById(req.params.id,(err,camp)=>{
		if(err){console.log(err);}
		else{res.render("show", {camp:camp});}
	});
});

//campground route
app.get("/campground",(req,res)=>{
	Camp.find({},(err,camps)=>{
		if(err)console.log(err);
		else res.render("index", {campgrounds:camps});	
	});  
});
//post request from the form
app.post("/campground",(req,res)=>{
  //push the new camp data to the array using body-parser
let temp={
	name:req.body.campName,
	image:req.body.campImage,
	description:req.body.campDesc
};
// console.log(temp.name);
// console.log(temp.image);
  Camp.create(temp,(err,incamp)=>{
		if(err) console.log(err);
		else {
			  //redirect to '/campground'
			  res.redirect("/campground");
	  }
	});
})
app.listen(process.env.PORT||3000, process.env.IP,()=>console.log("server started!"));