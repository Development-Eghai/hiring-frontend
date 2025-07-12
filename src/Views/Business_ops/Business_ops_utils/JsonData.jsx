import { useCommonState, useDispatch } from 'Components/CustomHooks';
import Icons from 'Utils/Icons';

const JsonData = () => {
    //main selectors
    const dispatch = useDispatch();
    const { } = useCommonState();

    const jsonOnly = {
sidebar_data: [
      {
        name: "Dashboard",
        route: "dashboard",
        icon: Icons.Reporting,
      },
    ]
    }

    const jsxJson = {
       
    }

    return {
        "jsonOnly": jsonOnly,
        "jsxJson": jsxJson
    }
}

export default JsonData