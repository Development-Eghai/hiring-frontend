import React, { useState, useEffect, useCallback } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Card, CardHeader } from "react-bootstrap";
import CreatableSelect from "react-select/creatable";
import SpinnerComponent from "Components/Spinner/Spinner";
import axiosInstance from "Services/axiosInstance";
import { useNavigate } from "react-router-dom";
import { Modal, Button } from "react-bootstrap";
import * as pdfjsLib from "pdfjs-dist";
pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;

const initialState = {
  job_position: "",
  no_of_openings: "",
  tech_stacks: "",
  jd_details: "",
  experience_range: "",
  designation: "",
  target_companies: "",
  compensation: "",
  location: "",
  working_model: "",
  job_type: "",
  role_type: "",
  relocation: "",
  relocation_amount: "",
  domain: "",
  domain_name: "",
  education_qualification: "",
  travel_opportunities: "",
  visa_requirements: "",
  visa_country: "",
  visa_type: "",
  background_verification: "",
  shift_timings: "",
  communication_language: "",
  citizen_requirement: "",
  job_health_requirements: "",
  career_gap: "",
  language_proficiency: "",
  social_media_links: "",
  github_link: "",
};

const fieldRequirements = {
  job_position: "mandatory",
  no_of_openings: "mandatory",
  tech_stacks: "mandatory",
  jd_details: "mandatory",
  experience_range: "mandatory",
  designation: "mandatory",
  target_companies: "not_mandatory",
  compensation: "mandatory",
  location: "mandatory",
  working_model: "mandatory",
  job_type: "mandatory",
  role_type: "mandatory",
  relocation: "not_mandatory",
  relocation_amount: "not_mandatory",
  domain: "not_mandatory",
  domain_name: "not_mandatory",
  education_qualification: "mandatory",
  travel_opportunities: "mandatory",
  visa_requirements: "not_mandatory",
  visa_country: "not_mandatory",
  visa_type: "not_mandatory",
  background_verification: "mandatory",
  shift_timings: "mandatory",
  communication_language: "mandatory",
  citizen_requirement: "mandatory",
  job_health_requirements: "mandatory",
  career_gap: "mandatory",
  language_proficiency: "mandatory",
  social_media_links: "mandatory",
  github_link: "not_mandatory",
};

const selectOptions = {
  job_position: ["Java Dev", "Python Dev", "UI/UX Designer"],
  experience_range: ["0-5", "5-10", "10-15", "15-20", "20+"],
  working_model: ["WFH", "On site", "HYBRID"],
  relocation: ["Yes", "No", "Decide Later"],
  domain: ["Yes", "No", "Decide Later"],
  visa_requirements: ["Yes", "No", "Decide Later"],
  background_verification: ["Yes", "No", "TBD"],
  shift_timings: ["General", "Day", "Night", "Rotational"],
  role_type: ["Full time", "Part time", "Contractor", "Internship"],
  job_type: ["Full time", "Part time", "Contractor"],
  citizen_requirement: ["Yes", "No", "Decide Later"],
  career_gap: ["Yes", "No", "Decide Later"],
  job_health_requirements: ["Yes", "No", "Decide Later"],
  language_proficiency: ["Beginner", "Intermediate", "Proficient"],
  social_media_links: ["Yes", "No"],
  education_qualification: ["B.Tech", "M.Tech", "B.Sc", "MBA", "Other"],
  bg_verification_type: ["Education", "Aadhar", "Credit", "Work History"],
  tech_stacks: ["python", "react"],
  designation: ["react developer", "python developer"],
  target_companies: ["HCL", "CTS"],
};

const getLabelWithAsterisk = (name, label) =>
  fieldRequirements[name] === "mandatory" ? (
    <span>
      {label} <span style={{ color: "red" }}>*</span>
    </span>
  ) : (
    label
  );

const validateForm = (formData) => {
  for (const key in fieldRequirements) {
    if (fieldRequirements[key] === "mandatory" && !formData[key]) {
      toast.error("Please fill all mandatory fields.");
      return false;
    }
  }
  return true;
};

const useJDParser = (setFormData) => {
  return useCallback(
    async (e) => {
      const file = e.target.files[0];
      if (!file) return;
      const fileType = file.name.split(".").pop().toLowerCase();
      if (!["doc", "docx", "pdf", "txt"].includes(fileType)) {
        toast.error(
          "Unsupported file type. Please upload .docx, .pdf, or .txt"
        );
        return;
      }

      const reader = new FileReader();

      reader.onload = async (event) => {
        const content = event.target.result;
        try {
          if (fileType === "txt") {
            setFormData((prev) => ({ ...prev, jd_details: content }));
          } else if (fileType === "pdf") {
            const pdf = await pdfjsLib.getDocument({ data: content }).promise;
            let jdText = "";
            for (let i = 1; i <= pdf.numPages; i++) {
              const page = await pdf.getPage(i);
              const txt = await page.getTextContent();
              jdText += txt.items.map((s) => s.str).join(" ") + "\n";
            }
            setFormData((prev) => ({ ...prev, jd_details: jdText }));
          } else if (fileType === "doc" || fileType === "docx") {
            const mammoth = await import("mammoth");
            const result = await mammoth.extractRawText({
              arrayBuffer: content,
            });
            setFormData((prev) => ({ ...prev, jd_details: result.value }));
          }
        } catch (err) {
          console.error(err);
          toast.error("Failed to parse the uploaded file");
        }
      };

      if (["pdf", "doc", "docx"].includes(fileType)) {
        reader.readAsArrayBuffer(file);
      } else {
        reader.readAsText(file);
      }
    },
    [setFormData]
  );
};

const useEditDetails = (edit_id, setFormData, setLoading, set_is_edit) =>
  useEffect(() => {
    const fetchEditDetails = async () => {
      setLoading(true);
      try {
        const { data } = await axiosInstance.post(
          "/api/hiring-plan/details/",
          { hiring_plan_id: edit_id },
          { headers: { "Content-Type": "multipart/form-data" } }
        );
        if (data?.error_code === 200) setFormData(data.data);
      } catch (err) {
        console.log(err?.message || "Something went wrong");
      }
      setLoading(false);
    };
    if (edit_id) {
      fetchEditDetails();
      set_is_edit(edit_id);
      window.history.replaceState(null, "", window.location.pathname);
    }
  }, [edit_id, setFormData, setLoading, set_is_edit]);

const PlanningForm = () => {
  const edit_id = new URLSearchParams(window.location.search).get("edit_id");
  const [formData, setFormData] = useState(initialState);
  console.log(formData,"dsfads")
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [sections, setSections] = useState([]);
  const [is_edit, set_is_edit] = useState(null);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [communication_languages,setCommunication_languages] = useState([]);
  const navigate = useNavigate();

  useEditDetails(edit_id, setFormData, setLoading, set_is_edit);
  const handleJDFileUpload = useJDParser(setFormData);

  useEffect(() => {
    setSections([
      {
        title: "1. Job Overview",
        fields: [
          { name: "job_position", label: "Job Role" },
          { name: "no_of_openings", label: "Number of Openings" },
          { name: "tech_stacks", label: "Tech Stack" },
          { name: "jd_details", label: "Job Description" },
          { name: "experience_range", label: "Experience Range" },
          { name: "designation", label: "Designation" },
          { name: "target_companies", label: "Target Companies" },
          { name: "compensation", label: "Compensation Range (Yearly)" },
          { name: "location", label: "Location" },
          { name: "working_model", label: "Working Model" },
          { name: "job_type", label: "Job Type" },
          { name: "role_type", label: "Role Type" },
          { name: "relocation", label: "Relocation" },
          ...(formData.relocation === "Yes"
            ? [{ name: "relocation_amount", label: "Relocation Amount" }]
            : []),
          { name: "domain", label: "Has Domain?" },
          ...(formData.domain === "Yes"
            ? [{ name: "domain_name", label: "Domain Name" }]
            : []),
          { name: "shift_timings", label: "Shift Timings" },
        ],
      },
      {
        title: "2. Education & Mobility",
        fields: [
          { name: "education_qualification", label: "Education Qualification" },
          { name: "travel_opportunities", label: "Travel Opportunities (%)" },
          { name: "visa_requirements", label: "Visa Required" },
          ...(formData.visa_requirements === "Yes"
            ? [
                { name: "visa_country", label: "Visa Country" },
                { name: "visa_type", label: "Visa Type" },
              ]
            : []),
        ],
      },
      {
        title: "3. Compliance & Type",
        fields: [
          { name: "background_verification", label: "Background Verification" },
          ...(formData.background_verification === "Yes"
            ? [{ name: "bg_verification_type", label: "BG Verification Type" }]
            : []),

          { name: "communication_language", label: "Communication Language" },
          { name: "citizen_requirement", label: "Citizen Requirement" },
          { name: "job_health_requirements", label: "Job Health Requirement" },
          { name: "career_gap", label: "Career Gap" },
          { name: "language_proficiency", label: "Language Proficiency" },
          { name: "social_media_links", label: "Social Media Link" },
          ...(formData.social_media_links === "Yes"
            ? [{ name: "github_link", label: "Protfolio Link" }]
            : []),
        ],
      },
    ]);
  }, [formData]);

  const handleChange = useCallback(
    (e) => {
      const { name, value, files } = e.target;

      if (name === "no_of_openings") {
        const digitsOnly = value.replace(/\D/g, "");
        const limited = Math.min(Number(digitsOnly), 1000);
        setFormData((prev) => ({ ...prev, [name]: limited || "" }));
        return;
      }

      if (name === "relocation_amount") {
        const digitsOnly = value.replace(/\D/g, "");
        setFormData((prev) => ({ ...prev, [name]: digitsOnly }));
        return;
      }
      if (name === "domain_name") {
        const charsOnly = value.replace(/[^a-zA-Z\s]/g, "");
        setFormData((prev) => ({ ...prev, [name]: charsOnly }));
        return;
      }
      if (name === "visa_country") {
        const charsOnly = value.replace(/[^a-zA-Z\s]/g, "");
        setFormData((prev) => ({ ...prev, [name]: charsOnly }));
        return;
      }
      if (name === "travel_opportunities") {
        const digits = value.replace(/\D/g, "");
        const capped = Math.min(Number(digits), 100);
        setFormData((prev) => ({ ...prev, [name]: capped || "" }));
        return;
      }

      setFormData((prev) => ({ ...prev, [name]: files ? files[0] : value }));
    },
    [setFormData]
  );

  const hanldeMultiChnage = (selectedOptions,name)=>{
    console.log(selectedOptions,"Adasdqw")
    // setCommunication_languages((prev) => ({
    //         ...prev,
    //         [name]: true
    //           ? selectedOptions?.map((opt) => opt.value).join(", ")
    //           : selectedOptions?.value || "",
    //       }))

    setSections([...sections,{ name: "social_media_links", label: "Social Media Link" }])
}
        console.log(communication_languages?.tech_stacks,"saawEW")

  const handleSubmit = useCallback(async () => {
    if (!validateForm(formData)) return;
    const payload = new FormData();
    Object.entries(formData).forEach(([key, value]) =>
      payload.append(key, value)
    );
    if (is_edit) payload.append("hiring_plan_id", is_edit);
    try {
      const request = is_edit ? "put" : "post";
      const response = await axiosInstance[request]("/hiring_plan/", payload, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      if (response.data?.error_code === 200) {
        toast.success("Form submitted successfully!");
        setFormData(initialState);
        setTimeout(() => navigate("/hiring_manager/planning"), 1500);
      } else {
        toast.error(response.data?.message || "Something went wrong");
      }
    } catch (err) {
      toast.error(
        err?.response?.data?.message ||
          "Failed to submit form. Please try again."
      );
    }
  }, [formData, is_edit, navigate]);

  const renderInput = (label, name, type = "text") => (
    <div className="mb-3 col-md-5 mx-5" key={name}>
      <label className="form-label">{getLabelWithAsterisk(name, label)}</label>
      {type === "textarea" ? (
        <input
          type={type}
          name={name}
          value={formData[name] || ""}
          onChange={handleChange}
          className={`form-control ${errors[name] ? "is-invalid" : ""}`}
          placeholder={
            name === "compensation" ? "Enter range e.g. 5-10" : `Enter ${label}`
          }
          min={name === "no_of_openings" ? 0 : undefined}
        />
      ) : (
        <input
          type={type}
          name={name}
          value={formData[name] || ""}
          onChange={handleChange}
          className={`form-control ${errors[name] ? "is-invalid" : ""}`}
          placeholder={`Enter ${label}`}
        />
      )}
      {errors[name] && <div className="invalid-feedback">{errors[name]}</div>}
    </div>
  );

  const renderSelect = (label, name, options) => (
    <div className="mb-3 col-md-5 mx-5" key={name}>
      <label className="form-label">{getLabelWithAsterisk(name, label)}</label>
      <select
        name={name}
        value={formData[name] || ""}
        onChange={handleChange}
        className={`form-select ${errors[name] ? "is-invalid" : ""}`}
      >
        <option value="">Select {label}</option>
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
      {errors[name] && <div className="invalid-feedback">{errors[name]}</div>}
    </div>
  );

  const renderCreatableSelect = (
    label,
    name,
    optionsList = [],
    isMulti = true
  ) => (
    <div className="mb-3 col-md-5 mx-5" key={name}>
      <label className="form-label">{getLabelWithAsterisk(name, label)}</label>
      <CreatableSelect
        isClearable
        isMulti={isMulti}
onChange={(selectedOptions) => {
  hanldeMultiChnage(selectedOptions, name);
  setFormData((prev) => ({
    ...prev,
    [name]: isMulti
      ? selectedOptions?.map((opt) => opt.value).join(", ")
      : selectedOptions?.value || "",
  }));
}}
        value={
          isMulti
            ? (formData[name]?.split(", ") || []).map((v) => ({
                label: v,
                value: v,
              }))
            : formData[name]
            ? { label: formData[name], value: formData[name] }
            : null
        }
        options={optionsList.map((opt) => ({ label: opt, value: opt }))}
      />
    </div>
  );

  const renderJobDescriptionField = () => (
    <div className="mb-3 col-md-11 mx-5">
      <label className="form-label">
        {getLabelWithAsterisk("jd_details", "Job Description (Upload or Type)")}
      </label>
      <input
        type="file"
        accept=".doc,.docx,.pdf,.txt"
        onChange={handleJDFileUpload}
        className="form-control mb-2"
      />
      <textarea
        name="jd_details"
        value={formData.jd_details || ""}
        onChange={handleChange}
        className={`form-control ${errors.jd_details ? "is-invalid" : ""}`}
        rows={6}
        placeholder="Enter Job Description"
      />
      {errors.jd_details && (
        <div className="invalid-feedback">{errors.jd_details}</div>
      )}
    </div>
  );

  const [dropdownOptions, setDropdownOptions] = useState(selectOptions);

  useEffect(() => {
    const fetchConfigOptions = async () => {
      try {
        const response = await axiosInstance.get("/admin_configuration/");
        const configData = response.data?.data || {};

        const mappedOptions = {
          job_position: configData["Position Role"] || [],
          designation: configData["Designation"] || [],
          tech_stacks: configData["Tech Stack"] || [],
          target_companies: configData["Target Companies"] || [],
          working_model: configData["Working Model"] || [],
          role_type: configData["Role Type"] || [],
          job_type: configData["Job Type"] || [],
          shift_timings: configData["Shift Timings"] || [],
          education_qualification: configData["Education Qualification"] || [],
          communication_language: configData["Communication Language"] || [],
          location: configData["Location"] || [],
        };

        setDropdownOptions((prev) => ({ ...prev, ...mappedOptions }));
      } catch (error) {
        console.error("Failed to fetch config data", error);
        toast.error("Failed to load dropdown options.");
      }
    };

    fetchConfigOptions();
  }, []);

  return (
    <div className="h-100" style={{ overflow: "auto" }}>
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
      <Card>
        {loading ? (
          <div
            className="row justify-content-center align-items-center"
            style={{ height: "48rem" }}
          >
            <div className="col-5 text-center">
              <SpinnerComponent />
              <p>Getting details</p>
            </div>
          </div>
        ) : (
          <form
            onSubmit={(e) => e.preventDefault()}
            onKeyDown={(e) => e.key === "Enter" && e.preventDefault()}
            className="bg-light border rounded-4 shadow-sm p-4"
          >
            <CardHeader className="mb-4 text-primary fw-bold sticky-top bg-light border-bottom py-3">
              Hiring Planning Form
            </CardHeader>

            {sections.map((section, index) => (
              <div className="accordion" id="planningAccordion" key={index}>
                <div className="accordion-item">
                  <h2 className="accordion-header" id={`heading${index}`}>
                    <button
                      className={`accordion-button ${
                        index !== 0 ? "collapsed" : ""
                      }`}
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target={`#collapse${index}`}
                      aria-expanded={index === 0}
                      aria-controls={`collapse${index}`}
                    >
                      <span>{section.title}</span>
                    </button>
                  </h2>
                  <div
                    id={`collapse${index}`}
                    className={`accordion-collapse collapse ${
                      index === 0 ? "show" : ""
                    }`}
                    data-bs-parent="#planningAccordion"
                  >
                    <div className="accordion-body gap-2 col row">
                      {section.fields.map(({ name, label }) => (
                        <React.Fragment key={name}>
                          {[
                            "tech_stacks",
                            "communication_language",
                          ].includes(name)
                            ? renderCreatableSelect(
                                label,
                                name,
                                dropdownOptions[name] || [],
                              )
                            : name === "jd_details"
                            ? renderJobDescriptionField()
                            : name === "social_media_links" &&
                              formData.social_media_links === "Github"
                            ? renderInput("Enter Profile Link", "github_link")
                            : dropdownOptions[name]
                            ? renderSelect(label, name, dropdownOptions[name])
                            : renderInput(
                                label,
                                name,
                                name === "no_of_openings" ? "number" : "text"
                              )}
                        </React.Fragment>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {/* Submit Button */}
            <div className="text-end mt-4 mb-2">
              <button
                type="button"
                className="btn btn-primary px-5 py-2"
                onClick={() => setShowConfirmModal(true)}
              >
                <i className="bi bi-send me-2"></i>{" "}
                {is_edit ? "Update" : "Submit"}
              </button>
            </div>
          </form>
        )}
      </Card>

      {/* Confirmation Modal */}
      <Modal
        show={showConfirmModal}
        onHide={() => setShowConfirmModal(false)}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Confirm Submission</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to {is_edit ? "update" : "submit"} this hiring
          plan?
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => setShowConfirmModal(false)}
          >
            Cancel
          </Button>
          <Button
            variant="primary"
            onClick={() => {
              setShowConfirmModal(false);
              handleSubmit();
            }}
          >
            Yes, {is_edit ? "Update" : "Submit"}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default PlanningForm;
