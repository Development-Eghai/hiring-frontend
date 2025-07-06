import React from "react";
import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Error from "Views/Common/Docs/error";
import { InitializeProjectSetup } from "Views/Common/Docs/InitializeProjectSetup";
import Login from "Views/Common/Docs/Login";
import CustomizeFieldLabels from "Views/Hiring_manager/Docs/CustomisedColoum";
import CustomisedColoum from "Views/Hiring_manager/Docs/CustomisedColoum";
import { Home } from "Views/Hiring_manager/Docs/Home";
import InterviewBandwith from "Views/Hiring_manager/Docs/InterviewBandwith";
import InterviewDesignDashboard from "Views/Hiring_manager/Docs/InterviewDesignDashboard";
import InterviewDesignScreen from "Views/Hiring_manager/Docs/InterviewDesignScreen";
import JobRequisition from "Views/Hiring_manager/Docs/JobRequisition";
import PlanningForm from "Views/Hiring_manager/Docs/PlanningForm";
import { PlanningScreen } from "Views/Hiring_manager/Docs/PlanningScreen";
import ResponsibilitySetting from "Views/Hiring_manager/Docs/resposbility";
import SetApproveScreen from "Views/Hiring_manager/Docs/SetApproveScreen";
import UploadScreen from "Views/Hiring_manager/Docs/UploadScreen";
import { Layout } from "Views/Hiring_manager/Hiring_manager_utils/Layout";
import { RecruiterDashboard } from "Views/Recruiter/Docs/RecuirmentDashboard";
import { RecruiterLayout } from "Views/Recruiter/Recruiter_utils/layout";


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
              <Route path="hiring_manager_dashboard" element={<Home />} />
              <Route path="planning" >
                <Route index element={<PlanningScreen />} />
                <Route path="hiring_planning_form" element={<PlanningForm />} />
                <Route path="interview_design_screen" element={<InterviewDesignScreen />} />
                <Route path="interview_design_dashboard" element={<InterviewDesignDashboard />} />
                <Route path="interviewer_bandwidth" element={<InterviewBandwith />} />
                <Route path="stage_alert_and_responsibility_settings" element={<ResponsibilitySetting />} />
                <Route path="customised_column_and_settings" element={<CustomizeFieldLabels />} />
              </Route>
              <Route path="create_job_requisition" element={<Home />} />
              <Route path="job_requisition" element={<JobRequisition/>}/>

              <Route path="set_approve_screen" element={<SetApproveScreen/>}/>
              <Route path="upload_screen" element={<UploadScreen/>}/>
            </Route>
          </Route>


          <Route path="/recruiter">
          <Route element={<RecruiterLayout />}>
          <Route path="dashboard" element={<RecruiterDashboard/>}/>
          </Route>
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
