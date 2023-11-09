/* Import MsSql */

import sql from 'mssql';

/* defiane a class with a static method for establishing conection with database */
/* Db Connection Layer */
class DbConnect {
    static async IsConnected(){
        const connection = await sql.connect('DBConn');
        return connection.connected;
    }
}

export {DbConnect};