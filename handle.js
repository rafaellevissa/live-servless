var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'database-da-live.cfukc8fa9ncd.us-east-1.rds.amazonaws.com',
  user     : 'admin',
  password : 'admin123',
  database : 'live'
});
 
connection.connect();

export const handler = async (event) => {
  
  if (event.method == "GET") {
    const result = connection.query('SELECT * from user;');
    connection.end();
    return {
      statusCode: 200,
      body: JSON.stringify(result),
    };
  }
  if (event.method == "POST") {
    connection.query('INSERT INTO user (name, email) VALUES ('+event.body.name+', '+event.body.email+');');
    connection.end();
    return {
      statusCode: 200,
      body: JSON.stringify('User inserted!'),
    };
  }
  if (event.method == "PUT") {
    connection.query('UPDATE user SET name = '+event.body.name+'WHERE email = '+event.body.email+';')
    connection.end();
    return {
      statusCode: 200,
      body: JSON.stringify('User updated!'),
    };
  }
  if (event.method == "DELETE") {
    connection.query('DELETE FROM user WHERE email = '+event.body.email+';')
    connection.end();
    return {
      statusCode: 200,
      body: JSON.stringify('User deleted!'),
    };
  }
  const response = {
    statusCode: 200,
    body: JSON.stringify('Hello from Lambda!'),
  };
  return response;
};
