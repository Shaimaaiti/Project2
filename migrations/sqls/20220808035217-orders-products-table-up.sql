/* Replace with your SQL commands */
CREATE TABLE orders_products (
    Id SERIAL PRIMARY KEY,
    order_id INTEGER NOT NULL,
    product_id INTEGER NOT NULL,
    quantity INTEGER NOT NULL,    
    cost DECIMAL NOT NULL,  
    FOREIGN KEY (order_id) REFERENCES orders (Id) ON DELETE CASCADE,
    FOREIGN KEY (product_id) REFERENCES products (Id) ON DELETE CASCADE
);