
const { Client } = require('pg');

async function queryDatabase(user:string) {
const client = new Client({
    user: "postgres",
    host: "172.29.206.211",
    database: "api-authentication",
    password: "KPC1nf@'db",
    port: 5432,
});
    await client.connect();
    const query = `
    select u.Email , u.CreatedOn , u.CreatedBy from user_db u 
    where u.Email = 'qa.test02@gmail.com'
    `;
    
    const res = await client.query(query , [user]);

    await client.end();
    return res.rows;

}
module.exports = { queryDatabase }

queryDatabase('qa.test02@gmail.com').then((data) => {
  console.log('Data:', data);
}).catch((error) => {
  console.error('Failed to query database:', error);
});



