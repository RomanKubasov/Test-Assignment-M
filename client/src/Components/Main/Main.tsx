import React, { useEffect } from 'react'
import { useAppSelector, useAppDispatch } from '../../Hooks/hooks'
import Tasks from '../Tasks/Tasks'
import Form from '../Form/Form'
import { getTasksFromServer } from '../../Redux/Actions/tasksAction'

const Main: React.FC = () => {
  const { tasks } = useAppSelector((state) => state)
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(getTasksFromServer())
  }, [])

  return (
    <>
      <div className='leftcontainer'>
        <Form />
      </div>
      <div className='rightcontainer'>
        <Tasks tasks = { tasks } parent = { null }/>
      </div>
    </>
  )
}

export default Main
