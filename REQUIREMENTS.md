# API Requirements
The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application. 

## API Endpoints
#### Products
- Index  '/product' [GET]
- Show   '/product/:id' [GET]
- Create [token required]  '/product' [POST]
- [OPTIONAL] Top 5 most popular products    /dashboard/most_popular_products [GET]


#### Users
- Index [token required] '/user' [GET]
- Show [token required]  '/user/:id' [GET]
- Create '/user' [POST]

#### Orders
- Current Order by user (args: user id)[token required] '/order?userId=${id}' [GET]
- [OPTIONAL] Completed Orders by user (args: user id)[token required] '/order?userId=${id}&status=true' [GET]

## Data Shapes
#### Product
-   id :number, // auto generate by db
 -   name: varchar,
  -  count: number,
   - price :number

#### User
 - id :number,// auto generate by db
 - username :varchar,
 - email :varchar,
 - phone :varchar,  
 - hash_password :varchar,
 - creation_date:Date // auto generate by db

#### Orders
     id :number,  // auto generate by db
     userid :number,(foreign key to user table)
     status: boolean // set by default false 
#### Orders-Products
    id :number, // auto generate by db
    order_id: number, (foreign key to order table)
    product_id: number, (foreign key to product table)
    quantity :number,
    cost:number

    
