import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const Profile = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [id, setId] = useState('');

  const auth = localStorage.getItem('user');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const authObject = JSON.parse(auth);
        const email = authObject.email;
        const response = await axios.get(`http://localhost:5000/findaccount/${email}`);
        setName(response.data[0].name);
        setEmail(response.data[0].email);
        setPassword(response.data[0].password);
        setId(response.data[0]._id);
      } catch (error) {
        console.error('Error fetching data: ', error);
      }
    };
    fetchData();
  }, []);

  const handleDelete = (id) => {
    axios.delete(`http://localhost:5000/deleteaccount/${id}`);
    toast.success("Account Deleted Successfully");
  };
  return (
    <div style={{ display: 'flex' }}>
      <div style={{ width: '50%' }}>
        <img src='https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEg1M3d0Pea0wqTMjzPRDMLpUbB02DBSk62KhiFTp0AXD_zubN7enaRY3i7I9AJj8BNHRmOHK-gc91HWY4NwBdwFaA4XLHr5LL6toomJo6d1egoCLvpg9R6GWNe1ahisTBM1gQlNgLiwyaRrzOKV72WL23s9bXmYP5K4K5fjedwnQp-VByIoqQTK9N6eIA/s2000/jasa%20pembuatan%20website%2024.png' style={{ width: '75%' }} />
      </div>
      <div style={{ width: '50%', display: 'flex', flexDirection: 'column', justifyContent: 'center', rowGap: '20px' }}>
        <h2>Account Setting</h2>
        <div class="col-md-8">
          <label for="inputname4" class="form-label">
            Name
          </label>
          <input
            type="text"
            class="form-control"
            id="inputname4"
            placeholder="Enter Your Name:"
            readOnly
            value={name}
          />
        </div>
        <div class="col-md-8">
          <label for="inputemail4" class="form-label">
            Email
          </label>
          <input
            type="email"
            class="form-control"
            id="inputemail4"
            placeholder="Enter Your Email:"
            readOnly
            value={email}
          />
        </div>
        <div class="col-md-8">
          <label for="inputpassword4" class="form-label">
            Password
          </label>
          <input
            type="password"
            class="form-control"
            id="inputpassword4"
            placeholder="Enter Your Password:"
            readOnly
            value={password}
          />
        </div>


        <div class="col-8">
          <Link to={
            `/editaccount/${email}`
          }
            className="btn btn-primary" >
            <EditIcon style={{ fontSize: 22, paddingRight: '3px' }} />
            Edit Profile
          </Link>
          <Link
            onClick={() => {
              return (
                handleDelete(id),
                localStorage.clear('user')
              )
            }}
            className="btn btn-danger ms-2"
          >
            <DeleteIcon style={{ fontSize: 22, paddingRight: '3px' }} />
            Delete Account
          </Link>

        </div>
      </div>
    </div>
  )
}

export default Profile