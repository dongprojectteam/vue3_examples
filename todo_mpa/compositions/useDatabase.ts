import { useDomain } from '@compositions/useDomain'
import { TodoItem, alphanumeric } from '@/todo/types/TodoItem'
import { LoopType } from '@/todo/types/Loop'
import axios, { AxiosRequestConfig } from 'axios'

export const useDatabase = () => {
  const { getURL } = useDomain()
  const url = getURL()
  const appUrl = `${url.value}/api/todo`

  const loadDBTodos = async (initTodos: (initial_todos: TodoItem[]) => void, userid: alphanumeric) => {
    console.log("TODO Application: Load data from cloud")
    let temp_todos: TodoItem[] = []

    const request: AxiosRequestConfig = {
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
  const saveDBTodos = async (todos: TodoItem[], callback: (status: boolean, data: TodoItem[]) => void) => {
    const request: AxiosRequestConfig = {
      url: appUrl,
      method: 'post',
      headers: {
        'Content-type': 'application/json',
      },
      data: JSON.stringify(todos),
    }
    const response = await axios(request)
    callback(response.status == 200, response.data)
  }

  const updateDBTodo = async (todo: TodoItem, callback: (status: boolean) => void) => {
    const request: AxiosRequestConfig = {
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

  const removeDBTodo = async (_id: alphanumeric, callback: (status: boolean) => void) => {
    const request: AxiosRequestConfig = {
      url: appUrl + '/' + _id,
      method: 'delete',
      headers: {
        'Content-type': 'application/json',
      },
    }
    const response = await axios(request)
    callback(response.status == 200)
  }

  const removeDBSeries = async (loop_id: number, callback: (status: boolean) => void) => {
    const request: AxiosRequestConfig = {
      url: appUrl + '/loop/' + loop_id,
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
    updateDBTodo,
    removeDBTodo,
    removeDBSeries
  }
}
