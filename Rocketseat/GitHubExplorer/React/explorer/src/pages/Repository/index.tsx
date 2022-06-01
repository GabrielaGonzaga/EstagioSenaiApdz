import React, { useEffect, useState } from "react";
import { useRouteMatch, Link } from "react-router-dom";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import logo from '../../assets/logo.svg';
import {Header, Issues, RepositoryInfo} from './styles'
import api from "../../services/api";

interface RepositoryParams{
     repository: string;
}

interface Repository{
     full_name: string;
     owner:{
          login: string;
          avatar_url: string;
     }
     description: string;
     stargazers_count: number;
     forks_count: number;
     open_issues_count: number;
}

interface Issue{
     id: number;
     title: string;
     html_url: string
     user:{
          login: string;
     }
}

const Repository: React.FC = () =>{

     const [repository, setRepository] = useState<Repository | null >(null);
     const [issue, setIssue] = useState<Issue[]>([]);
     const {params} = useRouteMatch<RepositoryParams>();

     useEffect(() =>{
          api.get(`repos/${params.repository}`).then(response =>{
               setRepository(response.data)
          })
     }, [params.repository]);

     useEffect(() =>{
          api.get(`repos/${params.repository}/issues`).then(response =>{
               setIssue(response.data);
          })
     }, [params.repository]);

     return(
          <>
               <Header>
                    <a  href="/"><img src={logo} alt="GitHub Explorer" /></a>
                    <a href="/">
                         <FiChevronLeft size={16}/>
                         Voltar
                    </a>
               </Header>  

               {/* {repository ?( */}
               {repository &&(
                     <RepositoryInfo>
                     <header>
                          <img src={repository?.owner.avatar_url} alt={repository.owner.login}/>
                          <div>
                               <strong>{repository.full_name}</strong>
                               <p>{repository.description}</p>
                          </div>
                     </header>
 
                     <ul>
                          <li>
                               <strong>{repository.stargazers_count}</strong>
                               <span>Stars</span>
                          </li>   
                          <li>
                               <strong>{repository.forks_count}</strong>
                               <span>Forks</span>
                          </li>   
                          <li>
                               <strong>{repository.open_issues_count}</strong>
                               <span>Issues</span>
                          </li>   
                     </ul>
 
                </RepositoryInfo> 
               // ):(
               //      <p style={{fontSize: "200px"}}>CARREGANDO</p>
               )}

               {issue.map(issue =>(
                    <Issues>
                         <a key={issue.id} href={issue.html_url}> 
                              <div>
                                   <strong>{issue.title}</strong>
                                   <p>{issue.user.login}</p>    
                              </div>
                              <FiChevronRight size={30}></FiChevronRight>
                         </a>
                    </Issues>  
               ))}
          </>
         
     );
};

export default Repository;