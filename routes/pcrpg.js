let express = require('express');
let router = express.Router();

router.get("/pcrpgchat", (req, res) =>{
    //Render whatever is in the assigned ejs file
    res.render("pcrpgchat")
})

// router.post("/", (req, res) => {
//     console.log("I posted!")
// })

module.exports = router