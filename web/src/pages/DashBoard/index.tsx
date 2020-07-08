import React, {useState, useEffect, FormEvent} from 'react'
import {Title, Form, RepositoryList, Error} from './styles'
import {Link} from 'react-router-dom'
import Logo from '../../assets/logo.svg'
import {FiChevronRight, FiTrash} from 'react-icons/fi'
import api from '../../services/api'


interface Repository{
  'full_name' : string,
  'owner' : {
    'login' : string,
    'avatar_url':string,
  },
  'description' : string

}

const Dashboard : React.FC = () => {

  const [repositories, setRepositories] = useState<Array<Repository>>(()=>{
    const storagedRepos = localStorage.getItem('@gitexplorer:repositories')
    if (storagedRepos){
      return JSON.parse(storagedRepos)
    }
    return []
  })

  const [inputError, setInputError] = useState('')
  const [newRepo, setNewRepo] = useState('')

  async function handleAddRepository(event: FormEvent<HTMLFormElement> ): Promise<void>{
    event.preventDefault()

    if(newRepo.trim() === ''){
      setInputError('Field repository name cannot be empty')
      return
    }

    try{
      const response = await api.get(`/repos/${newRepo}`)
      const newRepository = response.data
      setRepositories([...repositories, newRepository])
      setNewRepo('')
      setInputError('')
    }catch(err){
      setInputError('Repository not found')
    }

  }

  useEffect( ()=> {
    localStorage.setItem('@gitexplorer:repositories', JSON.stringify(repositories))
  }, [repositories] )

  return(
    <>
      <img src={Logo} alt='GitHub Explorer logo'></img>
      <Title>Explore Github Repositories</Title>


        {inputError && <Error> {inputError} </Error>}


      <Form hasError={!!inputError} onSubmit={handleAddRepository}>
        <input
        placeholder='Type the repository name'
        onChange={e => setNewRepo(e.target.value)}
        value={newRepo}
        ></input>
        <button type="submit">Search</button>
      </Form>

      <RepositoryList>
        {
          repositories.map(repository => (
            <>
              <Link
              key={repository.full_name}
              to={`/repository/${repository.full_name}`}>
                  <img alt={repository.owner.login} src={repository.owner.avatar_url}></img>
                  <div>
                    <strong>{repository.full_name}</strong>
                    <p>{repository.description}</p>
                  </div>
                  <FiChevronRight size={20}></FiChevronRight>
              </Link>
            </>
          ))
        }
      </RepositoryList>
    </>
  )
}

export default Dashboard
