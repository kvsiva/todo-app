import axios from "axios";
const baseURL = "http://localhost:9195/";
const makeGetCall = (api) => {
    return axios({
        url: api,
        method: "GET",
        headers: {
            "content-type": "application/json"
        },
    });
};
const makePostCall = (api, postData) => {
    return axios({
        url: api,
        method: "POST",
        headers: {
            "content-type": "application/json"
        },
        data: postData
    });
};
const makePutCall = (api, postData) => {
    return axios({
        url: api,
        method: "PUT",
        headers: {
            "content-type": "application/json"
        },
        data: postData
    });
};
const makeDeleteCall = (api) => {
    return axios({
        url: api,
        method: "DELETE",
        headers: {
            "content-type": "application/json"
        },
    });
};
export const getPlanedTasksApi = () => {
    let plannedTasks = baseURL + "/todos/getPlannedTasks";
   return makeGetCall(plannedTasks);
}
export const getInProgressApi = () => {
    let Api = baseURL + "/todos/getInProgressTasks";
    return makeGetCall(Api);
}
export const getDoneApi = () => {
    let Api = baseURL + "/todos/getDoneTasks";
    return makeGetCall(Api);
}
export const addTask = (task) => {
    let addTask = baseURL + "/todos/createTask";
   return makePostCall( addTask, task);
}
export const movePlanToProgress = (task) => {
    let mToProgress = baseURL + "/todos/movePlannedToInProgress";
    return makePostCall(mToProgress,task );
}
export const moveInprogressToDoneApi = (task) => {
    let Api = baseURL + "todos/moveInProgressToDone";
    return makePostCall(Api, task);
}
export const deletePlannedTaskApi = (task) => {
    let Api = baseURL + `todos/deleteTaskPlanned/${task.id}`;
    return makeDeleteCall(Api)
}
export const deleteProgressTaskApi = (task) => {
    let Api = baseURL + `todos/deleteTaskProgress/${task.id}`;
    return makeDeleteCall(Api)
}
// edit
export const editPlannedTask = (task) => {
    let Api = baseURL + `todos/updatePlannedTask/${task.id}`;
    return makePutCall(Api,task)
}

// edit
export const editInprogressApi = (task) => {
    let Api = baseURL + `todos/updateInProgressTask/${task.id}`;
    return makePutCall(Api,task)
}
