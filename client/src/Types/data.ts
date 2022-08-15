export interface Task {
  id: number
  parent: number
  name: string
  state: number
  version: number
  description?: string
  due_date?: string
}

export interface ListOfTasks {
  tasks: Task[]
}
