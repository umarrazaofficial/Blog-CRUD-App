import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import AddIcon from '@mui/icons-material/Add';


const Accounts = () => {
  const handleDelete = (id) => {
    axios.delete(`http://localhost:5000/deleteaccount/${id}`);
    toast.success("Account Deleted Successfully")
  };
  const [users, setUsers] = useState([])
  useEffect(() => {
    axios.get('http://localhost:5000/accounts')
      .then(response => {
        // console.log(response.data);
        setUsers(response.data);
      })
      .catch(error => {
        console.error('Error fetching data: ', error);
      });
  }, [])

  const handleSearch = (e) => {
    let key = e;
    axios.get(`http://localhost:5000/searchaccount/${key}`)
      .then(response => {
        // console.log(response.data);
        setUsers(response.data);
      })
      .catch(error => {
        console.error('Error fetching data: ', error);
      });
  }

  return (
    <div className="container " style={{ marginTop: "20px", marginBottom: '40px' }}>
      <div
        className="container "
        style={{ display: "flex", justifyContent: "space-between" }}
      >
        <Link to="/signup" className="btn btn-success my-3" style={{ display: 'flex', alignItems: 'center' }}>
          <AddIcon style={{ fontSize: 22, marginRight: '3px' }} />
          Create Account
        </Link>
        <input
          class="form-control my-3"
          type="search"
          placeholder="Search"
          aria-label="Search"
          style={{ width: "30%" }}
          onChange={(e) => handleSearch(e.target.value)}
        />
      </div>
      <table className="table">
        <thead>
          <tr>
            <td>Name:</td>
            <td>Email:</td>
            <td>Password:</td>
            <td>Action:</td>
          </tr>
        </thead>

        <tbody>
          {/* .filter((item) => {
              return (
                (search.toLowerCase() === ""
                  ? item
                  : item.name.toLowerCase().includes(search)) ||
                (search.toLowerCase() === ""
                  ? item
                  : item.number.includes(search)) ||
                (search.toLowerCase() === ""
                  ? item
                  : item.email.toLowerCase().includes(search))
              );
            }) */}
          {users?.map((user, index) => (
            <tr key={index}>
              <td>{user?.name}</td>
              <td>{user?.email}</td>
              <td>{user?.password}</td>
              <td>
                <Link to={
                  `/editaccount/${user.email}`
                }
                  className="btn btn-sm btn-primary">
                  Edit
                </Link>
                <Link
                  onClick={() => handleDelete(user._id)}
                  className="btn btn-sm btn-danger ms-2"
                >
                  Delete
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Accounts;
