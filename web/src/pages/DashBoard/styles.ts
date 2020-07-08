import styled, {css} from 'styled-components'
import {shade} from 'polished'

interface FormProps{
  hasError: boolean;
}

export const Title = styled.h1`
  font-size: 48px;
  color: #3a3a3a;
  margin-top: 80px;
  max-width: 40%;
  line-height: 56px;
`
export const Form = styled.form<FormProps>`
  margin-top: 70px;
  max-width: 700px;
  display: flex;

  input {
    flex: 1;
    height: 70px;
    padding: 0 24px;
    border: 0;
    border-radius: 5 0 0 5;
    color: #3a3a3a;
    border : 2px solid white;

    ${(props) => props.hasError && css`
      border-color: #c53030;
      border-right: 0;` }


    &::placeholder{
      color: #a8a8b3

    }
  }

  button{
    height: 70px;
    background: #04D361;
    border-radius: 0px 5px 5px 0px;
    width: 210px;
    border: 0;
    color: #FFF;
    font-weight: bold;
    transition: background-color 0.2s;

    &:hover {
      background: ${shade(0.2, '#04D361' )}
    }
  }
`

export const RepositoryList = styled.div`
  margin-top: 60px;
  max-width: 700px;
  transition: all 0.2s;



  a + a {
    margin-top: 10px;
  }

  a{

    &:hover{
    transform: translateX(10px)
  }

    background: #fff;
    border-radius: 5px;
    width: 100%;
    padding: 24px;
    display: block;
    text-decoration: none;
    display: flex;
    align-items: center;
    transition: all 0.2s;
  }
  img{
    width: 64px;
    height: 64px;
    border-radius: 50%;
  }
  div {
    margin-left: 16px;
    flex: 1;

    strong{
      font-size: 20px;
      color: #3d3d4d;
    }

    p{
      font-size: 18px;
      color: #A8A8B3;
      margin-top: 4px;
    }
  }
  svg{
      margin-left: auto;
      color: #cbcbd6;
    }
`

export const Error = styled.span`
  display: block;
  color: #c53030;
  margin-top: 8px;
`
export const DeleteBlock = styled.div`
  width: 50px;
  border-radius: 5px;

`


