import { useState, useEffect } from 'react';
import './App.css';

function App() {

  // const dbTask = [
  //   {
  //     label: "",
  //     done: false
  //   }
  // ]
  const [task, setTasks] = useState([])

  useEffect(() => {
    const getTask = () => {
      fetch("https://assets.breatheco.de/apis/fake/todos/user/mxespin", {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        }
      })
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
    
  const handleChange = (e) => {
    const {value, name} = e.target;
    setTasks({...task, [name] : value})
  }
  return (
    <div className="col-6 container">
      <div className="row bg-light text-center py-3">
        <h1 className="text-center"> ToDos API </h1>
      </div>
      <div className="row my-3">
        <div className="input-group input-group-lg">
          <span className="input-group-text" id="inputGroup-sizing-lg">Tarea</span>
          <input
            type="text"
            className="form-control"
            aria-label="Sizing example input"
            aria-describedby="inputGroup-sizing-lg"
            placeholder="Ingrese su tarea acá"
            value={task.label}
            name="label"
            onChange={handleChange}
          />
        </div>

      </div>
      <div className="row">
        <div className="container">
          <ul className="list-group">
            {/* <li className="list-group-item active" aria-current="true">An active item</li> */}
            {!!task &&
              task.map((item, index) => {
                return (
                    <li className="row list-group-item d-inline-flex align-items-center" key={index}>
                      <div className="col-10" >{item.label} </div>
                      <div className="col-2 btn"><span type="button" className="far fa-trash-alt text-end btn"></span></div>
                    </li>
                )
              })
            }
          </ul>
        </div>
      </div>
    </div>
  );
}

export default App;
