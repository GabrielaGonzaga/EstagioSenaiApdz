import React, {useState, FormEvent, useEffect} from "react";
import {Title, Form, Repositories, Error} from "./styles";
import {FiChevronRight} from 'react-icons/fi';
import {Link} from 'react-router-dom';
import logo from '../../assets/logo.svg';
import api from "../../services/api";
import Repository from "../Repository";

interface Repository{
     full_name: string;
     owner:{
          login: string;
          avatar_url: string;
     }
     description: string;
}

const DashBoard: React.FC = () =>{

     const [newRepo, setNewRepo] = useState('');
     const [inputError, setInputError] = useState('');
     const [repositories, setRepositories] = useState<Repository[]>(() =>{
          const storageRepositories = localStorage.getItem('@GitHubExplorer:repositories');

          if(storageRepositories){
               return JSON.parse(storageRepositories)
          }else{
               return [];
          }
     });

     useEffect(() => {
          localStorage.setItem('@GitHubExplorer:repositories', JSON.stringify(repositories));
     }, [repositories]);

     async function handleAddRepository(
          event: FormEvent<HTMLFormElement>,
           ): Promise<void>{

          event.preventDefault();

          if(!newRepo){
               setInputError('Enter the author/name of the repository');
               return;
          }

          try{
               const response = await api.get<Repository>(`repos/${newRepo}`);
               const repository = response.data;

               setRepositories([...repositories, repository]);
               setNewRepo('');
               setInputError('');
          }catch(err){
               setInputError('Error on searching for this respository');
          }
     }

     return (
          <>
               <img src={logo} alt="GitHub Explorer" />
               <Title>Explore repositories on GitHub</Title>     
               <Form hasError={!! inputError} onSubmit={handleAddRepository}>
                    <input 
                    value={newRepo}
                    onChange={(e)=> setNewRepo(e.target.value)}
                    placeholder="Enter the repository name" 
                    />
                    <button type="submit">Pesquisar</button>
               </Form>

               {inputError && <Error>{inputError}</Error> }

               <Repositories>
                    {repositories.map(repository => (
                         <Link key={repository.full_name} to={`/repository/${repository.full_name}`}> 
                              <img 
                                   src={repository.owner.avatar_url} 
                                   alt={repository.owner.login}>
                              </img>
                              <div>
                                   <strong>{repository.full_name}</strong>
                                   <p>{repository.description}</p>    
                              </div>
                              <FiChevronRight size={30}></FiChevronRight>
                         </Link> 
                    ))}
               </Repositories>
          </>
     )
};

export default DashBoard;

