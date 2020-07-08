import React, {useEffect, useState} from 'react'
import {useRouteMatch, Link} from 'react-router-dom'
import {Header, RepositoryInfo, Issues} from './styles'
import {FiChevronLeft, FiChevronRight} from 'react-icons/fi'
import api from '../../services/api'

import logo from '../../assets/logo.svg'

interface RepositoryParams{
  repository: string
}

interface Repository{
  description: string;
  stargazers_count: number;
  forks_count: number;
  open_issues_count: number;
  full_name: string;
  owner: {
    avatar_url: string;
    login: string;
  }

}

interface Issue{
  title: string;
  id: number;
  user: {
    login: string;
  }
  html_url: string;

}


const Repository : React.FC = () => {
  const {params} = useRouteMatch<RepositoryParams>()
  const [repository, setRepository] = useState<Repository | null>(null)
  const [issues, setIssues] = useState<Issue[]>([])

  useEffect( ()=> {
    api.get(`/repos/${params.repository}`)
    .then(repo => {
      setRepository(repo.data)
    })

    api.get(`/repos/${params.repository}/issues`)
    .then(response => {
      setIssues(response.data)
    })
  }, [params.repository])


  return(
    <>
      <Header>
        <img src={logo} alt="explorer icon"></img>
        <Link to="/">
          <FiChevronLeft size={16}></FiChevronLeft>
          Voltar
        </Link>
      </Header>

      {repository &&
        <RepositoryInfo>
        <header>
          <img src={repository.owner.avatar_url}></img>
          <div>
            <strong>{repository.full_name}</strong>
            <p>{repository?.description}</p>
          </div>
        </header>

        <ul>
          <li>
            <strong>{repository.stargazers_count}</strong>
            <span>Stars</span>
          </li>

          <li>
            <strong>{repository.forks_count}</strong>
            <span>forks</span>
          </li>

          <li>
            <strong>{repository.open_issues_count}</strong>
            <span>issues</span>
          </li>

        </ul>
      </RepositoryInfo>
    }
    <Issues>
      {issues.map(issue => (
        <a key={issue.id} href={issue.html_url}>
          <div>
            <strong>{issue.title}</strong>
            <p>{issue.user.login}</p>
          </div>
        </a>
      ))}
    </Issues>
    </>
  )
}

export default Repository
