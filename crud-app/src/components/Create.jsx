import React, { useState } from "react";
// import { useDispatch } from "react-redux";
// import { addUser } from "../UserReducer";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import axios from "axios";
import AddIcon from '@mui/icons-material/Add';


const Create = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [contact, setContact] = useState("");
  const [city, setCity] = useState("");
  const state = { name: name, email: email, contact: contact, city: city }

  // const dispatch = useDispatch
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    // dispatch(addUser({ id, name, email, number }));

    try {
      const response = await axios.post("http://localhost:5000/create", state)
      navigate('/user')
      toast.success("User Created Successfully")
    } catch (error) {
      toast.error(error.message)
    }
    // .then(
    //   (res)=>{
    //     navigate("/user");
    //   toast.success("User Created Successfully")
    //   console.log(res)
    //   }
    // ).catch((error)=>{
    //   toast.error(error.message)
    // })
  };

  return (
    <div className="container " style={{ marginTop: "30px" }}>
      <div style={{ textAlign: 'center', paddingBottom: '20px' }}>
        <h2>Create a New User</h2>
      </div>
      <form class="row g-3" onSubmit={handleSubmit}>
        <div class="col-md-6">
          <label for="inputname4" class="form-label">
            Name
          </label>
          <input
            type="text"
            class="form-control"
            id="inputname4"
            placeholder="Enter Name:"
            onChange={(e) => setName(e.target.value)}
            required
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
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div class="col-md-6">
          <label for="inputnumber4" class="form-label">
            Phone Number
          </label>
          <input
            type="number"
            class="form-control"
            id="inputnumber4"
            placeholder="Enter Phone Number:"
            onChange={(e) => setContact(e.target.value)}
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
            onChange={(e) => setCity(e.target.value)}
            required
          />
        </div>

        <div class="col-12">
          <button type="submit" class="btn btn-primary">
            <AddIcon style={{ fontSize: 22, marginRight: '3px' }} />
            Create User
          </button>
        </div>
      </form>
    </div>
  );
};

export default Create;
