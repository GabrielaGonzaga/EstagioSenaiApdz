import express from 'express';
import { Router } from "express";

const app = express();
app.use(express.json());

app.listen(3333, () =>{
    console.log('Server started on port 3333! :)')
});

app.get('/get', (request, response) =>{
    return response.json('Hello World :D')
});


app.post('/post', (request, response) =>{

    const{name, email} = request.body;

    const user = {
        name,
        email
    }
    return response.json(user)
})
