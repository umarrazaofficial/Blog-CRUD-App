import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
// import { editUser } from "./UserReducer";
import axios from "axios";

const Edit = () => {
  const { Id } = useParams();
  const [defaultname, setDefaultname]= useState('');
  const [defaultemail, setDefaultemail]= useState('');
  const [defaultcontact, setDefaultcontact]= useState('');
  const [defaultcity, setDefaultcity]= useState('');

   useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/search/${Id}`);
        setDefaultname(response.data?.name);
        setDefaultemail(response.data?.email);
        setDefaultcontact(response.data?.contact);
        setDefaultcity(response.data?.city);
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
  const state = {name: defaultname, email: defaultemail, contact: defaultcontact, city: defaultcity}
  const handleEdit = (event) => {
    event.preventDefault();
    axios.put(`http://localhost:5000/update/${Id}`,state)
    navigate("/user"); 
  };
  return (
    <div className="container " style={{ marginTop: "100px" }}>
      <form class="row g-3" onSubmit={handleEdit}>
        <div class="col-md-6">
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
        <div class="col-md-6">
          <label for="inputemail4" class="form-label">
            Email
          </label>
          <input
            type="email"
            class="form-control"
            id="inputemail4"
            placeholder="Enter Email:"
            onChange={(e) => setDefaultemail(e.target.value)}
            value={defaultemail}
          />
        </div>
        <div class="col-md-6">
          <label for="inputnumber4" class="form-label">
            Phone Number
          </label>
          <input
            type="text"
            class="form-control"
            id="inputnumber4"
            placeholder="Enter Phone Number:"
            onChange={(e) => setDefaultcontact(e.target.value)}
            value={defaultcontact}
          />
        </div>
        <div class="col-md-6">
          <label for="inputcity4" class="form-label">
            City
          </label>
          <input
            type="text"
            class="form-control"
            id="inputcity4"
            placeholder="Enter City:"
            onChange={(e) => setDefaultcity(e.target.value)}
            value={defaultcity}
            required
          />
        </div>

        <div class="col-12">
          <button type="submit" class="btn btn-primary">
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
};

export default Edit;
