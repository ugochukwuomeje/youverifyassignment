# About the project

This project is ecommerce backend api with node js and express to run inside a container.

## How to run application

clone the application.
on the command line run "docker compose run ecommerceapi npm start"

## Call the api with endpoint and request below

http://localhost:3002/api/orders

## request

{
"customerId":"63274c1a0342e7026c923c41",
"products":[{"productId":"63274daf427f7a72bc7d57c2"}],
"amount":3000
}

## start the worker node by running the following command on terminal

cd utils/
ode worker.js
