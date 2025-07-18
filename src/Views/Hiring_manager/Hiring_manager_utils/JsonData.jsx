import { useCommonState, useDispatch } from "Components/CustomHooks";
import Icons from "Utils/Icons";

const JsonData = () => {
  //main selectors
  const dispatch = useDispatch();
  const {} = useCommonState();

  const jsonOnly = {
    sidebar_data: [
      {
        name: "Dashboard",
        route: "dashboard",
        icon: Icons.Reporting,
      },
      {
        name: "Planning",
        route: "planning",
        icon: Icons.Planning,
        show_sub_routes: window.location.pathname.includes("planning"),
        sub_routes: [
          {
            name: "Hiring planning form",
            route: "planning/hiring_planning_form",
            icon: Icons.Planning,
          },
          {
            name: "Interview Design Dashboard",
            route: "planning/interview_design_dashboard",
            icon: Icons.Planning,
          },
          {
            name: "Interview Design Screen",
            route: "planning/interview_design_screen",
            icon: Icons.Planning,
          },
          
          {
            name: "Interviewer Bandwidth",
            route: "planning/interviewer_bandwidth_dashboard",
            icon: Icons.Planning,
          },

          {
            name: "Set Approver Screen",
            route: "planning/set_approve_screen",
            icon: Icons.Requisition,
          },
          {
            name: "Interview Calendar Screen",
            route: "planning/upload_screen",
            icon: Icons.Requisition,
          },

          {
            name: "Stage alert and responsibility settings",
            route: "planning/stage_alert_and_responsibility_settings",
            icon: Icons.Planning,
          },
          {
            name: "Customised column and settings",
            route: "planning/customised_column_and_settings",
            icon: Icons.Planning,
          },
        ],
      },
    ],
    home_cards: [
      {
        icon: Icons.CandidatesForwarded,
        count: 17,
        name: "Candidates Forwarded",
        bgColor: "",
      },
      {
        icon: Icons.NewCandidates,
        count: 20,
        name: "New Candidates",
      },
      {
        icon: Icons.CurrentExternal,
        count: 20,
        name: "Current External Requisitions",
      },
      {
        icon: Icons.CurrentInternal,
        count: 20,
        name: "Current Internal Requisitions",
      },
      // {
      //     icon: '',
      //     count: 20,
      //     name: 'Current Internal Requisitions'
      // }
    ],
    columns: [
      {
        name: "S.No",
        selector: (_, index) => String(index + 1).padStart(2, "0"),
        width: "80px",
      },
      {
        name: "job-position",
        selector: (row) => row.working_model || "N/A",
        sortable: true,
      },
      {
        name: "Recruiter",
        selector: (row) => row.Recruiter || "N/A",
        sortable: true,
      },
      {
        name: "department",
        selector: (row) => row.department || "N/A",
        sortable: true,
      },
      {
        name: "divison",
        selector: (row) => row.divison || "N/A",
        sortable: true,
      },
      {
        name: "location",
        selector: (row) => row.location || "N/A",
        sortable: true,
      },
      {
        name: "status",
        selector: (row) => row.status || "N/A",
        sortable: true,
      },
      {
        name: "Action",
        cell: () => (
          <span style={{ fontSize: "20px", cursor: "pointer" }}>⋮</span>
        ),
        ignoreRowClick: true,
        allowOverflow: true,
        button: true,
      },
    ],
    columns1: [
      {
        name: "S.No",
        selector: (_, index) => String(index + 1).padStart(2, "0"),
        width: "80px",
      },
      {
        name: "Position/Role ",
        selector: (row) => row.Position_role | "N/A",
        sortable: true,
      },
      {
        name: "Tech",
        selector: (row) => row.Tech || "N/A",
        sortable: true,
      },
      {
        name: "JD",
        selector: (row) => row.JD || "N/A",
        sortable: true,
      },
      {
        name: "Designation",
        selector: (row) => row.Designation || "N/A",
        sortable: true,
      },
      {
        name: "Target",
        selector: (row) => row.Target || "N/A",
        sortable: true,
      },
      // {
      //     name: 'status',
      //     selector: row => row.status || 'N/A',
      //     sortable: true,
      // },
      {
        name: "Action",
        cell: () => (
          <span style={{ fontSize: "20px", cursor: "pointer" }}>⋮</span>
        ),
        ignoreRowClick: true,
        allowOverflow: true,
        button: true,
      },
    ],
  };

  const jsxJson = {};

  return {
    jsonOnly: jsonOnly,
    jsxJson: jsxJson,
  };
};

export default JsonData;
