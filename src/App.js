import React, { SyntheticEvent } from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import './App.css';

const password = 'System123';
const username = 'system';
const authorization = `${username}:${password}`
const encodeAuthor = btoa(authorization);

// const data={"displayName":"Acute fluid", "id":"CVTDVA209"};
async function get() {
  try {
    const response =  await fetch('https://play.dhis2.org/2.38.1.1/api/dataElements?fields=&filter=displayName:like:Acute',{
      method: 'GET',
      headers:{
        'Authorization': `Basic ${encodeAuthor} `,
        'Content-Type':'application/json'
     }
    // body:JSON.stringify(data)
    }).then(response => response.json());
    return response;
  } catch (e) { }
}

function Dhis2API() {
  const [currentData, setCurrentData] = useState([]);

  useEffect(() => {
    async function fetch(){
      const todosFromServer = await get();
    console.log(todosFromServer);
    setCurrentData(todosFromServer.dataElements);
    console.log(todosFromServer.dataElements);
  }
  fetch()
  },
   );
  
  return (
      <div className="App">
        <header className="App-header">
          <h1>DHIS2 demo API</h1>
          {
            <table>
              <thead>
              <tr>
                <th>Display Name</th>
                <th>Identity</th>
              </tr>
              </thead>
              <tbody>
              <tr>
             <td>{currentData.map(r => <td>{r.displayName}</td>)}</td>
              <td>{currentData.map(r => <td>{r.id}</td>)}</td>
              </tr>
              </tbody>
            </table>
          }
            
      </header>
      </div>
  )
}

export default Dhis2API;
export { Dhis2API };
