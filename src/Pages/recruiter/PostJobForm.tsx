
import { postNewJob } from 'Api/recruiter';
import { JobPostValidation } from 'Components/Common/Validations';
import axios from 'axios';
import { useFormik } from 'formik';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { IoIosClose } from 'react-icons/io';
import { useNavigate } from 'react-router-dom';

const skillsList: string[] = ['JavaScript', 'React', 'Node.js', 'Python', 'HTML', 'CSS', 'Java', 'SQL', 'Angular', 'Vue.js', 'Ruby', 'C#', 'PHP', 'Swift', 'Go', 'TypeScript', 'Mongodb'];

export interface JobInterface {
    title: string;
    company_name: string;
    industry: string;
    description: string;
    total_vaccancy: number;
    location: string;
    job_type: string;
    experience: number;
    min_salary: number;
    max_salary: number;
}
const initialValues: JobInterface = {
    title: '',
    company_name: '',
    industry: '',
    description: '',
    total_vaccancy: 0,
    location: '',
    job_type: '',
    experience: 0,
    min_salary: 0,
    max_salary: 0
}
interface IPostJobFormProps {

}
const PostJobForm: React.FC<IPostJobFormProps> = () => {
    const [skills, setSkills] = useState<string[]>([]);
    const [skillInput, setSkillInput] = useState<string>('');
    const [suggestions, setSuggestions] = useState<string[]>([]);
    const [picErr, setPicErr] = useState('');
    const [pic, setPic] = useState('');

    const navigate = useNavigate();

    const handleSkillInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value: string = event.target.value;
        setSkillInput(value);
        const filteredSuggestions: string[] = skillsList.filter(skill =>
            skill.toLowerCase().includes(value.toLowerCase())
        );
        setSuggestions(filteredSuggestions);
    };

    const handleSkillAddition = (skill: string) => {
        if (skill.trim() !== '') {
            setSkills([...skills, skill.trim()]);
            setSkillInput('');
            setSuggestions([]);
        }
    };
    const removeSkill = (skill: string) => {
        const ar: string[] = skills.filter((item) => item !== skill);
        setSkills(ar);
    }

    const { values, handleBlur, handleChange, handleSubmit, errors } = useFormik({
        initialValues: initialValues,
        validationSchema: JobPostValidation,
        onSubmit: values => {
            const hanSub = async () => {
                try {
                    if (!pic) return setPicErr('Please Select an Image!');
                    const formData = {
                        title: values.title,
                        company_name: values.company_name,
                        description: values.description,
                        job_type: values.job_type,
                        industry: values.industry,
                        location: values.location,
                        total_vaccancy: values.total_vaccancy,
                        experience: values.experience,
                        min_salary: values.min_salary,
                        max_salary: values.max_salary,
                        job_img: pic,
                        skills: skills
                    }
                    const result = await postNewJob(formData);
                    if (result?.data.success) {
                        toast.success(result.data.message);
                        navigate('/recruiter/all-jobs');
                    } else toast.error(result?.data.message);
                    console.log(result); console.log('these are the final result.');
                } catch (error) {
                    console.log(error);
                }
            }
            hanSub()
        },
    });
    const postDetails = (pics: File | null) => {
        if (!pics) return setPicErr('Please Select an image!');
        setPicErr('');
        if (pics.type === 'image/jpeg' || pics.type === 'image/png') {
            const data = new FormData();
            data.append('file', pics)
            data.append('upload_preset', 'noteziper')
            data.append('cloud_name', 'dnn1ree80')
            fetch("https://api.cloudinary.com/v1_1/dnn1ree80/image/upload", {
                method: "post",
                body: data,
            })
                .then((res) => res.json())
                .then((data) => {
                    console.log(data.url.toString());
                    setPic(data.url.toString());
                })
                .catch((err) => {
                    console.log(err);
                    setPicErr('Somthing went wrong, please try again');
                });

        } else {
            setPicErr('please select a valid image.');
        }
    }
    return (
        <>
            <div className=" bg-gray-100 flex items-center justify-center">
                <div className="container max-w-screen-lg">
                    <div>
                        <h2 className="font-semibold text-xl text-gray-600">Post Jobs</h2>
                        <p className="text-gray-500 mb-6">create a new job</p>

                        <div className="bg-white rounded shadow-lg p-4 px-4 md:p-8 mb-6">
                            <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 lg:grid-cols-3">
                                <div className="text-gray-600">
                                    <p className="font-medium text-lg">Job Details</p>
                                    <p>Please fill out all the fields.</p>
                                </div>

                                <div className="lg:col-span-2">
                                    <form
                                        onSubmit={handleSubmit}
                                        className="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-5">
                                        <div className="md:col-span-3">
                                            <label htmlFor="full_name">Job Title</label>
                                            <input
                                                type="text"
                                                name="title"
                                                value={values.title}
                                                onBlur={handleBlur}
                                                onChange={handleChange}
                                                className="h-10 border mt-1 rounded px-4 w-full bg-gray-50" />
                                            {errors.title && <small className='text-red-500'>{errors.title}</small>}
                                        </div>
                                        <div className="md:col-span-2">
                                            <label htmlFor="full_name">Company name</label>
                                            <input
                                                type="text"
                                                name="company_name"
                                                value={values.company_name}
                                                onBlur={handleBlur}
                                                onChange={handleChange}
                                                className="h-10 border mt-1 rounded px-4 w-full bg-gray-50" />
                                            {errors.company_name && <small className='text-red-500'>{errors.company_name}</small>}
                                        </div>
                                        <div className="md:col-span-3">
                                            <label htmlFor="full_name">Job Industry</label>
                                            <select
                                                name='industry'
                                                value={values.industry}
                                                onBlur={handleBlur}
                                                onChange={handleChange}
                                                className="h-10 border mt-1 rounded px-4 w-full bg-gray-50">
                                                <option value="">...choose...</option>
                                                <option value="information Technology">IT</option>
                                                <option value="Accounting">Accounting</option>
                                                <option value="oil and gas">Oil and Gas</option>
                                                <option value="oil and gas">UI designing</option>
                                                <option value="oil and gas">Typing</option>
                                                <option value="manufacturing">Manufacturing</option>
                                                <option value="production">Production</option>
                                                <option value="Automobile">Automobile</option>
                                            </select>
                                            {errors.industry && <small className='text-red-500'>{errors.industry}</small>}
                                        </div>
                                        <div className="md:col-span-2">
                                            <label htmlFor="address">Job Type</label>
                                            <select
                                                name='job_type'
                                                value={values.job_type}
                                                onBlur={handleBlur}
                                                onChange={handleChange}
                                                className="h-10 border mt-1 rounded px-4 w-full bg-gray-50">
                                                <option value="">...choose...</option>
                                                <option value="full-time">Full-Time</option>
                                                <option value="part-time">Part-Time</option>
                                                <option value="remote">Remote</option>
                                            </select>
                                            {errors.job_type && <small className='text-red-500'>{errors.job_type}</small>}
                                        </div>
                                        <div className="md:col-span-5">
                                            <label htmlFor="full_name">Job Description</label>
                                            <textarea
                                                name='description'
                                                value={values.description}
                                                onBlur={handleBlur}
                                                onChange={handleChange}
                                                className="h-24 border mt-1 rounded px-4 w-full bg-gray-50"
                                                placeholder='type somthing about the job' />
                                            {errors.description && <small className='text-red-500'>{errors.description}</small>}
                                        </div>

                                        <div className="md:col-span-5">
                                            <label htmlFor="text">skills</label>
                                            <div className="flex">
                                                <input type="text"
                                                    className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                                                    value={skillInput}
                                                    name='skillss'
                                                    onChange={handleSkillInputChange}
                                                    placeholder="add skills" />
                                                <button onClick={() => handleSkillAddition(skillInput)} className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">Add</button>
                                            </div>
                                            <ul className="divide-y divide-gray-300 mb-2">
                                                {suggestions.map((skill, index) => (
                                                    <li key={index} onClick={() => handleSkillAddition(skill)} className="cursor-pointer py-2 px-3 hover:bg-gray-100">
                                                        {skill}
                                                    </li>
                                                ))}
                                            </ul>
                                            <ul className="mt-2">
                                                <div className="flex">
                                                    {skills.map((skill, index) => (
                                                        <li key={index} className="py-1 w-4/12 m-2 rounded-sm border border-black p-3">
                                                            <div className="flex">
                                                                <p>{skill}</p>
                                                                <IoIosClose onClick={() => removeSkill(skill)} className='text-xl ms-3' />
                                                            </div>
                                                        </li>
                                                    ))}
                                                </div>
                                            </ul>
                                        </div>

                                        <div className="md:col-span-2">
                                            <label htmlFor="city">location</label>
                                            <input
                                                type="text"
                                                name="location"
                                                value={values.location}
                                                onBlur={handleBlur}
                                                onChange={handleChange}
                                                className="h-10 border mt-1 rounded px-4 w-full bg-gray-50" />
                                            {errors.location && <small className='text-red-500'>{errors.location}</small>}
                                        </div>
                                        <div className="md:col-span-2">
                                            <label htmlFor="city">Upload Logo</label>
                                            <input
                                                type="file"
                                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => postDetails(e.target.files?.[0] ?? null)}
                                                className="h-10 border mt-1 rounded px-4 w-full bg-gray-50" />
                                            <p className='text-red-500'>{picErr}</p>
                                        </div>
                                        <div className="md:col-span-2">
                                            <label >Minimum Salary:</label>
                                            <input
                                                type='number'
                                                name='min_salary'
                                                value={values.min_salary}
                                                onBlur={handleBlur}
                                                onChange={handleChange}
                                                className="h-10 border mt-1 rounded px-4 w-full bg-gray-50" />
                                            {errors.min_salary && <small className='text-red-500'>{errors.min_salary}</small>}
                                        </div>
                                        <div className="md:col-span-2">
                                            <label >Maximum Salary:</label>
                                            <input
                                                type='number'
                                                name='max_salary'
                                                value={values.max_salary}
                                                onBlur={handleBlur}
                                                onChange={handleChange}
                                                className="h-10 border mt-1 rounded px-4 w-full bg-gray-50" />
                                            {errors.max_salary && <small className='text-red-500'>{errors.max_salary}</small>}
                                        </div>
                                        <div className="md:col-span-2">
                                            <label htmlFor="city">Total Vaccancy</label>
                                            <input
                                                type="text"
                                                name='total_vaccancy'
                                                value={values.total_vaccancy}
                                                onBlur={handleBlur}
                                                onChange={handleChange}
                                                className="h-10 border mt-1 rounded px-4 w-full bg-gray-50" />
                                            {errors.total_vaccancy && <small className='text-red-500'>{errors.total_vaccancy}</small>}
                                        </div>
                                        <div className="md:col-span-2">
                                            <label htmlFor="full_name">Experience Needed.</label>
                                            <input
                                                type="number"
                                                name="experience"
                                                value={values.experience}
                                                onBlur={handleBlur}
                                                onChange={handleChange}
                                                className="h-10 border mt-1 rounded px-4 w-full bg-gray-50" />
                                            {errors.experience && <small className='text-red-500'>{errors.experience}</small>}
                                        </div>

                                        <div className="md:col-span-5 text-right">
                                            <div className="inline-flex items-end">
                                                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Submit</button>
                                            </div>
                                        </div>

                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}

export default PostJobForm
