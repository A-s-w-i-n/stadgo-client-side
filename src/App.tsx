
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom';
import Register from './components/Register/Register';
import UserOpening from './pages/userPage/userOpen';
import UserHome from './components/user/userHome';
import OwnerHome from './components/owner/ownerHome';
import Login from './components/login/Login';
import AdminLogin from './components/admin/adminLogin';
import AdminFetchStadium from './components/admin/adminFetchStadiumFetch';
import UserProfile from './components/user/UserProfile';
import DetaildView from './components/stadium/detaildView';
import OwnerProfile from './components/owner/ownerProfile';
import VideoUplode from './components/owner/videoUplode';


import './App.css'
import AdminHome from './components/admin/adminHome';
import AdminFetchUser from './components/admin/adminFetchUser';
import AdminFetchOwner from './components/admin/AdminFetchOwner';
import AdminDashBord from './components/admin/adminDashBord';
import OrgDetail from './components/OrgDetails/orgDetail';
import Stadium from './components/stadium/stadium';
import OnwerstadiumList from './components/stadium/OnwerstadiumList';
import UserProtectedRouter from './pages/ProtectRouter/UserProtectRouter';
import OwnerProtectRouter from './pages/ProtectRouter/ownerProtectRouter';
import UserSatdiumList from './components/stadium/userSatdiumList';
// import Paypal from './components/payment/ownerPremium';
import Chat from './components/Chat/Chat';
import Loader from './components/loader/loader';
import SportsNews from './pages/userPage/sportsNews';
import OwnerDashBoard from './components/owner/ownerDashBoard';
function App() {
  

  return (
    <>
    <Router>
      <Routes>
        <Route path='/' element={<UserOpening/>}/>
        <Route path='/adminLogin' element={<AdminLogin/>}/>
        <Route path='/adminhome' element={<AdminHome/>}/>
        <Route path='/userHome' element={<UserProtectedRouter><UserHome/></UserProtectedRouter>}/>
        <Route path='/ownerHome' element={<OwnerProtectRouter><OwnerHome/></OwnerProtectRouter>}/>
        <Route path='/Register' element={<Register/>}/>
        <Route path='/admin/fetchUser' element={<AdminFetchUser/>}/>
        <Route path='/admin/fetchOwner' element ={<AdminFetchOwner/>}/>
        <Route path='/admin/fetchStadium' element={<AdminFetchStadium/>}/>
        <Route path='/admin/adminDashboard' element={<AdminDashBord/>}/>
        <Route path='/Login' element={<Login/>}/>
        <Route path='/orgDetail' element={<UserProtectedRouter><OrgDetail/></UserProtectedRouter>}/>
        <Route path='/stadiumDetails' element={<OwnerProtectRouter><Stadium/></OwnerProtectRouter>}/>
        <Route path='/owner/stadiumlist' element={<OwnerProtectRouter><OnwerstadiumList/></OwnerProtectRouter>}/>
        <Route path='/stadiumList' element={<UserProtectedRouter><UserSatdiumList/></UserProtectedRouter>}/>
        {/* <Route path='/owner/premium' element={<OwnerProtectRouter><Paypal/></OwnerProtectRouter>}/> */}
        <Route path='/userProfile' element={<UserProtectedRouter><UserProfile/></UserProtectedRouter>}/>
        <Route path='/detailedView/:id' element={<DetaildView/>}/>
        <Route path='/owner/ownerProfile' element={<OwnerProtectRouter><OwnerProfile/></OwnerProtectRouter>}/>
        <Route path='/owner/videoUplode' element={<OwnerProtectRouter><VideoUplode/></OwnerProtectRouter>}/>
        <Route path='/Chat' element={<Chat role={'user'}></Chat>}/>
        <Route path='/owner/Chat' element={<Chat role={'owner'}></Chat>}/>
        <Route path='/loading'element={<Loader/>} />
        <Route path='/news' element={<SportsNews/>}/>
        <Route path='/owner/ownerDashBoard' element={<OwnerDashBoard/>}/>
      </Routes>
    </Router>
    </>
  )
}

export default App
