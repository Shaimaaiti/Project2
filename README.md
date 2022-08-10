# Storefront Backend Project
## Getting Started

- To get started, clone this repo and run `yarn or npm i` in your terminal at the project root.

- you have to have a .env file in the repo, it has to contain the following variables
   POSTGRES_HOST=127.0.0.1
   POSTGRES_DB=postgres
   POSTGRES_TEST_DB=postgres_test
   POSTGRES_USER=postgres
   POSTGRES_PASSWORD=@Shass123   ## your admin password
   NODE_ENV=dev
   BCRYBT_PASSWORD=Good_thing_todo_is_letpeople_free
   SALT_ROUNDS=10
   TOKEN_SECERT=@i42asWyt


 - you have to create two databases with the value you set in POSTGRES_DB, POSTGRES_TEST_DB, this is an example for the SQL needed when connected to psql
`
## Note i used the default user of postgres 
 so you should only have to create the 2 databases
 by simple commands like that 
 `CREATE DATABASE postgres;`   for dev db
 `CREATE DATABASE postgres_test;`   for test db 


## Overview


### 1.  DB Creation and Migrations and running

- to run migrations up on dev environment run `npm run up`, to run migrations down it run `npm run down`
- to run migrations up on test environment run `npm run build`, after that `npm run test` and also to running the unit tests.
-to run the run the server express by run `npm run start`

- to create a new migration run :db-migrate create users --sql-file

### 2. database.json
this is given to the db-migrate to setup different databases (test/dev), for more info check :
https://db-migrate.readthedocs.io/en/latest/Getting%20Started/configuration/


### 3. Local host ports
-for the database, port is not specified so it will run on the selected port for postgres installation (default is 5432)
-server is running on port 3000



### 4. Testing Project by postman:
`User APIs`
 1- create user:
   url used: /user/signup [POST] 
   body used: {
      "username" :"shaimaa",
      "email" :"shaimaa@gmail.com",
      "phone" :"0123456789",  
      "password" :"1254fgt"
     } 
     reslut will be : Next Step is go to: /user/login

  2- login 
    url used:    /user/login [POST]
     body used:{ "username":"shaimaa",
                 "password":"1254fgt"
               }
               result will be: Token ### save it to use it in coming requests
  3- Get all users by '/user ' [GET] using Authorization header : Bearer ${token}   
  4- to get spesific user by '/user/${id}'  [GET] using Authorization header : Bearer ${token}  
  5- to DELTE spesific user by '/user/${id}' [DELET] using Authorization header : Bearer ${token} 
  ************************************************************
`Product APIs`
1- create product:
   url used: /product [POST] 
   body used: 
    {
        "name": "book",
        "count": 5,
        "price": "100"
    }
     reslut will be : 
    {
        "id": 1,
        "name": "book",
        "count": 5,
        "price": "100"
    }

  3- Get all products by '/product ' [GET],   
  4- to get spesific product by '/product/${id}'  [GET]   

  5- to Update specific product by '/product/${id}' [PATCH]
  body used: 
    {
        "name": "book",
        "count": 1,
        "price": "105"
    }
  6- to DELTE spesific product by '/product/${id}' [DELET] 
  **************************************************************
  `Order APIs`
1- create order:
   url used: /order [POST] 
   body used: 
    {
        "userId": 1 // for example,       
    }
     reslut will be : 
    {
        "id": 1,
        "created_at": "now()",
        "userId": 1
        "status": false       
    }

  3- Get all orders by '/order ' [GET],  using Authorization header : Bearer ${token}
     Get all orders for spesific user '/order?userId=${id}' [GET]  using Authorization header : Bearer ${token}
     Get all completed orders for spesific user '/order?userId=${id}&status=true' [GET]  using Authorization header : Bearer ${token}
     Get all un completed orders for spesific user '/order?userId=${id}&status=false' [GET]  using Authorization header Bearer ${token}:  
  4- to get spesific order by '/order/${id}'  [GET]   

  5- to Update specific order by '/order/${id}' [PATCH]
  body used: 
    {
        "status": "true"
    }
    result will be:
    {
    "id": 2,
    "created_at": "2022-08-08T04:15:55.901Z",
    "userid": 1,
    "status": true
}
  6- to DELTE spesific order by '/order/${id}' [DELET] 
**************************************************************
  *** to add product to order ***
   order/orders/${order_id}/products    [POST]
   body will be: 
   {
    "product_Id":10,
    "quantity":5
   }
result will be like 
{
    "id": 19,
    "order_id": 2,
    "product_id": 10,
    "quantity": 5,
    "cost": "50"
}
 **************************************************************
  `Dashboard service` 
     dashboard/most_popular_products [GET]
     result will be like:
     [
    {
        "Product_Name": "book",
        "Product_Id": 10,
        "CountOfProduct": "5"
    },
    {
        "Product_Name": "pen",
        "Product_Id": 1,
        "CountOfProduct": "4"
    },
    {
        "Product_Name": "orange",
        "Product_Id": 3,
        "CountOfProduct": "1"
    }
]