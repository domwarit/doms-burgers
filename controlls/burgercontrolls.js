
const express =require("express");
const router = express.Router();
var burgerModle = require("../modles/burgers");



router.get("/", function (require, res){
    burgerModle.selectAll(function(data){
        var allObjects = {
            burgers: data
        };
        console.log(allObjects);
        res.render("index", allObjects);
    });
});

router.post("/api/burgers", function(require, res){
    burgerModle.makeOne([
        "burger_order"
    ],[
        require.body.burger_order
    ],
        function(results) {
            res.json({id: results.insertID});
        });
});


router.put("/api/burgers/:id", function(require, res) {
    var condition = "id = " + require.params.id;
    console.log("condition", condition);
    console.log(require.body)
    console.log(require.body.devoured);

    burgerModle.updateOne(
        {devoured: require.body.devoured}, condition, function(result){
            if (result.changedRows === 0){
                return result.status(404).end();
            }
        }
    )
});


// Export routes for server.js 
module.exports = router;

