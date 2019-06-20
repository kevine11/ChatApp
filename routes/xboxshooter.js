let express = require('express');
let router = express.Router();

router.get("/xboxshooterchat", (req, res) =>{
    //Render whatever is in the assigned ejs file
    res.render("xboxshooterchat")
})

// router.post("/", (req, res) => {
//     console.log("I posted!")
// })

module.exports = router