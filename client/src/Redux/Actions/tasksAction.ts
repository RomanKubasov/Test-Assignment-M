import { ListOfTasks, Task } from '../../Types/data'
import { GET_TASKS, CREATE_TASK, DELETE_TASK, UPDATE_TASK } from '../Types/types'
import { fetchTasks } from './Middlewares/tasksMiddlewares'

export const getTasks: any = (payload: ListOfTasks) => ({
  type: GET_TASKS,
  payload
})

export const createTask: any = (payload: Task) => ({
  type: CREATE_TASK,
  payload
})

export const deleteTask: any = (payload: number) => ({
  type: DELETE_TASK,
  payload
})

export const updateTask: any = (payload: number) => ({
  type: UPDATE_TASK,
  payload
})

export const getTasksFromServer: any = () => async (dispatch: any) => {
  const data = []
  let url: string = process.env.REACT_APP_URL as string
  url = `${url}tasks/`
  while (url !== null) {
    const { next, results } = await fetchTasks(url)
    data.push(...results)
    url = next
  }
  dispatch(getTasks(data))
}

export const createTaskOnServer: any = (newTask: any) => async (dispatch: any) => {
  let url: string = process.env.REACT_APP_URL as string
  url = `${url}tasks/`
  const token: string = process.env.REACT_APP_TOKEN as string
  const response = await fetch(`${url}`, {
    method: 'post',
    headers: {
      Authorization: `Token ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(newTask)
  })
  const res = await response.json()
  dispatch(createTask(res))
}

export const deleteTaskOnServer: any = (id: number) => async (dispatch: any) => {
  let url: string = process.env.REACT_APP_URL as string
  url = `${url}tasks/${id}/`
  const token: string = process.env.REACT_APP_TOKEN as string
  const response = await fetch(`${url}`, {
    method: 'delete',
    headers: {
      Authorization: `Token ${token}`
    }
  })
  const res = await response
  if (res.status === 204) {
    dispatch(deleteTask(id))
  }
}

export const updateTaskOnServer: any = (newTask: Task) => async (dispatch: any) => {
  let url: string = process.env.REACT_APP_URL as string
  const { id } = newTask
  url = `${url}tasks/${id}/`
  const token: string = process.env.REACT_APP_TOKEN as string
  const response = await fetch(`${url}`, {
    method: 'put',
    headers: {
      Authorization: `Token ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(newTask)
  })
  const res = await response.json()
  dispatch(updateTask(res))
}
