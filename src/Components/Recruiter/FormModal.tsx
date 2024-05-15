import { Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useDisclosure } from '@chakra-ui/react'
import { editJobDetails } from 'Api/recruiter';
import { JobPostValidation } from 'Components/Common/Validations';
import { useFormik } from 'formik';
import React, { ReactNode, useState } from 'react'
import toast from 'react-hot-toast';
import { IoIosClose } from 'react-icons/io';
import { useNavigate } from 'react-router-dom';
import { string } from 'yup';

const skillsList: string[] = ['JavaScript', 'React', 'Node.js', 'Python', 'HTML', 'CSS', 'Java', 'SQL', 'Angular', 'Vue.js', 'Ruby', 'C#', 'PHP', 'Swift', 'Go', 'TypeScript', 'Mongodb'];

export interface JobInterface {
    title: string;
    company_name: string;
    industry: string;
    description: string;
    total_vaccancy: number;
    location: string;
    job_img?: string;
    job_type: string;
    experience: number;
    min_salary: number;
    max_salary: number;
}
interface IFormModelProps {
    isOpen: boolean;
    onClose: () => void;
    children: ReactNode;
    item: JobInterface;
    fetchAgain: boolean;
    setFetchAgain: React.Dispatch<React.SetStateAction<boolean>>;
}
const FormModal: React.FC<IFormModelProps> = ({ isOpen, onClose, children, item,fetchAgain,setFetchAgain }) => {
    const [skills, setSkills] = useState<string[]>([]);
    const [skillInput, setSkillInput] = useState<string>('');
    const [suggestions, setSuggestions] = useState<string[]>([]);

    const navigate = useNavigate();

    const initialValues: JobInterface = {
        title: item.title,
        company_name: item.company_name,
        industry: item.industry,
        description: item.description,
        total_vaccancy: item.total_vaccancy,
        location: item.location,
        job_type: item.job_type,
        experience: item.experience,
        min_salary: item.min_salary,
        max_salary: item.max_salary
    }

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
                        job_img: item.job_img,
                        skills: skills
                    }
                    const result = await editJobDetails(formData, item);
                    if (result?.data.success) {
                        onClose()
                        setFetchAgain(!fetchAgain);
                        toast.success(result.data.message);
                        navigate('/recruiter/all-jobs');
                    } else toast.error(result?.data.message);
                } catch (error) {
                    console.log(error);
                    onClose()
                }
            }
            hanSub()
        },
    });
    return (
        <div>
            {children}
            <Modal onClose={onClose} size={'xl'} isOpen={isOpen}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Edit Job Details</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <div className="shadow-lg rounded-md">
                            <form
                                onSubmit={handleSubmit}
                                className="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-5 pb-5">
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
                                    <label >Minimum Salary:</label>
                                    <input
                                        type='number'
                                        name='min_salary'
                                        value={values.min_salary === 0 ? '' : values.min_salary}
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
                                        value={values.max_salary === 0 ? '' : values.max_salary}
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
                                        value={values.total_vaccancy === 0 ? '' : values.total_vaccancy}
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
                                        value={values.experience === 0 ? '' : values.experience}
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        className="h-10 border mt-1 rounded px-4 w-full bg-gray-50" />
                                    {errors.experience && <small className='text-red-500'>{errors.experience}</small>}
                                </div>

                                <div className="md:col-span-5 text-right">
                                    <div className="inline-flex items-end">
                                        <button type='submit' className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Submit</button>
                                    </div>
                                </div>

                            </form>
                        </div>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </div>
    )
}

export default FormModal
