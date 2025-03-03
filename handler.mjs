import mysql from 'mysql2/promise';

export const handler = async (event, context) => {
  var connection = await mysql.createConnection({
    host     : 'database-da-live.cfukc8fa9ncd.us-east-1.rds.amazonaws.com',
    user     : 'admin',
    password : 'admin123',
    database : 'live'
  });
  console.log(event, context, event.httpMethod);
  if (event.requestContext.http.method == "GET") {
    const [result] = await connection.query('SELECT * from user;');
    return {
      statusCode: 200,
      body: JSON.stringify(result),
    };
  }
  if (event.requestContext.http.method == "POST") {
    await connection.query('INSERT INTO user (name, email) VALUES ("'+JSON.parse(event.body).name+'", "'+JSON.parse(event.body).email+'");');
    return {
      statusCode: 200,
      body: JSON.stringify('User inserted!'),
    };
  }
  if (event.requestContext.http.method == "PUT") {
    await connection.query('UPDATE user SET name = "'+JSON.parse(event.body).name+'" WHERE email = "'+JSON.parse(event.body).email+'";')
    return {
      statusCode: 200,
      body: JSON.stringify('User updated!'),
    };
  }
  if (event.requestContext.http.method == "DELETE") {
    await connection.query('DELETE FROM user WHERE email = "'+JSON.parse(event.body).email+'";')
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
