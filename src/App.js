import './App.css';
import axios from 'axios';
import { useEffect, useState } from 'react';
import UserProfile from './Component/UserProfile/UserCard';


function App() {

  const [users, setUsers] = useState([])
   const [loading, setLoading] = useState(true);

useEffect(() => {
    axios.get("https://jsonplaceholder.typicode.com/users")
      .then((response) => {
        setUsers(response.data)
        setLoading(false)
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
      });
  }, []);

  const handleEdit = (id, updatedData) => {
  setUsers(users.map((u) => (u.id === id ? { ...u, ...updatedData } : u)));
};
  

const handleDelete = (id) => {
    setUsers(users.filter((user) => user.id !== id));
  };


    if (loading) {
    return (
      <div className="loader">
        <div className="spinner"></div>
       <div id="loader" class="loader"></div>
      </div>
    );
  }

  return (
    <div className="App">
      <h1 className='head ml-100'>Userprofile
</h1>
    <ul className='user-list'>
     {users.map(user => (
     <UserProfile user={user} onDelete={handleDelete} onEdit={handleEdit}/>  
     ))}
     </ul>
    </div>
  );
}

export default App;
