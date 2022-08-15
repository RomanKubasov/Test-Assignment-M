import { Reducer } from 'redux'
import { Task } from '../../Types/data'
import { GET_TASKS, CREATE_TASK, DELETE_TASK, UPDATE_TASK } from '../Types/types'

const tasksReducer: Reducer = (state = [], action) => {
  const { type, payload } = action
  switch (type) {
    case GET_TASKS : return payload
    case CREATE_TASK : return [...state, payload]
    case DELETE_TASK : {
      const parentId: number = state.find((el: Task) => (el.id === payload)).parent
      return state.map((el: Task) => (el.parent === payload ? { ...el, parent: parentId } : el)).filter((el: Task) => (el.id !== payload))
    }
    case UPDATE_TASK :
      state = state.map((el: Task) => (el.parent === payload.id ? { ...el, state: payload.state } : el))
      return state.map((el: Task) => (el.id === payload.id ? payload : el))
    default: return state
  }
}

export default tasksReducer
