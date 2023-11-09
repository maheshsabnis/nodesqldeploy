import { DbConnect } from "./dbconnect.js";
import sql from 'mssql';
/* Infra */
class DataAccess {
    async getData(req,resp){
        if(await DbConnect.IsConnected()){
            let result = await sql.query(`Select * from ProductInfo`); 
            resp.status(200).json(result.recordsets);
        }
    }

    async getDataById(req,resp){
        if(await DbConnect.IsConnected()){
            const id = req.params['id'];

            let result = await sql.query(`Select * from ProductInfo where ProductRowId=${parseInt(id)}`); 

            resp.status(200).json(result.recordset);
        }
    }

    async saveData(req,resp){
        if(await DbConnect.IsConnected()){
            /* define an onject that will read data from body */
            const product = {
                ProductId:req.body.ProductId,
                ProductName:req.body.ProductName,
                CategoryName:req.body.CategoryName,
                Manufacturer:req.body.Manufacturer,
                Description:req.body.Description,
                BasePrice:parseInt(req.body.BasePrice)
            };
            console.log(`Data :${JSON.stringify(product)}`)
            let result = await sql.query(`Insert into ProductInfo values('${product.ProductId}', '${product.ProductName}','${product.CategoryName}','${product.Manufacturer}','${product.Description}', ${product.BasePrice})`); 

            resp.status(201).send({
                message:'New Record is created',
                data:result.output});
        }
    }

    async updateData(req,resp){
        if(await DbConnect.IsConnected()){
            const id = req.params['id'];
            /* define an onject that will read data from body */
            const product = {
                ProductRowId:req.body.ProductRowId,
                ProductId:req.body.ProductId,
                ProductName:req.body.ProductName,
                CategoryName:req.body.CategoryName,
                Manufacturer:req.body.Manufacturer,
                Description:req.body.Description,
                BasePrice:parseInt(req.body.BasePrice)
            };
            
            let result = await sql.query(`Update ProductInfo set ProductId='${product.ProductId}', ProductName='${product.ProductName}',CategoryName='${product.CategoryName}',Manufacturer='${product.Manufacturer}',Description='${product.Description}', BasePrice= ${product.BasePrice} where ProductRowId=${product.ProductRowId}`); 

            resp.status(201).send({
                message:'New Updated is Sucecssfully',
                data:result.output});
        }
    }
}

export {DataAccess};