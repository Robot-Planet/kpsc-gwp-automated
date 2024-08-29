import * as sql from 'mssql';
import * as fs from 'fs';

async function queryMSSqlDatabase(user:string) {
        const config = {
            user: 'sa',
            password: 'sql2000',
            server: '10.3.0.122',
            port: 1433,
            database: 'KPIMN-POS-MA',
            options: {
              trustServerCertificate: true,
              encrypt: true,
            }
        };
      
        try {
          const pool = await sql.connect(config);
          console.log('Connected to the database');
          const curDate: string = Date.now.toString();
          //const filePath = "c:\\users\\robot\\test-examples"
          const filePath = "data_mssql.txt";  // At current running path
          const sqlQuery: string = "SELECT top (10) u.user_code, u.user_name, u.user_pwd, ug.grp_code FROM df_user u " + 
                                   "inner join df_user_grp ug on u.branch_no = ug.branch_no and u.user_code = ug.user_code " +
                                   "where u.user_code = 'k' And ug.grp_code = 'ITALL'";
          const result = await pool.request().query(sqlQuery);
          if (result.recordset.length > 0) {
              await fs.promises.appendFile(filePath, curDate + '\n', 'utf-8');
              for (const row of result.recordset) {
                await fs.promises.appendFile(filePath, JSON.stringify(row) + '\n', 'utf-8');
              }
            } else {
              console.log('No records');
            }
            return result; // Additional line for return result

        } catch (error) {
          console.error('Error connecting to the database:', error);
        } finally {
          try {
            await sql.close();
            console.log('Connection closed');
          } catch (closeError) {
            console.error('Error closing the database connection:', closeError);
          }
        }
}
module.exports = { queryMSSqlDatabase };

queryMSSqlDatabase('k').then((data) => {
  console.log('Data:', data);
}).catch((error) => {
  console.error('Failed to query database:', error);
});
