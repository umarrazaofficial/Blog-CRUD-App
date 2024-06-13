import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';

const Editaccount = () => {
  const { Email } = useParams();
  const [defaultname, setDefaultname] = useState('');
  const [defaultpassword, setDefaultpassword] = useState('');
  const [id, setId] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/findaccount/${Email}`);
        setDefaultname(response.data[0]?.name);
        setDefaultpassword(response.data[0]?.password);
        setId(response?.data[0]._id);
      } catch (error) {
        console.error('Error fetching data: ', error);
      }
    };

    fetchData();
  }, []);

  const navigate = useNavigate();
  const state = { name: defaultname, password: defaultpassword }
  const handleEdit = (event) => {
    event.preventDefault();
    axios.put(`http://localhost:5000/updateaccount/${id}`, state)
    navigate("/accounts");
  };
  return (
    <div className="container " style={{ marginTop: "100px" }}>
      <form class="row g-3" onSubmit={handleEdit}>
        <div class="col-md-8">
          <label for="inputname4" class="form-label">
            Name
          </label>
          <input
            type="text"
            class="form-control"
            id="inputname4"
            placeholder="Enter Name:"
            onChange={(e) => setDefaultname(e.target.value)}
            value={defaultname}
          />
        </div>
        <div class="col-md-8">
          <label for="inputpassword4" class="form-label">
            Password
          </label>
          <input
            type="text"
            class="form-control"
            id="inputpassword4"
            placeholder="Enter Password:"
            onChange={(e) => setDefaultpassword(e.target.value)}
            value={defaultpassword}
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

export default Editaccount