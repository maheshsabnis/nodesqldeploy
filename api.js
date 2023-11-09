import express from 'express';
import cors from 'cors';

import { DataAccess } from './dbaccess.js';
async function server() {
const instance = express();
 
instance.use(express.json());
instance.use(cors({
    origin:'*', /* The Domain of caller e.g. https://www.something.com */
    methods: '*', /* The Allowed HTTP Method */
    allowedHeaders:'*' /* Allowed HTTP Heades in Request */
}));

const dba = new DataAccess();


const port = process.env.PORT || 8090;

instance.get('/api/products', dba.getData);
instance.get('/api/products/:id', dba.getDataById);
instance.post('/api/products',dba.saveData);
instance.put('/api/products/:id',dba.updateData);


/* Start Listening */

instance.listen(port, ()=>{
    console.log (`API is listening on port: ${port}`);
});
}
server();
export {
    server
}