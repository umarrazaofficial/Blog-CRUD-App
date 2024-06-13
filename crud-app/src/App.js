import {ToastContainer} from "react-toastify";
import "./App.css";
import "react-toastify/dist/ReactToastify.css";
import Create from "./components/Create.jsx";
import Users from "./components/Users.jsx";
import Edit from "./components/Edit.jsx";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import Welcomepage from "./components/Welcomepage.jsx";
import Blogs from "./components/Blogs.jsx";
import Footer from "./components/Footer.jsx";
import Signup from "./components/Signup.jsx";
import Privatecomponent from "./components/Privatecomponent.jsx";
import Accounts from "./components/Accounts.jsx";
import Login from "./components/Login.jsx";
import Postblog from "./components/Postblog.jsx";
import Myblogs from "./components/Myblogs.jsx";
import Editaccount from "./components/Editaccount.jsx";
import Editblog from "./components/Editblog.jsx";
import Profile from "./components/Profile.jsx";
import Gallery from "./components/Gallery.jsx";
import Uploadimage from "./components/Uploadimage.jsx";

function App() {
    return (
        <BrowserRouter>
            <ToastContainer />
            <Navbar />
            <Routes>
                <Route element={<Privatecomponent />}>
                    <Route path="/" element={<Welcomepage />} />
                    <Route path="/blogs" element={<Blogs />} />
                    <Route path="/user" element={<Users />} />
                    <Route path="/create" element={<Create />} />
                    <Route path="/edit/:Id" element={<Edit />} />
                    <Route path="/accounts" element={<Accounts />} />
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/postblog" element={<Postblog />} />
                    <Route path="/myblog" element={<Myblogs />} />
                    <Route path="/editaccount/:Email" element={<Editaccount />} />
                    <Route path="/editblog/:Id" element={<Editblog />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/gallery" element={<Gallery />} />
                    <Route path="/upload" element={<Uploadimage />} />
                </Route>
                <Route path="/login" element={<Login />} />
            </Routes>
            <Footer />
        </BrowserRouter>
    );
}

export default App;
