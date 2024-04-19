import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [users, setUsers] = useState([]);
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  useEffect(() => {
    axios.get('http://localhost:3001/users')
      .then(response => setUsers(response.data));
  }, []);

  const handleSubmit = event => {
    event.preventDefault();

    const user = { name, number };

    axios.post('http://localhost:3001/users', user)
      .then(() => {
        setUsers(prevUsers => [...prevUsers, user]);
        setName('');
        setNumber('');
      });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="text" value={name} onChange={e => setName(e.target.value)} placeholder="Name" />
        <input type="number" value={number} onChange={e => setNumber(e.target.value)} placeholder="Number" />
        <button type="submit">Submit</button>
      </form>

      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Number</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={index}>
              <td>{user.name}</td>
              <td>{user.number}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
