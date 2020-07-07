import React, {useState, FormEvent} from 'react'
import {Title, Form, RepositoryList} from './styles'
import Logo from '../../assets/logo.svg'
import {FiChevronRight} from 'react-icons/fi'
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

  const [repositories, setRepositories] = useState<Array<Repository>>([])

  const [newRepo, setNewRepo] = useState('')

  async function handleAddRepository(event: FormEvent<HTMLFormElement> ): Promise<void>{
    event.preventDefault()
    console.log(newRepo)
    const response = await api.get(`/repos/${newRepo}`)
    const newRepository = response.data
    setRepositories([...repositories, newRepository])


  }

  return(
    <>
      <img src={Logo} alt='GitHub Explorer logo'></img>
      <Title>Explore Github Repositories</Title>

      <Form onSubmit={handleAddRepository}>
        <input
        placeholder='Type the repository name'
        onChange={e => setNewRepo(e.target.value)}
        ></input>
        <button type="submit">Search</button>
      </Form>

      <RepositoryList>
        <a href='teste'>
          <img
            src='https://pbs.twimg.com/media/EcQTWiNXgAYSLVt?format=jpg&name=900x900'
            alt='cat'>
          </img>
          <div>
            <strong>Cat</strong>
            <p>Cat image</p>
          </div>

        </a>

        {
          repositories.map(repository => (
            <a
            key={repository.full_name}
            href='teste'>
                <img alt={repository.owner.login} src={repository.owner.avatar_url}></img>
                <div>
                  <strong>{repository.full_name}</strong>
                  <p>{repository.description}</p>
                </div>
                <FiChevronRight size={20}></FiChevronRight>
            </a>
          ))

        }
      </RepositoryList>
    </>
  )
}

export default Dashboard
