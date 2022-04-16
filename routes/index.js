var express = require('express');
const res = require('express/lib/response');
var router = express.Router();
const mysqlDb = require('../db/mysqlcon');
const dbHelper = require('../helpers/helper-functions');


/* GET home page. */
router.get('/', function(req, res, next) {
  //res.render('index', { title: 'Shopping list' });
  //res.render('all-shopping-lists', { title: 'All shopping lists' });
  const queryText = 'select * from all_shopping_lists;';
  let params = ['Potatoes'];
  mysqlDb.query(queryText,params,(error,results)=>{
    res.locals.shopping_lists = results;
    res.render('all-shopping-lists', { title: 'All shopping lists' });
  })
});

router.get('/add-new', (req,res,next)=>{
  res.render('add-new-list');
});

router.post('/add-new', (req, res, next) => {
  let queryToAddNewList = "INSERT INTO `all_shopping_lists` (`shopping_list_name`, `shopping_list_overview`) VALUES (?)";
  let parameters = [req.body.shopping_list_name, req.body.shopping_list_overview];
  var idOfNewList = "";

  insertANewList = () => {
    return new Promise((resolve, reject) => {
      mysqlDb.query(queryToAddNewList, parameters, (error, elements) => {
        if (error) {
          return reject(error);
        }
        return resolve(elements);
      });
    });
  };

  insertElementsOfTheList = (queryToAddNewListItems) => {
    return new Promise((resolve, reject) => {
      var test = mysqlDb.query(queryToAddNewListItems, (error, results) => {
        if (error) {
          return reject(error);
        }
        return resolve(results);

      });
      console.log(test);
    });
  };


  async function sequentialQueries() {

    try {
      const insertResultOfNewList = await insertANewList();

      idOfNewList = insertResultOfNewList.insertId;
      const queryToAddNewListItems = dbHelper.createQueryToAddNewListItems(idOfNewList, req.body);

      mysqlDb.query(queryToAddNewListItems, (error, results) => {
        if (error) {
          throw error;
        }
      })

      res.redirect('/');

    } catch (error) {
      console.log(error)
      res.send(error);
    }
  }
  sequentialQueries();

});


router.post('/delete-list', async (req,res,next)=>{
  try{
    const shoppingListItems =       await dbHelper.listOfshoppingListItems(req.body.shopping_list_id);
    if (shoppingListItems.length != 0 ) await dbHelper.deleteShoppingListItems(shoppingListItems.map((item)=>item.id));

    let queryToDeleteList = "DELETE FROM `all_shopping_lists` WHERE `id` = (?);"
    mysqlDb.query(queryToDeleteList,req.body.shopping_list_id,(error,results)=>{
      if(error) {
        console.log(error);
        res.send(error);
        throw error;
      }
      res.status(200).send("all good");
    })
  } catch(error){
    console.log(error);
    res.send(error);
  }

});

module.exports = router;
