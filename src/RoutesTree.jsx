
import React from "react";
import { Route, Routes } from "react-router-dom";
import App from "./App";
import { Expenses } from "./pages/Expenses";
import { Email } from "./pages/Email";
import {ForgotEmail} from "./pages/ForgotEmail";
import {CreateAccount} from"./pages/CreateAccount";
import Counter from "./pages/example";  //因为“default”，所以这里没有{}.
import ContactInfo from"./contact/ContactInfo";
import {Practice} from "./pages/practice";

import { Contact}from "./contact/contact";

// import  EditContact from './contact/Edit';
  
import ToDoWrapper from './pages/Project1-ToDoList/ToDoWrapper'    

import Employee from './pages/Project2-Employee/Employee'

import ECommerce from ''

export function RoutersTree () {
    return( 
        <Routes>
            <Route path="/" element={<App />} />
            <Route path="/expense" element={<Expenses />} />
            <Route path="/email" element={<Email />} />
            <Route path="/ForgotEmail" element={<ForgotEmail/>}/>
            <Route path="/CreateAccount" element={<CreateAccount/>}/>
            <Route path="/counter" /*element={<Counter/>}/>*/  element={<><Counter/><Counter/></>}/>
            
            <Route path="/contact" element={<Contact/>}>
            <Route path="/contact/:contactId" element={<ContactInfo />} />
            {/* <Route path='contacts/:contactId/edit' element={<EditContact/>}></Route>  */}
            </Route>     

            <Route path="/practice" element={<Practice/>}/>    
            
            <Route path='/ToDoWrapper' element={<ToDoWrapper/>}/>
            <Route path="/Employee" element={<Employee/>}/>
            <Route path="./ECommerce" element={<ECommerce/>}/>
        </Routes>
    )
    
}

