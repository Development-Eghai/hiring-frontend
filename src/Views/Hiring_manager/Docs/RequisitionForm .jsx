import React, { useEffect, useState } from "react";
import { useForm,Controller } from "react-hook-form";
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
  const {  commonState  } = useCommonState();
  const [openSection, setOpenSection] = useState(null);
  const [completedSections, setCompletedSections] = useState([]);

  const [internalDesc, setInternalDesc] = useState("");
  const [externalDesc, setExternalDesc] = useState("");

  const [Reqid, setReqid] = useState([]);
  const [planid, setPlanId] = useState([]);
  const [tempDetails, setTempDetails] = useState();
  const [reqtempid, setreqtempid] = useState(localStorage.getItem("reqtempid"));

  const user_role = commonState?.app_data?.user_role
  
  const [Competencies, setCompetencies] = useState([
    {
      id: Date.now(),
      isNew: true,
      id: Date.now(),
      isNew: true,
      Competency: "",
      Library: "",
      Category: "",
      ExpectedRating: "",
      Weight: "",
      Actions: "select",
    },
  ]);

  const [questions, setQuestions] = useState([
    {
      id: Date.now(),
      isNew: true,
      id: Date.now(),
      isNew: true,
      Question: "",
      Required: "",
      Disqualifier: "",
      Score: "",
      Weight: "",
      Actions: "select",
    },
  ]);

    const [questionsHeader, setQuestionsHeader] = useState([
    {
      name: "Question",
      width: "20%",
      cell: (row) =>
        row.isNew ? (
          <Form.Control
            type="text"
            value={row.Question}
            onChange={(e) =>
              handleQuestionInputChange(row.id, "Question", e.target.value)
            }
            placeholder="Question"
          />
        ) : (
          row.Question
        ),
    },
    {
      name: "Required",
      cell: (row) =>
        row.isNew ? (
          <Form.Control
            type="text"
            value={row.Required}
            onChange={(e) =>
              handleQuestionInputChange(row.id, "Required", e.target.value)
            }
            placeholder="Required"
          />
        ) : (
          row.Required
        ),
    },
    {
      name: "Disqualifier",
      width: "20%",
      cell: (row) =>
        row.isNew ? (
          <Form.Control
            type="text"
            value={row.Disqualifier}
            onChange={(e) =>
              handleQuestionInputChange(row.id, "Disqualifier", e.target.value)
            }
            placeholder="Disqualifier"
          />
        ) : (
          row.Disqualifier
        ),
    },
    {
      name: "Score",
      width: "20%",
      cell: (row) =>
        row.isNew ? (
          <Form.Control
            type="text"
            value={row.Score}
            onChange={(e) =>
              handleQuestionInputChange(row.id, "Score", e.target.value)
            }
            placeholder="Score"
          />
        ) : (
          row.Score
        ),
    },

    {
      name: "Weight",
      width: "20%",
      cell: (row) =>
        row.isNew ? (
          <Form.Control
            type="text"
            value={row.Weight}
            onChange={(e) =>
              handleQuestionInputChange(row.id, "Weight", e.target.value)
            }
            placeholder="Weight"
          />
        ) : (
          row.Weight
        ),
    },
    {
      name: "Actions",
    },
  ]);

    const [CompetenciesHeaders, setCompetenciesHeaders] = useState([
    {
      name: "Competency",
      width: "20%",
      cell: (row) =>
        row.isNew ? (
          <Form.Control
            type="text"
            value={row.Competency}
            onChange={(e) =>
              handleCompetenciesInputChange(
                row.id,
                "Competency",
                e.target.value
              )
            }
            placeholder="Competency"
          />
        ) : (
          row.Competency
        ),
    },
    {
      name: "Library",
      cell: (row) =>
        row.isNew ? (
          <Form.Control
            type="text"
            value={row.Library}
            onChange={(e) =>
              handleCompetenciesInputChange(row.id, "Library", e.target.value)
            }
            placeholder="Library"
          />
        ) : (
          row.Library
        ),
    },
    {
      name: "Category",
      width: "20%",
      cell: (row) =>
        row.isNew ? (
          <Form.Control
            type="text"
            value={row.Category}
            onChange={(e) =>
              handleCompetenciesInputChange(row.id, "Category", e.target.value)
            }
            placeholder="Category"
          />
        ) : (
          row.Category
        ),
    },
    {
      name: "Expected Rating",
      width: "20%",
      cell: (row) =>
        row.isNew ? (
          <Form.Control
            type="text"
            value={row.ExpectedRating}
            onChange={(e) =>
              handleCompetenciesInputChange(
                row.id,
                "ExpectedRating",
                e.target.value
              )
            }
            placeholder="Expected Rating"
          />
        ) : (
          row.ExpectedRating
        ),
    },

    {
      name: "Weight %",
      width: "20%",
      cell: (row) =>
        row.isNew ? (
          <Form.Control
            type="text"
            value={row.Weight}
            onChange={(e) =>
              handleCompetenciesInputChange(row.id, "Weight", e.target.value)
            }
            placeholder="Weight"
          />
        ) : (
          row.Weight
        ),
    },
    {
      name: "Actions",
    },
  ]);

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
        localStorage.removeItem("reqtempid")
        const templeteDetails = gettempleteDetail?.data?.data;
        const {
          requisition_information,
          position_information,
          billing_details,
          posting_details,
          asset_details,
        } = templeteDetails;

        reset({
          ...requisition_information,
          ...position_information,
          ...billing_details,
          ...posting_details,
          ...asset_details,
          team_name: posting_details?.teams[0]?.team_name,
          team_type_2: posting_details?.teams[1]?.team_type,
          team_type_3: posting_details?.teams[2]?.team_type,
          interview_teammate_1: posting_details?.interview_team[0]?.employee_id,
          interview_teammate_2: posting_details?.interview_team[1]?.employee_id,
        });
      }
    } catch (err) {
      console.log(err?.message || "Something went wrong");
    }
  }

  useEffect(() => {
    fetch_reqs();
  }, []);

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
        Question: "",
        Required: "",
        Disqualifier: "",
        Score: "",
        Weight: "",
        Actions: "select",
      },
      {
        id: Date.now(),
        isNew: true,
        Question: "",
        Required: "",
        Disqualifier: "",
        Score: "",
        Weight: "",
        Actions: "select",
      },
    ]);
  };

  const handleCompentenciesAddRow = () => {
    setCompetencies([
      ...Competencies,
      {
        isNew: true,
        id: Date.now(),
        Competency: "",
        Library: "",
        Category: "",
        ExpectedRating: "",
        Weight: "",
        Actions: "select",
      },
      {
        isNew: true,
        id: Date.now(),
        Competency: "",
        Library: "",
        Category: "",
        ExpectedRating: "",
        Weight: "",
        Actions: "select",
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

  const createrequisitiondata = localStorage.getItem("createrequisitiondata") ? JSON.parse(localStorage.getItem("createrequisitiondata")) : null;

  const onSubmit = async (data) => {
    const plan_id = data?.plan_id || "";
    const internal_title = data?.internal_title || "";
    const external_title = data?.external_title || "";
    const job_position = data?.external_title || "";
    const company_client_name = data?.company_client_name || "";
    const buisness_line = data?.buisness_line || "";
    const buisness_unit = data?.buisness_unit || "";
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

    const primary_skills = data?.primary_skills?.map((item) => item.value) || "";
    const secondary_skills = data?.secondary_skills?.map((item) => item.value) || "";
    
    const billing_type = data?.billing_type || "";
    const billing_start_date = data?.billing_start_date || "";
    const billing_end_date = data?.billing_end_date || "";
    const contract_start_date = data?.contract_start_date || "";
    const contract_end_date = data?.contract_end_date || "";

    const experience = data?.experience?.map((item) => item.value)|| "";
    const qualification = data?.qualification?.map((item) => item.value) || "";
    const designation = data?.designation?.map((item) => item.value) || "";
    const job_region = data?.job_region?.map((item) => item.value) || "";
    const interview_teammate_1 = data?.interview_teammate_1 || "";
    const interview_teammate_2 = data?.interview_teammate_2 || "";
    const team_name = data?.team_name || "";
    const team_type_2 = data?.team_type_2 || "";
    const team_type_3 = data?.team_type_3 || "";

    const laptop_needed = data?.laptop_needed || "";
    const laptop_type = data?.laptop_type || "";
    const comments = data?.comments || "";

    const newQuestions = questions.map(({ id, isNew, ...rest }) => rest)
    const newCompentencies= Competencies.map(({ id, isNew, ...rest }) => rest)

    const formdata = {

      ...createrequisitiondata,
      position_information: {
        internal_title,
        external_title,
        job_position,
        company_client_name,
        buisness_unit,
        buisness_line,
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
        questions:newQuestions,
        Competencies:newCompentencies,
        teams: [
          { team_name: team_name },
          { team_type: team_type_2 },
          { team_type: team_type_3 },
        ],
        interview_teammate: [
          { employee_id: interview_teammate_1 },
          { employee_id: interview_teammate_2 },
        ],
      },
      asset_deatils: {
        laptop_type,
        laptop_needed,
        comments,
      },
    };

    const response = await axiosInstance
      .post("/api/jobrequisition/", formdata)

            if(response && !response.data.success){
              localStorage.removeItem("createrequisitiondata")
        alert(response.data.message)
      }
  }

  const handleRequisitionSubmit = () => {
    // Mark "requisition" as completed
    if (!completedSections.includes("requisition")) {
      setCompletedSections([...completedSections, "requisition"]);
    }
  };

  const handleApprove = async() => {
    const response = await axiosInstance.post(
          "/jobrequisition/approve_requisition/",
          {
            user_role,
            req_id: reqtempid,
          }
        );
  }

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
  "Technical Support Specialist"
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
  "Singapore"
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
  "Eastern Europe"
];

const requisitionTypes = [
  "Part Time",
  "Full Time",
  "Contract",
  "Internship"
]

const experienceOptions = [
  { value: "0-2", label: "0-2 years" },
  { value: "2-5", label: "2-5 years" },
  { value: "5-10", label: "5-10 years" },
  { value: "10+", label: "10+ years" },
];

const qualificationOptions = [
  { value: "btech", label: "B.Tech" },
  { value: "mtech", label: "M.Tech" },
  { value: "bsc", label: "B.Sc" },
  { value: "msc", label: "M.Sc" },
  { value: "mba", label: "MBA" },
];

const designationOptions = [
  { value: "software_engineer", label: "Software Engineer" },
  { value: "senior_developer", label: "Senior Developer" },
  { value: "team_lead", label: "Team Lead" },
  { value: "project_manager", label: "Project Manager" },
  { value: "technical_architect", label: "Technical Architect" },
];

const regionOptions = [
  { value: "north_america", label: "North America" },
  { value: "europe", label: "Europe" },
  { value: "asia", label: "Asia" },
  { value: "middle_east", label: "Middle East" },
  { value: "australia", label: "Australia" },
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
      <form className="py-1 mt-2" onSubmit={handleSubmit(onSubmit)} noValidate>
        <div className="row">
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
                {...register("external_title", {
                  required: "External Job Title is required",
                })}
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
                {...register("job_position")}
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
              <input {...register("buisness_line")} className="form-control" />
            </div>

            {/* Business Unit */}
            <div className="col-md-3">
              <label className="form-label">Business Unit</label>
              <input {...register("buisness_unit")} className="form-control" />
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
                {...register("location")}
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
                {...register("geo_zone")}
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
                {...register("sub_band", { required: "Sub Band is required" })}
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
              <select {...register("client_interview")} className="form-select">
                <option value="">Select</option>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
                <option value="TBD">TBD</option>
              </select>
            </div>

            {/* Requisition Type */}
            <div className="col-md-3">
              <label className="form-label">Requisition Type</label>
              <select {...register("requisition_type")} className="form-select">
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
                  Primary Skills<span className="text-danger">*</span>
                </label>
                <Controller
                  className={`form-select ${
                    errors.primary_skills ? "is-invalid" : ""
                  }`}
                  name="primary_skills"
                  control={control}
                  render={({ field }) => (
                    <CreatableSelect
                      {...field}
                      isMulti
                      options={primarySkillsOptions}
                      classNamePrefix="react-select"
                      placeholder="Select Primary skills"
                    />
                  )}
                />
                {errors.primary_skills && (
                  <div className="invalid-feedback">
                    {errors.primary_skills.message}
                  </div>
                )}
              </div>

              {/* secondary skills */}
              <div className="col-md-3">
                <label className="form-label">
                  Secondary Skills<span className="text-danger">*</span>
                </label>
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
                  className="form-control"
                />
              </div>

              {/* Billing End Date */}
              <div className="col-md-3">
                <label className="form-label">Billing End Date :</label>
                <input
                  type="date"
                  {...register("billing_end_date")}
                  className="form-control"
                />
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
                className="form-control"
              />
            </div>
            {/* Contract End Date */}

            <div className="col-md-3">
              <label className="form-label">
                Contract End Date <small>(Only for Contractor)</small>
              </label>
              <input
                type="date"
                {...register("contract_end_date")}
                className="form-control"
              />
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
                Experience<span className="text-danger">*</span>
              </label>
              <Controller
                className={`form-select ${
                  errors.experience ? "is-invalid" : ""
                }`}
                name="experience"
                control={control}
                render={({ field }) => (
                  <CreatableSelect
                    {...field}
                    isMulti
                    options={experienceOptions}
                    classNamePrefix="react-select"
                    placeholder="Select experience"
                  />
                )}
              />
              {errors.experience && (
                <div className="invalid-feedback">
                  {errors.experience.message}
                </div>
              )}
            </div>

            {/* Qualification */}
            <div className="col-md-3 mb-3">
              <label className="form-label">
                Qualification<span className="text-danger">*</span>
              </label>
              <Controller
                className={`form-select ${
                  errors.experience ? "is-invalid" : ""
                }`}
                name="qualification"
                control={control}
                render={({ field }) => (
                  <CreatableSelect
                    {...field}
                    isMulti
                    options={qualificationOptions}
                    classNamePrefix="react-select"
                    placeholder="Select Qualification"
                  />
                )}
              />
              {errors.qualification && (
                <div className="invalid-feedback">
                  {errors.qualification.message}
                </div>
              )}
            </div>

            {/* Designation */}
            <div className="col-md-3 mb-3">
              <label className="form-label">
                Designation<span className="text-danger">*</span>
              </label>
              <Controller
                className={`form-select ${
                  errors.designation ? "is-invalid" : ""
                }`}
                name="designation"
                control={control}
                render={({ field }) => (
                  <CreatableSelect
                    {...field}
                    isMulti
                    options={designationOptions}
                    classNamePrefix="react-select"
                    placeholder="Select Designation"
                  />
                )}
              />
              {errors.designation && (
                <div className="invalid-feedback">
                  {errors.designation.message}
                </div>
              )}
            </div>

            {/* Job Region */}
            <div className="col-md-3 mb-3">
              <label className="form-label">
                Job Region<span className="text-danger">*</span>
              </label>
              <Controller
                className={`form-select ${
                  errors.job_region ? "is-invalid" : ""
                }`}
                name="job_region"
                control={control}
                render={({ field }) => (
                  <CreatableSelect
                    {...field}
                    isMulti
                    options={regionOptions}
                    classNamePrefix="react-select"
                    placeholder="Select Job Region"
                  />
                )}
              />
              {errors.job_region && (
                <div className="invalid-feedback">
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
          <div>
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
          </div>
          <div>
            <div className="d-flex justify-content-between align-items-center mb-2">
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
            </div>
            <DataTable
              title="Competencies"
              columns={CompetenciesHeaders}
              data={Competencies}
              pagination
              responsive
              highlightOnHover
            />
            <div className="row">
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
            </div>

            <div className="row mt-3">
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
            </div>
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
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default RequisitionForm;
