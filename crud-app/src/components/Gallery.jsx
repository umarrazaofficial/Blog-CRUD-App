import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Modal from '@mui/material/Modal';
import DeleteIcon from '@mui/icons-material/Delete';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import { toast } from 'react-toastify';

const Gallery = () => {
    const [gallery, setGallery] = useState([])
    const [open, setOpen] = useState(false);
    const [image, setImage] = useState('');
    const [id, setId] = useState('')
    const handleOpen = (data, id) => {
        setOpen(true)
        setImage(data)
        setId(id)
    };

    const handleClose = () => setOpen(false);
    useEffect(() => {
        axios.get('http://localhost:5000/images')
            .then(response => {
                // console.log(response.data);
                setGallery(response.data);
            })
            .catch(error => {
                console.error('Error fetching data: ', error);
            });
    }, []);

    const handleDelete = (id) => {
        axios.delete(`http://localhost:5000/deleteimage/${id}`)
            .then(res => {
                toast.success('Image Deleted Successfully')
                setOpen(false)
            })
            .catch(error => {
                toast.error('Error Deleting Image!!!')
            })
    }
    return (
        <>
            <div className="container " style={{ marginTop: "20px", marginBottom: '40px' }}>
                <div
                    className="container "
                    style={{ display: "flex", justifyContent: "space-between", alignItems: 'center' }}
                >
                    <Link to="/upload" className="btn btn-success my-3">
                        <FileUploadIcon />
                        Upload Image
                    </Link>
                </div>
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-evenly', paddingTop: '50px', paddingBottom: '50px', gap: '30px' }}>
                {gallery?.map((gallery, index) => (

                    <div class="card image-card" style={{ width: "18rem", boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", objectFit: 'cover', transition: 'transform 0.3s' }} key={index} >
                        <img src={gallery?.image_url} onClick={() => handleOpen(gallery?.image_url, gallery?._id)} alt="" style={{ objectFit: 'cover', height: '100%', objectPosition: 'center' }} />
                    </div>
                )
                )}
            </div>

            {/* Modal Container */}
            <Modal
                open={open}
                onClose={handleClose}
            >
                <div className='image-modal' >
                    <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
                        <img src={image} style={{ objectFit: 'cover', height: '300px', objectPosition: 'center', cursor: 'pointer' }} />
                    </div>
                    <div style={{ height: '300px', position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <Link
                            onClick={() => {
                                return (
                                    handleDelete(id)
                                )
                            }}
                            className="btn btn-danger ms-2 del-img-btn"

                        >
                            <DeleteIcon style={{ fontSize: 22, paddingRight: '3px' }} />
                            Delete Image
                        </Link>
                    </div>
                </div>
            </Modal>

        </>
    )
}

export default Gallery