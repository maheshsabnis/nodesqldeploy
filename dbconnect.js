/* Import MsSql */

import sql from 'mssql';

/* defiane a class with a static method for establishing conection with database */
/* Db Connection Layer */
class DbConnect {
    static async IsConnected(){
        const connection = await sql.connect('Server=tcp:test001server.database.windows.net,1433;Initial Catalog=eShoppingCodi;Persist Security Info=False;User ID=MaheshAdmin;Password=P@ssw0rd_;MultipleActiveResultSets=False;Encrypt=True;TrustServerCertificate=False;Connection Timeout=30;');
        return connection.connected;
    }
}

export {DbConnect};