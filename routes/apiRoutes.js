const express = require ("express");
const router = express.Router();

// create
router.post("/api/job", (req, res) => {
    res.json(req.body.name)
});

// read
router.get("/api/job", (req, res) => {
    res.send("Hello")
});

// update
router.put("/api/job", (req, res) => {
    res.send(`changing ${req.body.was} to ${req.body.is}`)
})

// delete
router.delete("/api/job", (req, res) => {
    res.send(`${req.body} deleted`)
})

module.exports = router