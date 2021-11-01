import { useDomain } from '@compositions/useDomain'
import axios from 'axios'

export const useDatabase = () => {
  const { getURL } = useDomain()
  const url = getURL()
  const appUrl = `${url.value}/api/todo`

  const loadDBTodos = async (initTodos, userid) => {
    console.log("TODO Application: Load data from cloud")
    let temp_todos = {}

    let request = {
      url: appUrl + '/' + userid,
      method: 'get',
      headers: {
        'Content-type': 'application/json',
      },
    }

    const response = await axios(request)
    temp_todos = response.data
    initTodos(temp_todos)
  }
  const saveDBTodos = async (todos, callback) => {
    let request = {
      url: appUrl,
      method: 'post',
      headers: {
        'Content-type': 'application/json',
      },
      data: JSON.stringify(todos.value),
    }
    const response = await axios(request)
    callback(response.status == 200, response.data)
  }

  const completeDBTodo = async (todo, callback) => {
    let request = {
      url: appUrl + '/' + todo._id,
      method: 'put',
      headers: {
        'Content-type': 'application/json',
      },
      data: JSON.stringify(todo),
    }
    const response = await axios(request)
    callback(response.status == 200)
  }

  const removeDBTodo = async (_id, callback) => {
    let request = {
      url: appUrl + '/' + _id,
      method: 'delete',
      headers: {
        'Content-type': 'application/json',
      },
    }
    const response = await axios(request)
    callback(response.status == 200)
  }

  return {
    loadDBTodos,
    saveDBTodos,
    completeDBTodo,
    removeDBTodo,
  }
}
