import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "../../../Stylesheet/Css/App.css";
import DataTable from "react-data-table-component";
import { PlusCircle } from "react-bootstrap-icons";
import { Button, Form } from "react-bootstrap";
import axiosInstance from "Services/axiosInstance";
import { useCommonState } from "Components/CustomHooks";
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
  const { commonState } = useCommonState();
  const [openSection, setOpenSection] = useState(null);
  const [completedSections, setCompletedSections] = useState([]);

  const [internalDesc, setInternalDesc] = useState("");
  const [externalDesc, setExternalDesc] = useState("");

  const [Reqid, setReqid] = useState([]);
  const [planid, setPlanId] = useState([]);
  const [tempDetails, setTempDetails] = useState();
  const [reqtempid, setreqtempid] = useState(localStorage.getItem("reqtempid"));

  const [Competencies, setCompetencies] = useState([
    {
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
      Question: "",
      Required: "",
      Disqualifier: "",
      Score: "",
      Weight: "",
      Actions: "select",
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
          team_type_1: posting_details?.teams[0]?.team_type,
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
    ]);
  };

  const toggleSection = (section) => {
    setOpenSection(openSection === section ? null : section);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    // const req_id = data?.req_id || "";
    const plan_id = data?.plan_id || "";
    const internal_title = data?.internal_title || "";
    const external_title = data?.external_title || "";
    const job_position = data?.external_title || "";
    const legal_entry = data?.legal_entry || "";
    const buisness_unit = data?.buisness_unit || "";
    const buisness_line = data?.buisness_line || "";
    const division = data?.division || "";
    const department = data?.department || "";
    const location = data?.location || "";
    const band = data?.band || "";
    const sub_band = data?.sub_band || "";
    const working_model = data?.working_model || "";
    const geo_zone = data?.geo_zone || "";
    const employee_group = data?.employee_group || "";
    const contract_start_date = data?.contract_start_date || "";
    const contract_end_date = data?.contract_end_date || "";
    const career_level = data?.career_level || "";
    const primary_skills = data?.primary_skills || "";
    const secondary_skills = data?.secondary_skills || "";
    const requisition_type = data?.requisition_type || "";
    const client_interview = data?.client_interview || "";
    const required_score = data?.required_score || "";

    const billing_type = data?.billing_type || "";
    const billing_start_date = data?.billing_start_date || "";

    const experience = data?.experience || "";
    const qualification = data?.qualification || "";
    const designation = data?.designation || "";
    const job_category = data?.job_category || "";
    const job_region = data?.job_region || "";
    const interview_teammate_1 = data?.interview_teammate_1 || "";
    const interview_teammate_2 = data?.interview_teammate_2 || "";
    const team_type_1 = data?.team_type_1 || "";
    const team_type_2 = data?.team_type_2 || "";
    const team_type_3 = data?.team_type_3 || "";

    const laptop_needed = data?.laptop_needed || "";
    const laptop_type = data?.laptop_type || "";
    const additional_questions = data?.additional_questions || "";
    const comments = data?.comments || "";

    // const formdata = {
    //   RequisitionID: "",
    //   user_role: "",
    //   PositionTitle: "",
    //   Recruiter: "",
    //   HiringManager: "",
    //   No_of_positions: "",
    //   status: "pending",
    //   details: {
    //     internal_title,
    //     external_title,
    //     hiring_plan_id_fk,
    //     job_position,
    //     division,
    //     department,
    //     location,
    //     band,
    //     sub_band,
    //     working_model,
    //     coordinator_name,
    //     coordinator_team,
    //     isg_team_name,
    //     interviewer_employee_id,
    //     geo_zone,
    //     employee_group,
    //     employee_sub_group,
    //     contract_start_date,
    //     contract_end_date,
    //     career_level,
    //     primary_skills,
    //     secondary_skills,
    //     requisition_type,
    //     client_interview,
    //     required_score,
    //   },
    //   billing_details: {
    //     billing_type,
    //     billing_start_date,
    //   },
    //   posting_details: {
    //     experience,
    //     designation,
    //     job_category,
    //     job_region,
    //     internal_job_description,
    //     external_job_description,
    //   },
    //   interview_team: [],
    //   teams: [],
    // };

    const formdata = {
      user_role: commonState?.app_data?.user_id || "",
      PositionTitle: "Software Engineer1",
      Planning_id: plan_id,
      Recruiter: "John Doe",
      HiringManager: 1,
      No_of_positions: 2,
      Status: "Pending Approval",

      requisition_information: {
        // req_id,
        plan_id,
      },

      position_information: {
        internal_title,
        external_title,
        job_position,
        legal_entry,
        buisness_unit,
        buisness_line,
        division,
        department,
        location,
        geo_zone,
        employee_group,
        contract_start_date,
        contract_end_date,
        career_level,
        band,
        sub_band,
        primary_skills,
        secondary_skills,
        working_model,
        client_interview,
        requisition_type,
        // buisness_line,
        // buisness_unit,
      },
      billing_details: {
        billing_type,
        billing_start_date,
      },
      posting_details: {
        experience,
        qualification,
        designation,
        job_category,
        job_region,
        required_score,
        interview_teammate_1,
        interview_teammate_2,
        internalDesc,
        externalDesc,
        questions,
        Competencies,
        teams: [
          { team_type: team_type_1 },
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
        additional_questions,
        comments,
      },
    };

    const response = await axiosInstance
      .post("/api/jobrequisition/", formdata)
      .then((res) => console.log(res, "responseOfPostRequition"));

    if (response) {
      handleNext();
    }
    if (response) {
      alert(response.message);
    }
  };

  const handleRequisitionSubmit = () => {
    // Mark "requisition" as completed
    if (!completedSections.includes("requisition")) {
      setCompletedSections([...completedSections, "requisition"]);
    }
  };

  return (
    <div style={{ maxHeight: "500px", overflowY: "auto" }}>
      <form className="py-1 mt-2" onSubmit={handleSubmit(onSubmit)} noValidate>
        <AccordionItem
          title="Requisitions Information"
          isOpen={openSection === "requisition"}
          onClick={() => toggleSection("requisition")}
          className={`accordion-title p-2 ${
            completedSections.includes("requisition")
              ? "bg-success text-white"
              : "bg-primary text-white"
          }`}
        >
          <div className="row">
            {/* <div className="mb-3 col-md-3">
              <label className="form-label">
                Req Id
                <select
                  {...register("req_id")}
                  className="form-select"
                  onChange={handleRequisitionSubmit}
                  defaultValue=""
                >
                  <option value="" disabled>
                    Select Req Id
                  </option>
                  {Reqid.length > 0 &&
                    Reqid.map((ids,ind) => (
                      <option key={ind} value={ids?.req_ids}>{ids?.req_ids}</option>
                    ))}
                </select>
              </label>
            </div> */}
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
                    planid.map((val,ind) => <option key={ind} value={val}>{val}</option>)}
                </select>
              </label>
            </div>
          </div>
        </AccordionItem>

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
              <input
                {...register("job_position")}
                className="form-control"
                placeholder="Software Engineer"
              />
            </div>

            {/* Legal Entry */}
            <div className="col-md-3">
              <label className="form-label">Legal Entry</label>
              <input {...register("legal_entry")} className="form-control" />
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
              <input {...register("location")} className="form-control" />
            </div>

            {/* Geo Zone */}
            <div className="col-md-3">
              <label className="form-label">Geo Zone</label>
              <input {...register("geo_zone")} className="form-control" />
            </div>

            {/* Employee Group */}
            <div className="col-md-3">
              <label className="form-label">Employee Group</label>
              <input {...register("employee_group")} className="form-control" />
            </div>

            {/* Contract Start/End Date */}
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
            <div className="col-md-3">
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
            </div>

            {/* Secondary Skills */}
            <div className="col-md-3">
              <label className="form-label">Secondary Skills</label>
              <input
                {...register("secondary_skills")}
                className="form-control"
              />
            </div>

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
              </select>
            </div>

            {/* Requisition Type */}
            <div className="col-md-3">
              <label className="form-label">Requisition Type</label>
              <select {...register("requisition_type")} className="form-select">
                <option value="">Select</option>
                <option value="Type A">Type A</option>
                <option value="Type B">Type B</option>
              </select>
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

              <div className="col-md-3">
                <label className="form-label">Billing Start Date :</label>
                <input
                  type="date"
                  {...register("billing_start_date")}
                  className="form-control"
                />
              </div>
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
              <select
                {...register("experience", {
                  required: "Experience is required",
                })}
                className={`form-select ${
                  errors.experience ? "is-invalid" : ""
                }`}
              >
                <option value="">Select Experience</option>
                <option value="0-2 years">0-2 years</option>
                <option value="2-5 years">2-5 years</option>
              </select>
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
              <select
                {...register("qualification", {
                  required: "Qualification is required",
                })}
                className={`form-select ${
                  errors.qualification ? "is-invalid" : ""
                }`}
              >
                <option value="">Select Qualification</option>
                <option value="B.Tech">B.Tech</option>
                <option value="MBA">MBA</option>
              </select>
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
              <select
                {...register("designation", {
                  required: "Designation is required",
                })}
                className={`form-select ${
                  errors.designation ? "is-invalid" : ""
                }`}
              >
                <option value="">Select Designation</option>
                <option value="Developer">Developer</option>
                <option value="Manager">Manager</option>
              </select>
              {errors.designation && (
                <div className="invalid-feedback">
                  {errors.designation.message}
                </div>
              )}
            </div>

            {/* Job Category */}
            <div className="col-md-3 mb-3">
              <label className="form-label">
                Job Category<span className="text-danger">*</span>
              </label>
              <select
                {...register("job_category", {
                  required: "Job Category is required",
                })}
                className={`form-select ${
                  errors.job_category ? "is-invalid" : ""
                }`}
              >
                <option value="">Select Category</option>
                <option value="Full-Time">Full-Time</option>
                <option value="Part-Time">Part-Time</option>
              </select>
              {errors.job_category && (
                <div className="invalid-feedback">
                  {errors.job_category.message}
                </div>
              )}
            </div>

            {/* Job Region */}
            <div className="col-md-3 mb-3">
              <label className="form-label">
                Job Region<span className="text-danger">*</span>
              </label>
              <select
                {...register("job_region", {
                  required: "Job Region is required",
                })}
                className={`form-select ${
                  errors.job_region ? "is-invalid" : ""
                }`}
              >
                <option value="">Select Region</option>
                <option value="India">India</option>
                <option value="US">US</option>
              </select>
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
                  Team Type: <span className="text-danger">*</span>
                </label>
                <select
                  {...register("team_type_1", {
                    required: "Team type is required",
                  })}
                  className={`form-select ${
                    errors.team_type_1 ? "is-invalid" : ""
                  }`}
                >
                  <option value="">Select Coordinator</option>
                  <option value="ONB Coordinator">Coordinator 1</option>
                  <option value="Coordinator 2">Coordinator 2</option>
                </select>
                {errors.team_type_1 && (
                  <div className="invalid-feedback">
                    {errors.team_type_1.message}
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
                Any Other Additional Questions:{" "}
                <span className="text-danger">*</span>
              </label>
              <select
                {...register("additional_questions", {
                  required: "Please specify if there are additional questions",
                })}
                className={`form-select ${
                  errors.additional_questions ? "is-invalid" : ""
                }`}
              >
                <option value="">Select option</option>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
              {errors.additional_questions && (
                <div className="invalid-feedback">
                  {errors.additional_questions.message}
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
