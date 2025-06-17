import { useCommonState, useDispatch } from 'Components/CustomHooks';

const JsonData = () => {
    //main selectors
    const dispatch = useDispatch();
    const { } = useCommonState();

    const jsonOnly = {
        sidebar_data: [
            {
                name: 'Reporting',
                route: 'reporting',
                icon: ''
            },
            {
                name: 'Planning',
                route: 'planning',
                icon: '',
                show_sub_routes: window.location.pathname.includes('planning'),
                sub_routes: [
                    {
                        name: 'Hiring planning form',
                        route: 'planning/hiring_planning_form',
                        icon: ''
                    },
                    {
                        name: 'Interview Design Screen',
                        route: 'planning/interview_design_screen',
                        icon: ''
                    },
                    {
                        name: 'Interviewer Bandwidth',
                        route: 'planning/interviewer_bandwidth',
                        icon: ''
                    },
                    {
                        name: 'Stage alert and responsibility settings',
                        route: 'planning/stage_alert_and_responsibility_settings',
                        icon: ''
                    },
                    {
                        name: 'Customised column and settings',
                        route: 'planning/customised_column_and_settings',
                        icon: ''
                    }
                ]
            },
            {
                name: 'Create Job Requisition',
                route: 'create_job_requisition',
                icon: ''
            },
        ],
        home_cards: [
            {
                icon: '',
                count: 17,
                name: 'Candidates Forwarded'
            },
            {
                icon: '',
                count: 20,
                name: 'New Candidates'
            },
            {
                icon: '',
                count: 20,
                name: 'Current External Requisitions'
            },
            {
                icon:'',
                count:20,
                name:'Current Internal Requisitions'
            },
            {
                icon:'',
                count:20,
                name:'Current Internal Requisitions'
            }
        ]
    }

    const jsxJson = {
        // buy_sell_carousel_settings: {
        //     // customPaging: function (i) {
        //     //     return (
        //     //         <a className='p-1 row justify-content-center align-items-center'>
        //     //             <img src={Images[i]} />
        //     //         </a>
        //     //     );
        //     // },
        //     dots: true,
        //     dotsClass: "slick-dots slick-thumb",
        //     infinite: true,
        //     speed: 500,
        //     slidesToShow: 1,
        //     slidesToScroll: 1,
        //     responsive: [
        //         {
        //             breakpoint: 1024,
        //             settings: {
        //                 slidesToShow: 1,
        //                 slidesToScroll: 1,
        //                 infinite: false,
        //                 dots: true
        //             }
        //         },
        //         {
        //             breakpoint: 600,
        //             settings: {
        //                 slidesToShow: 1,
        //                 slidesToScroll: 1
        //             }
        //         }
        //     ],
        //     swipeToSlide: true,
        // },

        // //                                                              Analytics                                                            //
        // analyticsOverallLineChartFilter: [
        //     {
        //         name: "From Date",
        //         type: "date",
        //         category: "input",
        //         placeholder: "",
        //         value: analyticsState?.overall_chart_filter?.from_date || '',
        //         change: (e) => dispatch(updateOverallChartFilter({ from_date: e.target.value })),
        //     },
        //     {
        //         name: "To Date",
        //         type: "date",
        //         category: "input",
        //         placeholder: "",
        //         value: analyticsState?.overall_chart_filter?.to_date || '',
        //         change: (e) => dispatch(updateOverallChartFilter({ to_date: e.target.value })),
        //     },
        // ],
        // analyticsPieChart: [
        //     {
        //         type: "Load",
        //         value: analyticsState?.overall_analytics_data?.analytics?.length ? analyticsState?.overall_analytics_data?.analytics[1]?.value : 0,
        //         color: "#0088FE"
        //     },
        //     {
        //         type: "Truck",
        //         value: analyticsState?.overall_analytics_data?.analytics?.length ? analyticsState?.overall_analytics_data?.analytics[0]?.value : 0,
        //         color: "#00C49F"
        //     },
        //     {
        //         type: "Driver",
        //         value: analyticsState?.overall_analytics_data?.analytics?.length ? analyticsState?.overall_analytics_data?.analytics[2]?.value : 0,
        //         color: "#FFBB28"
        //     },
        //     {
        //         type: "Buy and sell",
        //         value: analyticsState?.overall_analytics_data?.analytics?.length ? analyticsState?.overall_analytics_data?.analytics[3]?.value : 0,
        //         color: "#FF8042"
        //     },
        //     {
        //         type: "Insurance",
        //         value: analyticsState?.overall_analytics_data?.analytics?.length ? analyticsState?.overall_analytics_data?.analytics[4]?.value : 0,
        //         color: "red",
        //     },
        //     {
        //         type: "Fastag",
        //         value: analyticsState?.overall_analytics_data?.analytics?.length ? analyticsState?.overall_analytics_data?.analytics[5]?.value : 0,
        //         color: "blue"
        //     }
        // ],
        // analyticsButtons: [
        //     {
        //         className: analyticsState?.selected_Line_chart === "Load" ? "selcted_analytics_button_active" : "",
        //         buttonName: "Load",
        //         click: () => dispatch(updateSelectedLineChart("Load"))
        //     },
        //     {
        //         className: analyticsState?.selected_Line_chart === "Truck" ? "selcted_analytics_button_active" : "",
        //         buttonName: "Truck",
        //         click: () => dispatch(updateSelectedLineChart("Truck"))
        //     },
        //     {
        //         className: analyticsState?.selected_Line_chart === "Driver" ? "selcted_analytics_button_active" : "",
        //         buttonName: "Driver",
        //         click: () => dispatch(updateSelectedLineChart("Driver"))
        //     },
        //     {
        //         className: analyticsState?.selected_Line_chart === "BuyAndSell" ? "selcted_analytics_button_active" : "",
        //         buttonName: "BuyAndSell",
        //         click: () => dispatch(updateSelectedLineChart("BuyAndSell"))
        //     },
        //     {
        //         className: analyticsState?.selected_Line_chart === "Insurance" ? "selcted_analytics_button_active" : "",
        //         buttonName: "Insurance",
        //         click: () => dispatch(updateSelectedLineChart("Insurance"))
        //     },
        //     {
        //         className: analyticsState?.selected_Line_chart === "Fastag" ? "selcted_analytics_button_active" : "",
        //         buttonName: "Fastag",
        //         click: () => dispatch(updateSelectedLineChart("Fastag"))
        //     }
        // ],


        // //                                                              Dashboard menu                                                        //
        // dashboardMenus: [
        //     {
        //         icon: Icons.dashboardUserIcon,
        //         content: "Total Number Of Users",
        //         value: dashboardState?.dashboard_data?.tot_number_of_users
        //     },
        //     {
        //         icon: Icons.dashboardInsuranceIcon,
        //         content: "Total Number Of Insurance",
        //         value: dashboardState?.dashboard_data?.tot_number_of_insurance
        //     },
        //     {
        //         icon: Icons.dashboardFastagIcon,
        //         content: "Total Number Of Fastag",
        //         value: dashboardState?.dashboard_data?.tot_number_of_fastag
        //     },
        //     {
        //         icon: Icons.dashboardCustomerIcon,
        //         content: "New Customer",
        //         value: dashboardState?.dashboard_data?.new_customer
        //     }
        // ],


        // //                                                              blog                                                                  //
        // blogInputs: [
        //     {
        //         name: "Language",
        //         type: "select",
        //         category: "select",
        //         placeholder: "",
        //         value: blogState?.blog_edit_data?.language,
        //         options: jsonOnly.blogLanguages,
        //         change: (e) => dispatch(handleBlogInputOnChange({ language: e.target.value })),
        //         isMandatory: true,
        //         error: commonState?.validated && !blogState?.blog_edit_data?.language ? "Language required" : null
        //     },
        //     {
        //         name: "Catergory",
        //         type: "select",
        //         category: "select",
        //         placeholder: "",
        //         value: blogState?.blog_edit_data?.category,
        //         options: jsonOnly.services,
        //         change: (e) => dispatch(handleBlogInputOnChange({ category: e.target.value })),
        //         error: commonState?.validated && !blogState?.blog_edit_data?.category ? "Category required" : null,
        //         isMandatory: true
        //     },
        //     {
        //         name: "Heading",
        //         type: "text",
        //         category: "input",
        //         placeholder: "",
        //         value: blogState?.blog_edit_data?.heading1,
        //         change: (e) => dispatch(handleBlogInputOnChange({ heading1: e.target.value })),
        //         error: commonState?.validated && !blogState?.blog_edit_data?.heading1 ? "Heading required" : null,
        //         isMandatory: true
        //     },
        //     {
        //         name: "Sub Heading",
        //         type: "text",
        //         category: "input",
        //         placeholder: "",
        //         value: blogState?.blog_edit_data?.heading2,
        //         change: (e) => dispatch(handleBlogInputOnChange({ heading2: e.target.value })),
        //         error: commonState?.validated && !blogState?.blog_edit_data?.heading2 ? "Sub-Heading required" : null,
        //         isMandatory: true
        //     },
        //     {
        //         name: "Description",
        //         type: "textbox",
        //         category: "textbox",
        //         placeholder: "",
        //         value: blogState?.blog_edit_data?.blog_content,
        //         change: (value) => dispatch(handleBlogInputOnChange({ blog_content: value })),
        //         error: commonState?.validated && !blogState?.blog_edit_data?.blog_content ? "Blog content required" : null,
        //         isMandatory: true
        //     },
        //     {
        //         name: "Upload image",
        //         type: "file",
        //         category: "input",
        //         placeholder: "",
        //         value: blogState?.blog_edit_data?.blog_image_show_ui || [],
        //         change: (e) => {
        //             // -- For Multiple File Input
        //             let myImages = servicesState?.blog_edit_data?.blog_image_show_ui;
        //             let makeImagesList = [];

        //             // Use `Promise.all` to handle async file reading
        //             Promise.all(
        //                 Array.from(e.target.files).map((file) => readFile(file))
        //             )
        //                 .then((results) => {
        //                     makeImagesList = results;
        //                     if (myImages) {
        //                         makeImagesList = [...myImages, ...makeImagesList];
        //                     }

        //                     dispatch(handleBlogInputOnChange({ blog_image_show_ui: makeImagesList, blog_image_send_api: e.target.files }));
        //                 })
        //                 .catch((error) => console.error('Error reading files:', error));
        //         },
        //         error: commonState?.validated && !blogState?.blog_edit_data?.blog_image_show_ui ? "Blog Image required" : null,
        //         isMandatory: true
        //     }
        // ],
        // verifyMobileNumber: [
        //     {
        //         name: "Mobile number",
        //         type: "text",
        //         category: "input",
        //         placeholder: "",
        //         value: servicesState?.phone_number || '',
        //         change: (e) => {
        //             if (/^\d*$/.test(e.target.value) && e.target.value.length <= 10) {
        //                 dispatch(handleOnchangeVerifyMobileNumber(e.target.value))
        //             }
        //         },
        //         keyDown: (e) => {
        //             if (e.code === "Enter") {
        //                 dispatch(handlePostVerification(servicesState))
        //             }
        //         },
        //         isMandatory: true,
        //         Err: commonState?.validated && !servicesState?.phone_number ? "Mobile Number Required" : null
        //     }
        // ],


        // //                                                              load                                                                  //
        // loadAddEditInputs: [
        //     {
        //         name: "Company Name",
        //         type: "text",
        //         category: "input",
        //         placeholder: "",
        //         value: servicesState?.new_edit_load_card?.company_name || '',
        //         change: (e) => dispatch(handleLoadInputOnChange({ company_name: e.target.value })),
        //         isMandatory: true,
        //         Err: commonState?.validated && !servicesState?.new_edit_load_card?.company_name ? "Company name required" : ''
        //     },
        //     {
        //         name: "Contact Number",
        //         type: "text",
        //         category: "input",
        //         placeholder: "",
        //         value: servicesState?.new_edit_load_card?.contact_no || '',
        //         change: (e) => {
        //             if (/^\d*$/.test(e.target.value) && e.target.value.length <= 10) {
        //                 dispatch(handleLoadInputOnChange({ contact_no: e.target.value }))
        //             }
        //         },
        //         isMandatory: true,
        //         Err: commonState?.validated && !servicesState?.new_edit_load_card?.contact_no ? "Contact number required" : ''
        //     },
        //     {
        //         name: "From",
        //         type: "text",
        //         category: "googleLocation",
        //         placeholder: "",
        //         value: servicesState?.new_edit_load_card?.from_location || '',
        //         change: (e) => dispatch(handleLoadInputOnChange({ from_location: e.target.value })),
        //         placedSelectedClick: (slectedLoc) => dispatch(handleLoadInputOnChange({ from_location: slectedLoc })),
        //         isMandatory: true,
        //         Err: commonState?.validated && !servicesState?.new_edit_load_card?.from_location ? "From location required" : ''
        //     },
        //     {
        //         name: "To",
        //         type: "text",
        //         category: "googleLocation",
        //         placeholder: "",
        //         value: servicesState?.new_edit_load_card?.to_location || '',
        //         change: (e) => dispatch(handleLoadInputOnChange({ to_location: e.target.value })),
        //         placedSelectedClick: (slectedLoc) => dispatch(handleLoadInputOnChange({ to_location: slectedLoc })),
        //         isMandatory: true,
        //         Err: commonState?.validated && !servicesState?.new_edit_load_card?.to_location ? "To location required" : ''
        //     },
        //     {
        //         name: "Material",
        //         type: "text",
        //         category: "input",
        //         placeholder: "",
        //         value: servicesState?.new_edit_load_card?.material || '',
        //         change: (e) => dispatch(handleLoadInputOnChange({ material: e.target.value })),
        //         isMandatory: true,
        //         Err: commonState?.validated && !servicesState?.new_edit_load_card?.material ? "Material required" : ''
        //     },
        //     {
        //         name: "Ton",
        //         type: "text",
        //         category: "input",
        //         placeholder: "",
        //         value: servicesState?.new_edit_load_card?.tone || '',
        //         change: (e) => {
        //             if (/^\d*$/.test(e.target.value)) {
        //                 dispatch(handleLoadInputOnChange({ tone: e.target.value }))
        //             }
        //         },
        //         isMandatory: true,
        //         Err: commonState?.validated && !servicesState?.new_edit_load_card?.tone ? "Tone required" : ''
        //     },
        //     {
        //         name: "Truck Body Type",
        //         type: "select",
        //         category: "select",
        //         placeholder: "",
        //         value: servicesState?.new_edit_load_card?.truck_body_type || '',
        //         options: jsonOnly.truckBodyType,
        //         change: (e) => dispatch(handleLoadInputOnChange({ truck_body_type: e.target.value })),
        //         isMandatory: true,
        //         Err: commonState?.validated && !servicesState?.new_edit_load_card?.truck_body_type ? "Truck body type required" : ''
        //     },
        //     {
        //         name: "No Of Tyres",
        //         type: "select",
        //         category: "select",
        //         placeholder: "",
        //         value: servicesState?.new_edit_load_card?.no_of_tyres || '',
        //         options: jsonOnly.noOfTyres,
        //         change: (e) => dispatch(handleLoadInputOnChange({ no_of_tyres: e.target.value })),
        //         isMandatory: true,
        //         Err: commonState?.validated && !servicesState?.new_edit_load_card?.no_of_tyres ? "No of tyres required" : ''
        //     },
        //     {
        //         name: "Description",
        //         type: "textbox",
        //         category: "textbox",
        //         placeholder: "",
        //         value: servicesState?.new_edit_load_card?.description || '',
        //         change: (e) => dispatch(handleLoadInputOnChange({ description: e.target.value })),
        //         isMandatory: false,
        //         // Err: commonState?.validated && !servicesState?.new_edit_load_card?.description ? "Description required" : ''
        //     }
        // ],
        // loadFilterInputs: [
        //     {
        //         name: "From Date",
        //         type: "date",
        //         category: "input",
        //         placeholder: "",
        //         value: servicesState?.load_filter_card?.from_date || '',
        //         change: (e) => dispatch(handleOnchangeLoadFilter({ from_date: e.target.value })),
        //         isMandatory: true,
        //     },
        //     {
        //         name: "To Date",
        //         type: "date",
        //         category: "input",
        //         placeholder: "",
        //         value: servicesState?.load_filter_card?.to_date || '',
        //         change: (e) => dispatch(handleOnchangeLoadFilter({ to_date: e.target.value })),
        //         isMandatory: true,
        //     },
        //     {
        //         name: "From",
        //         type: "text",
        //         category: "googleLocation",
        //         placeholder: "",
        //         value: servicesState?.load_filter_card?.from_location || '',
        //         change: (e) => dispatch(handleOnchangeLoadFilter({ from_location: e.target.value })),
        //         placedSelectedClick: (slectedLoc) => dispatch(handleOnchangeLoadFilter({ from_location: slectedLoc })),
        //         isMandatory: true
        //     },
        //     {
        //         name: "To",
        //         type: "select",
        //         category: "select",
        //         placeholder: "",
        //         options: jsonOnly.states,
        //         value: servicesState?.load_filter_card?.to_location || [],
        //         change: (value) => dispatch(handleOnchangeLoadFilter({ to_location: value })),
        //         isMandatory: true
        //     },
        //     {
        //         name: "Truck Body Type",
        //         type: "select",
        //         category: "select",
        //         placeholder: "",
        //         value: servicesState?.load_filter_card?.truck_body_type || '',
        //         options: jsonOnly.truckBodyType,
        //         change: (e) => dispatch(handleOnchangeLoadFilter({ truck_body_type: e.target.value })),
        //         isMandatory: true
        //     },
        //     {
        //         name: "No Of Tyres",
        //         type: "select",
        //         category: "select",
        //         placeholder: "",
        //         value: servicesState?.load_filter_card?.no_of_tyres || '',
        //         options: jsonOnly.noOfTyres,
        //         change: (e) => dispatch(handleOnchangeLoadFilter({ no_of_tyres: e.target.value })),
        //         isMandatory: true
        //     },
        //     {
        //         name: "Material",
        //         type: "text",
        //         category: "input",
        //         placeholder: "",
        //         value: servicesState?.load_filter_card?.material || '',
        //         change: (e) => dispatch(handleOnchangeLoadFilter({ material: e.target.value })),
        //         isMandatory: true
        //     },
        //     {
        //         name: "Ton",
        //         type: "select",
        //         category: "select",
        //         placeholder: "",
        //         value: servicesState?.load_filter_card?.ton || '',
        //         options: jsonOnly.tonnage,
        //         change: (e) => dispatch(handleOnchangeLoadFilter({ ton: e.target.value })),
        //         isMandatory: true
        //     }
        // ],


        // //                                                              truck                                                                  //
        // truckAddEditInputs: [
        //     {
        //         name: "Vehicle Number",
        //         type: "select",
        //         category: "select",
        //         placeholder: "",
        //         value: servicesState?.new_edit_truck_card?.vehicle_number || [],
        //         options: servicesState?.user_vehicle_list,
        //         change: (value) => dispatch(handleTruckInputOnChange({ vehicle_number: value, vehicle_number_selected: value[0]?.label })),
        //         isMandatory: true,
        //         Err: commonState?.validated && !servicesState?.new_edit_truck_card?.vehicle_number?.length ? "Vehicle number required" : ''
        //     },
        //     {
        //         name: "Company Name",
        //         type: "text",
        //         category: "input",
        //         placeholder: "",
        //         value: servicesState?.new_edit_truck_card?.company_name || '',
        //         change: (e) => dispatch(handleTruckInputOnChange({ company_name: e.target.value })),
        //         isMandatory: true,
        //         Err: commonState?.validated && !servicesState?.new_edit_truck_card?.company_name ? "Company name required" : ''
        //     },
        //     {
        //         name: "Contact Number",
        //         type: "text",
        //         category: "input",
        //         placeholder: "",
        //         value: servicesState?.new_edit_truck_card?.contact_no || '',
        //         change: (e) => {
        //             if (/^\d*$/.test(e.target.value) && e.target.value.length <= 10) {
        //                 dispatch(handleTruckInputOnChange({ contact_no: e.target.value }))
        //             }
        //         },
        //         isMandatory: true,
        //         Err: commonState?.validated && !servicesState?.new_edit_truck_card?.contact_no ? "Contact number required" : ''
        //     },
        //     {
        //         name: "Name of the transport",
        //         type: "text",
        //         category: "input",
        //         placeholder: "",
        //         value: servicesState?.new_edit_truck_card?.name_of_the_transport || '',
        //         change: (e) => dispatch(handleTruckInputOnChange({ name_of_the_transport: e.target.value })),
        //         isMandatory: true,
        //         Err: commonState?.validated && !servicesState?.new_edit_truck_card?.name_of_the_transport ? "Name of the transport required" : ''
        //     },
        //     {
        //         name: "Ton",
        //         type: "text",
        //         category: "input",
        //         placeholder: "",
        //         value: servicesState?.new_edit_truck_card?.tone || '',
        //         change: (e) => {
        //             if (/^\d*$/.test(e.target.value)) {
        //                 dispatch(handleTruckInputOnChange({ tone: e.target.value }))
        //             }
        //         },
        //         isMandatory: true,
        //         Err: commonState?.validated && !servicesState?.new_edit_truck_card?.tone ? "Ton required" : ''
        //     },
        //     {
        //         name: "Brand Name",
        //         type: "select",
        //         category: "select",
        //         placeholder: "",
        //         value: servicesState?.new_edit_truck_card?.truck_brand_name || '',
        //         options: jsonOnly.truckBrand,
        //         change: (e) => dispatch(handleTruckInputOnChange({ truck_brand_name: e.target.value })),
        //         isMandatory: true,
        //         Err: commonState?.validated && !servicesState?.new_edit_truck_card?.truck_brand_name ? "Truck brand name required" : ''
        //     },
        //     {
        //         name: "From",
        //         type: "text",
        //         category: "googleLocation",
        //         placeholder: "",
        //         value: servicesState?.new_edit_truck_card?.from_location || '',
        //         change: (e) => dispatch(handleTruckInputOnChange({ from_location: e.target.value })),
        //         placedSelectedClick: (slectedLoc) => dispatch(handleTruckInputOnChange({ from_location: slectedLoc })),
        //         isMandatory: true,
        //         Err: commonState?.validated && !servicesState?.new_edit_truck_card?.from_location ? "From location required" : ''
        //     },
        //     {
        //         name: "To",
        //         type: "select",
        //         category: "select",
        //         placeholder: "",
        //         value: servicesState?.new_edit_truck_card?.to_location || [],
        //         options: jsonOnly.states,
        //         change: (value) => dispatch(handleTruckInputOnChange({ to_location: value })),
        //         isMandatory: true,
        //         Err: commonState?.validated && !servicesState?.new_edit_truck_card?.to_location?.length ? "To location required" : ''
        //     },
        //     {
        //         name: "Truck Body Type",
        //         type: "select",
        //         category: "select",
        //         placeholder: "",
        //         value: servicesState?.new_edit_truck_card?.truck_body_type || '',
        //         options: jsonOnly.truckBodyType,
        //         change: (e) => dispatch(handleTruckInputOnChange({ truck_body_type: e.target.value })),
        //         isMandatory: true,
        //         Err: commonState?.validated && !servicesState?.new_edit_truck_card?.truck_body_type ? "Truck body type required" : ''
        //     },
        //     {
        //         name: "Truck Size",
        //         type: "text",
        //         category: "input",
        //         placeholder: "",
        //         value: servicesState?.new_edit_truck_card?.truck_size || '',
        //         change: (e) => {
        //             if (/^\d*$/.test(e.target.value)) {
        //                 dispatch(handleTruckInputOnChange({ truck_size: e.target.value }))
        //             }
        //         },
        //         isMandatory: true,
        //         Err: commonState?.validated && !servicesState?.new_edit_truck_card?.truck_size ? "Truck size required" : ''
        //     },
        //     {
        //         name: "No Of Tyres",
        //         type: "select",
        //         category: "select",
        //         placeholder: "",
        //         value: servicesState?.new_edit_truck_card?.no_of_tyres || '',
        //         options: jsonOnly.noOfTyres,
        //         change: (e) => dispatch(handleTruckInputOnChange({ no_of_tyres: e.target.value })),
        //         isMandatory: true,
        //         Err: commonState?.validated && !servicesState?.new_edit_truck_card?.no_of_tyres ? "No of tyres required" : ''
        //     },
        //     {
        //         name: "Description",
        //         type: "textbox",
        //         category: "textbox",
        //         placeholder: "",
        //         value: servicesState?.new_edit_truck_card?.description || '',
        //         change: (e) => dispatch(handleTruckInputOnChange({ description: e.target.value })),
        //         isMandatory: false,
        //         // Err:commonState?.validated && !servicesState?.new_edit_truck_card?.description ? "Description required" : ''
        //     }
        // ],
        // truckFilterInputs: [
        //     {
        //         name: "From Date",
        //         type: "date",
        //         category: "input",
        //         placeholder: "",
        //         value: servicesState?.truck_filter_card?.from_date || '',
        //         change: (e) => dispatch(handleOnchangeTruckFilter({ from_date: e.target.value })),
        //         isMandatory: true,
        //     },
        //     {
        //         name: "To Date",
        //         type: "date",
        //         category: "input",
        //         placeholder: "",
        //         value: servicesState?.truck_filter_card?.to_date || '',
        //         change: (e) => dispatch(handleOnchangeTruckFilter({ to_date: e.target.value })),
        //         isMandatory: true,
        //     },
        //     {
        //         name: "From",
        //         type: "text",
        //         category: "googleLocation",
        //         placeholder: "",
        //         value: servicesState?.truck_filter_card?.from_location || '',
        //         change: (e) => dispatch(handleOnchangeTruckFilter({ from_location: e.target.value })),
        //         placedSelectedClick: (slectedLoc) => dispatch(handleOnchangeTruckFilter({ from_location: slectedLoc })),
        //         isMandatory: true
        //     },
        //     {
        //         name: "To",
        //         type: "select",
        //         category: "select",
        //         placeholder: "",
        //         options: jsonOnly.states,
        //         value: servicesState?.truck_filter_card?.to_location || [],
        //         change: (value) => dispatch(handleOnchangeTruckFilter({ to_location: value })),
        //         isMandatory: true
        //     },
        //     {
        //         name: "Brand Name",
        //         type: "select",
        //         category: "select",
        //         placeholder: "",
        //         value: servicesState?.truck_filter_card?.truck_name || '',
        //         options: jsonOnly.truckBrand,
        //         change: (e) => dispatch(handleOnchangeTruckFilter({ truck_name: e.target.value })),
        //         isMandatory: true
        //     },
        //     {
        //         name: "Truck Body Type",
        //         type: "select",
        //         category: "select",
        //         placeholder: "",
        //         value: servicesState?.truck_filter_card?.truck_body_type || '',
        //         options: jsonOnly.truckBodyType,
        //         change: (e) => dispatch(handleOnchangeTruckFilter({ truck_body_type: e.target.value })),
        //         isMandatory: true
        //     },
        //     {
        //         name: "No Of Tyres",
        //         type: "select",
        //         category: "select",
        //         placeholder: "",
        //         value: servicesState?.truck_filter_card?.no_of_tyres || '',
        //         options: jsonOnly.noOfTyres,
        //         change: (e) => dispatch(handleOnchangeTruckFilter({ no_of_tyres: e.target.value })),
        //         isMandatory: true
        //     },
        //     {
        //         name: "Ton",
        //         type: "select",
        //         category: "select",
        //         placeholder: "",
        //         value: servicesState?.truck_filter_card?.tone || '',
        //         options: jsonOnly.tonnage,
        //         change: (e) => dispatch(handleOnchangeTruckFilter({ tone: e.target.value })),
        //         isMandatory: true
        //     }
        // ],


        // //                                                               driver                                                                //
        // driverAddEditInputs: [
        //     {
        //         name: "Vehicle Number",
        //         type: "select",
        //         category: "select",
        //         placeholder: "",
        //         value: servicesState?.new_edit_driver_card?.vehicle_number || [],
        //         options: servicesState?.user_vehicle_list,
        //         change: (value) => dispatch(handleDriverInputOnChange({ vehicle_number: value, vehicle_number_selected: value[0]?.label })),
        //         isMandatory: true,
        //         Err: commonState?.validated && !servicesState?.new_edit_driver_card?.vehicle_number?.length ? "Vehicle number required" : ''
        //     },
        //     {
        //         name: "Company Name",
        //         type: "text",
        //         category: "input",
        //         placeholder: "",
        //         value: servicesState?.new_edit_driver_card?.company_name || '',
        //         change: (e) => dispatch(handleDriverInputOnChange({ company_name: e.target.value })),
        //         isMandatory: true
        //     },
        //     {
        //         name: "Driver Name",
        //         type: "text",
        //         category: "input",
        //         placeholder: "",
        //         value: servicesState?.new_edit_driver_card?.driver_name || '',
        //         change: (e) => dispatch(handleDriverInputOnChange({ driver_name: e.target.value })),
        //         isMandatory: true
        //     },
        //     {
        //         name: "Contact Number",
        //         type: "text",
        //         category: "input",
        //         placeholder: "",
        //         value: servicesState?.new_edit_driver_card?.contact_no || '',
        //         change: (e) => {
        //             if (/^\d*$/.test(e.target.value) && e.target.value.length <= 10) {
        //                 dispatch(handleDriverInputOnChange({ contact_no: e.target.value }))
        //             }
        //         },
        //         isMandatory: true
        //     },
        //     {
        //         name: "From",
        //         type: "text",
        //         category: "googleLocation",
        //         placeholder: "",
        //         value: servicesState?.new_edit_driver_card?.from_location || '',
        //         change: (e) => dispatch(handleDriverInputOnChange({ from_location: e.target.value })),
        //         placedSelectedClick: (slectedLoc) => dispatch(handleDriverInputOnChange({ from_location: slectedLoc })),
        //         isMandatory: true
        //     },
        //     {
        //         name: "To",
        //         type: "text",
        //         category: "googleLocation",
        //         placeholder: "",
        //         value: servicesState?.new_edit_driver_card?.to_location || '',
        //         change: (e) => dispatch(handleDriverInputOnChange({ to_location: e.target.value })),
        //         placedSelectedClick: (slectedLoc) => dispatch(handleDriverInputOnChange({ to_location: slectedLoc })),
        //         isMandatory: true
        //     },

        //     {
        //         name: "Truck Body Type",
        //         type: "select",
        //         category: "select",
        //         placeholder: "",
        //         value: servicesState?.new_edit_driver_card?.truck_body_type || '',
        //         options: jsonOnly.truckBodyType,
        //         change: (e) => dispatch(handleDriverInputOnChange({ truck_body_type: e.target.value })),
        //         isMandatory: true
        //     },
        //     {
        //         name: "No Of Tyres",
        //         type: "select",
        //         category: "select",
        //         placeholder: "",
        //         value: servicesState?.new_edit_driver_card?.no_of_tyres || '',
        //         options: jsonOnly.noOfTyres,
        //         change: (e) => dispatch(handleDriverInputOnChange({ no_of_tyres: e.target.value })),
        //         isMandatory: true
        //     },
        //     {
        //         name: "Description",
        //         type: "textbox",
        //         category: "textbox",
        //         placeholder: "",
        //         value: servicesState?.new_edit_driver_card?.description || '',
        //         change: (e) => dispatch(handleDriverInputOnChange({ description: e.target.value })),
        //         isMandatory: false
        //     }
        // ],
        // driverFilterInputs: [
        //     {
        //         name: "From Date",
        //         type: "date",
        //         category: "input",
        //         placeholder: "",
        //         value: servicesState?.driver_filter_card?.from_date || '',
        //         change: (e) => dispatch(handleOnchangeDriverFilter({ from_date: e.target.value })),
        //         isMandatory: true,
        //     },
        //     {
        //         name: "To Date",
        //         type: "date",
        //         category: "input",
        //         placeholder: "",
        //         value: servicesState?.driver_filter_card?.to_date || '',
        //         change: (e) => dispatch(handleOnchangeDriverFilter({ to_date: e.target.value })),
        //         isMandatory: true,
        //     },
        //     {
        //         name: "From",
        //         type: "text",
        //         category: "googleLocation",
        //         placeholder: "",
        //         value: servicesState?.driver_filter_card?.from_location || '',
        //         change: (e) => dispatch(handleOnchangeDriverFilter({ from_location: e.target.value })),
        //         placedSelectedClick: (slectedLoc) => dispatch(handleOnchangeDriverFilter({ from_location: slectedLoc })),
        //         isMandatory: true
        //     },
        //     {
        //         name: "To",
        //         type: "select",
        //         category: "select",
        //         placeholder: "",
        //         options: jsonOnly.states,
        //         value: servicesState?.driver_filter_card?.to_location || [],
        //         change: (value) => dispatch(handleOnchangeDriverFilter({ to_location: value })),
        //         isMandatory: true
        //     },
        //     {
        //         name: "Truck Body Type",
        //         type: "select",
        //         category: "select",
        //         placeholder: "",
        //         value: servicesState?.driver_filter_card?.truck_body_type || '',
        //         options: jsonOnly.truckBodyType,
        //         change: (e) => dispatch(handleOnchangeDriverFilter({ truck_body_type: e.target.value })),
        //         isMandatory: true
        //     },
        //     {
        //         name: "No Of Tyres",
        //         type: "select",
        //         category: "select",
        //         placeholder: "",
        //         value: servicesState?.driver_filter_card?.no_of_tyres || '',
        //         options: jsonOnly.noOfTyres,
        //         change: (e) => dispatch(handleOnchangeDriverFilter({ no_of_tyres: e.target.value })),
        //         isMandatory: true
        //     }
        // ],


        // //                                                             buy and sell                                                            //
        // buyAndSellAddEdit: [
        //     {
        //         name: "Model Year",
        //         type: "select",
        //         category: "select",
        //         placeholder: "",
        //         options: modelYears(),
        //         value: servicesState?.new_edit_buyAndsell_card?.model || '',
        //         change: (e) => dispatch(handleBuyAndSellInputOnChange({ model: e.target.value })),
        //         isMandatory: true,
        //         Err: commonState?.validated && !servicesState?.new_edit_buyAndsell_card?.model ? "Model required" : ''
        //     },
        //     {
        //         name: "Brand Name",
        //         type: "select",
        //         category: "select",
        //         placeholder: "",
        //         value: servicesState?.new_edit_buyAndsell_card?.brand || '',
        //         options: jsonOnly.truckBrand,
        //         change: (e) => dispatch(handleBuyAndSellInputOnChange({ brand: e.target.value })),
        //         isMandatory: true,
        //         Err: commonState?.validated && !servicesState?.new_edit_buyAndsell_card?.brand ? "Brand required" : ''
        //     },
        //     {
        //         name: "Owner Name",
        //         type: "text",
        //         category: "input",
        //         placeholder: "",
        //         value: servicesState?.new_edit_buyAndsell_card?.owner_name || '',
        //         change: (e) => dispatch(handleBuyAndSellInputOnChange({ owner_name: e.target.value })),
        //         isMandatory: true,
        //         Err: commonState?.validated && !servicesState?.new_edit_buyAndsell_card?.owner_name ? "Owner name required" : ''
        //     },
        //     {
        //         name: "Vehicle Number",
        //         type: "select",
        //         category: "select",
        //         placeholder: "",
        //         value: servicesState?.new_edit_buyAndsell_card?.vehicle_number || [],
        //         options: servicesState?.user_vehicle_list,
        //         change: (value) => dispatch(handleBuyAndSellInputOnChange({ vehicle_number: value, vehicle_number_selected: value[0]?.label })),
        //         isMandatory: true,
        //         Err: commonState?.validated && !servicesState?.new_edit_buyAndsell_card?.vehicle_number?.length ? "Vehicle number required" : ''
        //     },
        //     {
        //         name: "Kilometers driven",
        //         type: "text",
        //         category: "input",
        //         placeholder: "",
        //         value: servicesState?.new_edit_buyAndsell_card?.kms_driven || '',
        //         change: (e) => {
        //             if (/^\d*$/.test(e.target.value)) {
        //                 dispatch(handleBuyAndSellInputOnChange({ kms_driven: e.target.value }))
        //             }
        //         },
        //         isMandatory: true,
        //         Err: commonState?.validated && !servicesState?.new_edit_buyAndsell_card?.kms_driven ? "Kilometers required" : ''
        //     },
        //     {
        //         name: "Price",
        //         type: "text",
        //         category: "input",
        //         placeholder: "",
        //         value: servicesState?.new_edit_buyAndsell_card?.price || '',
        //         change: (e) => {
        //             if (/^\d*$/.test(e.target.value)) {
        //                 dispatch(handleBuyAndSellInputOnChange({ price: e.target.value }))
        //             }
        //         },
        //         isMandatory: true,
        //         Err: commonState?.validated && !servicesState?.new_edit_buyAndsell_card?.price ? "Price required" : ''
        //     },
        //     {
        //         name: "Tonnage",
        //         type: "text",
        //         category: "input",
        //         placeholder: "",
        //         value: servicesState?.new_edit_buyAndsell_card?.tonnage || '',
        //         change: (e) => {
        //             if (/^\d*$/.test(e.target.value)) {
        //                 dispatch(handleBuyAndSellInputOnChange({ tonnage: e.target.value }))
        //             }
        //         },
        //         isMandatory: true,
        //         Err: commonState?.validated && !servicesState?.new_edit_buyAndsell_card?.tonnage ? "Tonnage required" : ''
        //     },
        //     {
        //         name: "Location",
        //         type: "text",
        //         category: "googleLocation",
        //         placeholder: "",
        //         value: servicesState?.new_edit_buyAndsell_card?.location || '',
        //         change: (e) => dispatch(handleBuyAndSellInputOnChange({ location: e.target.value })),
        //         placedSelectedClick: (slectedLoc) => dispatch(handleBuyAndSellInputOnChange({ location: slectedLoc })),
        //         isMandatory: true,
        //         Err: commonState?.validated && !servicesState?.new_edit_buyAndsell_card?.location ? "Location required" : ''
        //     },
        //     {
        //         name: "Contact Number",
        //         type: "text",
        //         category: "input",
        //         placeholder: "",
        //         value: servicesState?.new_edit_buyAndsell_card?.contact_no || '',
        //         change: (e) => {
        //             if (/^\d*$/.test(e.target.value) && e.target.value.length <= 10) {
        //                 dispatch(handleBuyAndSellInputOnChange({ contact_no: e.target.value }))
        //             }
        //         },
        //         isMandatory: true,
        //         Err: commonState?.validated && !servicesState?.new_edit_buyAndsell_card?.contact_no ? "Contact Number required" : ''
        //     },

        //     {
        //         name: "Truck Body Type",
        //         type: "select",
        //         category: "select",
        //         placeholder: "",
        //         value: servicesState?.new_edit_buyAndsell_card?.truck_body_type || '',
        //         options: jsonOnly.truckBodyType,
        //         change: (e) => dispatch(handleBuyAndSellInputOnChange({ truck_body_type: e.target.value })),
        //         isMandatory: true,
        //         Err: commonState?.validated && !servicesState?.new_edit_buyAndsell_card?.truck_body_type ? "Truck Body Type required" : ''
        //     },
        //     {
        //         name: "No Of Tyres",
        //         type: "select",
        //         category: "select",
        //         placeholder: "",
        //         value: servicesState?.new_edit_buyAndsell_card?.no_of_tyres || '',
        //         options: jsonOnly.noOfTyres,
        //         change: (e) => dispatch(handleBuyAndSellInputOnChange({ no_of_tyres: e.target.value })),
        //         isMandatory: true,
        //         Err: commonState?.validated && !servicesState?.new_edit_buyAndsell_card?.no_of_tyres ? "No Of Tyres required" : ''
        //     },
        //     {
        //         name: "Upload image",
        //         type: "file",
        //         category: "input",
        //         placeholder: "",
        //         value: servicesState?.new_edit_buyAndsell_card?.blog_image_show_ui || [],
        //         change: (e) => {
        //             // -- For Multiple File Input
        //             let myImages = servicesState?.new_edit_buyAndsell_card?.blog_image_show_ui;
        //             let makeImagesList = [];

        //             // Use `Promise.all` to handle async file reading
        //             Promise.all(
        //                 Array.from(e.target.files).map((file) => readFile(file))
        //             )
        //                 .then((results) => {
        //                     makeImagesList = results;
        //                     if (myImages) {
        //                         makeImagesList = [...myImages, ...makeImagesList];
        //                     }

        //                     dispatch(handleBuyAndSellInputOnChange({ blog_image_show_ui: makeImagesList, blog_image_send_api: e.target.files }));
        //                 })
        //                 .catch((error) => console.error('Error reading files:', error));
        //         },
        //         isMandatory: true,
        //         Err: commonState?.validated && !servicesState?.new_edit_buyAndsell_card?.blog_image_show_ui?.length ? "Image required" : ''
        //     },
        //     {
        //         name: "Description",
        //         type: "textbox",
        //         category: "textbox",
        //         placeholder: "",
        //         value: servicesState?.new_edit_buyAndsell_card?.description || '',
        //         change: (e) => dispatch(handleBuyAndSellInputOnChange({ description: e.target.value })),
        //         isMandatory: false
        //     }
        // ],
        // buyAndSellFilterInputs: [
        //     {
        //         name: "From Date",
        //         type: "date",
        //         category: "input",
        //         placeholder: "",
        //         value: servicesState?.buyAndsell_filter_card?.from_date || '',
        //         change: (e) => dispatch(handleOnchangeBuyAndSellFilter({ from_date: e.target.value })),
        //         isMandatory: true,
        //     },
        //     {
        //         name: "To Date",
        //         type: "date",
        //         category: "input",
        //         placeholder: "",
        //         value: servicesState?.buyAndsell_filter_card?.to_date || '',
        //         change: (e) => dispatch(handleOnchangeBuyAndSellFilter({ to_date: e.target.value })),
        //         isMandatory: true,
        //     },
        //     {
        //         name: "Model Year",
        //         type: "select",
        //         category: "select",
        //         placeholder: "",
        //         options: modelTenYears(),
        //         value: servicesState?.buyAndsell_filter_card?.model,
        //         change: (e) => dispatch(handleOnchangeBuyAndSellFilter({ model: e.target.value })),
        //         isMandatory: true
        //     },
        //     {
        //         name: "Brand Name",
        //         type: "select",
        //         category: "select",
        //         placeholder: "",
        //         value: servicesState?.buyAndsell_filter_card?.brand,
        //         options: jsonOnly.truckBrand,
        //         change: (e) => dispatch(handleOnchangeBuyAndSellFilter({ brand: e.target.value })),
        //         isMandatory: true
        //     },
        //     {
        //         name: "Location",
        //         type: "text",
        //         category: "googleLocation",
        //         placeholder: "",
        //         value: servicesState?.buyAndsell_filter_card?.location,
        //         change: (e) => dispatch(handleOnchangeBuyAndSellFilter({ location: e.target.value })),
        //         placedSelectedClick: (slectedLoc) => dispatch(handleOnchangeBuyAndSellFilter({ location: slectedLoc })),
        //         isMandatory: true
        //     },
        //     {
        //         name: "State list",
        //         type: "select",
        //         category: "select",
        //         placeholder: "",
        //         options: jsonOnly.states,
        //         value: servicesState?.buyAndsell_filter_card?.statelist || [],
        //         change: (value) => dispatch(handleOnchangeBuyAndSellFilter({ statelist: value })),
        //         isMandatory: true
        //     },
        //     {
        //         name: "Kilometers driven",
        //         type: "select",
        //         category: "select",
        //         placeholder: "",
        //         value: servicesState?.buyAndsell_filter_card?.kmd_driven,
        //         options: jsonOnly.filterKilometers,
        //         change: (e) => dispatch(handleOnchangeBuyAndSellFilter({ kmd_driven: e.target.value })),
        //         isMandatory: true
        //     },
        //     {
        //         name: "Price",
        //         type: "select",
        //         category: "select",
        //         placeholder: "",
        //         value: servicesState?.buyAndsell_filter_card?.price,
        //         options: jsonOnly.filterPrice,
        //         change: (e) => dispatch(handleOnchangeBuyAndSellFilter({ price: e.target.value })),
        //         isMandatory: true
        //     },
        //     {
        //         name: "Tonnage",
        //         type: "select",
        //         category: "select",
        //         placeholder: "",
        //         value: servicesState?.buyAndsell_filter_card?.tonnage,
        //         options: jsonOnly.tonnage,
        //         change: (e) => dispatch(handleOnchangeBuyAndSellFilter({ tonnage: e.target.value })),
        //         isMandatory: true
        //     },
        //     {
        //         name: "Truck Body Type",
        //         type: "select",
        //         category: "select",
        //         placeholder: "",
        //         value: servicesState?.buyAndsell_filter_card?.truck_body_type,
        //         options: jsonOnly.truckBodyType,
        //         change: (e) => dispatch(handleOnchangeBuyAndSellFilter({ truck_body_type: e.target.value })),
        //         isMandatory: true
        //     },
        //     {
        //         name: "No Of Tyres",
        //         type: "select",
        //         category: "select",
        //         placeholder: "",
        //         value: servicesState?.buyAndsell_filter_card?.no_of_tyres,
        //         options: jsonOnly.noOfTyres,
        //         change: (e) => dispatch(handleOnchangeBuyAndSellFilter({ no_of_tyres: e.target.value })),
        //         isMandatory: true
        //     }
        // ],


        // //                                                             feedback and complaint                                                  //
        // feebbackUpdateOrWatchStatus: [
        //     {
        //         name: "Complaint ID",
        //         type: "text",
        //         category: "input",
        //         placeholder: "",
        //         value: feedbackState?.feedback_modal_data?.complaint_id || '',
        //         isMandatory: true,
        //         disabled: true
        //     },
        //     {
        //         name: "Customer Name",
        //         type: "text",
        //         category: "input",
        //         placeholder: "",
        //         value: feedbackState?.feedback_modal_data?.customer_name || '',
        //         isMandatory: true,
        //         disabled: true
        //     },
        //     {
        //         name: "Category",
        //         type: "text",
        //         category: "input",
        //         placeholder: "",
        //         value: feedbackState?.feedback_modal_data?.category || '',
        //         isMandatory: true,
        //         disabled: true
        //     },
        //     {
        //         name: "Email ID",
        //         type: "email",
        //         category: "input",
        //         placeholder: "",
        //         value: feedbackState?.feedback_modal_data?.email_id || '',
        //         isMandatory: true,
        //         disabled: true
        //     },
        //     {
        //         name: "Phone Number",
        //         type: "text",
        //         category: "input",
        //         placeholder: "",
        //         value: feedbackState?.feedback_modal_data?.phone_no || '',
        //         isMandatory: true,
        //         disabled: true
        //     },
        //     {
        //         name: "complaint_date",
        //         type: "date",
        //         category: "input",
        //         placeholder: "",
        //         value: feedbackState?.feedback_modal_data?.complaint_date ? formatDateForInput(feedbackState?.feedback_modal_data?.complaint_date) : '',
        //         isMandatory: true,
        //         disabled: true
        //     },
        //     {
        //         name: "solved_date",
        //         type: "date",
        //         category: "input",
        //         placeholder: "",
        //         value: feedbackState?.feedback_modal_data?.solved_date ? formatDateForInput(feedbackState?.feedback_modal_data?.solved_date) : '',
        //         isMandatory: true,
        //         disabled: true
        //     },
        //     {
        //         name: "content",
        //         type: "date",
        //         category: "textbox",
        //         placeholder: "",
        //         value: feedbackState?.feedback_modal_data?.content || '',
        //         isMandatory: true,
        //         disabled: true
        //     },
        //     {
        //         name: "Remarks",
        //         type: "date",
        //         category: "textbox",
        //         placeholder: "",
        //         value: feedbackState?.feedback_modal_data?.remarks || '',
        //         change: (e) => dispatch(handleFeedbackModalOnChange({ ...feedbackState?.feedback_modal_data, remarks: e.target.value })),
        //         isMandatory: true,
        //         disabled: servicesState?.modal_from === "Feedback" &&
        //             (servicesState?.modal_type === "" || servicesState?.modal_type === "not solved") ? false : true,
        //         Err: commonState?.validated && !feedbackState?.remarks ? "Remarks required" : ''
        //     },
        // ],


        // //                                                             CRM Modal onchange                                                      //
        // crmStatusModal: [
        //     {
        //         name: "CRM Status",
        //         type: "select",
        //         category: "select",
        //         placeholder: "",
        //         options: jsonOnly?.crm_status_options,
        //         value: crmState?.crm_status_entry?.crm_status || '',
        //         change: (e) => dispatch(handleOnchangeCrmStatus({ crm_status: e.target.value })),
        //         isMandatory: true,
        //         Err: commonState?.validated && !crmState?.crm_status_entry?.crm_status ? "Crm status required" : ''
        //     },
        //     {
        //         name: "Next call date",
        //         type: "date",
        //         category: "input",
        //         placeholder: "",
        //         value: crmState?.crm_status_entry?.entry_date || '',
        //         change: (e) => dispatch(handleOnchangeCrmStatus({ entry_date: e.target.value })),
        //         isMandatory: true,
        //         Err: commonState?.validated && !crmState?.crm_status_entry?.entry_date ? "Next call date required" : ''
        //     },
        //     {
        //         name: "Message",
        //         type: "textbox",
        //         category: "textbox",
        //         placeholder: "",
        //         value: crmState?.crm_status_entry?.message || '',
        //         change: (e) => dispatch(handleOnchangeCrmStatus({ message: e.target.value })),
        //         isMandatory: false,
        //         Err: commonState?.validated && !crmState?.crm_status_entry?.message ? "Owner name required" : ''
        //     },
        // ],
        // crmStatusBeforeSaleEntryModal: [
        //     {
        //         name: "Name",
        //         type: "text",
        //         category: "input",
        //         placeholder: "",
        //         value: crmState?.crm_before_sale_entry?.name || '',
        //         change: (e) => dispatch(handleOnchangeCrmBeforeSaleEntry({ name: e.target.value })),
        //         isMandatory: true,
        //         Err: commonState?.validated && !crmState?.crm_before_sale_entry?.name ? "Name required" : ''
        //     },
        //     {
        //         name: "Email id",
        //         type: "text",
        //         category: "input",
        //         placeholder: "",
        //         value: crmState?.crm_before_sale_entry?.email_id || '',
        //         change: (e) => dispatch(handleOnchangeCrmBeforeSaleEntry({ email_id: e.target.value })),
        //         isMandatory: true,
        //         Err: commonState?.validated && !crmState?.crm_before_sale_entry?.email_id ? "Email id required" : ''
        //     },
        //     {
        //         name: "Phone number",
        //         type: "text",
        //         category: "input",
        //         placeholder: "",
        //         value: crmState?.crm_before_sale_entry?.phone_no || '',
        //         change: (e) => {
        //             if (/^\d*$/.test(e.target.value) && e.target.value.length <= 10) {
        //                 dispatch(handleOnchangeCrmBeforeSaleEntry({ phone_no: e.target.value }))
        //             }
        //         },
        //         isMandatory: true,
        //         Err: commonState?.validated && !crmState?.crm_before_sale_entry?.phone_no ? "Mobile Number Required" : null
        //     },
        //     {
        //         name: "Location",
        //         type: "text",
        //         category: "googleLocation",
        //         placeholder: "",
        //         value: crmState?.crm_before_sale_entry?.location || '',
        //         change: (e) => dispatch(handleOnchangeCrmBeforeSaleEntry({ location: e.target.value })),
        //         placedSelectedClick: (slectedLoc) => dispatch(handleOnchangeCrmBeforeSaleEntry({ location: slectedLoc })),
        //         isMandatory: true,
        //         Err: commonState?.validated && !crmState?.crm_before_sale_entry?.location ? "location required" : ''
        //     },
        // ]
    }

    return {
        "jsonOnly": jsonOnly,
        "jsxJson": jsxJson
    }
}

export default JsonData