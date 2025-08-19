import React, { useEffect, useState } from "react";
import { useForm,useFieldArray, Controller } from "react-hook-form";
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

const PlanninggForm = (handleNext) => {
    const edit_id = new URLSearchParams(window.location.search).get("edit_id");
  const navigate = useNavigate();
  const { commonState } = useCommonState();
  const [openSection, setOpenSection] = useState(null);
  const [completedSections, setCompletedSections] = useState([]);
  const [hasCitizenRequirement, setHasCitizenRequirement] = useState("");
  const [citizenCountries, setCitizenCountries] = useState([""]);

  const [jobdesc, setJobDesc] = useState("");
  console.log(citizenCountries,"dfsdsa")

  const [inputOptions, setInputOptions] = useState([]);
  const [dropdownOptions, setDropdownOptions] = useState([]);
    const [selectedLanguages, setSelectedLanguages] = useState([]);
  const [languageProficiency, setLanguageProficiency] = useState({});

  console.log(dropdownOptions, "dsfds");
  const experienceOptions = [
    { value: "0-5", label: "0-5" },
    { value: "5-10", label: "5-10" },
    { value: "10-15", label: "10-15" },
    { value: "15-20", label: "15-20" },
    { value: "20+", label: "20+" },
  ];

  const proficiencyOptions = [
  { label: "Beginner", value: "Beginner" },
  { label: "Intermediate", value: "Intermediate" },
  { label: "Advanced", value: "Advanced" },
];

  const toggleSection = (section) => {
    setOpenSection(openSection === section ? null : section);
  };
  useEffect(()=>{
     const fetcheditDetails = async () => {
      try {
        const response = await axiosInstance.post(
          "/api/hiring-plan/details/",
          { hiring_plan_id: edit_id },
          { headers: { "Content-Type": "multipart/form-data" } }
        );
        if (response?.data?.success) {
          const data = response?.data?.data
  const langOptions = response?.data?.data?.communication_language.map((item) => ({
  label: item.language,
  value: item.language,
  }));
  
  setSelectedLanguages(langOptions);
  
  const profMap = {};
  response?.data?.data?.communication_language.forEach((item) => {
    profMap[item.language] = {
      label: item.proficiency,
      value: item.proficiency,
    };
  });
  setCitizenCountries(data?.citizen_countries)
  // setLanguageProficiency(profMap);
  setRows(data?.communication_language)
  setJobDesc(data?.jd_details)
          reset({
            job_role: data?.job_role,
            no_of_openings: data?.no_of_openings,
            tech_stack: data?.tech_stacks,
            experience_range: data?.experience_range,
            designation: data?.designation,
            target_companies: data?.target_companies,
            compensation_range: data?.compensation,
            location: data?.location,
            currency_type:data?.currency_type,
            working_modal: data?.working_modal,
            job_type: data?.job_type,
            sub_domain_name:data?.sub_domain_name,
            role_type: data?.role_type,
            relocation: data?.relocation,
            relocation_currency_type:data?.relocation_currency_type,
            relocation_amount: data?.relocation_amount,
            has_domain: data?.has_domain,
            domain_name: data?.domain_name,
            shift_timings: data?.shift_timings,
            education_qualification: data?.education_qualification,
            travel_opportunities: data?.travel_opportunities,
            visa_required: data?.visa_required,
            visa_country: data?.visa_country,
            visa_type: data?.visa_type,
            background_verfication: data?.background_verfication,
            bg_verification_type: data?.bg_verification_type,
            communication_language: langOptions,
            citizen_requirement: data?.citizen_requirement,
            health_requirmnebt : data?.job_health_requirement,
            career_gap: data?.career_gap,
            social_media_link: data?.social_media_link,
            social_media: data?.social_media_data,
            citizen_describe:data?.citizen_describe,
            health_describe:data?.health_describe,
          });
        }
      } catch (error) {
        console.error("Failed to fetch config data", error);
        toast.error("Failed to load edit options.");
      }
    };

    fetcheditDetails();
  },[edit_id])

  //   useeffects
  useEffect(() => {
    const fetchConfigOptions = async () => {
      try {
        const response = await axiosInstance.get(
          "https://api.pixeladvant.com/admin_configuration/mapped_admin_configurations/"
        );
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

  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors },
    reset,
    getValues,
  } = useForm({
    defaultValues: {
      social_media: [{ media_type: "", media_link: "" }],
    },
  });

  const hasDomain = watch("has_domain");
  const hasRelocation = watch("relocation");
  const hasVisa = watch("visa_required");
  const hasBgVerfication = watch("background_verfication");
   const socialMediaLinkValue = watch("social_media_link");
   const hasHealthRecruirment = watch("health_requirmnebt")
   const hasCitizenRequirment = watch("citizen_requirement")
   const [rows, setRows] = useState([]);

   console.log(rows,"sdsdsadsa")

     const { fields, append, remove } = useFieldArray({
    control,
    name: "social_media",
  });


const handleAddCitizenCountry = () => {
  setCitizenCountries([...citizenCountries, ""]);
};


const handleRemoveCitizenCountry = (index) => {
  const updated = citizenCountries.filter((_, i) => i !== index);
  setCitizenCountries(updated);
};
  const handleAddCommunicationRow = () => {
    setRows([...rows, { language: null, proficiency: null }]);
  };

  const handleCommunicationChange = (index, field, value) => {
    const updatedRows = [...rows];
    updatedRows[index][field] = value;
    setRows(updatedRows);
  };
  const selectedCommunicationLanguages = rows.map((row) => row.language?.value);

  const handleRemoveCommunicationRow = (index) => {
    const updatedRows = rows.filter((_, i) => i !== index);
    setRows(updatedRows);
  };
  const onError = (errors) => {
    if (Object.keys(errors).length > 0) {
      toast.error("Please fill all required fields");
    }
  };

  const onSubmit = async (data) => {
    //  const finalData = selectedLanguages.map((lang) => ({
    //   language: lang.value,
    //   proficiency: languageProficiency[lang.value]?.value || "",
    // }));
    console.log(data,"dsasdasas")
    const formdata = {
        job_role:data?.job_role,
        no_of_openings:data?.no_of_openings,
        tech_stacks:data?.tech_stack,
        experience_range:data?.experience_range,
        designation:data?.designation,
        currency_type:data?.currency_type,
        target_companies:data?.target_companies,
        compensation_range:data?.compensation,
        location:data?.location,
        working_modal:data?.working_modal,
        job_type:data?.job_type,
        role_type:data?.role_type,
        relocation:data?.relocation,
        relocation_amount:data?.relocation_amount,
        relocation_currency_type:data?.relocation_currency_type,
        has_domain:data?.has_domain,
        domain_name:data?.domain_name,
        shift_timings:data?.shift_timings,
        education_qualification:data?.education_qualification,
        travel_opportunities:data?.travel_opportunities,
        visa_required:data?.visa_required,
        visa_country:data?.visa_country,
        visa_type:data?.visa_type,
        background_verfication:data?.background_verfication,
        bg_verification_type:data?.bg_verification_type,
        communication_language:rows,
        citizen_requirement:data?.citizen_requirement,
        sub_domain_name:data?.sub_domain_name,
        // job_health_requirement:data?.health_requirmnebt,
      career_gap:data?.career_gap,
      social_media_link:data?.social_media_link,
      social_media_data:data?.social_media,
      jd_details:jobdesc,
      citizen_countries:data?.citizen_countries,
      health_describe:data?.health_describe,
    };
    if(!edit_id){
          const response = await axiosInstance.post(
      "/hiring_plan/",
      formdata
    );

    if (response && response.data.success) {
      alert(response?.data?.message);
      localStorage.removeItem(LOCAL_STORAGE_KEY);
      navigate("/hiring_manager/planning");
    }
    }

    if(edit_id){
        const updateformdata = {...formdata,hiring_plan_id:edit_id}
          const response = await axiosInstance.put(
      "/hiring_plan/",
      updateformdata
    );

    if (response && response.data.success) {
      alert(response?.data?.message);
      localStorage.removeItem(LOCAL_STORAGE_KEY); 
      navigate("/hiring_manager/planning");
    }
    }
    console.log(formdata,"efadaw")
  };

  const formatCompensationInput = (input) => {
    input = input.trim();

    if (/^\d+\s*-\s*\d+$/.test(input)) {
      return input.replace(/\s+/g, "");
    }

    if (/^\d+$/.test(input)) {
      return `0-${input}`;
    }
  };

  const customStyles = {
    control: (provided) => ({
      ...provided,
      minHeight: "38px",
      borderColor: errors?.compensation ? "#dc3545" : "#ced4da",
      boxShadow: "none",
      "&:hover": {
        borderColor: "#86b7fe",
      },
    }),
    multiValue: (provided) => ({
      ...provided,
      backgroundColor: "#e9ecef",
    }),
    placeholder: (provided) => ({
      ...provided,
      fontSize: "0.9rem",
    }),
  };

  const LOCAL_STORAGE_KEY = "planning_form_autosave";

useEffect(() => {
  if (performance.getEntriesByType("navigation")[0]?.type === "reload") {
    localStorage.removeItem(LOCAL_STORAGE_KEY);
    reset({
      social_media: [{ media_type: "", media_link: "" }],
    });
    setJobDesc("");
    setSelectedLanguages([]);
    setLanguageProficiency({});
  }
}, []);

useEffect(() => {
  if (!edit_id) {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        reset(parsed);
        if (parsed.jd_details) setJobDesc(parsed.jd_details);
        if (parsed.communication_language) setSelectedLanguages(parsed.communication_language);
        if (parsed.languageProficiency) setLanguageProficiency(parsed.languageProficiency);
      } catch {}
    }
  }
}, [reset, edit_id]);

//  Auto-save form data 
useEffect(() => {
  if (!edit_id) {
    const subscription = watch((value) => {
      localStorage.setItem(
        LOCAL_STORAGE_KEY,
        JSON.stringify({
          ...value,
          jd_details: jobdesc,
          communication_language: selectedLanguages,
          languageProficiency,
        })
      );
    });
    return () => subscription.unsubscribe();
  }
}, [watch, jobdesc, selectedLanguages, languageProficiency, edit_id]);

useEffect(() => {
  if (!edit_id) {
    const handleBeforeUnload = (e) => {
      e.preventDefault();
      e.returnValue = ""; 
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }
}, [edit_id]);

  return (
    <div style={{ maxHeight: "1000px", overflowY: "auto" }}>
      <ToastContainer />
      <form
        className="py-1 mt-2"
        onSubmit={handleSubmit(onSubmit, onError)}
        noValidate
      >
        <AccordionItem
          title="Job Overview"
          isOpen={openSection === "joboverview"}
          onClick={() => toggleSection("joboverview")}
        >
          <div className="row d-flex gap-3">
            {/* job role */}
            <div className="col-md-3">
              <label className="form-label">
                Job Role <span className="text-danger">*</span>
              </label>

              <Controller
                name="job_role"
                control={control}
                rules={{
                  validate: (value) =>
                    value && value.length > 0 ? true : "job role required",
                }}
                render={({ field }) => (
                  <CreatableSelect
                    {...field}
                    isMulti
                    options={dropdownOptions?.job_position}
                    classNamePrefix="react-select"
                    placeholder="Select Job Overview "
                    onChange={(val) => field.onChange(val)}
                    className={errors.job_role ? "is-invalid" : ""}
                  />
                )}
              />

              {errors.job_role && (
                <div className="invalid-feedback d-block">
                  {errors.job_role.message}
                </div>
              )}
            </div>

            {/* No of Openings */}
            <div className="col-md-3">
              <label className="form-label">No of Openings</label>
              <input
                type="number"
                min="1"
                max="100"
                {...register("no_of_openings", {
                  required: "This field is required",
                  min: {
                    value: 1,
                    message: "Minimum 1 opening is required",
                  },
                  max: {
                    value: 100,
                    message: "Maximum 100 openings allowed",
                  },
                  valueAsNumber: true,
                })}
                className={`form-control ${
                  errors.no_of_openings ? "is-invalid" : ""
                }`}
                placeholder="Enter No of openings"
                onInput={(e) => {
                  let value = e.target.value;
                  if (value < 1) e.target.value = 1;
                  if (value > 100) e.target.value = 100;
                }}
              />
              {errors.no_of_openings && (
                <div className="invalid-feedback">
                  {errors.no_of_openings.message}
                </div>
              )}
            </div>
                        {/* Tech Stacks*/}
                        <div className="col-md-3">
              <label className="form-label">Tech Stack</label>
              <Controller
                className={`form-select ${
                  errors.tech_stack ? "is-invalid" : ""
                }`}
                name="tech_stack"
                control={control}
                render={({ field }) => (
                  <CreatableSelect
                    {...field}
                    isMulti
                    options={dropdownOptions?.tech_stacks}
                    classNamePrefix="react-select"
                    placeholder="Select tech stack"
                  />
                )}
              />
              {errors.tech_stack && (
                <div className="invalid-feedback">
                  {errors.tech_stack.message}
                </div>
              )}
            </div>

                        <div className="mb-4">
                          <label className="form-label fw-semibold">
                           Job Description<span className="text-danger">*</span>:
                          </label>
                          <ReactQuill
                            value={jobdesc}
                            onChange={setJobDesc}
                            theme="snow"
                            placeholder="Enter your text here"
                            className="quill-editor"
                          />
                        </div>

          </div>

          <div className="row d-flex gap-3">
            {/* Experience Range */}
            <div className="col-md-3">
              <label className="form-label">
                Experience Range <span className="text-danger">*</span>
              </label>

              <Controller
                name="experience_range"
                control={control}
                rules={{
                  validate: (value) =>
                    value && value.length > 0
                      ? true
                      : "experience range required",
                }}
                render={({ field }) => (
                  <CreatableSelect
                    {...field}
                    isMulti
                    options={experienceOptions}
                    classNamePrefix="react-select"
                    placeholder="Select Experience range "
                    onChange={(val) => field.onChange(val)}
                    className={errors.experience_range ? "is-invalid" : ""}
                  />
                )}
              />

              {errors.experience_range && (
                <div className="invalid-feedback d-block">
                  {errors.experience_range.message}
                </div>
              )}
            </div>

            {/* Designation */}
            <div className="col-md-3">
              <label className="form-label">Designation</label>
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
                    options={dropdownOptions?.designation}
                    classNamePrefix="react-select"
                    placeholder="Select designation"
                  />
                )}
              />
              {errors.designation && (
                <div className="invalid-feedback">
                  {errors.designation.message}
                </div>
              )}
            </div>

            {/* Target Companies */}
            <div className="col-md-3">
              <label className="form-label">
                Target Companies <span className="text-danger">*</span>
              </label>

              <Controller
                name="target_companies"
                control={control}
                // rules={{
                //   validate: (value) =>
                //     value && value.length > 0
                //       ? true
                //       : "target companies required",
                // }}
                render={({ field }) => (
                  <CreatableSelect
                    {...field}
                    isMulti
                    options={dropdownOptions?.target_companies}
                    classNamePrefix="react-select"
                    placeholder="Select target companies"
                    onChange={(val) => field.onChange(val)}
                    className={errors.target_companies ? "is-invalid" : ""}
                  />
                )}
              />

              {errors.target_companies && (
                <div className="invalid-feedback d-block">
                  {errors.target_companies.message}
                </div>
              )}
            </div>
          </div>

          <div className="row d-flex gap-3">
            <div className="col-md-3">
              <label className="form-label">Compensation Range (Yearly)</label>
              <Controller
                name="compensation"
                control={control}
                render={({ field }) => (
                  <CreatableSelect
                    {...field}
                    isMulti
                    isClearable
                    styles={customStyles}
                    options={inputOptions}
                    onCreateOption={(inputValue) => {
                      const formatted = formatCompensationInput(inputValue);
                      if (formatted) {
                        const newOption = {
                          label: formatted,
                          value: formatted,
                        };
                        setInputOptions((prev) => [...prev, newOption]);
                        field.onChange([...(field.value || []), newOption]);
                      }
                    }}
                    classNamePrefix="react-select"
                    placeholder="Enter or create range (e.g., 1-2, 5)"
                  />
                )}
              />
              {errors.compensation && (
                <div className="invalid-feedback d-block">
                  {errors.compensation.message}
                </div>
              )}
            </div>

                        {/* currency type*/}
                        <div className="col-md-3">
              <label className="form-label">Currency Type</label>
              <select
                {...register("currency_type")}
                className={`form-select ${
                  errors.currency_type ? "is-invalid" : ""
                }`}
              >
                <option value="">Select currency_type</option>
                <option value={"INR"}>INR</option>
                <option value={"USA"}>USA</option>
              </select>
              {errors.currency_type && (
                <div className="invalid-feedback">
                  {errors.currency_type.message}
                </div>
              )}  
            </div>

            {/* Location */}
            <div className="col-md-3">
              <label className="form-label">Location</label>
              <Controller
                className={`form-select ${errors.location ? "is-invalid" : ""}`}
                name="location"
                control={control}
                render={({ field }) => (
                  <CreatableSelect
                    {...field}
                    isMulti
                    options={dropdownOptions?.location}
                    classNamePrefix="react-select"
                    placeholder="Select location"
                  />
                )}
              />
              {errors.location && (
                <div className="invalid-feedback">
                  {errors.location.message}
                </div>
              )}
            </div>
          </div>

          <div className="row d-flex gap-3">
            
            {/* Job Type */}
            <div className="col-md-3">
              <label className="form-label">Job Type </label>
              <Controller
                className={`form-select ${errors.job_type ? "is-invalid" : ""}`}
                name="job_type"
                control={control}
                render={({ field }) => (
                  <CreatableSelect
                    {...field}
                    isMulti
                    options={dropdownOptions?.job_type}
                    classNamePrefix="react-select"
                    placeholder="Select job type"
                  />
                )}
              />
              {errors.job_type && (
                <div className="invalid-feedback">
                  {errors.job_type.message}
                </div>
              )}
            </div>

            {/* Role Type */}
            <div className="col-md-3">
              <label className="form-label">Role Type</label>
              <Controller
                className={`form-select ${
                  errors.role_type ? "is-invalid" : ""
                }`}
                name="role_type"
                control={control}
                render={({ field }) => (
                  <CreatableSelect
                    {...field}
                    isMulti
                    options={dropdownOptions?.role_type}
                    classNamePrefix="react-select"
                    placeholder="Select role type"
                  />
                )}
              />
              {errors.role_type && (
                <div className="invalid-feedback">
                  {errors.role_type.message}
                </div>
              )}
            </div>

            {/* Relocation*/}
            <div className="col-md-3">
              <label className="form-label">Relocation</label>
              <select
                {...register("relocation")}
                className={`form-select ${
                  errors.relocation ? "is-invalid" : ""
                }`}
              >
                <option value="">Select Relocation</option>
                <option value={"Yes"}>Yes</option>
                <option value={"No"}>No</option>
                <option value={"Decide Later"}>Decide Later</option>
              </select>
              {errors.relocation && (
                <div className="invalid-feedback">
                  {errors.relocation.message}
                </div>
              )}
            </div>
          </div>

         <div className="row d-flex gap-3">
         {hasRelocation === "Yes" && (
            <>
            <div className="col-md-3">
              <label className="form-label">
                Relocation Amount <span className="text-danger">*</span>
              </label>
              <input
                {...register("relocation_amount", {
                  required: "Relocation amount is required",
                })}
                className={`form-control ${
                  errors.relocation_amount ? "is-invalid" : ""
                }`}
                placeholder="Enter relocation amount"
              />
              {errors.relocation_amount && (
                <div className="invalid-feedback">
                  {errors.relocation_amount.message}
                </div>
              )}
            </div>
                        {/*Relocation currency type*/}
                        <div className="col-md-3">
              <label className="form-label">Relocation Currency Type</label>
              <select
                {...register("relocation_currency_type")}
                className={`form-select ${
                  errors.relocation_currency_type ? "is-invalid" : ""
                }`}
              >
                <option value="">Select currency_type</option>
                <option value={"INR"}>INR</option>
                <option value={"USA"}>USA</option>
              </select>
              {errors.relocation_currency_type && (
                <div className="invalid-feedback">
                  {errors.relocation_currency_type.message}
                </div>
              )}  
            </div>
            </>
            
          )}
         </div>

          <div className="row d-flex gap-3">
            {/* has Domain*/}
            <div className="col-md-3">
              <label className="form-label">Domain</label>
              <select
                {...register("has_domain")}
                className={`form-select ${
                  errors.has_domain ? "is-invalid" : ""
                }`}
              >
                <option value="">Select domain </option>
                <option value={"Yes"}>Yes</option>
                <option value={"No"}>No</option>
                <option value={"Decide Later"}>Decide Later</option>
              </select>
              {errors.has_domain && (
                <div className="invalid-feedback">
                  {errors.has_domain.message}
                </div>
              )}
            </div>
            {hasDomain === "Yes" && (
              <>
              <div className="col-md-3">
                <label className="form-label">
                  Domain Name <span className="text-danger">*</span>
                </label>
                <input
                  {...register("domain_name", {
                    required: "Domain name is required",
                  })}
                  className={`form-control ${
                    errors.domain_name ? "is-invalid" : ""
                  }`}
                  placeholder="Enter domain name"
                />
                {errors.domain_name && (
                  <div className="invalid-feedback">
                    {errors.domain_name.message}
                  </div>
                )}
              </div>
              <div className="col-md-3">
                <label className="form-label">
                 Sub Domain Name <span className="text-danger">*</span>
                </label>
                <input
                  {...register("sub_domain_name", {
                    required: "Sub Domain name is required",
                  })}
                  className={`form-control ${
                    errors.domain_name ? "is-invalid" : ""
                  }`}
                  placeholder="Enter Sub domain name"
                />
                {errors.sub_domain_name && (
                  <div className="invalid-feedback">
                    {errors.sub_domain_name.message}
                  </div>
                )}
              </div>
              </>
            )}

            {/* shift timing */}
            <div className="col-md-3">
              <label className="form-label">Shift Timings</label>
              <Controller
                className={`form-select ${
                  errors.shift_timings ? "is-invalid" : ""
                }`}
                name="shift_timings"
                control={control}
                render={({ field }) => (
                  <CreatableSelect
                    {...field}
                    isMulti
                    options={dropdownOptions?.shift_timings}
                    classNamePrefix="react-select"
                    placeholder="Select shift timing"
                  />
                )}
              />
              {errors.shift_timings && (
                <div className="invalid-feedback">
                  {errors.shift_timings.message}
                </div>
              )}
            </div>
                        {/* Working Model  */}
                        <div className="col-md-3">
              <label className="form-label">Working Model </label>
              <Controller
                className={`form-select ${
                  errors.working_modal ? "is-invalid" : ""
                }`}
                name="working_modal"
                control={control}
                render={({ field }) => (
                  <CreatableSelect
                    {...field}
                    isMulti
                    options={dropdownOptions?.working_model}
                    classNamePrefix="react-select"
                    placeholder="Select working modal"
                  />
                )}
              />
              {errors.working_modal && (
                <div className="invalid-feedback">
                  {errors.working_modal.message}
                </div>
              )}
            </div>
          </div>
        </AccordionItem>

        <AccordionItem
          title="Education & Mobility"
          isOpen={openSection === "edu&mob"}
          onClick={() => toggleSection("edu&mob")}
          className={`accordion-title p-2 ${
            completedSections.includes("position")
              ? "bg-success text-white"
              : "bg-primary text-white"
          }`}
        >
          <div className="row d-flex gap-3">
            {/* Education Qualification*/}
            <div className="col-md-3">
              <label className="form-label">Education Qualification</label>
              <Controller
                className={`form-select ${
                  errors.education_qualification ? "is-invalid" : ""
                }`}
                name="education_qualification"
                control={control}
                render={({ field }) => (
                  <CreatableSelect
                    {...field}
                    isMulti
                    options={dropdownOptions?.education_qualification}
                    classNamePrefix="react-select"
                    placeholder="Select education qualification"
                  />
                )}
              />
              {errors.education_qualification && (
                <div className="invalid-feedback">
                  {errors.education_qualification.message}
                </div>
              )}
            </div>

            {/*Travel Opportunities (%)*/}
            <div className="col-md-3">
              <label className="form-label">Travel Opportunities (%)</label>
              <input
                type="number"
                min="1"
                max="100"
                {...register("travel_opportunities", {
                  required: "This field is required",
                  max: {
                    value: 100,
                    message: "Maximum 100 openings allowed",
                  },
                  valueAsNumber: true,
                })}
                className={`form-control ${
                  errors.travel_opportunities ? "is-invalid" : ""
                }`}
                placeholder="Enter travel opportunities"
                onInput={(e) => {
                  let value = e.target.value;
                  if (value < 0) e.target.value = 0;
                  if (value > 100) e.target.value = 100;
                }}
              />
              {errors.travel_opportunities && (
                <div className="invalid-feedback">
                  {errors.travel_opportunities.message}
                </div>
              )}
            </div>
                        {/* Visa Required */}
                        <div className="col-md-3">
              <label className="form-label">Visa Required</label>
              <select
                {...register("visa_required")}
                className={`form-select ${
                  errors.visa_required ? "is-invalid" : ""
                }`}
              >
                <option value="">Select Visa</option>
                <option value={"Yes"}>{"Yes"}</option>
                <option value={"No"}>{"No"}</option>
                <option value={"Decide Later"}>{"Decide Later"}</option>
              </select>
              {errors.visa_required && (
                <div className="invalid-feedback">
                  {errors.visa_required.message}
                </div>
              )}
            </div>
          </div>

          <div className="row d-flex gap-3">


            {hasVisa === "Yes" && (
              <>
                {/* Visa Country */}
                <div className="col-md-3">
                  <label className="form-label">Visa Country</label>
                  <input
                    {...register("visa_country")}
                    className="form-control"
                    placeholder="Enter Visa Country"
                  />
                </div>

                {/* Visa Type */}
                <div className="col-md-3">
                  <label className="form-label">Visa Type</label>
                  <input
                    {...register("visa_type")}
                    className="form-control"
                    placeholder="Enter Visa type"
                  />
                </div>
              </>
            )}
          </div>
        </AccordionItem>

        <AccordionItem
          title="Compliance & Type"
          isOpen={openSection === "com&typ"}
          onClick={() => toggleSection("com&typ")}
        >
          <div className="row d-flex gap-3">
            {/*Background Verification */}
            <div className="col-md-3">
              <label className="form-label">
                Background Verification<span className="text-danger">*</span>
              </label>
              <select
                {...register("background_verfication")}
                className={`form-select ${
                  errors.background_verfication ? "is-invalid" : ""
                }`}
              >
                <option value="">Select background verfication</option>
                <option value={"Yes"}>{"Yes"}</option>
                <option value={"No"}>{"No"}</option>
                <option value={"Decide Later"}>{"Decide Later"}</option>
              </select>
              {errors.background_verfication && (
                <div className="invalid-feedback d-block">
                  {errors.background_verfication.message}
                </div>
              )}
            </div>

            {hasBgVerfication === "Yes" && (
              <div className="col-md-3">
                <label className="form-label">
                  BG Verification Type <span className="text-danger">*</span>
                </label>

                <Controller
                  name="bg_verification_type"
                  control={control}
                  // rules={{
                  //   validate: (value) =>
                  //     value && value.length > 0
                  //       ? true
                  //       : "target companies required",
                  // }}
                  render={({ field }) => (
                    <CreatableSelect
                      {...field}
                      isMulti
                      options={dropdownOptions?.bg_verification_type}
                      classNamePrefix="react-select"
                      placeholder="SelectBG Verification Type"
                      onChange={(val) => field.onChange(val)}
                      className={
                        errors.bg_verification_type ? "is-invalid" : ""
                      }
                    />
                  )}
                />

                {errors.bg_verification_type && (
                  <div className="invalid-feedback d-block">
                    {errors.bg_verification_type.message}
                  </div>
                )}
              </div>
            )}
          </div>

          <div className="row d-flex gap-3">
            {/* Communication Language  */}
            {/* <div className="col-md-3 mb-3">
              <label className="form-label">Communication Language</label>
              <Controller
                name="communication_language"
                control={control}
                render={({ field }) => (
                  <CreatableSelect
                    {...field}
                    isMulti
                    options={dropdownOptions?.communication_language}
                    placeholder="Select communication languages"
                    onChange={(selected) => {
                      setSelectedLanguages(selected || []);
                      field.onChange(selected);
                    }}
                  />
                )}
              />
            </div> */}

            {/* Proficiency Fields Based on Language Selection */}
            {/* {selectedLanguages.map((lang) => (
              <div className="col-md-3 mb-3" key={lang.value}>
                <label className="form-label">{`${lang.label} Communication Proficiency`}</label>
                <Select
                  options={proficiencyOptions}
                  placeholder={`Select ${lang.label} proficiency`}
                  value={languageProficiency[lang.value] || null}
                  onChange={(selected) =>
                    setLanguageProficiency((prev) => ({
                      ...prev,
                      [lang.value]: selected,
                    }))
                  }
                />
              </div>
            ))} */}

{/* <div className="card p-3"> */}
  <h6 className=" mt-3">Communication Languages</h6>

  {rows.map((row, index) => {
    // get all selected languages
    const selectedLanguages = rows
      .map((r) => r.language?.value)
      .filter(Boolean); 

    return (
      <div className="row align-items-center gap-3 mb-2" key={index}>
        {/* Language Dropdown */}
        <div className="col-md-3">
          <Select
            styles={{
              control: (base) => ({
                ...base,
                minHeight: "32px",
                height: "32px",
                fontSize: "0.85rem",
              }),
            }}
            options={(dropdownOptions?.communication_language ?? []).filter(
              (opt) =>
                // allow if not selected OR it's already the current row's value
                !selectedLanguages.includes(opt.value) ||
                row.language?.value === opt.value
            )}
            value={row.language}
            onChange={(selected) =>
              handleCommunicationChange(index, "language", selected)
            }
            placeholder="Language"
          />
        </div>

        {/* Proficiency Dropdown */}
        <div className="col-md-3">
          <Select
            styles={{
              control: (base) => ({
                ...base,
                minHeight: "32px",
                height: "32px",
                fontSize: "0.85rem",
              }),
            }}
            options={proficiencyOptions}
            value={row.proficiency}
            onChange={(selected) =>
              handleCommunicationChange(index, "proficiency", selected)
            }
            placeholder="Proficiency"
          />
        </div>

        {/* Remove Button */}
        <div className="col-md-2">
          <button
            type="button"
            className="btn btn-danger btn-sm"
            onClick={() => handleRemoveCommunicationRow(index)}
          >
            Remove
          </button>
        </div>
      </div>
    );
  })}

  {/* Add Button */}
  <div className="mt-2">
    <button
      type="button"
      className="btn btn-primary btn-sm"
      onClick={handleAddCommunicationRow}
    >
      + Add Language
    </button>
  </div>
{/* </div>   */}


            {/* Citizen Requirement*/}
            <div className="col-md-3">
  <label className="form-label">Citizen Requirement</label>
  <select
    {...register("citizen_requirement")}
    className={`form-select ${
      errors.citizen_requirement ? "is-invalid" : ""
    }`}
    onChange={(e) => setHasCitizenRequirement(e.target.value)}
  >
    <option value="">Select requirement</option>
    <option value="Yes">Yes</option>
    <option value="No">No</option>
    <option value="Decide Later">Decide Later</option>
  </select>
  {errors.citizen_requirement && (
    <div className="invalid-feedback">
      {errors.citizen_requirement.message}
    </div>
  )}
</div>

{/* Dynamic Citizen Country fields */}
{hasCitizenRequirement === "Yes" && (
  <div className="col-12 mt-2">
    <label className="form-label">Citizen Country Name</label>
    {citizenCountries.map((country, index) => (
      <div className="row mb-2 align-items-center gap-3" key={index}>
        <div className="col-md-3">
          <input
            {...register(`citizen_countries.${index}`)}
            className="form-control"
            placeholder="Enter Citizen Country name"
            defaultValue={country.value}
          />
        </div>
        <div className="col-md-2">
          <button
            type="button"
            className="btn btn-danger btn-sm"
            onClick={() => handleRemoveCitizenCountry(index)}
          >
            Remove
          </button>
        </div>
      </div>
    ))}

    <button
      type="button"
      className="btn btn-primary btn-sm"
      onClick={handleAddCitizenCountry}
    >
      + Add Country
    </button>
  </div>
)}


            {/*Job Health Requirement */}
            {/* <div className="col-md-3">
              <label className="form-label">Job Health Requirement </label>
              <select
                {...register("health_requirmnebt")}
                className={`form-select ${
                  errors.health_requirmnebt ? "is-invalid" : ""
                }`}
              >
                <option value="">Select requirement</option>
                <option value={"Yes"}>Yes</option>
                <option value={"No"}>No</option>
                <option value={"Decide Later"}>Decide Later</option>
              </select>
              {errors.health_requirmnebt && (
                <div className="invalid-feedback">
                  {errors.health_requirmnebt.message}
                </div>
              )}
            </div> */}

{/*             
            {hasHealthRecruirment === "Yes" && (
              <>
                <div className="col-md-3">
                  <label className="form-label">Describe Health Reason</label>
                  <input
                    {...register("health_describe")}
                    className="form-control"
                    placeholder="Describe health reason"
                  />
                </div>
              </>
            )} */}

            {/* Career Gap */}
            <div className="col-md-3">
              <label className="form-label">Career Gap </label>
              <select
                {...register("career_gap")}
                className={`form-select ${
                  errors.career_gap ? "is-invalid" : ""
                }`}
              >
                <option value="">Select requirement</option>
                <option value={"Yes"}>Yes</option>
                <option value={"No"}>No</option>
                <option value={"Decide Later"}>Decide Later</option>
              </select>
              {errors.career_gap && (
                <div className="invalid-feedback">
                  {errors.career_gap.message}
                </div>
              )}
            </div>

            {/* Social Media Link Dropdown */}
            <div className="col-md-3 mb-3">
              <label className="form-label">Social Media Link</label>
              <select
                {...register("social_media_link", {
                  required: "This field is required",
                })}
                className={`form-select ${
                  errors.social_media_link ? "is-invalid" : ""
                }`}
              >
                <option value="">Select requirement</option>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
                <option value="Decide Later">Decide Later</option>
              </select>
              {errors.social_media_link && (
                <div className="invalid-feedback">
                  {errors.social_media_link.message}
                </div>
              )}
            </div>

            {/* Conditionally Render Media Inputs */}
            {socialMediaLinkValue === "Yes" &&
              fields.map((item, index) => (
                <div className="row mb-2" key={item.id}>
                  <div className="col-md-3">
                    <label className="form-label">Media Type</label>
                    <input
                      {...register(`social_media.${index}.media_type`, {
                        required: "Required",
                      })}
                      className="form-control"
                      placeholder="e.g., LinkedIn"
                    />
                  </div>
                  {/* <div className="col-md-5">
                    <label className="form-label">Media Link</label>
                    <input
                      {...register(`social_media.${index}.media_link`, {
                        required: "Required",
                      })}
                      className="form-control"
                      placeholder="e.g., https://linkedin.com/in/..."
                    />
                  </div> */}
                  <div className="col-md-2 d-flex align-items-end">
                    {index > 0 && (
                      <button
                        type="button"
                        className="btn btn-danger"
                        onClick={() => remove(index)}
                      >
                        Remove
                      </button>
                    )}
                  </div>
                </div>
              ))}

            {/* Add Button */}
            {socialMediaLinkValue === "Yes" && (
              <div className="col-md-3 mb-3">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => append({ media_type: "", media_link: "" })}
                >
                  + Add Social Media
                </button>
              </div>
            )}
          </div>
        </AccordionItem>

        <div className="row">
          {/* back button */}
          {/* Submit Button */}
          <div className="col text-end">
            <button className="btn btn-primary mt-3" type="submit">
              {edit_id ? "update" : "Submit"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default PlanninggForm;
