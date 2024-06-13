import axios from 'axios';
import React, { useEffect, useState } from 'react'

const Blogs = () => {
  const [blogs, setBlogs] = useState([])
  useEffect(() => {
    axios.get('http://localhost:5000/blogs')
      .then(response => {
        // console.log(response.data);
        setBlogs(response.data);
      })
      .catch(error => {
        console.error('Error fetching data: ', error);
      });
  }, [])
  return (
    <>
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-evenly', paddingTop: '50px', paddingBottom: '50px', gap: '30px' }}>
        {blogs?.map((blog, index) => (
          <div class="card" style={{ width: "25rem", boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)" }} key={index}>
            <div class="card-body">
              <h5 class="card-title">{blog?.title}</h5>
              <p class="card-text">{blog?.content}</p>
              <div class="btn btn-primary">
                {blog?.author_details.name}
              </div>
            </div>
          </div>

        )
        )}
      </div>

    </>
  )
}

export default Blogs