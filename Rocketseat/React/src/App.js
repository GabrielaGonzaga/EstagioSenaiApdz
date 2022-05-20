import React, {useState, useEffect} from "react";
import Header from "./components/Header";
import forest from "./assets/forest.jpg"
import api from "./services/api";
import './App.css'

function App() {
    const [projects, setProjects] = useState( []);

    // params: witch function 'll be shoot, 
    // when this function will be shoot
    useEffect(() => {
        api.get('projects').then(response =>{
            setProjects(response.data);
        });
    }, []);

    async function handleAddProject(params) {
        // projects.push(`New project ${Date.now()}`) 
        // setProjects([...projects, `New project ${Date.now()}`])

         const response = await api.post('projects', {
            title: `New project ${Date.now()}`,
            owner: "Maria Gabriela"
        })

        const project = response.data;

        setProjects([...projects, project]);
    }

    return(
        <>
            {/* <img width={100} src={forest}/> */}

            <Header title="Projects">
                <ul>
                    {projects.map(project =>
                        <li key={project.id}>{project.title}</li> 
                    )}
                </ul>

                <button type="button" 
                onClick={handleAddProject} >
                    Add Project
                </button>

            </Header>
        </>   
    );   
}

export default App;