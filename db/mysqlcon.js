var mysql = require('mysql2');


var sqlUsername = process.env.SQL_USERNAME || 'sqluser';

var pool  = mysql.createPool({
  connectionLimit : 10,
  host            : '127.0.0.1',
  user            : sqlUsername,
  password        : 'Aa123456',
  database        : 'household'
});

/*
var params = 'Potatoes'
pool.query('select * from shopping_list where item_name == ?',[params], function(error, results, fields){
    if(error) throw error;
    console.log (results[0]);
})
*/
//pool.query = util.promisify(pool.query);

module.exports ={
        query: (queryText, params, callback)=>{
          return pool.query(queryText,[params], callback);
        },
  };
    
 