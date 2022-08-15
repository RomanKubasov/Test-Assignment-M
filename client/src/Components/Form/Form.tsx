import React, { useState } from 'react'
import { useAppSelector, useAppDispatch } from '../../Hooks/hooks'
import { Button } from 'reactstrap'
import { createTaskOnServer } from '../../Redux/Actions/tasksAction'
import { Task } from '../../Types/data'

const Form: React.FC = () => {
  const { tasks } = useAppSelector((state) => state)
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [parent, setParent] = useState('null')
  const dispatch = useAppDispatch()

  return (
    <div className = 'form'>
      <span>Create New Task</span>
      <input className = 'input' placeholder='Task title' onChange = {(event) => setName(event.target.value)}></input>
      <input className = 'input' placeholder='Description' onChange = {(event) => setDescription(event.target.value)}></input>
      {(tasks.length > 0) && (
      <select className = 'input' name = "parent" onChange = {(event) => setParent(event.target.value)}>
        <option key={0} value={'null'}>{'no parent'}</option>
        {tasks.map((el: Task) => (<option key={-el.id} value={el.id}>{el.name}</option>))}
      </select>
      )}
      <Button className = 'buttonadd' onClick = {() => dispatch(createTaskOnServer({ name, parent, description, state: -1 }))}>
        Create Task
      </Button>
    </div>
  )
}

export default Form
