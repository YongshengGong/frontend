
import React from "react";
import { Route, Routes } from "react-router-dom";
import App from "./App";


// import ContactInfo from"./contact/ContactInfo";
// import { Contact}from "./contact/contact";
// import  EditContact from './contact/Edit';
  

import ToDoList from './Project/Project1-ToDoList/ToDoList'    
import Employee from './Project/Project2-Employee/Employee'
import ECommerce from './Project/Project3-ECommerce/ECommerce'
import SignIn from './Project/Project3-ECommerce/SignIn';
import Register from './Project/Project3-ECommerce/Register'
import UserHomePage from "./Project/Project3-ECommerce/UserHomePage";
import Cart from './Project/Project3-ECommerce/Cart';

export function RoutersTree () {
    return( 
        <Routes>
            <Route path="/" element={<App />} />
            
            {/* <Route path="/contact" element={<Contact/>}>
            <Route path="/contact/:contactId" element={<ContactInfo />} /> */}
                {/* <Route path='contacts/:contactId/edit' element={<EditContact/>}></Route>  */}
            {/* </Route>      */}
            
            <Route path='/ToDoList' element={<ToDoList/>}/>
            <Route path="/Employee" element={<Employee/>}/>
            <Route path="/ECommerce" element={<ECommerce/>}/>
            <Route path='/ECommerce/SignIn' element={<SignIn/>}/>
            <Route path='/ECommerce/Register' element={<Register/>}/>
            <Route path='/ECommerce/UserHomePage/:username' element={<UserHomePage/>}/>
            <Route path='/ECommerce/UserHomePage/:username/Cart' element={<Cart/>}/>
        </Routes>
    )
}

