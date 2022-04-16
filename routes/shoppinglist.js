var express = require('express');
var router = express.Router();
const mysqlDb = require('../db/mysqlcon');
const dbHelper = require('../helpers/helper-functions');

/* GET home page. */
router.get('/:id', async function(req, res, next) {
  const shoppingListOverview = await dbHelper.getShoppingListOverview(req.params.id);

  const queryText = 'select * from shopping_list where shopping_list_id = ?';
  params = [req.params.id];
  mysqlDb.query(queryText,params,(error,results)=>{
    res.locals.shopping_list_overview = shoppingListOverview;
    res.locals.shopping_list = results;
    res.render('shopping-list-details', { title: shoppingListOverview[0].shopping_list_name });
  });

});

router.post('/mark-item-bought', function(req,res,next){
  const itemIdToMark = req.body.id;
  const queryText = "UPDATE `shopping_list` SET `status` = 'bought' WHERE `id` = ?;"
  mysqlDb.query(queryText,itemIdToMark,(error,results)=>{
    if(error)throw error;
    res.status(200).send({'status':'bought'});
  });
});

router.post('/mark-item-not-bought', function(req,res,next){
  
  const itemIdToMark = req.body.id;
  const queryText = "UPDATE `shopping_list` SET `status` = 'not-bought' WHERE `id` = ?;"
  mysqlDb.query(queryText,itemIdToMark,(error,results)=>{
    if(error)throw error;
    res.status(200).send({'status':'not-bought'});
  });
});

module.exports = router;