import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Postblog = () => {
  const [author, setAuthor] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const state = { author_details: author, title: title, content: content }

  const auth = localStorage.getItem('user');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const authObject = JSON.parse(auth);
        const email = authObject.email;
        const response = await axios.get(`http://localhost:5000/findaccount/${email}`);
        setAuthor(response.data[0]._id);
      } catch (error) {
        console.error('Error fetching data: ', error);
      }
    };

    fetchData();
  }, []);

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post("http://localhost:5000/postblog", state)
      navigate('/blogs')
      toast.success("Blog Added Successfully")
    } catch (error) {
      toast.error(error.message)
    }
  };
  return (
    <div className="container " style={{ marginTop: "30px" }}>
      <div style={{ textAlign: 'center', paddingBottom: '20px' }}>
        <h2>Post a New Blog</h2>
      </div>
      <form class="row g-3" onSubmit={handleSubmit}>
        <div class="col-md-12">
          <label for="inputtitle4" class="form-label">
            Title
          </label>
          <input
            type="text"
            class="form-control"
            id="inputtitle4"
            placeholder="Enter Title:"
            onChange={(e) => setTitle(e.target.value)}
            required
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
            style={{ height: '100px' }}
            onChange={(e) => setContent(e.target.value)}
            required />

        </div>

        <div class="col-12">
          <button type="submit" class="btn btn-primary">
            Post Blog
          </button>
        </div>
      </form>
    </div>
  )
}

export default Postblog