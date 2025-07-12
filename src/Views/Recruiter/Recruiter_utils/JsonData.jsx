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
    //   {
    //     name: "Planning",
    //     route: "planning",
    //     icon: Icons.Planning,
    //     show_sub_routes: window.location.pathname.includes("planning"),
    //     sub_routes: [
    //       {
    //         name: "Hiring planning form",
    //         route: "planning/hiring_planning_form",
    //         icon: Icons.Planning,
    //       },
    //       {
    //         name: "Interview Design Dashboard",
    //         route: "planning/interview_design_dashboard",
    //         icon: Icons.Planning,
    //       },
    //       {
    //         name: "Interview Design Screen",
    //         route: "planning/interview_design_screen",
    //         icon: Icons.Planning,
    //       },
    //       {
    //         name: "Interviewer Bandwidth",
    //         route: "planning/interviewer_bandwidth",
    //         icon: Icons.Planning,
    //       },

    //       {
    //         name: "Set Approver Screen",
    //         route: "planning/set_approve_screen",
    //         icon: Icons.Requisition,
    //       },
    //       {
    //         name: "Interview Calendar Screen",
    //         route: "planning/upload_screen",
    //         icon: Icons.Requisition,
    //       },

    //       {
    //         name: "Stage alert and responsibility settings",
    //         route: "planning/stage_alert_and_responsibility_settings",
    //         icon: Icons.Planning,
    //       },
    //       {
    //         name: "Customised column and settings",
    //         route: "planning/customised_column_and_settings",
    //         icon: Icons.Planning,
    //       },
    //     ],
    //   },
    ],
  };

  const jsxJson = {};

  return {
    jsonOnly: jsonOnly,
    jsxJson: jsxJson,
  };
};

export default JsonData;
