import  express from "express";
import routes from "./routes";

const app = express();
app.use(express.json());
app.use(routes);

app.listen(5000, ()=>{
    console.log('Server started on port 5000 :D');
});

app.get('/', (request, response) =>{
    return response.json({test: 'Oh hi, How Long! :)'});
});