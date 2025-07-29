import React from "react";
import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { BuisnessLayout } from "Views/Business_ops/Business_ops_utils/BuisnessLayout";
import BuisnessOpsDashboard from "Views/Business_ops/Docs/BuisnessOpsDashboard";
import BuisnessOpsReview from "Views/Business_ops/Docs/BuisnessOpsReview";
import JobBuisnessReview from "Views/Business_ops/Docs/JobBuisnessReview";
import Error from "Views/Common/Docs/error";
import { InitializeProjectSetup } from "Views/Common/Docs/InitializeProjectSetup";
import Login from "Views/Common/Docs/Login";
import CustomizeFieldLabels from "Views/Hiring_manager/Docs/CustomisedColoum";
import CustomisedColoum from "Views/Hiring_manager/Docs/CustomisedColoum";
import { Home } from "Views/Hiring_manager/Docs/Home";
import InterviewBandwidth from "Views/Hiring_manager/Docs/InterviewBandwith";
import InterviewBandwith from "Views/Hiring_manager/Docs/InterviewBandwith";
import InterviewBandwidthDashboard from "Views/Hiring_manager/Docs/InterviewBandwithDashboard";
import InterviewDesignDashboard from "Views/Hiring_manager/Docs/InterviewDesignDashboard";
import InterviewDesignScreen from "Views/Hiring_manager/Docs/InterviewDesignScreen";
import JobRequisition from "Views/Hiring_manager/Docs/JobRequisition";
import PlanningForm from "Views/Hiring_manager/Docs/PlanningForm";
import PlanninggForm from "Views/Hiring_manager/Docs/PlanningFormm";
import { PlanningScreen } from "Views/Hiring_manager/Docs/PlanningScreen";
import ResponsibilitySetting from "Views/Hiring_manager/Docs/resposbility";
import SetApproveScreen from "Views/Hiring_manager/Docs/SetApproveScreen";
import UploadScreen from "Views/Hiring_manager/Docs/UploadScreen";
import { Layout } from "Views/Hiring_manager/Hiring_manager_utils/Layout";
import InterviewerDashboard from "Views/Interviewer/Docs/InterviewerDashboard";
import { InterviwerLayout } from "Views/Interviewer/Interviewer_utils/InterviwerLayout";
import CandidateScreen from "Views/Recruiter/Docs/CandidateScreen";
import HiringManagerApproval from "Views/Recruiter/Docs/HiringManagerApproval";
import RecruiterScreening from "Views/Recruiter/Docs/RecruiterScreening";
import RecruiterScreeningDashboard from "Views/Recruiter/Docs/RecruiterScreeningDashboard";
import { RecruiterDashboard } from "Views/Recruiter/Docs/RecuirmentDashboard";
import ScheduleInteview from "Views/Recruiter/Docs/ScheduleInteview";
import ScoreCard from "Views/Recruiter/Docs/ScoreCard";
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
              <Route path="dashboard" element={<Home />} />
              {/* <Route path="hiring_manager_dashboard" element={<Home />} /> */}
              <Route path="planning">
                <Route index element={<PlanningScreen />} />
                {/* <Route path="hiring_planning_form" element={<PlanningForm />} /> */}
                <Route path = "hiring_planning_form" element={<PlanninggForm/>}/>
                <Route
                  path="interview_design_screen"
                  element={<InterviewDesignScreen />}
                />
                <Route
                  path="interview_design_dashboard"
                  element={<InterviewDesignDashboard />}
                />
                <Route
                  path="interviewer_bandwidth"
                  element={<InterviewBandwidth />}
                />
                <Route
                  path="interviewer_bandwidth_dashboard"
                  element={<InterviewBandwidthDashboard />}
                />
                <Route
                  path="stage_alert_and_responsibility_settings"
                  element={<ResponsibilitySetting />}
                />
                <Route
                  path="customised_column_and_settings"
                  element={<CustomizeFieldLabels />}
                />
                <Route
                  path="set_approve_screen"
                  element={<SetApproveScreen />}
                />
                <Route path="upload_screen" element={<UploadScreen />} />
              </Route>
              <Route path="create_job_requisition" element={<Home />} />
              <Route path="job_requisition" element={<JobRequisition />} />
            </Route>
          </Route>

          <Route path="/recruiter">
          <Route element={<RecruiterLayout />}>
          <Route path="dashboard" element={<RecruiterDashboard/>}/>
          <Route path="schedule_interview" element={<ScheduleInteview/>}/>
          <Route path="candidate" element={<CandidateScreen/>}/>
          <Route path="recruiter_screening" element={<RecruiterScreening/>}/>
          <Route path="recruiter_screening_dashboard" element={<RecruiterScreeningDashboard/>}/>
          <Route path="recruiter_approval" element={<HiringManagerApproval/>}/>
          <Route path="score_card" element={<ScoreCard/>}/>
          </Route>
          </Route>

          <Route path="/business_ops">
            <Route element={<BuisnessLayout />}>
              <Route path="dashboard" element={<BuisnessOpsDashboard/>}/>
              <Route path="buisness_review" element={<JobBuisnessReview/>}/>
              
          </Route>
          </Route>

          <Route path="/interviewer">
          <Route element={<InterviwerLayout />}>
          <Route path="dashboard" element={<InterviewerDashboard/>}/>              
          </Route>
          </Route>



          <Route path="*" element={<Error />} />
        </Route>
      </Routes>
    </React.Fragment>
  );
}

export default App;
