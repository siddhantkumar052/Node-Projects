const express = require("express");
const router = express.Router();
const data = require("../data");
const searchData = data.search;
const showData = data.shows;

router.get("/", async(req,res)=>{
        
    try{
       res.render('shows/index', {keywords: "Show Finder"})
        
    }catch(e){
        res.status(404).json({error : "No show with the Id exists!!"});
    }
});    

router.get("/show/:id", async(req,res)=>{
    const id = (req.params.id);
    if (isNaN(id)) { 
        res.status(404).json({error : "Id can only be a number!"});
        return;
    }
     try{
         const show = await showData.getShowWithId(id); 
         res.render('shows/single', { show_details : show, keywords: show.name });
     }catch(e){
        res.status(404).json({error : "No show with the Id exists!"});
     }
 });

router.post("/searchshows", async(req,res)=>{
    try{
       let searchTerm = req.body;
       let shows = await searchData.getAll(searchTerm.searchTerm);
       const newList = shows.splice(0,5)
       if (data.length === 0){
            res.status(404).json({error : "No shows found"});
       }else{
            res.render('shows/searchshows', { search_details : shows , keywords: "Shows Found" });
       }      
    }catch(e){
            res.status(400).json({error : e});
    }
});

module.exports = router;