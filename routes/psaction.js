let express = require('express');
let router = express.Router();

router.get("/psactionchat", (req, res) =>{
    //Render whatever is in the assigned ejs file
    res.render("psactionchat")
})

// router.post("/", (req, res) => {
//     console.log("I posted!")
// })

module.exports = router