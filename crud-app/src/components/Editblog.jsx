import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';

const Editblog = () => {
     const { Id } = useParams();
  const [defaultcontent, setDefaultcontent]= useState('');
  const [defaulttitle, setDefaulttitle]= useState('');

   useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/singleblog/${Id}`);
        setDefaultcontent(response.data?.content);
        setDefaulttitle(response.data?.title);
      } catch (error) {
        console.error('Error fetching data: ', error);
      }
    };

    fetchData();
  }, []);
  
  // console.log(defaultname)
  // const users = useSelector((state) => state.users);
  // const existingUsers = users.filter((f) => f.id == Id);
  // const { email, id, name, number } = existingUsers[0];
  

  const navigate = useNavigate();
  const state = {content: defaultcontent, title: defaulttitle};
  const handleEdit = (event) => {
    event.preventDefault();
    axios.put(`http://localhost:5000/updateblog/${Id}`,state)
    navigate("/myblog"); 
  };
  return (
    <div className="container " style={{ marginTop: "30px"}}>
      <div style={{textAlign: 'center',paddingBottom: '20px'}}>
    <h2>Edit Blog</h2>
    </div>
      <form class="row g-3" onSubmit={handleEdit}>
        <div class="col-md-12">
          <label for="inputtitle4" class="form-label">
            Title
          </label>
          <input
            type="text"
            class="form-control"
            id="inputtitle4"
            placeholder="Enter Title:"
            onChange={(e) => setDefaulttitle(e.target.value)}
            required
            value={defaulttitle}
          />
        </div>
        <div class="col-md-12">
          <label for="inputcontent4" class="form-label">
            Content
          </label>
          <textarea 
          class="form-control"
          placeholder="Enter Content:" 
          id="inputcontent4" 
          style={{height: '100px'}}
          onChange={(e) => setDefaultcontent(e.target.value)}
          value={defaultcontent}
          />
         
        </div>
        
        <div class="col-12">
          <button type="submit" class="btn btn-primary">
            Save Changes
          </button>
        </div>
      </form>
    </div>
  )
}

export default Editblog