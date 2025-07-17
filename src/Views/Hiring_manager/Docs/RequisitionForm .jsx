import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "../../../Stylesheet/Css/App.css";
import DataTable from "react-data-table-component";
import { PlusCircle } from "react-bootstrap-icons";
import { Button, Form } from "react-bootstrap";
import axiosInstance from "Services/axiosInstance";
import { useCommonState } from "Components/CustomHooks";
import { useLocation, useNavigate } from "react-router-dom";
import Select from "react-select";
import CreatableSelect from "react-select/creatable";
import { ToastContainer, toast } from "react-toastify";

const AccordionItem = ({ title, children, isOpen, onClick }) => (
  <div className="mb-2">
    <div
      className="d-flex justify-content-between align-items-center p-3 bg-primary bg-opacity-25"
      style={{ cursor: "pointer" }}
      onClick={onClick}
    >
      <strong>{title}</strong>
      {isOpen ? <FaChevronUp /> : <FaChevronDown />}
    </div>
    {isOpen && <div className="border p-3 bg-light">{children}</div>}
  </div>
);

const RequisitionForm = (handleNext) => {
  const navigate = useNavigate();
  const { commonState } = useCommonState();
  const [openSection, setOpenSection] = useState(null);
  const [completedSections, setCompletedSections] = useState([]);

  const [internalDesc, setInternalDesc] = useState("");
  const [externalDesc, setExternalDesc] = useState("");

  const [Reqid, setReqid] = useState([]);
  const [planid, setPlanId] = useState([]);
  const [tempDetails, setTempDetails] = useState();
  const [reqtempid, setreqtempid] = useState(localStorage.getItem("reqtempid"));

  const routelocation = useLocation();

  const { user_role, user_id } = commonState?.app_data;

  const [Competencies, setCompetencies] = useState([
    {
      id: Date.now(),
      isNew: true,
      competency: "",
      library: "",
      category: "",
      ExpectedRating: "",
      weight: "",
      requisition: reqtempid || null,
    },
  ]);

  const [questions, setQuestions] = useState([
    {
      id: Date.now(),
      isNew: true,
      question: "",
      required: "",
      disqualifier: "",
      score: "",
      weight: "",
      requisition: reqtempid || null,
    },
  ]);

  console.log(questions, "sdfds");

  const [questionsHeader, setQuestionsHeader] = useState([
    {
      name: "Question",
      width: "20%",
      cell: (row) =>
        row.isNew ? (
          <Form.Control
            type="text"
            value={row.question}
            onChange={(e) =>
              handleQuestionInputChange(row.id, "question", e.target.value)
            }
            placeholder="Question"
          />
        ) : (
          row.question
        ),
    },
    {
      name: "Required",
      cell: (row) =>
        row.isNew ? (
          <Form.Control
            type="text"
            value={row.required}
            onChange={(e) =>
              handleQuestionInputChange(row.id, "required", e.target.value)
            }
            placeholder="Required"
          />
        ) : (
          row.required
        ),
    },
    {
      name: "Disqualifier",
      width: "20%",
      cell: (row) =>
        row.isNew ? (
          <Form.Control
            type="text"
            value={row.disqualifier}
            onChange={(e) =>
              handleQuestionInputChange(row.id, "disqualifier", e.target.value)
            }
            placeholder="Disqualifier"
          />
        ) : (
          row.disqualifier
        ),
    },
    {
      name: "Score",
      width: "20%",
      cell: (row) =>
        row.isNew ? (
          <Form.Control
            type="text"
            value={row.score}
            onChange={(e) =>
              handleQuestionInputChange(row.id, "score", e.target.value)
            }
            placeholder="Score"
          />
        ) : (
          row.score
        ),
    },

    {
      name: "Weight",
      width: "20%",
      cell: (row) =>
        row.isNew ? (
          <Form.Control
            type="text"
            value={row.weight}
            onChange={(e) =>
              handleQuestionInputChange(row.id, "weight", e.target.value)
            }
            placeholder="Weight"
          />
        ) : (
          row.weight
        ),
    },
    {
      name: "Actions",
    },
  ]);

  const [CompetenciesHeaders, setCompetenciesHeaders] = useState([
    {
      name: "competency",
      width: "20%",
      cell: (row) =>
        row.isNew ? (
          <Form.Control
            type="text"
            value={row.competency}
            onChange={(e) =>
              handleCompetenciesInputChange(
                row.id,
                "competency",
                e.target.value
              )
            }
            placeholder="competency"
          />
        ) : (
          row.competency
        ),
    },
    {
      name: "library",
      cell: (row) =>
        row.isNew ? (
          <Form.Control
            type="text"
            value={row.library}
            onChange={(e) =>
              handleCompetenciesInputChange(row.id, "library", e.target.value)
            }
            placeholder="library"
          />
        ) : (
          row.library
        ),
    },
    {
      name: "category",
      width: "20%",
      cell: (row) =>
        row.isNew ? (
          <Form.Control
            type="text"
            value={row.category}
            onChange={(e) =>
              handleCompetenciesInputChange(row.id, "category", e.target.value)
            }
            placeholder="category"
          />
        ) : (
          row.category
        ),
    },
    {
      name: "Expected Rating",
      width: "20%",
      cell: (row) =>
        row.isNew ? (
          <Form.Control
            type="text"
            value={row.expected_rating}
            onChange={(e) =>
              handleCompetenciesInputChange(
                row.id,
                "expected_rating",
                e.target.value
              )
            }
            placeholder="Expected Rating"
          />
        ) : (
          row.expected_rating
        ),
    },

    {
      name: "Weight %",
      width: "20%",
      cell: (row) =>
        row.isNew ? (
          <Form.Control
            type="text"
            value={row.weight}
            onChange={(e) =>
              handleCompetenciesInputChange(row.id, "weight", e.target.value)
            }
            placeholder="Weight"
          />
        ) : (
          row.weight
        ),
    },
    {
      name: "Actions",
    },
  ]);

  useEffect(() => {
    reset({
      plan_id: createrequisitiondata?.hiring_plan_id,
    });
  }, []);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axiosInstance.post(
          "/get_plan_id_position_role/",
          {},
          {
            headers: { "Content-Type": "application/json" },
          }
        );

        setPlanId(response?.data?.data);
      } catch (error) {
        console.log(error, "errr");
      }
    }
    fetchData();
  }, []);

  async function fetch_reqs() {
    try {
      const idresponse = await axiosInstance.get("/reqs/ids/");
      setReqid(idresponse?.data?.data);

      let gettempleteDetail;

      if (reqtempid) {
        gettempleteDetail = await axiosInstance.post(
          "/get_requisition_by_id/",
          {
            req_id: reqtempid,
          }
        );
      }

      if (gettempleteDetail?.data?.error_code == 200) {
        localStorage.removeItem("reqtempid");
        const templeteDetails = gettempleteDetail?.data?.data;
        const {
          Planning_id,
          user_role,
          HiringManager,
          PositionTitle,
          requisition_information,
          position_information,
          billing_details,
          posting_details,
          asset_deatils,
          skills_required,
        } = templeteDetails;

        const {
          internalDesc,
          externalDesc,
          questions,
          Competencies,
          experience,
          qualification,
          designation,
          job_region,
        } = posting_details;

        const { primary_skills, secondary_skills } = skills_required;

        let formattedPrimarySkills;
        if (primary_skills) {
          formattedPrimarySkills = primary_skills.map((item) => ({
            label: item,
            value: item,
          }));
        }

        let formattedSecondarySkills;
        if (secondary_skills) {
          formattedSecondarySkills = secondary_skills.map((item) => ({
            label: item,
            value: item,
          }));
        }

        let formattedexperience;
        if (experience) {
          formattedexperience = experience.map((item) => ({
            label: item,
            value: item,
          }));
        }

        let formattedqualification;
        if (qualification) {
          formattedqualification = qualification.map((item) => ({
            label: item,
            value: item,
          }));
        }

        let formattedjobregion;
        if (job_region) {
          formattedjobregion = job_region.map((item) => ({
            label: item,
            value: item,
          }));
        }

        let formatteddesignation;
        if (designation) {
          console.log(designation, "adada");
          formatteddesignation = designation.map((item) => ({
            label: item,
            value: item,
          }));
        }

        setInternalDesc(internalDesc);
        setExternalDesc(externalDesc);
        setCompetencies(
          Competencies.map((c) => ({ ...c, isNew: true, id: Date.now() }))
        );
        setQuestions(
          questions.map((q) => ({ ...q, isNew: true, id: Date.now() }))
        );

        reset({
          plan_id: Planning_id,
          user_role,
          HiringManager,
          PositionTitle,
          primary_skills: formattedPrimarySkills,
          secondary_skills: formattedSecondarySkills,
          experience: formattedexperience,
          designation: formatteddesignation,
          job_region: formattedjobregion,
          qualification: formattedqualification,
          ...requisition_information,
          ...position_information,
          ...billing_details,
          ...asset_deatils,
          // team_name: posting_details?.teams[0]?.team_name,
          // team_type_2: posting_details?.teams[1]?.team_type,
          // team_type_3: posting_details?.teams[2]?.team_type,
          // interview_teammate_1: posting_details?.interview_team[0]?.employee_id,
          // interview_teammate_2: posting_details?.interview_team[1]?.employee_id,
        });
      }
    } catch (err) {
      console.log(err?.message || "Something went wrong");
    }
  }

  useEffect(() => {
    fetch_reqs();
  }, [reqtempid]);

  useEffect(() => {
    let edit_req_id;
    if (routelocation.state) {
      edit_req_id = routelocation?.state?.id;
    }
    setreqtempid(edit_req_id);
    console.log(reqtempid, "zsdsasds");
  }, [reqtempid]);

  const handleQuestionInputChange = (id, field, value) => {
    setQuestions((prev) =>
      prev.map((row) => (row.id === id ? { ...row, [field]: value } : row))
    );
  };

  const handleCompetenciesInputChange = (id, field, value) => {
    setCompetencies((prev) =>
      prev.map((row) => (row.id === id ? { ...row, [field]: value } : row))
    );
  };

  const handleQuestionAddRow = () => {
    setQuestions([
      ...questions,
      {
        id: Date.now(),
        isNew: true,
        question: "",
        required: "",
        disqualifier: "",
        score: "",
        weight: "",
        requisition: reqtempid || null,
      },
    ]);
  };

  const handleCompentenciesAddRow = () => {
    setCompetencies([
      ...Competencies,
      {
        isNew: true,
        id: Date.now(),
        competency: "",
        library: "",
        category: "",
        expected_rating: "",
        weight: "",
        requisition: reqtempid || null,
      },
    ]);
  };

  const toggleSection = (section) => {
    setOpenSection(openSection === section ? null : section);
  };

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm();

  console.log(errors, "uyvu");
  const createrequisitiondata = localStorage.getItem("createrequisitiondata")
    ? JSON.parse(localStorage.getItem("createrequisitiondata"))
    : null;

  const onError = (errors) => {
    if (Object.keys(errors).length > 0) {
      toast.error("Please fill all required fields");
    }
  };

  const onSubmit = async (data) => {
    console.log("dcascasas");
    const Planning_id = data?.plan_id || "";
    const internal_title = data?.internal_title || "";
    const external_title = data?.external_title || "";
    const job_position = data?.external_title || "";
    const company_client_name = data?.company_client_name || "";
    const business_line = data?.business_line || "";
    const business_unit = data?.business_unit || "";
    const division = data?.division || "";
    const department = data?.department || "";
    const location = data?.location || "";
    const band = data?.band || "";
    const sub_band = data?.sub_band || "";
    const working_model = data?.working_model || "";
    const geo_zone = data?.geo_zone || "";

    const career_level = data?.career_level || "";
    const requisition_type = data?.requisition_type || "";
    const client_interview = data?.client_interview || "";
    const required_score = data?.required_score || "";

    const primary_skills =
      data?.primary_skills?.map((item) => item.value) || [];
    const secondary_skills =
      data?.secondary_skills?.map((item) => item.value) || [];

    const billing_type = data?.billing_type || "";
    const billing_start_date = data?.billing_start_date || "";
    const billing_end_date = data?.billing_end_date || "";
    const contract_start_date = data?.contract_start_date || "";
    const contract_end_date = data?.contract_end_date || "";

    const experience = data?.experience?.map((item) => item.value) || "";
    const qualification = data?.qualification?.map((item) => item.value) || "";
    const designation = data?.designation?.map((item) => item.value) || "";
    const job_region = data?.job_region?.map((item) => item.value) || "";
    // const interview_teammate_1 = data?.interview_teammate_1 || "";
    // const interview_teammate_2 = data?.interview_teammate_2 || "";
    // const team_name = data?.team_name || "";
    // const team_type_2 = data?.team_type_2 || "";
    // const team_type_3 = data?.team_type_3 || "";

    const laptop_needed = data?.laptop_needed || "";
    const laptop_type = data?.laptop_type || "";
    const comments = data?.comments || "";

    const newQuestions = questions.map(({ id, isNew, ...rest }) => rest);
    const newCompentencies = Competencies.map(({ id, isNew, ...rest }) => rest);

    const formdata = {
      user_role: user_id,
      requisition_id: reqtempid,
      Planning_id,
      HiringManager: user_id,
      PositionTitle: job_position,
      position_information: {
        internal_title,
        external_title,
        job_position,
        company_client_name,
        business_unit,
        business_line,
        division,
        department,
        location,
        geo_zone,
        career_level,
        band,
        sub_band,
        working_model,
        client_interview,
        requisition_type,
      },
      skills_required: {
        primary_skills,
        secondary_skills,
      },
      billing_details: {
        billing_type,
        billing_start_date,
        billing_end_date,
        contract_start_date,
        contract_end_date,
      },
      posting_details: {
        experience,
        qualification,
        designation,
        job_region,
        required_score,
        internalDesc,
        externalDesc,
        questions: newQuestions,
        Competencies: newCompentencies,
        // teams: [
        //   { team_name: team_name },
        //   { team_type: team_type_2 },
        //   { team_type: team_type_3 },
        // ],
        // interview_teammate: [
        //   { employee_id: interview_teammate_1 },
        //   { employee_id: interview_teammate_2 },
        // ],
      },
      asset_deatils: {
        laptop_type,
        laptop_needed,
        comments,
      },
    };

    if (reqtempid) {
      console.log("entered");
      const response = await axiosInstance.put(
        "/api/jobrequisition/update-requisition/",
        formdata
      );

      if (response && response.data.success) {
        localStorage.removeItem("createrequisitiondata");
        alert(response?.data?.message);
        navigate("/hiring_manager/home");
      }
    }

    if (!reqtempid) {
      const response = await axiosInstance.post(
        "/api/jobrequisition/",
        formdata
      );

      if (response && response?.data?.success) {
        localStorage.removeItem("createrequisitiondata");
        alert(response?.data?.message);
        navigate("/hiring_manager/home");
      }
    }
  };

  const handleRequisitionSubmit = () => {
    // Mark "requisition" as completed
    if (!completedSections.includes("requisition")) {
      setCompletedSections([...completedSections, "requisition"]);
    }
  };

  const handleApprove = async () => {
    const response = await axiosInstance.post(
      "/jobrequisition/approve_requisition/",
      {
        user_role,
        req_id: reqtempid,
      }
    );
  };

  const jobPositions = [
    "Software Engineer",
    "Frontend Developer",
    "Backend Developer",
    "Full Stack Developer",
    "Data Analyst",
    "UI/UX Designer",
    "DevOps Engineer",
    "Product Manager",
    "Quality Assurance Tester",
    "Technical Support Specialist",
  ];

  const locations = [
    "New York",
    "San Francisco",
    "London",
    "Berlin",
    "Tokyo",
    "Toronto",
    "Bangalore",
    "Sydney",
    "Dubai",
    "Singapore",
  ];

  const geoZones = [
    "North America",
    "South America",
    "Europe",
    "Asia",
    "Africa",
    "Oceania",
    "Middle East",
    "Central America",
    "Southeast Asia",
    "Eastern Europe",
  ];

  const requisitionTypes = ["Part Time", "Full Time", "Contract", "Internship"];

  const experienceOptions = [
    { value: "0-2", label: "0-2" },
    { value: "2-5 years", label: "2-5 years" },
    { value: "5-10 years", label: "5-10 years" },
    { value: "10+ years", label: "10+ years" },
  ];

  const qualificationOptions = [
    { value: "btech", label: "btech" },
    { value: "mtech", label: "mtech" },
    { value: "B.Sc", label: "B.Sc" },
    { value: "M.Sc", label: "M.Sc" },
    { value: "MBA", label: "MBA" },
  ];

  const designationOptions = [
    { value: "software_engineer", label: "software_engineer" },
    { value: "senior_developer", label: "senior_developer" },
    { value: "team_lead", label: "team_lead" },
    { value: "project_manager", label: "project_manager" },
    { value: "technical_architect", label: "technical_architect" },
  ];

  const regionOptions = [
    { value: "north_america", label: "north_america" },
    { value: "Europe", label: "Europe" },
    { value: "Asia", label: "Asia" },
    { value: "middle_east", label: "middle_east" },
    { value: "australia", label: "australia" },
  ];

  const primarySkillsOptions = [
    { value: "react", label: "React.js" },
    { value: "node", label: "Node.js" },
    { value: "python", label: "Python" },
    { value: "java", label: "Java" },
    { value: "dotnet", label: ".NET" },
  ];

  const secondarySkillsOptions = [
    { value: "docker", label: "Docker" },
    { value: "aws", label: "AWS" },
    { value: "graphql", label: "GraphQL" },
    { value: "jenkins", label: "Jenkins" },
    { value: "kubernetes", label: "Kubernetes" },
  ];

  return (
    <div style={{ maxHeight: "500px", overflowY: "auto" }}>
      <ToastContainer />
      <form
        className="py-1 mt-2"
        onSubmit={handleSubmit(onSubmit, onError)}
        noValidate
      >
        <div className="row">
          <div className="mb-3 col-md-3">
            <label className="form-label">
              Requisition Id
              <select
                {...register("req_id")}
                className="form-select"
                onBlur={handleRequisitionSubmit}
                defaultValue=""
              >
                <option value="" disabled>
                  Select Requisition Id
                </option>
                {planid.length > 0 &&
                  planid.map((val, ind) => (
                    <option key={ind} value={val}>
                      {val}
                    </option>
                  ))}
              </select>
            </label>
          </div>
          <div className="mb-3 col-md-3">
            <label className="form-label">
              Planning Id
              <select
                {...register("plan_id")}
                className="form-select"
                onBlur={handleRequisitionSubmit}
                defaultValue=""
              >
                <option value="" disabled>
                  Select Planning Id
                </option>
                {planid.length > 0 &&
                  planid.map((val, ind) => (
                    <option key={ind} value={val}>
                      {val}
                    </option>
                  ))}
              </select>
            </label>
          </div>
        </div>
        <AccordionItem
          title="Position Information"
          isOpen={openSection === "position"}
          onClick={() => toggleSection("position")}
          className={`accordion-title p-2 ${
            completedSections.includes("position")
              ? "bg-success text-white"
              : "bg-primary text-white"
          }`}
        >
          <div className="row">
            {/* Internal Job Title */}
            <div className="col-md-3">
              <label className="form-label">
                Internal Job Title<span className="text-danger">*</span>
              </label>
              <input
                {...register("internal_title", {
                  required: "Internal Job Title is required",
                })}
                className={`form-control ${
                  errors.internal_title ? "is-invalid" : ""
                }`}
                placeholder="Software Engineer"
              />
              {errors.internal_title && (
                <div className="invalid-feedback">
                  {errors.internal_title.message}
                </div>
              )}
            </div>

            {/* External Job Title */}
            <div className="col-md-3">
              <label className="form-label">
                External Job Title<span className="text-danger">*</span>
              </label>
              <input
                {...register("external_title")}
                className={`form-control ${
                  errors.external_title ? "is-invalid" : ""
                }`}
                placeholder="Software Engineer"
              />
              {errors.external_title && (
                <div className="invalid-feedback">
                  {errors.external_title.message}
                </div>
              )}
            </div>

            {/* Position */}
            <div className="col-md-3">
              <label className="form-label">Position</label>
              <select
                {...register("job_position", {
                  required: "Job position required",
                })}
                className={`form-select ${
                  errors.job_position ? "is-invalid" : ""
                }`}
              >
                <option value="">Select Position</option>
                {jobPositions.map((pos) => (
                  <option value={pos}>{pos}</option>
                ))}
              </select>
              {errors.job_position && (
                <div className="invalid-feedback">
                  {errors.job_position.message}
                </div>
              )}
            </div>

            {/* company/client name */}
            <div className="col-md-3">
              <label className="form-label">company/client name</label>
              <input
                {...register("company_client_name")}
                className="form-control"
              />
            </div>

            {/* Business Line */}
            <div className="col-md-3">
              <label className="form-label">Business Line</label>
              <input {...register("business_line")} className="form-control" />
            </div>

            {/* Business Unit */}
            <div className="col-md-3">
              <label className="form-label">Business Unit</label>
              <input {...register("business_unit")} className="form-control" />
            </div>

            {/* Division */}
            <div className="col-md-3">
              <label className="form-label">Division</label>
              <input {...register("division")} className="form-control" />
            </div>

            {/* Department */}
            <div className="col-md-3">
              <label className="form-label">Department</label>
              <input {...register("department")} className="form-control" />
            </div>

            {/* Location */}
            <div className="col-md-3">
              <label className="form-label">Location</label>
              <select
                {...register("location", { required: "Location is required" })}
                className={`form-select ${errors.location ? "is-invalid" : ""}`}
              >
                <option value="">Select Location</option>
                {locations.map((loc) => (
                  <option value={loc}>{loc}</option>
                ))}
              </select>
              {errors.location && (
                <div className="invalid-feedback">
                  {errors.location.message}
                </div>
              )}
            </div>

            {/* Geo Zone */}
            <div className="col-md-3">
              <label className="form-label">Geo Zone</label>
              <select
                {...register("geo_zone", { required: "Geo zone is required" })}
                className={`form-select ${errors.geo_zone ? "is-invalid" : ""}`}
              >
                <option value="">Select Geo Zone</option>
                {geoZones.map((zone) => (
                  <option value={zone}>{zone}</option>
                ))}
              </select>
              {errors.geo_zone && (
                <div className="invalid-feedback">
                  {errors.geo_zone.message}
                </div>
              )}
            </div>

            {/* Career Level */}
            <div className="col-md-3">
              <label className="form-label">Career Level</label>
              <input {...register("career_level")} className="form-control" />
            </div>

            {/* Band */}
            <div className="col-md-3">
              <label className="form-label">
                Band <span className="text-danger">*</span>
              </label>
              <select
                {...register("band", { required: "Band is required" })}
                className={`form-select ${errors.band ? "is-invalid" : ""}`}
              >
                <option value="">Select Band</option>
                <option value="Band 1">Band 1</option>
                <option value="Band 2">Band 2</option>
              </select>
              {errors.band && (
                <div className="invalid-feedback">{errors.band.message}</div>
              )}
            </div>

            {/* Sub Band */}
            <div className="col-md-3">
              <label className="form-label">
                Sub Band <span className="text-danger">*</span>
              </label>
              <select
                {...register("sub_band")}
                className={`form-select ${errors.sub_band ? "is-invalid" : ""}`}
              >
                <option value="">Select Sub Band</option>
                <option value="Sub Band A">Sub Band A</option>
                <option value="Sub Band B">Sub Band B</option>
              </select>
              {errors.sub_band && (
                <div className="invalid-feedback">
                  {errors.sub_band.message}
                </div>
              )}
            </div>

            {/* Primary Skills */}
            {/* <div className="col-md-3">
              <label className="form-label">
                Primary Skills <span className="text-danger">*</span>
              </label>
              <select
                {...register("primary_skills", {
                  required: "Primary Skills are required",
                })}
                className={`form-select ${
                  errors.primary_skills ? "is-invalid" : ""
                }`}
              >
                <option value="">Select Skill</option>
                <option value="React">React</option>
                <option value="Node.js">Node.js</option>
              </select>
              {errors.primary_skills && (
                <div className="invalid-feedback">
                  {errors.primary_skills.message}
                </div>
              )}
            </div> */}

            {/* Secondary Skills */}
            {/* <div className="col-md-3">
              <label className="form-label">Secondary Skills</label>
              <input
                {...register("secondary_skills")}
                className="form-control"
              />
            </div> */}

            {/* Mode of Working */}
            <div className="col-md-3">
              <label className="form-label">Mode of Working</label>
              <input {...register("working_model")} className="form-control" />
            </div>

            {/* Client Interview */}
            <div className="col-md-3">
              <label className="form-label">Client Interview</label>
              <select
                {...register("client_interview", {
                  required: "Please select a Client interview",
                })}
                className={`form-select ${
                  errors.client_interview ? "is-invalid" : ""
                }`}
              >
                <option value="">Select</option>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
                <option value="TBD">TBD</option>
              </select>
              {errors.client_interview && (
                <div className="invalid-feedback">
                  {errors.client_interview.message}
                </div>
              )}
            </div>

            {/* Requisition Type */}
            <div className="col-md-3">
              <label className="form-label">Requisition Type</label>
              <select
                {...register("requisition_type", {
                  required: "Requision type is required",
                })}
                className="form-select"
              >
                <option value="">Select Requisition Type</option>
                {requisitionTypes.map((typ) => (
                  <option value={typ}>{typ}</option>
                ))}
              </select>
            </div>
          </div>
        </AccordionItem>

        <AccordionItem
          title="Skills Required"
          isOpen={openSection === "skillsreq"}
          onClick={() => toggleSection("skillsreq")}
        >
          <div className="row">
            <div className="d-flex">
              {/* primary skills */}
              <div className="col-md-3">
                <label className="form-label">
                  Primary Skills <span className="text-danger">*</span>
                </label>

                <Controller
                  name="primary_skills"
                  control={control}
                  rules={{
                    validate: (value) =>
                      value && value.length > 0
                        ? true
                        : "Primary skills required",
                  }}
                  render={({ field }) => (
                    <CreatableSelect
                      {...field}
                      isMulti
                      options={primarySkillsOptions}
                      classNamePrefix="react-select"
                      placeholder="Select Primary skills"
                      onChange={(val) => field.onChange(val)}
                      className={errors.primary_skills ? "is-invalid" : ""}
                    />
                  )}
                />

                {errors.primary_skills && (
                  <div className="invalid-feedback d-block">
                    {errors.primary_skills.message}
                  </div>
                )}
              </div>

              {/* secondary skills */}
              <div className="col-md-3">
                <label className="form-label">Secondary Skills</label>
                <Controller
                  className={`form-select ${
                    errors.secondary_skills ? "is-invalid" : ""
                  }`}
                  name="secondary_skills"
                  control={control}
                  render={({ field }) => (
                    <CreatableSelect
                      {...field}
                      isMulti
                      options={secondarySkillsOptions}
                      classNamePrefix="react-select"
                      placeholder="Select Secondary skills"
                    />
                  )}
                />
                {errors.secondary_skills && (
                  <div className="invalid-feedback">
                    {errors.secondary_skills.message}
                  </div>
                )}
              </div>
            </div>
          </div>
        </AccordionItem>

        <AccordionItem
          title="Billing Details"
          isOpen={openSection === "billing"}
          onClick={() => toggleSection("billing")}
        >
          <div className="row">
            <div className="d-flex">
              {/* billing type */}
              <div className="col-md-3">
                <label className="form-label">
                  Billing Type<span className="text-danger">*</span>
                </label>
                <select
                  {...register("billing_type", {
                    required: "billing is required",
                  })}
                  className={`form-select ${
                    errors.billing_type ? "is-invalid" : ""
                  }`}
                >
                  <option value="">Select billing</option>
                  <option value="billing 1">billing 1</option>
                  <option value="billing 2">billing 2</option>
                </select>
                {errors.billing_type && (
                  <div className="invalid-feedback">
                    {errors.billing_type.message}
                  </div>
                )}
              </div>

              {/* Billing Start Date */}
              <div className="col-md-3">
                <label className="form-label">Billing Start Date :</label>
                <input
                  type="date"
                  {...register("billing_start_date")}
                  className={`form-control ${
                    errors.billing_start_date ? "is-invalid" : ""
                  }`}
                />
                {errors.billing_start_date && (
                  <div className="invalid-feedback">
                    {errors.billing_start_date.message}
                  </div>
                )}
              </div>

              {/* Billing End Date */}
              <div className="col-md-3">
                <label className="form-label">Billing End Date :</label>
                <input
                  type="date"
                  {...register("billing_end_date")}
                  className={`form-control ${
                    errors.billing_end_date ? "is-invalid" : ""
                  }`}
                />
                {errors.billing_end_date && (
                  <div className="invalid-feedback">
                    {errors.billing_end_date.message}
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="row">
            {/* Contract Start Date */}
            <div className="col-md-3">
              <label className="form-label">
                Contract Start Date <small>(Only for Contractor)</small>
              </label>
              <input
                type="date"
                {...register("contract_start_date")}
                className={`form-control ${
                  errors.contract_start_date ? "is-invalid" : ""
                }`}
              />
              {errors.contract_start_date && (
                <div className="invalid-feedback">
                  {errors.contract_start_date.message}
                </div>
              )}
            </div>
            {/* Contract End Date */}

            <div className="col-md-3">
              <label className="form-label">
                Contract End Date <small>(Only for Contractor)</small>
              </label>
              <input
                type="date"
                {...register("contract_end_date")}
                className={`form-control ${
                  errors.contract_end_date ? "is-invalid" : ""
                }`}
              />
              {errors.contract_end_date && (
                <div className="invalid-feedback">
                  {errors.contract_end_date.message}
                </div>
              )}
            </div>
          </div>
        </AccordionItem>

        <AccordionItem
          title="Posting Details"
          isOpen={openSection === "posting"}
          onClick={() => toggleSection("posting")}
          className={`accordion-title p-2 ${
            completedSections.includes("posting")
              ? "bg-success text-white"
              : "bg-primary text-white"
          }`}
        >
          <div className="row py-3">
            {/* Experience */}
            <div className="col-md-3 mb-3">
              <label className="form-label">
                Experience <span className="text-danger">*</span>
              </label>

              <Controller
                name="experience"
                control={control}
                rules={{
                  validate: (value) =>
                    value && value.length > 0 ? true : "Experience is required",
                }}
                render={({ field }) => (
                  <CreatableSelect
                    {...field}
                    isMulti
                    options={experienceOptions}
                    classNamePrefix="react-select"
                    placeholder="Select experience"
                    onChange={(val) => field.onChange(val)}
                    className={errors.experience ? "is-invalid" : ""}
                  />
                )}
              />

              {errors.experience && (
                <div className="invalid-feedback d-block">
                  {errors.experience.message}
                </div>
              )}
            </div>

            {/* Qualification */}
            <div className="col-md-3 mb-3">
              <label className="form-label">
                Qualification <span className="text-danger">*</span>
              </label>

              <Controller
                name="qualification"
                control={control}
                rules={{
                  validate: (value) =>
                    value && value.length > 0
                      ? true
                      : "Qualification is required",
                }}
                render={({ field }) => (
                  <CreatableSelect
                    {...field}
                    isMulti
                    options={qualificationOptions}
                    classNamePrefix="react-select"
                    placeholder="Select Qualification"
                    onChange={(val) => field.onChange(val)}
                    className={errors.qualification ? "is-invalid" : ""}
                  />
                )}
              />

              {errors.qualification && (
                <div className="invalid-feedback d-block">
                  {errors.qualification.message}
                </div>
              )}
            </div>

            {/* Designation */}
            <div className="col-md-3 mb-3">
              <label className="form-label">
                Designation <span className="text-danger">*</span>
              </label>

              <Controller
                name="designation"
                control={control}
                rules={{
                  validate: (value) =>
                    value && value.length > 0
                      ? true
                      : "Designation is required",
                }}
                render={({ field }) => (
                  <CreatableSelect
                    {...field}
                    isMulti
                    options={designationOptions}
                    classNamePrefix="react-select"
                    placeholder="Select Designation"
                    onChange={(val) => field.onChange(val)}
                    className={errors.designation ? "is-invalid" : ""}
                  />
                )}
              />

              {errors.designation && (
                <div className="invalid-feedback d-block">
                  {errors.designation.message}
                </div>
              )}
            </div>

            {/* Job Region */}
            <div className="col-md-3 mb-3">
              <label className="form-label">
                Job Region <span className="text-danger">*</span>
              </label>

              <Controller
                name="job_region"
                control={control}
                rules={{
                  validate: (value) =>
                    value && value.length > 0 ? true : "Job region is required",
                }}
                render={({ field }) => (
                  <CreatableSelect
                    {...field}
                    isMulti
                    options={regionOptions}
                    classNamePrefix="react-select"
                    placeholder="Select Job Region"
                    onChange={(val) => field.onChange(val)}
                    className={errors.job_region ? "is-invalid" : ""}
                  />
                )}
              />

              {errors.job_region && (
                <div className="invalid-feedback d-block">
                  {errors.job_region.message}
                </div>
              )}
            </div>
          </div>

          <div className="container-fluid">
            <h6 className="fw-bold mb-3">ROLE PROFILES :</h6>

            {/* Internal Job Description */}
            <div className="mb-4">
              <label className="form-label fw-semibold">
                Internal Job Description<span className="text-danger">*</span>:
              </label>
              <ReactQuill
                value={internalDesc}
                onChange={setInternalDesc}
                theme="snow"
                placeholder="Enter your text here"
                className="quill-editor"
              />
            </div>

            {/* External Job Description */}
            <div className="mb-4">
              <label className="form-label fw-semibold">
                External Job Description<span className="text-danger">*</span>:
              </label>
              <ReactQuill
                value={externalDesc}
                onChange={setExternalDesc}
                theme="snow"
                placeholder="Enter your text here"
                className="quill-editor"
              />
            </div>
          </div>
          {/* <div>
            <div className="d-flex justify-content-between align-items-center mb-2">
              <label className="form-label fw-bold">
                Questions<span className="text-danger">*</span> :
              </label>
              <Button
                variant="link"
                className="text-primary p-0 fw-bold text-decoration-none"
                onClick={handleQuestionAddRow}
              >
                <PlusCircle className="me-1" /> Add Question
              </Button>
            </div>
            <DataTable
              title="Questions"
              data={questions}
              columns={questionsHeader}
              pagination
              responsive
              highlightOnHover
            />
            <div className="mb-3">
              <label className="form-label">
                Required Score
                <input
                  {...register("required_score")}
                  type="text"
                  className="form-control"
                  placeholder="Enter Required Score"
                  onBlur={handleRequisitionSubmit}
                />
              </label>
            </div>
          </div> */}
          <div>
            {/* <div className="d-flex justify-content-between align-items-center mb-2">
              <label className="form-label fw-bold">
                Competencies<span className="text-danger">*</span> :
              </label>
              <Button
                variant="link"
                className="text-primary p-0 fw-bold text-decoration-none"
                onClick={handleCompentenciesAddRow}
                style={{}}
              >
                <PlusCircle className="me-1" /> Add Competencies
              </Button>
            </div> */}
            {/* <DataTable
              title="Competencies"
              columns={CompetenciesHeaders}
              data={Competencies}
              pagination
              responsive
              highlightOnHover
            /> */}
            {/* <div className="row">
              <div className="col-md-4">
                <label className="form-label">
                  Team name: <span className="text-danger">*</span>
                </label>
                <select
                  {...register("team_name", {
                    required: "Team type is required",
                  })}
                  className={`form-select ${
                    errors.team_name ? "is-invalid" : ""
                  }`}
                >
                  <option value="">Select Coordinator</option>
                  <option value="ONB Coordinator">Coordinator 1</option>
                  <option value="Coordinator 2">Coordinator 2</option>
                </select>
                {errors.team_name && (
                  <div className="invalid-feedback">
                    {errors.team_name.message}
                  </div>
                )}
              </div>

              <div className="col-md-4">
                <label className="form-label">Team type:</label>
                <select {...register("team_type_2")} className="form-select">
                  <option value="">Select Team type</option>
                  <option value="ONB Coordinator name">Team 1</option>
                  <option value="Team 2">Team 2</option>
                </select>
              </div>

              <div className="col-md-4">
                <label className="form-label">
                  Team type: <span className="text-danger">*</span>
                </label>
                <select
                  {...register("team_type_3", {
                    required: "ISG Team is required",
                  })}
                  className={`form-select ${
                    errors.team_type_3 ? "is-invalid" : ""
                  }`}
                >
                  <option value="">Select Team type</option>
                  <option value="ISG Team">ISG 1</option>
                  <option value="ISG 2">ISG 2</option>
                </select>
                {errors.team_type_3 && (
                  <div className="invalid-feedback">
                    {errors.team_type_3.message}
                  </div>
                )}
              </div>
            </div> */}

            {/* <div className="row mt-3">
              <div className="col-md-4">
                <label className="form-label">
                  Interview Teammate 1 (Emp ID):{" "}
                  <span className="text-danger">*</span>
                </label>
                <select
                  {...register("interview_teammate_1", {
                    required: "Teammate 1 is required",
                  })}
                  className={`form-select ${
                    errors.interview_teammate_1 ? "is-invalid" : ""
                  }`}
                >
                  <option value="">Select Teammate</option>
                  <option value="EMP001">EMP001</option>
                  <option value="EMP002">EMP002</option>
                </select>
                {errors.interview_teammate_1 && (
                  <div className="invalid-feedback">
                    {errors.interview_teammate_1.message}
                  </div>
                )}
              </div>

              <div className="col-md-4">
                <label className="form-label">
                  Interview Teammate 2 (Emp ID):{" "}
                  <span className="text-danger">*</span>
                </label>
                <select
                  {...register("interview_teammate_2", {
                    required: "Teammate 2 is required",
                  })}
                  className={`form-select ${
                    errors.interview_teammate_2 ? "is-invalid" : ""
                  }`}
                >
                  <option value="">Select Teammate</option>
                  <option value="EMP002">EMP002</option>
                  <option value="Emp004">Emp004</option>
                </select>
                {errors.interview_teammate_2 && (
                  <div className="invalid-feedback">
                    {errors.interview_teammate_2.message}
                  </div>
                )}
              </div>
            </div> */}
          </div>
        </AccordionItem>

        <AccordionItem
          title="Asset Details"
          isOpen={openSection === "asset"}
          onClick={() => toggleSection("asset")}
        >
          <div className="row mt-3">
            <div className="col-md-3">
              <label className="form-label">
                Laptop Needed: <span className="text-danger">*</span>
              </label>
              <select
                {...register("laptop_needed", {
                  required: "Please specify if a laptop is needed",
                })}
                className={`form-select ${
                  errors.laptop_needed ? "is-invalid" : ""
                }`}
              >
                <option value="">Select option</option>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
              {errors.laptop_needed && (
                <div className="invalid-feedback">
                  {errors.laptop_needed.message}
                </div>
              )}
            </div>

            <div className="col-md-3">
              <label className="form-label">
                Laptop Type: <span className="text-danger">*</span>
              </label>
              <select
                {...register("laptop_type", {
                  required: "Please select a laptop type",
                })}
                className={`form-select ${
                  errors.laptop_type ? "is-invalid" : ""
                }`}
              >
                <option value="">Select type</option>
                <option value="Windows">Windows</option>
                <option value="Mac">Mac</option>
                <option value="Other">Other</option>
              </select>
              {errors.laptop_type && (
                <div className="invalid-feedback">
                  {errors.laptop_type.message}
                </div>
              )}
            </div>

            <div className="col-md-3">
              <label className="form-label">
                Comments: <span className="text-danger">*</span>
              </label>
              <input
                type="text"
                {...register("comments", {
                  required: "Please provide comments",
                })}
                className={`form-control ${
                  errors.comments ? "is-invalid" : ""
                }`}
                placeholder="Enter comments"
              />
              {errors.comments && (
                <div className="invalid-feedback">
                  {errors.comments.message}
                </div>
              )}
            </div>
          </div>
        </AccordionItem>

        {/* Submit Button */}
        <div className="col-12 text-end">
          <button className="btn btn-primary mt-3" type="submit">
            {reqtempid ? "update" : "Submit"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default RequisitionForm;
