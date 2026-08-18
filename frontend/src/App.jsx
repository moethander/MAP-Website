import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home.jsx';
import Test from './pages/Test.jsx';
import Activities from './pages/Activities.jsx';
import Contact from './pages/Contact.jsx';
import Footer from './components/Footer.jsx';
import Courses from './pages/Courses.jsx';
import Gallery from './pages/Gallery.jsx';
import Faq from "./pages/Faq.jsx";
import AboutUs from './pages/Aboutus.jsx';

import CoursesDetail from './pages/admin/CoursesDetail.jsx';
import AdminLogin from './pages/admin/AdminLogin.jsx';
import AdminDashboard from './pages/admin/AdminDashboard.jsx';
import AdminAddLevel from './pages/admin/AdminAddLevel.jsx';
import AddActivity from './pages/admin/AddActivity.jsx';
import AddSchedule from './pages/admin/AddSchedule.jsx';
import ManageCourses from './pages/admin/ManageCourses.jsx';
import AddGallery from './pages/admin/AddGallery.jsx';
import AdminFAQ from './pages/admin/AdminFAQ.jsx';
import AddContact from './pages/admin/AddContact.jsx';
import AdminTest from './pages/admin/AdminTest.jsx';
import ManageHome from './pages/admin/Managehome.jsx';
import ManageReviews from './pages/admin/ManageReviews.jsx';
import AdminAbout from './pages/admin/AdminAbout.jsx';
// import PlacementTest from './pages/PlacementTest'; // နောက်မှ ဆောက်မယ်


const Layout = ({children}) => {
  const location = useLocation();

  const isAdmin = location.pathname.startsWith("/admin");

  return(
    <>
    {!isAdmin && <Navbar/>}
    {children}
    {/* {!isAdmin && location.pathname ===  "/" && <Footer/>} */}
    </>
  )
};

function App() {
  return (
    <Router>
      <Layout>
      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/placement-test" element={<Test/>}/> 
        <Route path="/activities" element={<Activities />} />
        <Route path="/gallery" element={<Gallery/>}/>
        <Route path="/faq" element={<Faq/>}/>
        <Route path="/about" element={<AboutUs/>}/>
        <Route path="/contact" element={<Contact />} />
        <Route path="/courses" element={< Courses/>}/>
        <Route path="/courses/:id" element={<CoursesDetail/>}/>


        <Route path="/admin/login" element={<AdminLogin/>}/>
        <Route path="/admin/dashboard" element={<AdminDashboard/>}/>
        <Route path="/admin/add-activity" element={<AddActivity/>}/>
        <Route path="/admin/add-schedule" element={<AddSchedule/>}/>
        <Route path="/admin/manage-courses" element={<ManageCourses/>}/>
        <Route path="/admin/add-level" element={<AdminAddLevel/>}/>
        <Route path="/admin/add-gallery" element={<AddGallery/>}/>
        <Route path="/admin/add-faq" element={<AdminFAQ/>}/>
        <Route path="/admin/add-contact" element={<AddContact/>}/>
        <Route path="/admin/add-test" element={<AdminTest/>}/>
        <Route path="/admin/home" element={<ManageHome/>}/>
        <Route path="/admin/reviews" element={<ManageReviews/>}/>
        <Route path="/admin/add-about" element={<AdminAbout />} />

      </Routes>
      </Layout>
    </Router>
  );
}
export default App;