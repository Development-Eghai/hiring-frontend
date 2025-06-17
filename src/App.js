import React from "react";
import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Error from "Views/Common/Docs/error";
import { InitializeProjectSetup } from "Views/Common/Docs/InitializeProjectSetup";
import Login from "Views/Common/Docs/Login";
import { Home } from "Views/Hiring_manager/Docs/Home";
import { Layout } from "Views/Hiring_manager/Hiring_manager_utils/Layout";

function App() {
  return (
    <React.Fragment>
      <ToastContainer theme="light" />

      <Routes>
        <Route element={<InitializeProjectSetup />}>
          <Route index element={<Login />} />

          <Route path="/hiring_manager">
            <Route element={<Layout />}>
              <Route path="home" element={<Home />} />
              <Route path="reporting" element={<Home />} />
              <Route path="planning" >
                <Route index element={<Home />} />
                <Route path="hiring_planning_form" element={<Home />} />
                <Route path="interview_design_screen" element={<Home />} />
                <Route path="interviewer_bandwidth" element={<Home />} />
                <Route path="stage_alert_and_responsibility_settings" element={<Home />} />
                <Route path="customised_column_and_settings" element={<Home />} />
              </Route>
              <Route path="create_job_requisition" element={<Home />} />
            </Route>
          </Route>


          <Route path="/recruiter">

          </Route>


          <Route path="/business_ops">

          </Route>

          <Route path="*" element={<Error />} />
        </Route>
      </Routes>

    </React.Fragment>
  );
}

export default App;
