let express = require('express');
let router = express.Router();

router.get("/xboxactionchat", (req, res) =>{
    //Render whatever is in the assigned ejs file
    res.render("xboxactionchat")
})

// router.post("/", (req, res) => {
//     console.log("I posted!")
// })

module.exports = router