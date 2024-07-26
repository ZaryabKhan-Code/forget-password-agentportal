/* eslint-disable no-unused-vars */
import React, { Suspense, useState, useEffect } from 'react';
import { useNavigate, Route, Routes, Navigate } from 'react-router-dom';
import FieldForgetPassword from './FieldForgetPassword';
import ForgetPassword from './ForgetPassword';
import Redirect from './Redirect';


const App = () => {
  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path='*' element={<Redirect />} />
          <Route path='/forgot-password' element={<ForgetPassword />} />
          <Route path='/getverify/forgot-password/:token' element={<FieldForgetPassword />} />
        </Routes>
      </Suspense>
    </>
  );
};

export default App;