import React, { useState, useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Card, CardHeader } from 'react-bootstrap';

const PlanningForm = () => {
    const initialState = {
        job_position: '', tech_stacks: '', jd_details: '', experience_range: '',
        designation: '', target_companies: '', interview_status: '',
        compensation: '', location: '', working_model: '',
        education_decision: '', relocation: '', travel_opportunities: '',
        visa_requirements: '', domain_knowledge: '', background_verification: '',
        shift_timings: '', role_type: '', job_type: '',
        communication_language: '', notice_period: '', additional_comp: '',
        citizen_requirement: '', career_gap: '', sabbatical: '',
        screening_questions: '', job_health_requirements: '',
        social_media_links: '', language_proficiency: ''
    };

    const [formData, setFormData] = useState(initialState);
    const [errors, setErrors] = useState({});
    const [sectionProgress, setSectionProgress] = useState([]);

    const sections = [
        {
            title: '1. Job Overview',
            fields: [
                { name: 'job_position', label: 'Job Position' },
                { name: 'tech_stacks', label: 'Tech Stacks' },
                { name: 'jd_details', label: 'Job Description' },
                { name: 'experience_range', label: 'Experience Range' },
                { name: 'designation', label: 'Designation' },
            ]
        },
        {
            title: '2. Company Info & Status',
            fields: [
                { name: 'target_companies', label: 'Target Companies' },
                { name: 'interview_status', label: 'Interview Status' },
                { name: 'compensation', label: 'Compensation' },
                { name: 'location', label: 'Location' },
                { name: 'working_model', label: 'Working Model' },
            ]
        },
        {
            title: '3. Education & Mobility',
            fields: [
                { name: 'education_decision', label: 'Education Decision' },
                { name: 'relocation', label: 'Relocation' },
                { name: 'travel_opportunities', label: 'Travel Opportunities' },
                { name: 'visa_requirements', label: 'Visa Requirements' },
                { name: 'domain_knowledge', label: 'Domain Knowledge' },
            ]
        },
        {
            title: '4. Compliance & Type',
            fields: [
                { name: 'background_verification', label: 'Background Verification' },
                { name: 'shift_timings', label: 'Shift Timings' },
                { name: 'role_type', label: 'Role Type' },
                { name: 'job_type', label: 'Job Type' },
                { name: 'communication_language', label: 'Communication Language' },
            ]
        },
        {
            title: '5. Final Details',
            fields: [
                { name: 'notice_period', label: 'Notice Period' },
                { name: 'additional_comp', label: 'Additional Compensation' },
                { name: 'citizen_requirement', label: 'Citizen Requirement' },
                { name: 'career_gap', label: 'Career Gap' },
                { name: 'sabbatical', label: 'Sabbatical' },
                { name: 'screening_questions', label: 'Screening Questions' },
                { name: 'job_health_requirements', label: 'Job Health Requirements' },
                { name: 'social_media_links', label: 'Social Media Links' },
                { name: 'language_proficiency', label: 'Language Proficiency' },
            ]
        }
    ];

    useEffect(() => {
        const newProgress = sections.map(section => {
            const filled = section.fields.filter(field => {
                const value = formData[field.name];
                return value && (typeof value === 'string' ? value.trim() !== '' : true);
            }).length;
            return Math.round((filled / section.fields.length) * 100);
        });
        setSectionProgress(newProgress);
    }, [formData]);

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        setFormData({ ...formData, [name]: files ? files[0] : value });
    };

    const validate = () => {
        const newErrors = {};
        return newErrors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const validationErrors = validate();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            Object.values(validationErrors).forEach(msg => toast.error(msg));
            return;
        }

        const payload = new FormData();
        Object.entries(formData).forEach(([key, value]) => {
            payload.append(key, value);
        });

        try {
            const response = await axios.post(
                'https://api.pixeladvant.com/hiring_plan/',
                payload,
                {
                    headers: { 'Content-Type': 'multipart/form-data' },
                }
            );
            toast.success('Form submitted successfully!');
            setFormData(initialState);
        } catch (err) {
            console.error(err);
            toast.error('Failed to submit form. Please try again.');
        }
    };

    const renderInput = (label, name, type = 'text') => (
        <div className="mb-3 col-md-6">
            <label className="form-label">{label}</label>
            <input
                type={type}
                name={name}
                value={formData[name] || ''}
                onChange={handleChange}
                className={`form-control ${errors[name] ? 'is-invalid' : ''}`}
                placeholder={`Enter ${label}`}
            />
            {errors[name] && <div className="invalid-feedback">{errors[name]}</div>}
        </div>
    );

    const renderSelect = (label, name, options) => (
        <div className="mb-3 col-md-6">
            <label className="form-label">{label}</label>
            <select
                name={name}
                value={formData[name] || ''}
                onChange={handleChange}
                className={`form-select ${errors[name] ? 'is-invalid' : ''}`}
            >
                <option value="">Select {label}</option>
                {options.map(opt => (
                    <option key={opt} value={opt}>{opt}</option>
                ))}
            </select>
            {errors[name] && <div className="invalid-feedback">{errors[name]}</div>}
        </div>
    );

    const renderFile = (label, name) => (
        <div className="mb-3 col-md-6">
            <label className="form-label">{label}</label>
            <input
                type="file"
                name={name}
                accept=".pdf,.doc,.docx"
                onChange={handleChange}
                className={`form-control ${errors[name] ? 'is-invalid' : ''}`}
            />
            {errors[name] && <div className="invalid-feedback">{errors[name]}</div>}
        </div>
    );

    const selectOptions = {
        job_position: ['Developer', 'Designer', 'Manager'],
        experience_range: ['0-5', '5-10', '10-15'],
        working_model: ['Part', 'Full'],
        relocation: ['Yes', 'No', 'Decide Later'],
        background_verification: ['Yes', 'No', 'TBD'],
        shift_timings: ['General', 'Day + Night'],
        role_type: ['Individual Contributor', 'Team Handling', 'Management', 'Leadership'],
        job_type: ['Full time', 'Part time', 'Contractor'],
        citizen_requirement: ['Yes', 'No', 'Decide Later'],
        career_gap: ['Yes', 'No', 'Decide Later'],
        sabbatical: ['Yes', 'No', 'Decide Later'],
        job_health_requirements: ['Yes', 'No', 'Decide Later'],
        language_proficiency: ['Beginner', 'Intermediate', 'Proficient']
    };

    return (
        <div className="h-100" style={{ overflow: "auto" }}>
            <style>
                {`
          .progress-circle-wrapper {
            width: 36px;
            height: 36px;
          }

          .progress-circle {
            width: 100%;
            height: 100%;
            transform: rotate(-90deg);
          }

          .circle-bg {
            stroke: #eee;
          }

          .circle {
            stroke: #0d6efd;
            stroke-linecap: round;
            transition: stroke-dasharray 0.3s ease;
          }

          .percentage-text {
            font-size: 10px;
            fill: #000;
          }
        `}
            </style>

            <ToastContainer position="top-right" autoClose={3000} hideProgressBar newestOnTop closeOnClick />
            <Card>
                <form onSubmit={handleSubmit} className="bg-light border rounded-4 shadow-sm p-4 "  >
                    {/* <CardHeader className="mb-4 text-primary fw-bold" style={{ position: "sticky", top: "0", zIndex: "10", padding: '1rem' }}>Hiring Planning Form</CardHeader> */}
                    {/* <CardHeader
                        className="mb-4 text-primary fw-bold sticky-header"
                    >
                        Hiring Planning Form
                    </CardHeader> */}
                    <CardHeader
                        className="mb-4 text-primary fw-bold"
                        style={{
                            position: 'sticky',
                            top: '0',
                            zIndex: 10,
                            backgroundColor: '#f8f9fa',
                            padding: '1rem',
                            borderBottom: '1px solid #dee2e6',
                        }}
                    >
                        Hiring Planning Form
                    </CardHeader>

                    <div className="accordion" id="planningAccordion">
                        {sections.map((section, index) => (
                            <div className="accordion-item" key={index}>
                                <h2 className="accordion-header" id={`heading${index}`}>
                                    <button
                                        className={`accordion-button ${index !== 0 ? 'collapsed' : ''}`}
                                        type="button"
                                        data-bs-toggle="collapse"
                                        data-bs-target={`#collapse${index}`}
                                        aria-expanded={index === 0}
                                        aria-controls={`collapse${index}`}
                                    >
                                        <div className="d-flex align-items-center gap-3">
                                            <div className="progress-circle-wrapper">
                                                <svg className="progress-circle" viewBox="0 0 36 36">
                                                    <path
                                                        className="circle-bg"
                                                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                                                        fill="none"
                                                        strokeWidth="3"
                                                    />
                                                    <path
                                                        className="circle"
                                                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                                                        fill="none"
                                                        strokeWidth="3"
                                                        strokeDasharray={`${sectionProgress[index]}, 100`}
                                                    />
                                                </svg>
                                            </div>
                                            <span>{section.title}</span>
                                        </div>
                                    </button>
                                </h2>
                                <div id={`collapse${index}`} className={`accordion-collapse collapse ${index === 0 ? 'show' : ''}`} data-bs-parent="#planningAccordion">
                                    <div className="accordion-body row">
                                        {section.fields.map(({ name, label, type = 'text' }, i) => {
                                            if (type === 'file') return renderFile(label, name);
                                            if (selectOptions[name]) return renderSelect(label, name, selectOptions[name]);
                                            return renderInput(label, name, type);
                                        })}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="text-end mt-4 mb-2">
                        <button type="submit" className="btn btn-primary px-5 py-2">
                            <i className="bi bi-send me-2"></i> Submit
                        </button>
                    </div>
                </form>
            </Card>
        </div>
    );
};

export default PlanningForm;
