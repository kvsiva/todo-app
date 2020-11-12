import React, { useEffect, useState } from "react";
import "../css/todo.css";
import edit from "../icons/edit.svg";
import trash from "../icons/trash.svg";
import arrow from "../icons/rightArrow.svg";
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { addTask, getPlanedTasksApi, movePlanToProgress, getInProgressApi, getDoneApi, moveInprogressToDoneApi, deletePlannedTaskApi, deleteProgressTaskApi, editPlannedTask } from "../../util/api";


const TodoApp = () => {

    const PlannedTasks = [
        { id: 1, taskName: 'Task1-created', priority: 'Low' },
        { id: 2, taskName: 'Task2-created', priority: 'Low' },
        { id: 3, taskName: 'Task3-created', priority: 'Low' },
        { id: 4, taskName: 'Task4-created', priority: 'Low' },
        { id: 5, taskName: 'Task5-created', priority: 'Low' },
    ]

    const [open, setOpen] = useState(false);
    const [editDialogOpen, setEditDialogOpen] = useState(false);
    const [task, setTask] = useState({
        taskName: '',
        priority: ''
    });
    const [editTask, setEditTask] = useState({
        taskName: '',
        priority: '',
        id: ''        
    });
    const [inProgressArray, setInProgressArray] = useState([]);
    const [plannedTasksArray, setPlannedTasksArray] = useState([]);
    const [doneTasksArray, setDoneTasksArray] = useState([]);

    const handleChangeName = (event) => {
        setTask({
            ...task,
            taskName: event.target.value
        })
    }

    const handleChangePriority = (event) => {
        setTask({
            ...task,
            priority: event.target.value
        })
    }

    const handleEditChangeName = (event) => {
        setEditTask({
            ...editTask,
            taskName: event.target.value
        })
    }
    const handleEditChangePriority = (event) => {
        setEditTask({
            ...editTask,
            priority: event.target.value
        })
    }

    useEffect(() => {

        getPlanedTasksApi().then(res => {
            if (res.status === 200 && res.data) {
                // plannedTasksArray.push(res.data); 
                setPlannedTasksArray(res.data);
            }
        })
        getInProgressApi().then(res => {
            if (res.status === 200 && res.data) {
                // inProgressArray.push(res.data);
                setInProgressArray(res.data);
            }
        })
        getDoneApi().then(res => {
            if (res.status === 200 && res.data) {
                // doneTasksArray.push(res.data);     
                setDoneTasksArray(res.data);
            }
        })

    }, [])


    // const getInProgress = () => {
    //     getInProgressApi().then(res => {
    //         if (res.status === 200 && res.data) {
    //             inProgressArray.push(res.data);
    //         }
    //     })
    // }


    const handleAddTask = () => {
        console.log(task);
        // PlannedTasks.push(task)
        addTask(task).then(res => {
            if (res.status === 201) {
                getPlanedTasksApi().then(res => {
                    if (res.status === 200 && res.data) {
                        setPlannedTasksArray([]);
                        setPlannedTasksArray(res.data);
                    }
                })
            }
        })
        handleClose();
    }


    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleEditClickOpen = () => {
        setEditDialogOpen(true);
    }

    const handleEditClickClose = () => {
        setEditDialogOpen(false);
    }



    // move Planned to In Progress
    const handleMoveToProgress = (task) => {
        movePlanToProgress(task).then(res => {
            if (res.status === 200) {
                getPlanedTasksApi().then(res => {
                    if (res.status === 200 && res.data) {
                        setPlannedTasksArray([]);
                        setPlannedTasksArray(res.data);
                    }
                })
                getInProgressApi().then(res => {
                    if (res.status === 200 && res.data) {
                        setInProgressArray([]);
                        setInProgressArray(res.data);
                    }
                })

            }
        })

    }

    // move In Progress to done
    const handleMoveToDone = (task) => {
        moveInprogressToDoneApi(task).then(res => {
            if (res.status === 200) {
                getInProgressApi().then(res => {
                    if (res.status === 200 && res.data) {
                        setInProgressArray([]);
                        setInProgressArray(res.data);
                    }
                })
                getDoneApi().then(res => {
                    if (res.status === 200 && res.data) {
                        setDoneTasksArray([]);
                        setDoneTasksArray(res.data);
                    }
                })
            }
        })
    }

    // Delete
    const handlePlannedTaskDelete = (task) => {
        deletePlannedTaskApi(task).then(res => {
            if (res.status === 200) {
                getPlanedTasksApi().then(res => {
                    if (res.status === 200 && res.data) {
                        // plannedTasksArray.push(res.data); 
                        setPlannedTasksArray(res.data);
                    }
                })
            }
        })
    }

    // Delete
    const handleInprogressDelete = (task) => {
        deleteProgressTaskApi(task).then(res => {
            if (res.status === 200) {
                getInProgressApi().then(res => {
                    if (res.status === 200 && res.data) {
                        setInProgressArray(res.data);
                    }
                })
            }
        })
    }


    // edit 
    const handlePlannedEdit = (editData) => {

        setEditTask({
            taskName: editData.taskName,
            priority: editData.priority,
            id: editData.id
        })
        handleEditClickOpen();
    }

    const handleEditTask = () => {
        var data = {
            taskName: editTask.taskName,
            Priority: editTask.priority,
            id: editTask.id
        }
        handleEditClickClose();
        editPlannedTask(data).then(res => {
            if (res.status === 200) {
                setEditTask({
                    taskName: '',
                    priority: '',
                    id: ''
                })
                getPlanedTasksApi().then(res => {
                    if (res.status === 200 && res.data) {
                        setPlannedTasksArray([]);
                        setPlannedTasksArray(res.data);

                    }
                })
            }
        })

    }

  const  handleInprogressEdit = (editData) =>{
        setEditTask({
            taskName: editData.taskName,
            priority: editData.priority,
            id: editData.id
        })
        handleEditClickOpen();
    }




    const renderPlannedTasks = () => {
        return (
            <>
                { plannedTasksArray.map((task, id) => (
                    <div key={id} className="item">
                        <h6 key={id} className= {task.priority} > {task.id}. {task.taskName} {task.priority} </h6>
                        <img alt="edit" src={edit} height={24} width={24} onClick={() => handlePlannedEdit(task)} />
                        <img alt="delete" src={trash} height={24} width={24} onClick={() => handlePlannedTaskDelete(task)} />
                        <img alt="move" src={arrow} height={24} width={24} onClick={() => handleMoveToProgress(task)} />
                    </div>
                ))}
            </>
        )
    }

    const renderInProgressTasks = () => {
        return (
            <>
                { inProgressArray.map((task, id) => (
                    <div key={id} className="item">
                        <h6 key={id} className= {task.priority} > {task.id}. {task.taskName} {task.priority} </h6>
                        <img alt="edit" src={edit} height={24} width={24} onClick={() => handleInprogressEdit(task) } />
                        <img alt="delete" src={trash} height={24} width={24} onClick={() => handleInprogressDelete(task)} />
                        <img alt="move" src={arrow} height={24} width={24} onClick={() => handleMoveToDone(task)} />

                    </div>
                ))}
            </>
        )
    }

    const renderDoneTasks = () => {
        return (
            <>
                { doneTasksArray.map((task, id) => (
                    <div key={id} className="item strikeoff">
                        <h6 key={id} className= {task.priority} > {task.id}. {task.taskName} {task.priority} </h6>
                        {/* <img alt="edit" src={edit} height={24} width={24} />
                        <img alt="delete" src={trash} height={24} width={24} />
                        <img alt="move" src={arrow} height={24} width={24} /> */}

                    </div>
                ))}
            </>
        )
    }

    const dialog = () => {

        return (
            <>
                <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                    <DialogTitle id="form-dialog-title">Enter Task Details</DialogTitle>
                    <DialogContent>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="task-name"
                            label="Task Name"                           
                            onChange={handleChangeName}
                            type="text"
                            fullWidth
                        />
                        <TextField
                            margin="dense"
                            id="task-priority"
                            label="Task Priority"                           
                            onChange={handleChangePriority}
                            type="text"
                            fullWidth
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose} color="primary">
                            Cancel
                         </Button>
                        <Button onClick={handleAddTask} color="primary">
                            Add Task
                        </Button>
                    </DialogActions>
                </Dialog>
            </>
        )
    }

    const editDialog = () => {

        return (
            <>
                <Dialog open={editDialogOpen} onClose={handleEditClickClose} aria-labelledby="form-dialog-title">
                    <DialogTitle id="form-dialog-title">Edit Task Details</DialogTitle>
                    <DialogContent>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="task-name"
                            label="Task Name"
                            value={editTask.taskName}
                            onChange={handleEditChangeName}
                            type="text"
                            fullWidth
                        />
                        <TextField
                            margin="dense"
                            id="task-priority"
                            label="Task Priority"
                            value={editTask.priority}
                            onChange={handleEditChangePriority}
                            type="text"
                            fullWidth
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleEditClickClose} color="primary">
                            Cancel
                         </Button>
                        <Button onClick={handleEditTask} color="primary">
                            Edit Task
                        </Button>
                    </DialogActions>
                </Dialog>
            </>
        )
    }

    return (
        <>
            <div className="container-fluid home ">
                <h3 className="text-center header pt-5">Task Management</h3>
                <div className="container">
                    <div className="row pt-5">
                        <div className="col-sm-12 col-md-4 col-lg-4">
                            <div className="box planned">
                                <h5 className=" title my-2">Planned Tasks</h5>
                                {plannedTasksArray.length !== 0 ? renderPlannedTasks() : null}

                            </div>
                        </div>
                        <div className="col-sm-12 col-md-4 col-lg-4">
                            <div className="box progress">
                                <h5 className=" title my-2">In Progress Tasks</h5>
                                {inProgressArray.length !== 0 ? renderInProgressTasks() : null}

                            </div>
                        </div>
                        <div className="col-sm-12 col-md-4 col-lg-4">
                            <div className="box done">
                                <h5 className=" title my-2">Done Tasks</h5>
                                {doneTasksArray.length !== 0 ? renderDoneTasks() : null}
                            </div>
                        </div>
                    </div>

                </div>
                <div className="text-center pb-5">
                    <Button variant="contained" className="add" onClick={handleClickOpen}>
                        Add Task
                 </Button>
                </div>

                {dialog()}
                {editDialog()}
            </div>

        </>
    )
}

export default TodoApp;