import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Button, Progress } from 'reactstrap'
import { ListOfTasks } from '../../Types/data'
import { deleteTaskOnServer, updateTaskOnServer } from '../../Redux/Actions/tasksAction'
import { useAppDispatch } from '../../Hooks/hooks'

interface TaskProps extends ListOfTasks {
  parent: number | null
}

const Tasks: React.FC<TaskProps> = (prop) => {
  const { tasks, parent } = prop
  const dispatch = useAppDispatch()

  return (
    <>
      {tasks.filter((el) => (el.parent === parent))
        .map((el) => (
          <div className='taskfamily' key={el.id}>
            <div className='task'>
              <div className='taskname'>
                {el.name}
              </div>
              <span>State</span>
              <div className='progressbar'>
                <Progress color="secondary" value={el.state * 50 + 50} />
              </div>
              <div className='buttonpanel'>
                <Button className='button' color={ ((el.state > 0) ? 'warning' : 'success') } size='sm' onClick={() => dispatch(updateTaskOnServer({ ...el, state: el.state * (-1) })) }>
                  { ((el.state > 0) ? 'Decline' : 'Complete') }
                </Button>
                <Button className='button' size='sm' onClick={() => dispatch(deleteTaskOnServer(el.id)) }>
                  Delete
                </Button>
              </div>
            </div>
            <Tasks tasks={tasks} parent={el.id} />
          </div>
        ))}
    </>
  )
}

export default Tasks
