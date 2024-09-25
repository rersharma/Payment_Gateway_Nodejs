const sqlconnect=require('../database')

class Product
{
      Add_Product(req,res)
      {
          if(req.method==='GET')
          {
             res.render('AddProduct')
             res.end()
          }
          else 
          {
             sqlconnect.getConnection((err,myconnection)=>
            {
                  if(err)
                  {
                     res.send(err)
                     res.end()
                  }
                  else 
                  {
                      const q=`insert into product(name,price,description,photo)values('${req.body.name}','${req.body.price}','${req.body.description}','${req.file.path}')`
                      myconnection.query(q,(err)=>
                    {
                          if(err)
                          {
                             res.send(err)
                             res.end()
                          }
                          else 
                          {
                              res.render('AddProduct',{message:req.body.name+' Added Successfully'})
                              res.end()
                          }
                    })
                  }
            })
          }
      } 
      Fetch_Products(req,res)
      {
          sqlconnect.getConnection((err,myconnection)=>
         {
             if(err)
             {
                res.send(err)
                res.end()
             }
             else 
             {
                 const q=`Select * from product`;
                 myconnection.query(q,(err,data)=>
               {
                    if(err)
                    {
                      res.send(err)
                      res.end()
                    }
                    else 
                    {
                         res.render('Product',{record:data})
                         res.end()
                    }
               })
             }
         })
      } 
      Buy_Products(req,res)
      {
             const Product_id=req.body.id
             const product_name=req.body.name
             const product_price=req.body.price 
             const quantity=req.body.quantity
             const total=req.body.total
             res.render('checkout',{final_amount:total,product_id:Product_id,ProductName:product_name,quantity:quantity})
      } 



Status(req,res)
{
      const message=req.query.status;
      res.render('Payment',{message:message})
      res.end()
}
}

const obj=new Product()
module.exports=obj