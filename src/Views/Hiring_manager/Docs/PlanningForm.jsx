import React, { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Card, CardHeader } from "react-bootstrap";
import CreatableSelect from "react-select/creatable";
import SpinnerComponent from "Components/Spinner/Spinner";
import axiosInstance from "Services/axiosInstance";

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
  mode_of_working: "",
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

const PlanningForm = () => {
  const queryParams = new URLSearchParams(window.location.search);
  const edit_id = queryParams.get("edit_id");
  const [formData, setFormData] = useState(initialState);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [sections, setSections] = useState([]);
  const [is_edit, set_is_edit] = useState(null);

  const selectOptions = {
    job_position: ["Java Dev", "Python Dev", "UI/UX Designer"],
    experience_range: ["0-5", "5-10", "10-15", "15-20", "20+"],
    working_model: ["Part", "Full", "Internship", "Contractor"],
    relocation: ["Yes", "No", "Decide Later"],
    domain: ["Yes", "No", "Decide Later"],
    visa_requirements: ["Yes", "No", "Decide Later"],
    background_verification: ["Yes", "No", "TBD"],
    shift_timings: ["General", "Day", "Night", "Rotational"],
    role_type: [
      "Individual Contributor",
      "Team Handling",
      "Management",
      "Leadership",
    ],
    job_type: ["Full time", "Part time", "Contractor"],
    citizen_requirement: ["Yes", "No", "Decide Later"],
    career_gap: ["Yes", "No", "Decide Later"],
    job_health_requirements: ["Yes", "No", "Decide Later"],
    language_proficiency: ["Beginner", "Intermediate", "Proficient"],
    social_media_links: ["Yes", "No"],
  };

  useEffect(() => {
    const updatedSections = [
      {
        title: "1. Job Overview",
        fields: [
          { name: "job_position", label: "Job Role" },
          { name: "no_of_openings", label: "Number of Openings" },
          { name: "tech_stacks", label: "Tech Stacks" },
          { name: "jd_details", label: "Job Description" },
          { name: "experience_range", label: "Experience Range" },
          { name: "designation", label: "Designation" },
          { name: "target_companies", label: "Target Companies" },
          { name: "compensation", label: "Compensation Range (Yearly)" },
          { name: "location", label: "Location" },
          { name: "working_model", label: "Working Model" },
          { name: "job_type", label: "Job Type" },
          { name: "role_type", label: "Role Type" },
          { name: "mode_of_working", label: "Mode of Working" },
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
          { name: "communication_language", label: "Communication Language" },
          { name: "citizen_requirement", label: "Citizen Requirement" },
          { name: "job_health_requirements", label: "Job Health Requirement" },
          { name: "career_gap", label: "Career Gap" },
          { name: "language_proficiency", label: "Language Proficiency" },
          //   { name: "social_media_links", label: "Social Media Links" },
          { name: "social_media_links", label: "Social Media Link" },
          ...(formData.social_media_links === "Yes"
            ? [{ name: "github_link", label: "Protfolio Link" }]
            : []),
        ],
      },
    ];
    setSections(updatedSections);
  }, [formData]);

  useEffect(() => {
    if (edit_id) {
      getEditDetails(edit_id);
      set_is_edit(edit_id);
      window.history.replaceState(null, "", window.location.pathname);
    }
  }, [edit_id]);

  async function getEditDetails(id) {
    setLoading(true);
    try {
      const { data } = await axiosInstance.post(
        "/api/hiring-plan/details/",
        { hiring_plan_id: id },
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      if (data?.error_code === 200) {
        setFormData(data?.data);
      }
    } catch (err) {
      console.log(err?.message || "Something went wrong");
    }
    setLoading(false);
  }

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({ ...formData, [name]: files ? files[0] : value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      payload.append(key, value);
    });
    if (is_edit) payload.append("hiring_plan_id", is_edit);

    try {
      await axiosInstance[is_edit ? "put" : "post"]("/hiring_plan/", payload, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      toast.success("Form submitted successfully!");
      setFormData(initialState);
    } catch (err) {
      toast.error("Failed to submit form. Please try again.");
    }
  };

  const renderInput = (label, name, type = "text") => (
    <div className="mb-3 col-md-6" key={name}>
      <label className="form-label">{label}</label>
      {type === "textarea" ? (
        <textarea
          name={name}
          value={formData[name] || ""}
          onChange={handleChange}
          className={`form-control ${errors[name] ? "is-invalid" : ""}`}
          rows={4}
          placeholder={`Enter ${label}`}
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
    <div className="mb-3 col-md-6" key={name}>
      <label className="form-label">{label}</label>
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

  const renderCreatableSelect = (label, name, optionsList = []) => (
    <div className="mb-3 col-md-6" key={name}>
      <label className="form-label">{label}</label>
      <CreatableSelect
        isClearable
        onChange={(newValue) =>
          setFormData({ ...formData, [name]: newValue ? newValue.value : "" })
        }
        value={
          formData[name]
            ? { label: formData[name], value: formData[name] }
            : null
        }
        options={optionsList.map((opt) => ({ label: opt, value: opt }))}
      />
    </div>
  );

  const renderJobDescriptionField = () => (
    <div className="mb-3 col-md-12">
      <label className="form-label">Job Description (Upload or Type)</label>
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

  const handleJDFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const fileType = file.name.split(".").pop().toLowerCase();
    if (!["doc", "docx", "pdf", "txt"].includes(fileType)) {
      toast.error("Unsupported file type. Please upload .docx, .pdf, or .txt");
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
          let text = "";
          for (let i = 1; i <= pdf.numPages; i++) {
            const page = await pdf.getPage(i);
            const txt = await page.getTextContent();
            text += txt.items.map((s) => s.str).join(" ") + "\n";
          }
          setFormData((prev) => ({ ...prev, jd_details: text }));
        } else if (fileType === "docx" || fileType === "doc") {
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

    if (["pdf", "docx", "doc"].includes(fileType)) {
      reader.readAsArrayBuffer(file);
    } else {
      reader.readAsText(file);
    }
  };

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
            onSubmit={handleSubmit}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
              }
            }}
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
                    <div className="accordion-body row">
                      {section.fields.map(({ name, label }) => (
                        <React.Fragment key={name}>
                          {[
                            "job_position",
                            "designation",
                            "tech_stacks",
                            "target_companies",
                            "location",
                          ].includes(name)
                            ? renderCreatableSelect(
                                label,
                                name,
                                selectOptions[name] || []
                              )
                            : name === "jd_details"
                            ? renderJobDescriptionField()
                            : name === "social_media_links" &&
                              formData.social_media_links === "Github"
                            ? renderInput("Enter Profile Link", "github_link")
                            : selectOptions[name]
                            ? renderSelect(label, name, selectOptions[name])
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

            <div className="text-end mt-4 mb-2">
              <button type="submit" className="btn btn-primary px-5 py-2">
                <i className="bi bi-send me-2"></i>{" "}
                {is_edit ? "Update" : "Submit"}
              </button>
            </div>
          </form>
        )}
      </Card>
    </div>
  );
};

export default PlanningForm;
