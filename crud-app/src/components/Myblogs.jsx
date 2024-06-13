import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const Myblogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState('');

  const auth = localStorage.getItem('user');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (auth) {
          const authObject = JSON.parse(auth);
          const email = authObject.email;
          const response = await axios.get(`http://localhost:5000/findaccount/${email}`);
          setUser(response.data[0]._id);
        }
      } catch (error) {
        console.error('Error fetching user data: ', error.message, error.response);
      }
    };

    fetchData();
  }, [auth]);


  useEffect(() => {
    if (user) { // Check if user is not an empty string or undefined
      axios.get(`http://localhost:5000/blog/${user}`)
        .then(response => {
          setBlogs(response.data);
        })
        .catch(error => {
          console.error('Error fetching blog data: ', error);
        });
    }
  }, [user]);

  const handleDelete = (id) => {
    axios.delete(`http://localhost:5000/deleteblog/${id}`);
    toast.success("Blog Deleted Successfully");
    navigate("/blogs");
  };
  return (
    <>
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-evenly', paddingTop: '50px', paddingBottom: '50px', gap: '30px' }}>
        {blogs?.map((blog, index) => (
          <div class="card" style={{ width: "25rem", boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)" }} key={index}>
            <div class="card-body">
              <h5 class="card-title">{blog?.title}</h5>
              <p class="card-text">{blog?.content}</p>
              <div style={{ display: 'flex', gap: '10px' }}>
                <Link to={
                  `/editblog/${blog._id}`
                }
                  className="btn btn-primary" style={{ display: 'flex', alignItems: 'center' }}>
                  <EditIcon style={{ fontSize: 22, paddingRight: '3px' }} />
                  Edit Blog
                </Link>
                <div class="btn btn-danger" style={{ display: 'flex', alignItems: 'center' }} onClick={() => handleDelete(blog._id)}>
                  <DeleteIcon style={{ fontSize: 22, paddingRight: '3px' }} />

                  Delete Blog
                </div>
              </div>
            </div>
          </div>

        )
        )}
      </div>

    </>
  )
}

export default Myblogs