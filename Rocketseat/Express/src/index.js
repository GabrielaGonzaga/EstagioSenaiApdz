
const express = require('express');
const { status } = require('express/lib/response');

const {uuid, isUuid} = require ('uuidv4')
const app = express();

app.use(express.json());

/**
 * PARAMS
 * 
 * Query Params : Filters
 * Route Params: Identify sources (update and delete)
 * Request Params:Content to create or edit a source
 */

/**
 * MIDDLEWARE:
 * 
 * Request intercepter, can interrupt tottaly the request ou alter request data.
 * 
 */

const projects = [];

 function logRequest(request, response, next) {
     const {method, url} = request;
     const logLabel = `[${method.toUpperCase()}] ${url}`;

     console.log('1');
     console.log(logLabel);
     console.time(logLabel);

     //return
     next(); //next middleware

     console.log('3');
     console.timeEnd(logLabel);
 }

 //Validate if the id is valid 
function validateProjectId(request, response, next) {
    const {id} = request.params;

    // if dont return the status code and the error message
    if (!isUuid(id)) {
        return response.status(400).json({error:'Invalid project ID :/'})
    }

    // if is, continue to the next step
    return next();
}

app.use(logRequest);
app.use('/projects/:id', validateProjectId)

app.get('/projects', (request, response) => {

    console.log('2');

    //QUERY PARAMS
    const {title} = request.query;
    
    const results = title 
    ? projects.filter(project => project.title.includes(title)) 
    : projects;

    //RETURN JSON GET
    return response.json(results);
});

app.post('/projects', (request, response) => {

    //QUERY PARAMS
    const {title, owner}= request.body;
    const project = {id: uuid(), title, owner};

    projects.push(project);

    return response.json(project);
    
});

app.put('/projects/:id', validateProjectId, ( request, response) => {
    //QUERY PARAMS
    const {id} = request.params;
    const {title, owner}= request.body;

    const projectIndex = projects.findIndex(project => project.id == id);

    if (projectIndex < 0) {
        return response.status(400).json({error: 'Project not found :/'});
    }

    const project = {
        id,
        title,
        owner,
    }

   projects[projectIndex] = project;
   return response.json(project);
});

app.delete('/projects/:id',( request, response) => {

    const {id} = request.params;
    const projectIndex = projects.findIndex(project => project.id == id);

    if (projectIndex < 0) {
        return response.status(400).json({error: 'Project not found :/'});
    }

    projects.splice(projectIndex, 1);

    return response.status(204).send();
});

app.listen(3333, () => {
    console.log(':) Back-end started!');
})  

// {message: 'Hello World'}

/**
* FRAGMENT VARIABLE
const {title, owner} = request.query;
console.log(title, owner);
*/
