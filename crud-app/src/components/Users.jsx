import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
// import { deleteUser } from "../UserReducer";
import { toast } from 'react-toastify';
import axios from "axios";
import AddIcon from '@mui/icons-material/Add';

const Home = () => {

  // const users = useSelector((state) => state.users);
  // const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:5000/delete/${id}`);
      navigate('/user')
      toast.success("User Deleted Successfully")
    } catch (error) {
      toast.error(error.message)
    }


    // dispatch(deleteUser({ _id: id }));
  };
  const [users, setUsers] = useState([])
  useEffect(() => {
    axios.get('http://localhost:5000/users')
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
    axios.get(`http://localhost:5000/find/${key}`)
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
        <Link to="/create" className="btn btn-success my-3" style={{ display: 'flex', alignItems: 'center' }}>
          <AddIcon style={{ fontSize: 22, marginRight: '3px' }} />
          Create User
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
            <td>Contact:</td>
            <td>City:</td>
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
              <td>{user?.contact}</td>
              <td>{user?.city}</td>
              <td>
                <Link to={{
                  pathname: `/edit/${user._id}`,
                  state: {
                    name: `${user?.name}`,
                    email: `${user?.email}`,
                    contact: `${user?.contact}`,
                    city: `${user?.city}`
                  },
                }}
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

export default Home;
