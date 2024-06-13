import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import { toast } from 'react-toastify';

const Uploadimage = () => {
    const [image, setImage] = useState('');

    const navigate = useNavigate();

    const handleImageChange = (e) => {
        const selectedFile = e.target.files[0];

        if (selectedFile) {
            const maxSizeInBytes = 2 * 1024 * 1024;
            if (selectedFile.size > maxSizeInBytes) {
                toast.error('File size exceeds the limit (2MB).');
                e.target.value = null;
                return;
            }

            setImage(selectedFile);
        }
    };

    const uploadImage = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('image', image);
        const res = await axios.post('http://localhost:5000/upload', formData);
        if (res.data.success) {
            toast.success(res.data.message)
            navigate('/gallery')
        } else {
            toast.error('Error uploading image. Please try again.');
        }


    };
    return (
        <div className="container " style={{ marginTop: "30px" }}>
            <div style={{ textAlign: 'center', paddingBottom: '20px' }}>
                <h2>Upload a New Image</h2>
            </div>
            <form class="row g-3" onSubmit={uploadImage}>
                <div class="col-md-12">
                    <label for="inputname4" class="form-label">
                        Image
                    </label>
                    <input
                        type="file"
                        class="form-control"
                        id="inputname4"
                        placeholder="Enter Name:"
                        onChange={(e) => handleImageChange(e)}
                        required
                    />
                </div>
                <div class="col-12">
                    <button type="submit" class="btn btn-primary">
                        <FileUploadIcon />
                        Upload Image
                    </button>
                </div>
            </form>
        </div>
    )
}

export default Uploadimage