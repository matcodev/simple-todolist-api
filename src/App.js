import { useState, useEffect } from 'react';
import './App.css';

function App() {

  const [task, setTasks] = useState([])

  useEffect(() => {
    const getTask = () => {
      fetch("https://assets.breatheco.de/apis/fake/todos/user/mxespin")
        .then(resp => resp.json())
        .then(Response => {
          Response.msg ? createUser() : setTasks(Response)
        })
        .catch((error) => {
          console.log(error)
        })
    }
    getTask();

    const createUser = () => {
      fetch('https://assets.breatheco.de/apis/fake/todos/user/mxespin', {
          method: "POST",
          body: JSON.stringify([]),
          headers: {
              "Content-Type": "application/json"
          }
      })
          .then(resp => {
              return resp.json();
          })
          .then(data => {
              setTasks(data);
          })
          .catch(error => {
              console.log(error);
          });
  }
  }, [])

  const addNewTask = () => {
    const addTask = () => {
      fetch('http://assets.breatheco.de/apis/fake/todos/user/mxespin', {
        method: "PUT",
        body: JSON.stringify(task),
        headers: {
          "Content-Type": "application/json"
        }
      })
      .then(resp => resp.json())
      .then(data => console.log(data))
      .catch(error => console.log(error))
    }
    addTask();
  }
  const addTarea = e => {
    const {value} = e.target;
    if (e.key === "Enter" && value !== "" && task !== "") {
      setTasks({...task,
        label: value,
        done: false});
      e.target.value = "";
      }
      console.log('mi task :' + task);
      addNewTask()
    
  }
    
  const deleteTask = (indexArray) => {
    let newTasks = [];
    task.map((item, index) => {
      if(index !== indexArray){
        newTasks.push(item)
      }
      return newTasks;
    })
    setTasks(newTasks)
  }

  function deleteAll() {
    const deleteAllTasks = () => {
      fetch('https://assets.breatheco.de/apis/fake/todos/user/ernestoleonidas', {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json"
        }
      })
        .then(resp => {
          //console.log(resp.text());
          return resp.json();
        })
        .then(data => {
          console.log(data)
          //setTasks([])
        })
        .catch(error => {
          console.log(error);
        });
    }
    deleteAllTasks();
    setTasks([])
  }


  return (
    <div className="col-6 container">
    <div className="row bg-light text-center justify-content-center py-3">
      <h1> ToDos API - fetch</h1>
    </div>
    <div className="row my-3">
      <div className="input-group input-group-lg">
        <span className="input-group-text" id="inputGroup-sizing-lg">Task</span>
        <input
          className="form-control col-12 p-2"
          placeholder="add task"
          onKeyUp={addTarea} />
      </div>
    </div>
    <div className="row">
      <div className="container">
        <ul className="list-group">
          {task === null
            ? "Loading..."
            : task.map((item, index) => {
              return (
                <li className="row list-group-item d-inline-flex align-items-center" id={index} key={index}>
                  <div className="col-10" >{item.label} </div>
                  <div className="col-1 btn">
                    {item.done ?
                      //hay que cambiar el json para actualizar el estado de false a true
                      <span type="button" className="btn btn-success fas fa-check text-end" onClick={() => deleteTask(index)}></span>
                      :
                      <span type="button" className="btn btn-danger fas fa-times text-end" onClick={() => deleteTask(index)}></span>
                    }
                  </div>
                </li>
              )
            }
            )}
        </ul>
      </div>
      <div className="col d-flex justify-content-center">
        <button type="button" className="btn btn-warning mt-2" onClick={deleteAll}>Borrar Todo</button>
      </div>
    </div>
  </div>
  );
}

export default App;
