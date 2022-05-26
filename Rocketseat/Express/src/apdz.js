const { response } = require('express');
const {uuid, isUuid} = require ('uuidv4')
const express = require('express'); 
const { request } = require('express');

const app = express();

const products = [];
const users = [];

//READ
app.get('/listProducts', (request, response =>{

    //Define the query to show all the products
    const products = request.query;

    //return all the products
    return response.json(products);

}))

//LOGIN
app.post('/login', (request, response) => {

    const {title, owner} = request.body;

    const projectFound = projects.findIndex(project => project.title == title && project.owner == owner);

    if(projectFound < 0){
        return response.status(400).json({error: 'email or password incorrects' });
    }

    return response.status(200).json('User logged');
});

// CREATE 
app.post('/addNewProduct', (request, response => {
    
    //what the user need to put on the body of the request (atributes of the new object)
    const {name, price} = request.body;

    //body of the new product
    const product = {id: uuid(), name, price};

    //add the new product on the array products
    const newProduct = [...products, product];
    //return the product created (newProduct) in json
    return response.json(newProduct);

    //OR 

    //add the new product on the array products
    products.push(product);
    //return the product added in json
    return response.json(product);
}));

//UPDATE
app.put('updateProduct/:id', (request, response => {
    
    // query params needeed to find the product that 'll be updated 
    const {id} = request.params;

    //query body with the atributes that 'll be updated
    const {name, price} = request.body;

    // const to find the product by the id 
    const findIndexProduct = products.findIndex(product => product.id == id);

    // verify if the id does exist 
    if (findIndexProduct <= 0){
        //if don't return an error
        return response.statusCode(400).json({erro: 'Product not found :/'})
    }

    //if do return the product updated
    const product = {
        id,
        name,
        price
    }

    //product found = product if the new infos
    products[findIndexProduct] = product

    //return the product updated
    return response.json(product);

}));

// DELETE
app.delete('deleteProduct/:id', (request, response => {

    //query param (id) to find the product that 'll be deleted
    const {id} = request.params;

    // const to find the product by the id 
    const findIndexProduct = products.findIndex( product => product.id == id);

    // verify if the product does exist 
    if (findIndexProduct <= 0){
        //if doesn't return an error
        return response.statusCode(400).json({erro: 'Product not found :/'})
    }

    //if does delete the product 
    products.splice(products, 1)

    // if the product has been deleted return an status code 204
    return response.status(204).send();
}));


app.listen(3333, () =>{
    console.log(' Back-end started :)!')
})




















