import React, { useState,useEffect } from 'react'
import reactLogo from './assets/react.svg'
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { getToken, removeUserSession, setUserSession } from './Utils/Common';
import axios from 'axios';
import PrivateRoute from './Utils/PrivateRoute';
import PublicRoute from './Utils/PublicRoute';
import Login from './Login';
import Sign_up from './pages/Sign_up';
import Home from './pages/Home';
import NotFound from './NotFound';

import './App.css';
import './style/style.css';
import './style/customstyle.css';
import './components/dattaable.css';

import Vendor from './pages/Vendor';
import Reports from './pages/Reports';
import Products from './pages/Products';
import Create_vendor from './pages/create_vendor';
import Users from './pages/Users';
import Add_material from './pages/Add_material';
import Show_material from './pages/Show_material';
import Show_Inventory from './pages/Show_inventory';

import Example from './pages/Example';
import Example2 from './pages/Example2';

import ModalExample from './pages/ModalExample';


import Logout from './Utils/logout';

import dataTable from './pages/dataTable'
import { Tbl } from './pages/Tbl'

import AddInventory from './pages/AddInventory'
import ResetPassword from './auth/ResetPassword';

import Incoming_boq from './pages/Incoming_boq';
import Edit_boq from './pages/Edit_boq';

import UpdatePassword from './auth/UpdatePassword';
import Offline from './pages/Offline';
import CustomSlider from './pages/CustomSlider';
import Demo from './pages/Demo';
import ViewMaterial from './pages/ViewMaterial';
import ShowInventoryDetail from './pages/ShowInventoryDetail';
import Example3 from './pages/Example3';
import Example4 from './pages/Example4';

import Roles from './admin/Roles';
import Permission from './admin/Permission';
import D from './child/D';
import ExcelFile from './ExcelFile';

import Service from './pages/Service';
import ExamplePagination from './pages/ExamplePagination';
import MaterialUpdate from './pages/MaterialUpdate';
import Button  from './pages/Button';
import ComponentPage from './pages/ComponentPage';

import AddInven from './pages/AddInven';



// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";




function App(props) {
  

  // Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyANO-O_2DwnrDMMaPC58YUT_UT64vixqNU",
  authDomain: "project-291018.firebaseapp.com",
  projectId: "project-291018",
  storageBucket: "project-291018.appspot.com",
  messagingSenderId: "733648159117",
  appId: "1:733648159117:web:ba372e20488e2439f1fdc4",
  measurementId: "G-LGQY9VNDG1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);


  const [count, setCount] = useState(0)

  

  const [authLoading, setAuthLoading] = useState(true);
  const [NetworkStatus, setNetworkStatus] = useState(true)

  const token = getToken();

  useEffect(() => {
    window.addEventListener('online', () => setNetworkStatus(true))
    window.addEventListener('offline', () => setNetworkStatus(false))
    if (!token) {
      return;
    }

    axios.get(`https://sarmicrosystems.in/react_inventory/API/verifyToken.php?token=${token}`).then(response => {
      setUserSession(response.data.token, response.data.id, response.data.full_name, response.data.userid, response.data.roleid, response.data.rolename, response.data.role_permission, response.data.perm);

      if (!response.data.userid) {
        props.history.push('/login');
      }

      setAuthLoading(false);
    }).catch(error => {
      removeUserSession();
      setAuthLoading(false);
    });
  }, [token]);


  if (authLoading && getToken()) {
    return <div className="body">
      <div className="loader">
        <span className="one"></span>
        <span className="two"></span>
        <span className="three"></span>
        <span className="four"></span>
      </div>
    </div>
  }

  return (
    <>
      {NetworkStatus ?


        <Router>

          <Navbar />
          <Switch>


            <PublicRoute path="/login" component={Login} />
            <PublicRoute path='/sign_up' component={Sign_up} />
            
            

            <PrivateRoute path="/" exact component={Home} />
            <PrivateRoute path='/dashboard' exact component={Home} />
            
            <PublicRoute path='/resetPassword' component={ResetPassword} />
            <PublicRoute path='/demo' component={Demo} />
            <PublicRoute path='/d' component={D} />

            <PublicRoute path='/sliders' component={CustomSlider} />
            <PublicRoute path='/UpdatePassword/:userid' component={UpdatePassword} />

            <PrivateRoute path='/AddInven' component={AddInven} />


            <PrivateRoute path='/admin/roles' component={Roles} />
            <PrivateRoute path='/admin/permission/' component={Permission} />

            <PrivateRoute path='/viewMaterial/:materialId' component={ViewMaterial} />
            <PrivateRoute path='/ShowInventoryDetail/:materialId' component={ShowInventoryDetail} />

            <PrivateRoute path="/vendor" component={Vendor} />
            <PrivateRoute path="/admin/user" component={Users} />


            <PrivateRoute path="/AddInventory" component={AddInventory} />
            <PrivateRoute path="/Tbl" component={Tbl} />

            <PrivateRoute path="/modal" component={ModalExample} />
            <PrivateRoute path='/reports' component={Reports} />
            <PrivateRoute path='/products' component={Products} />
            <PrivateRoute path='/login' component={Login} />
            <PrivateRoute path='/admin/vendor' component={Create_vendor} />
            <PrivateRoute path='/add_material' component={Add_material} />
            <PrivateRoute path='/show_material' component={Show_material} />
            <PrivateRoute path='/ShowInventory' component={Show_Inventory} />
            <PrivateRoute path='/logout' component={Logout} />
            <PrivateRoute path='/datatable' component={dataTable} />
            <PrivateRoute path='/incoming_boq' component={Incoming_boq} />
            <PrivateRoute path='/Edit_boq/:id' component={Edit_boq} />
            
            <PrivateRoute path='/service' component={Service} />
            
            <PrivateRoute path='/demo' component={Example} />
            <PrivateRoute path='/demo2' component={Example2} />
            <PrivateRoute path='/demo3' component={Example3} />
            <PrivateRoute path='/demo4' component={Example4} />
            
            <PrivateRoute path='/ExcelFile' component={ExcelFile} />
            <PrivateRoute path='/pagination' component={ExamplePagination} />

            <PrivateRoute path='/materialUpdate/:id' component={MaterialUpdate} />

            <PrivateRoute path='/allButton' component={Button} />
            <PrivateRoute path='/button' component={ComponentPage} />

            
            
            <Route path="*" component={NotFound} />


          </Switch>
        </Router>
        : <Offline />
      }

    </>
  );

}

export default App
