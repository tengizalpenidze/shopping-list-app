const mysqlDb = require('../db/mysqlcon');

const dbHelper = {};

dbHelper.createQueryToAddNewListItems = function (listId, listItems){
    let queryToAddNewListItems = "INSERT INTO `shopping_list` (`item_name`, `quantity`, `extra_details`, `shopping_list_id`) values ";
  
    //if we haave only 1 row to add
    if (typeof listItems.item_name === 'string' || listItems.item_name instanceof String) {
      queryToAddNewListItems+=`('`+listItems.item_name +`', '`+listItems.item_quantity+`', '`+listItems.extra_details+`', `+ listId+`)`;
    }else{
      for(let i=0; i< listItems.item_name.length; i++){
        queryToAddNewListItems+=`('`+listItems.item_name[i] +`', '`+listItems.item_quantity[i]+`', '`+listItems.extra_details[i]+`', `+ listId+'), ';
      }
      queryToAddNewListItems = queryToAddNewListItems.slice(0,-2);
      queryToAddNewListItems+=';';
    }
    return queryToAddNewListItems;;
  }

dbHelper.deleteShoppingListItems = function (idsOfShoppingListItems) {
    return new Promise((resolve, reject) => {
        // var query = 'select * from all_shopping_lists where id= 115;'
        queryToDeleteListItems = "DELETE FROM `shopping_list` WHERE `id` in (?);"
        mysqlDb.query(queryToDeleteListItems, idsOfShoppingListItems, (error, results) => {
            if (error) {
                return reject(error);
            }
            return resolve(results);

        });
    });
}

dbHelper.listOfshoppingListItems = function(idOfShoppingList){

    return new Promise((resolve, reject) => {
        let queryTextToGetListItems = 'select * from shopping_list where shopping_list_id = ?';
        params = [idOfShoppingList];
        mysqlDb.query(queryTextToGetListItems, params, (error, results) => {
            if (error) {
                return reject(error);
            }
            return resolve(results);

        });
    });

}

dbHelper.getShoppingListOverview = function(idOfShoppingList){

    return new Promise((resolve, reject)=>{
        let queryToGetShoppingListOverview = 'select * from all_shopping_lists where id = ?';
        params = [idOfShoppingList];
        mysqlDb.query(queryToGetShoppingListOverview, params, (error, results) => {
            if (error) {
                return reject(error);
            }
            return resolve(results);

        });
    });

}

dbHelper.getPercentOfBoughtItems = function(idOfShoppingList){

    return new Promise((resolve, reject)=>{

        let queryToGetPercentOfBought = "SELECT count (*) / (select count (*) from shopping_list where shopping_list_id = ?') as 'Percentage'" + 
                                        "from shopping_list where shopping_list_id = ? and status = `bought`"

        params = [idOfShoppingList,idOfShoppingList ];
        mysqlDb.query(queryToGetPercentOfBought, params, (error, results) => {
            if (error) {
                return reject(error);
            }
            return resolve(results);

        });
    });

}

module.exports = dbHelper;