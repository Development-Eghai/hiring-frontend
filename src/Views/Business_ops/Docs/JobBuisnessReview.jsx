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
import { BsArrowLeft } from "react-icons/bs";
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

  const [planid, setPlanId] = useState([]);
  const [reqtempid, setreqtempid] = useState("");

  const routelocation = useLocation();

  const createreqformData = routelocation?.state

  //   const handleSubmitBulkAction = async () => {
  //   setIsSubmitting(true);
  //   const payload = {
  //     user_role: commonState?.app_data?.user_id,
  //     req_data: selectedRows.map((row) => ({
  //       req_id: row.id,
  //       status: actionType,
  //       comment: actionComment,
  //     })),
  //   };

  //   try {
  //     const response = await axiosInstance.post(
  //       "https://api.pixeladvant.com/api/jobrequisition/approve_requisition/",
  //       payload
  //     );

  //     if (response?.data?.success) {
  //       toast.success(`${actionType} successful`);
  //     } else {
  //       toast.error("Action failed.");
  //     }
  //   } catch (error) {
  //     console.error("Bulk action error:", error);
  //     toast.error("API error during action.");
  //   }

  // };


  useEffect(()=>{
    if(createreqformData?.id){
      setreqtempid(createreqformData?.id)
    }
  },[createreqformData])

  
  async function fetch_reqs() {
    try {
      let gettempleteDetail;

      if (reqtempid) {
        gettempleteDetail = await axiosInstance.post(
          "/get_requisition_by_id/",
          {
            req_id: reqtempid,
          }
        );
      }
      console.log(gettempleteDetail,"sdfs")
      if (gettempleteDetail?.data?.error_code == 200) {
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

        setPlanId(Planning_id)
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
          formatteddesignation = designation.map((item) => ({
            label: item,
            value: item,
          }));
        }

        setInternalDesc(internalDesc);
        setExternalDesc(externalDesc);

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

  return (
    <div style={{ maxHeight: "500px", overflowY: "auto" }}>
      <ToastContainer />
      <form
        className="py-1 mt-2"
        noValidate
      >
        <div className="row">
          <div className="mb-3 col-md-3">
            <p>
              Requisition Id:{" "}
              {reqtempid || createreqformData?.reqid}
            </p>
          </div>
          <div className="mb-3 col-md-3">
            <p>Planning ID: {planid}</p>
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
          <div className="row d-flex gap-3">
            {/* Internal Job Title */}
            <div className="col-md-3">
              <label className="form-label">
                Internal Job Title<span className="text-danger">*</span>
              </label>
              <input
                {...register("internal_title")}
                className="form-control"
                disabled
              >
              </input>
            </div>

            {/* External Job Title */}
            <div className="col-md-3">
              <label className="form-label">External Job Title</label>

                            <input
                {...register("external_title")}
                className="form-control"
                disabled
              >
              </input>
            </div>

            {/* Position */}
            <div className="col-md-3">
              <label className="form-label">
                Position<span className="text-danger">*</span>
              </label>
                                          <input
                {...register("job_position")}
                className="form-control"
                disabled
              ></input>
            </div>

            {/* company/client name */}
            <div className="col-md-3">
              <label className="form-label">company/client name</label>
              <input
                {...register("company_client_name")}
                className="form-control"
                disabled
              />
            </div>

                        <div className="col-md-3">
              <label className="form-label">Date of Requisition</label>
              <input
              type="date"
                {...register("date_of_requisition")}
                className="form-control"
                               disabled
              />
            </div>

                        <div className="col-md-3">
              <label className="form-label">Due Date of Requisition </label>
              <input
                {...register("due_date_of_requisition")}
                className="form-control"
                disabled
              />
            </div>

            {/* Business Line */}
            <div className="col-md-3">
              <label className="form-label">Business Line</label>
                            <input
                {...register("business_line")}
                className="form-control"
                disabled
              />
            </div>

            {/* Business Unit */}
            <div className="col-md-3">
              <label className="form-label">Business Unit</label>
                                          <input
                {...register("business_unit")}
                className="form-control"
                disabled
              />
            </div>

            {/* Division */}
            <div className="col-md-3">
              <label className="form-label">Division</label>
                                                        <input
                {...register("division")}
                className="form-control"
                disabled
              />
            </div>

            {/* Department */}
            <div className="col-md-3">
              <label className="form-label">Department</label>
                                                                      <input
                {...register("department")}
                className="form-control"
                disabled
              />
            </div>

            {/* Location */}
            <div className="col-md-3">
              <label className="form-label">
                Location
              </label>
                                                                                    <input
                {...register("location")}
                className="form-control"
                disabled
              />
            </div>

            {/* Geo Zone */}
            <div className="col-md-3">
              <label className="form-label">
                Geo Zone
              </label>
                                                                                                  <input
                {...register("geo_zone")}
                className="form-control"
                disabled
              />
            </div>

            {/* Career Level */}
            <div className="col-md-3">
              <label className="form-label">Career Level</label>
              <input {...register("career_level")} className="form-control" disabled />
            </div>

            {/* Band */}
            <div className="col-md-3">
              <label className="form-label">
                Band <span className="text-danger">*</span>
              </label>
                            <input {...register("band")} className="form-control" disabled />

            </div>

            {/* Sub Band */}
            <div className="col-md-3">
              <label className="form-label">Sub Band</label>
            <input {...register("sub_band")} className="form-control" disabled />

            </div>

            {/* Mode of Working */}
            <div className="col-md-3">
              <label className="form-label">Mode of Working</label>
                          <input {...register("working_model")} className="form-control" disabled />

            </div>

            {/* Client Interview */}
            <div className="col-md-3">
              <label className="form-label">
                Client Interview<span className="text-danger">*</span>
              </label>
                                <input {...register("client_interview")} className="form-control" disabled />
        
            </div>

            {/* Requisition Type */}
            <div className="col-md-3">
              <label className="form-label">Requisition Type</label>
                                              <input {...register("requisition_type")} className="form-control" disabled />

            </div>
          </div>
        </AccordionItem>

        <AccordionItem
          title="Skills Required"
          isOpen={openSection === "skillsreq"}
          onClick={() => toggleSection("skillsreq")}
        >
          <div className="row d-flex gap-3">
            {/* primary skills */}
            <div className="col-md-3">
              <label className="form-label">
                Primary Skills
              </label>
              <Controller
                name="primary_skills"
                control={control}
                render={({ field }) => (
                  <CreatableSelect
                    {...field}
                    isMulti
                    // disabled={true}
                    isDisabled={true}
                    />
                  )}
              />
            </div>

            {/* secondary skills */}
            <div className="col-md-3">
              <label className="form-label">Secondary Skills</label>
              <Controller
                name="secondary_skills"
                control={control}
                render={({ field }) => (
                  <CreatableSelect
                    {...field}
                    isMulti
                    isDisabled={true}
                  />
                )}
              />
            </div>
          </div>
        </AccordionItem>

        <AccordionItem
          title="Billing Details"
          isOpen={openSection === "billing"}
          onClick={() => toggleSection("billing")}
        >
          <div className="row d-flex gap-3">
            {/* billing type */}
            <div className="col-md-3">
              <label className="form-label">
                Billing Type
              </label>
                                              <input {...register("billing_type")} className="form-control" disabled />

            </div>

            {/* Billing Start Date */}
            <div className="col-md-3">
              <label className="form-label">Billing Start Date :</label>
              <input
                type="date"
                {...register("billing_start_date")}
                className={`form-control`}
                disabled
              />
            </div>

            {/* Billing End Date */}
            <div className="col-md-3">
              <label className="form-label">Billing End Date :</label>
              <input
                type="date"
                {...register("billing_end_date")}
                className={`form-control `}
                disabled
              />
            </div>
          </div>

          <div className="row d-flex gap-3">
            {/* Contract Start Date */}
            <div className="col-md-3">
              <label className="form-label">
                Contract Start Date 
              </label>
              <input
                type="date"
                {...register("contract_start_date")}
                className={`form-control`}
                disabled
              />
            </div>
            {/* Contract End Date */}

            <div className="col-md-3">
              <label className="form-label">
                Contract End Date 
              </label>
              <input
                type="date"
                {...register("contract_end_date")}
                className={`form-control`}
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
          <div className="row py-3 d-flex gap-3">
            {/* Experience */}
            <div className="col-md-3 mb-3">
              <label className="form-label">
                Experience
              </label>

              <Controller
                name="experience"
                control={control}
                render={({ field }) => (
                  <CreatableSelect
                    {...field}
                    isMulti
                    isDisabled={true}
                  />
                )}
              />
            </div>

            {/* Qualification */}
            <div className="col-md-3 mb-3">
              <label className="form-label">
                Qualification <span className="text-danger">*</span>
              </label>

              <Controller
                name="qualification"
                control={control}
                render={({ field }) => (
                  <CreatableSelect
                    {...field}
                    isMulti
                  isDisabled={true}
                  />
                )}
              />
            </div>

            {/* Designation */}
            <div className="col-md-3 mb-3">
              <label className="form-label">
                Designation <span className="text-danger">*</span>
              </label>

              <Controller
                name="designation"
                control={control}
                render={({ field }) => (
                  <CreatableSelect
                    {...field}
                    isMulti
                  isDisabled={true}
                  />
                )}
              />
            </div>

            {/* Job Region */}
            <div className="col-md-3 mb-3">
              <label className="form-label">
                Job Region <span className="text-danger">*</span>
              </label>

              <Controller
                name="job_region"
                control={control}
                render={({ field }) => (
                  <CreatableSelect
                    {...field}
                    isMulti
                  isDisabled={true}
                  />
                )}
              />
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
                theme="snow"
                className="quill-editor"
                  readOnly={true}
              />
            </div>

            {/* External Job Description */}
            <div className="mb-4">
              <label className="form-label fw-semibold">
                External Job Description<span className="text-danger">*</span>:
              </label>
              <ReactQuill
                value={externalDesc}
                theme="snow"
                className="quill-editor"
                readOnly={true}
              />
            </div>
          </div>
        </AccordionItem>

        <AccordionItem
          title="Asset Details"
          isOpen={openSection === "asset"}
          onClick={() => toggleSection("asset")}
        >
          <div className="row mt-3 d-flex gap-3">
            <div className="col-md-3">
              <label className="form-label">
                Laptop Needed: 
              </label>
                                                            <input {...register("laptop_needed")} className="form-control" disabled />

            </div>

            <div className="col-md-3">
              <label className="form-label">
                Laptop Type:
              </label>
              <input {...register("laptop_type")} className="form-control" disabled />
            </div>

            <div className="col-md-3">
              <label className="form-label">
                Comments:
              </label>
              <input
                type="text"
                {...register("comments")}
                className={`form-control`}
                disabled
              />
            </div>
          </div>
        </AccordionItem>


<div className="row">
  <div className="col d-flex justify-content-end gap-2 mt-3">
    <button className="btn btn-danger" type="submit">
      Reject
    </button>
    <button className="btn btn-success" type="submit">
      Approve
    </button>
  </div>
</div>

      </form>
    </div>
  );
};

export default RequisitionForm;
