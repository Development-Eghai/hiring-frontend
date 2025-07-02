import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import '../../../Stylesheet/Css/App.css'
import DataTable from "react-data-table-component";
import { PlusCircle } from "react-bootstrap-icons";
import { Button } from "react-bootstrap";
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

const RequisitionForm = () => {
    const [openSection, setOpenSection] = useState(null);
    const [completedSections, setCompletedSections] = useState([]);

    const [internalDesc, setInternalDesc] = useState('');
    const [externalDesc, setExternalDesc] = useState('');

    const toggleSection = (section) => {
        setOpenSection(openSection === section ? null : section);
    };

    const { register, handleSubmit, formState: { errors }, } = useForm();

    const onSubmit = (data) => {
        console.log("Form Submitted ✅", data);
        alert("Form is valid and submitted successfully!");
    };

    const handleRequisitionSubmit = () => {
        // Mark "requisition" as completed
        if (!completedSections.includes("requisition")) {
            setCompletedSections([...completedSections, "requisition"]);
        }
    };

    const columns = [
        { name: 'Competency', selector: row => row.Competency, sortable: true },
        { name: 'Library', selector: row => row.Library, sortable: true },
        { name: 'Category', selector: row => row.Category, sortable: true },
        { name: 'Expected Rating %', selector: row => row.ExpectedRating, sortable: true },
        { name: 'Weight %', selector: row => row.Weight, sortable: true },
        { name: 'Actions', selector: row => row.Actions, sortable: false },
    ];

    const data = [
        {
            id: 1,
            Competency: '01',
            Library: '10',
            Category: 'yes',
            ExpectedRating: '20',
            Weight: '12',
            Actions: 'select',
        },
    ];
    const columns2 = [
        { name: 'Competency', selector: row => row.Competency, sortable: true },
        { name: 'Library', selector: row => row.Library, sortable: true },
        { name: 'Category', selector: row => row.Category, sortable: true },
        { name: 'Expected Rating %', selector: row => row.ExpectedRating, sortable: true },
        { name: 'Weight %', selector: row => row.Weight, sortable: true },
        { name: 'Actions', selector: row => row.Actions, sortable: false },
    ];

    const data2 = [
        {
            id: 1,
            Competency: '01',
            Library: '10',
            Category: 'yes',
            ExpectedRating: '20',
            Weight: '12',
            Actions: 'select',
        },
    ];

    return (
        <div style={{ maxHeight: "500px", overflowY: "auto" }}>
            <AccordionItem
                title="Requisitions Information"
                isOpen={openSection === "requisition"}
                onClick={() => toggleSection("requisition")}
                className={`accordion-title p-2 ${completedSections.includes("requisition")
                    ? "bg-success text-white"
                    : "bg-primary text-white"
                    }`}
            >
                <div className="row">
                <div className="mb-3 col-md-3">
                    <label className="form-label">
                        Req Id
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Enter job title"
                            onBlur={handleRequisitionSubmit}
                        />
                    </label>
                </div>
                <div className="mb-3 col-md-3">
                    <label className="form-label">
                        Planning Id
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Enter job title"
                            onBlur={handleRequisitionSubmit}
                        />
                    </label>
                </div>
                </div>
            </AccordionItem>

            <AccordionItem
                title="Position Information"
                isOpen={openSection === "position"}
                onClick={() => toggleSection("position")}
                className={`accordion-title p-2 ${completedSections.includes("position")
                    ? "bg-success text-white"
                    : "bg-primary text-white"
                    }`}
            >
                <form className="py-1 mt-2" onSubmit={handleSubmit(onSubmit)} noValidate>
                    <div className="row">
                        {/* Internal Job Title */}
                        <div className="col-md-3">
                            <label className="form-label">Internal Job Title<span className="text-danger">*</span></label>
                            <input
                                {...register("internalJobTitle", { required: "Internal Job Title is required" })}
                                className={`form-control ${errors.internalJobTitle ? "is-invalid" : ""}`}
                                placeholder="Software Engineer"
                            />
                            {errors.internalJobTitle && <div className="invalid-feedback">{errors.internalJobTitle.message}</div>}
                        </div>

                        {/* External Job Title */}
                        <div className="col-md-3">
                            <label className="form-label">External Job Title<span className="text-danger">*</span></label>
                            <input
                                {...register("externalJobTitle", { required: "External Job Title is required" })}
                                className={`form-control ${errors.externalJobTitle ? "is-invalid" : ""}`}
                                placeholder="Software Engineer"
                            />
                            {errors.externalJobTitle && <div className="invalid-feedback">{errors.externalJobTitle.message}</div>}
                        </div>

                        {/* Position */}
                        <div className="col-md-3">
                            <label className="form-label">Position</label>
                            <input {...register("position")} className="form-control" placeholder="Software Engineer" />
                        </div>

                        {/* Legal Entry */}
                        <div className="col-md-3">
                            <label className="form-label">Legal Entry</label>
                            <input {...register("legalEntry")} className="form-control" />
                        </div>

                        {/* Business Line */}
                        <div className="col-md-3">
                            <label className="form-label">Business Line</label>
                            <input {...register("businessLine")} className="form-control" />
                        </div>

                        {/* Business Unit */}
                        <div className="col-md-3">
                            <label className="form-label">Business Unit</label>
                            <input {...register("businessUnit")} className="form-control" />
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
                            <input {...register("geoZone")} className="form-control" />
                        </div>

                        {/* Employee Group */}
                        <div className="col-md-3">
                            <label className="form-label">Employee Group</label>
                            <input {...register("employeeGroup")} className="form-control" />
                        </div>

                        {/* Contract Start/End Date */}
                        <div className="col-md-3">
                            <label className="form-label">Contract Start Date <small>(Only for Contractor)</small></label>
                            <input type="date" {...register("contractStartDate")} className="form-control" />
                        </div>

                        <div className="col-md-3">
                            <label className="form-label">Contract End Date <small>(Only for Contractor)</small></label>
                            <input type="date" {...register("contractEndDate")} className="form-control" />
                        </div>

                        {/* Career Level */}
                        <div className="col-md-3">
                            <label className="form-label">Career Level</label>
                            <input {...register("careerLevel")} className="form-control" />
                        </div>

                        {/* Band */}
                        <div className="col-md-3">
                            <label className="form-label">Band <span className="text-danger">*</span></label>
                            <select
                                {...register("band", { required: "Band is required" })}
                                className={`form-select ${errors.band ? "is-invalid" : ""}`}
                            >
                                <option value="">Select Band</option>
                                <option value="Band 1">Band 1</option>
                                <option value="Band 2">Band 2</option>
                            </select>
                            {errors.band && <div className="invalid-feedback">{errors.band.message}</div>}
                        </div>

                        {/* Sub Band */}
                        <div className="col-md-3">
                            <label className="form-label">Sub Band <span className="text-danger">*</span></label>
                            <select
                                {...register("subBand", { required: "Sub Band is required" })}
                                className={`form-select ${errors.subBand ? "is-invalid" : ""}`}
                            >
                                <option value="">Select Sub Band</option>
                                <option value="Sub Band A">Sub Band A</option>
                                <option value="Sub Band B">Sub Band B</option>
                            </select>
                            {errors.subBand && <div className="invalid-feedback">{errors.subBand.message}</div>}
                        </div>

                        {/* Primary Skills */}
                        <div className="col-md-3">
                            <label className="form-label">Primary Skills <span className="text-danger">*</span></label>
                            <select
                                {...register("primarySkills", { required: "Primary Skills are required" })}
                                className={`form-select ${errors.primarySkills ? "is-invalid" : ""}`}
                            >
                                <option value="">Select Skill</option>
                                <option value="React">React</option>
                                <option value="Node.js">Node.js</option>
                            </select>
                            {errors.primarySkills && <div className="invalid-feedback">{errors.primarySkills.message}</div>}
                        </div>

                        {/* Secondary Skills */}
                        <div className="col-md-3">
                            <label className="form-label">Secondary Skills</label>
                            <input {...register("secondarySkills")} className="form-control" />
                        </div>

                        {/* Mode of Working */}
                        <div className="col-md-3">
                            <label className="form-label">Mode of Working</label>
                            <input {...register("modeOfWorking")} className="form-control" />
                        </div>

                        {/* Client Interview */}
                        <div className="col-md-3">
                            <label className="form-label">Client Interview</label>
                            <select {...register("clientInterview")} className="form-select">
                                <option value="">Select</option>
                                <option value="Yes">Yes</option>
                                <option value="No">No</option>
                            </select>
                        </div>

                        {/* Requisition Type */}
                        <div className="col-md-3">
                            <label className="form-label">Requisition Type</label>
                            <select {...register("requisitionType")} className="form-select">
                                <option value="">Select</option>
                                <option value="Type A">Type A</option>
                                <option value="Type B">Type B</option>
                            </select>
                        </div>

                        {/* Submit Button */}
                        <div className="col-12 text-end">
                            <button className="btn btn-primary mt-3" type="submit">
                                Submit
                            </button>
                        </div>
                    </div>
                </form>
            </AccordionItem>

            <AccordionItem
                title="Billing Details"
                isOpen={openSection === "billing"}
                onClick={() => toggleSection("billing")}
            >
                <div className="row">
                    <div className="d-flex">
                        <div className="col-md-3">
                            <label className="form-label">Billing Type<span className="text-danger">*</span></label>
                            <select
                                {...register("billing", { required: "billing is required" })}
                                className={`form-select ${errors.band ? "is-invalid" : ""}`}
                            >
                                <option value="">Select billing</option>
                                <option value="billing 1">billing 1</option>
                                <option value="billing 2">billing 2</option>
                            </select>
                            {errors.billing && <div className="invalid-feedback">{errors.billing.message}</div>}
                        </div>

                        <div className="col-md-3">
                            <label className="form-label">Billing Start Date :</label>
                            <input type="date" {...register("BillingStartDate")} className="form-control" />
                        </div>

                    </div>
                </div>
            </AccordionItem>

            <AccordionItem
                title="Posting Details"
                isOpen={openSection === "posting"}
                onClick={() => toggleSection("posting")}
                className={`accordion-title p-2 ${completedSections.includes("posting") ? "bg-success text-white" : "bg-primary text-white"
                    }`}
            >
                <div className="row py-3">
                    {/* Experience */}
                    <div className="col-md-3 mb-3">
                        <label className="form-label">Experience<span className="text-danger">*</span></label>
                        <select
                            {...register("experience", { required: "Experience is required" })}
                            className={`form-select ${errors.experience ? "is-invalid" : ""}`}
                        >
                            <option value="">Select Experience</option>
                            <option value="0-2 years">0-2 years</option>
                            <option value="2-5 years">2-5 years</option>
                        </select>
                        {errors.experience && <div className="invalid-feedback">{errors.experience.message}</div>}
                    </div>

                    {/* Qualification */}
                    <div className="col-md-3 mb-3">
                        <label className="form-label">Qualification<span className="text-danger">*</span></label>
                        <select
                            {...register("qualification", { required: "Qualification is required" })}
                            className={`form-select ${errors.qualification ? "is-invalid" : ""}`}
                        >
                            <option value="">Select Qualification</option>
                            <option value="B.Tech">B.Tech</option>
                            <option value="MBA">MBA</option>
                        </select>
                        {errors.qualification && <div className="invalid-feedback">{errors.qualification.message}</div>}
                    </div>

                    {/* Designation */}
                    <div className="col-md-3 mb-3">
                        <label className="form-label">Designation<span className="text-danger">*</span></label>
                        <select
                            {...register("designation", { required: "Designation is required" })}
                            className={`form-select ${errors.designation ? "is-invalid" : ""}`}
                        >
                            <option value="">Select Designation</option>
                            <option value="Developer">Developer</option>
                            <option value="Manager">Manager</option>
                        </select>
                        {errors.designation && <div className="invalid-feedback">{errors.designation.message}</div>}
                    </div>

                    {/* Job Category */}
                    <div className="col-md-3 mb-3">
                        <label className="form-label">Job Category<span className="text-danger">*</span></label>
                        <select
                            {...register("jobCategory", { required: "Job Category is required" })}
                            className={`form-select ${errors.jobCategory ? "is-invalid" : ""}`}
                        >
                            <option value="">Select Category</option>
                            <option value="Full-Time">Full-Time</option>
                            <option value="Part-Time">Part-Time</option>
                        </select>
                        {errors.jobCategory && <div className="invalid-feedback">{errors.jobCategory.message}</div>}
                    </div>

                    {/* Job Region */}
                    <div className="col-md-3 mb-3">
                        <label className="form-label">Job Region<span className="text-danger">*</span></label>
                        <select
                            {...register("jobRegion", { required: "Job Region is required" })}
                            className={`form-select ${errors.jobRegion ? "is-invalid" : ""}`}
                        >
                            <option value="">Select Region</option>
                            <option value="India">India</option>
                            <option value="US">US</option>
                        </select>
                        {errors.jobRegion && <div className="invalid-feedback">{errors.jobRegion.message}</div>}
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
                        <Button variant="link" className="text-primary p-0 fw-bold text-decoration-none">
                            <PlusCircle className="me-1" /> Add Question
                        </Button>
                    </div>
                    <DataTable
                        title="Competencies"
                        columns={columns}
                        data={data}
                        pagination
                        responsive
                        highlightOnHover
                    />
                    <div className="mb-3">
                        <label className="form-label">
                            Required Score
                            <input
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
                        <Button variant="link" className="text-primary p-0 fw-bold text-decoration-none">
                            <PlusCircle className="me-1" /> Add Competencies
                        </Button>
                    </div>
                    <DataTable
                        title="Competencies"
                        columns={columns2}
                        data={data2}
                        pagination
                        responsive
                        highlightOnHover
                    />
                    <div className="row">
                        <div className="col-md-4">
                            <label className="form-label">ONB Coordinator: <span className="text-danger">*</span></label>
                            <select
                                {...register("onbCoordinator", { required: "ONB Coordinator is required" })}
                                className={`form-select ${errors.onbCoordinator ? "is-invalid" : ""}`}
                            >
                                <option value="">Select Coordinator</option>
                                <option value="Coordinator 1">Coordinator 1</option>
                                <option value="Coordinator 2">Coordinator 2</option>
                            </select>
                            {errors.onbCoordinator && <div className="invalid-feedback">{errors.onbCoordinator.message}</div>}
                        </div>

                        <div className="col-md-4">
                            <label className="form-label">
                                ONB Coordinator Team <small>(Manage Additional Users)</small>:
                            </label>
                            <select
                                {...register("onbCoordinatorTeam")}
                                className="form-select"
                            >
                                <option value="">Select Team</option>
                                <option value="Team 1">Team 1</option>
                                <option value="Team 2">Team 2</option>
                            </select>
                        </div>

                        <div className="col-md-4">
                            <label className="form-label">ISG Team: <span className="text-danger">*</span></label>
                            <select
                                {...register("isgTeam", { required: "ISG Team is required" })}
                                className={`form-select ${errors.isgTeam ? "is-invalid" : ""}`}
                            >
                                <option value="">Select ISG Team</option>
                                <option value="ISG 1">ISG 1</option>
                                <option value="ISG 2">ISG 2</option>
                            </select>
                            {errors.isgTeam && <div className="invalid-feedback">{errors.isgTeam.message}</div>}
                        </div>
                    </div>

                    <div className="row mt-3">
                        <div className="col-md-4">
                            <label className="form-label">Interview Teammate 1 (Emp ID): <span className="text-danger">*</span></label>
                            <select
                                {...register("interviewTeammate1", { required: "Teammate 1 is required" })}
                                className={`form-select ${errors.interviewTeammate1 ? "is-invalid" : ""}`}
                            >
                                <option value="">Select Teammate</option>
                                <option value="Emp001">Emp001</option>
                                <option value="Emp002">Emp002</option>
                            </select>
                            {errors.interviewTeammate1 && <div className="invalid-feedback">{errors.interviewTeammate1.message}</div>}
                        </div>

                        <div className="col-md-4">
                            <label className="form-label">Interview Teammate 2 (Emp ID): <span className="text-danger">*</span></label>
                            <select
                                {...register("interviewTeammate2", { required: "Teammate 2 is required" })}
                                className={`form-select ${errors.interviewTeammate2 ? "is-invalid" : ""}`}
                            >
                                <option value="">Select Teammate</option>
                                <option value="Emp003">Emp003</option>
                                <option value="Emp004">Emp004</option>
                            </select>
                            {errors.interviewTeammate2 && <div className="invalid-feedback">{errors.interviewTeammate2.message}</div>}
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
                        <label className="form-label">Laptop Needed: <span className="text-danger">*</span></label>
                        <select
                            {...register("laptopNeeded", { required: "Please specify if a laptop is needed" })}
                            className={`form-select ${errors.laptopNeeded ? "is-invalid" : ""}`}
                        >
                            <option value="">Select option</option>
                            <option value="Yes">Yes</option>
                            <option value="No">No</option>
                        </select>
                        {errors.laptopNeeded && <div className="invalid-feedback">{errors.laptopNeeded.message}</div>}
                    </div>

               
                    <div className="col-md-3">
                        <label className="form-label">Laptop Type: <span className="text-danger">*</span></label>
                        <select
                            {...register("laptopType", { required: "Please select a laptop type" })}
                            className={`form-select ${errors.laptopType ? "is-invalid" : ""}`}
                        >
                            <option value="">Select type</option>
                            <option value="Windows">Windows</option>
                            <option value="Mac">Mac</option>
                            <option value="Other">Other</option>
                        </select>
                        {errors.laptopType && <div className="invalid-feedback">{errors.laptopType.message}</div>}
                    </div>
                    <div className="col-md-3">
                        <label className="form-label">Any Other Additional Questions: <span className="text-danger">*</span></label>
                        <select
                            {...register("additionalQuestions", { required: "Please specify if there are additional questions" })}
                            className={`form-select ${errors.additionalQuestions ? "is-invalid" : ""}`}
                        >
                            <option value="">Select option</option>
                            <option value="Yes">Yes</option>
                            <option value="No">No</option>
                        </select>
                        {errors.additionalQuestions && <div className="invalid-feedback">{errors.additionalQuestions.message}</div>}
                    </div>
                    <div className="col-md-3">
                        <label className="form-label">Comments: <span className="text-danger">*</span></label>
                        <input
                            type="text"
                            {...register("assetComments", { required: "Please provide comments" })}
                            className={`form-control ${errors.assetComments ? "is-invalid" : ""}`}
                            placeholder="Enter comments"
                        />
                        {errors.assetComments && <div className="invalid-feedback">{errors.assetComments.message}</div>}
                    </div>
                </div>
            </AccordionItem>
        </div >
    );
};

export default RequisitionForm;
