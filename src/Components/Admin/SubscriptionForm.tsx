import { createNewPlan, editSubscription } from 'Api/admin';
import { SubscriptionValidation } from 'Components/Common/Validations';
import { useFormik } from 'formik';
import React from 'react'
import toast from 'react-hot-toast';
import { SubInterface } from './SubItem';


interface InitialValuesInterface {
    planName: string;
    duration: string;
    amount: string;
    description: string;
}
interface ISubscriptionProps {
    setFetchAgain: React.Dispatch<React.SetStateAction<boolean>>;
    fetchAgain: boolean;
    item?: SubInterface;
    onClose?: () => void;
}
const SubscriptionForm: React.FC<ISubscriptionProps> = ({ setFetchAgain, fetchAgain, item, onClose }) => {
    const initialValues: InitialValuesInterface = {
        planName: item ? item.planName : '',
        duration: item ? item.duration + '' : '',
        amount: item ? item.amount + '' : '',
        description: item ? item.description : ''
    }
    const { values, handleBlur, handleChange, handleSubmit, errors } = useFormik({
        initialValues: initialValues,
        validationSchema: SubscriptionValidation,
        onSubmit: values => {
            const formData = { planName: values.planName, duration: parseInt(values.duration), amount: parseInt(values.amount), description: values.description }
            if (item) {
                const hanSub = async () => {
                    try {
                        const res = await editSubscription(item?._id, formData);
                        if (res?.data.success) {
                            setFetchAgain(!fetchAgain);
                            toast.success(res.data.message);
                        } else toast.error(res?.data.message);
                        if (onClose) onClose();
                    } catch (error) {
                        console.log(error);
                    }
                }
                hanSub()
            } else {
                const hanSub = async () => {
                    try {
                        const res = await createNewPlan(formData);
                        if (res?.data.success) {
                            setFetchAgain(!fetchAgain);
                            toast.success(res.data.message);
                        } else toast.error(res?.data.message);
                    } catch (error) {
                        console.log(error);
                    }
                }
                hanSub()
            }
        },
    });
    return (
        <div className="flex items-center justify-center p-12 shadow-xl">
            <div className="mx-auto w-full max-w-[550px]">
                <form onSubmit={handleSubmit}  >
                    <div className="mb-5">
                        <label
                            htmlFor="guest"
                            className="mb-3 block text-base font-medium text-[#07074D]"
                        >
                            Subscribtion name
                        </label>
                        <input
                            type="text"
                            name="planName"
                            value={values.planName}
                            onBlur={handleBlur}
                            onChange={handleChange}
                            placeholder="subscription name"
                            min="0"
                            className="w-full appearance-none rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                        />
                    </div>
                    <p className="text-red-500">{errors.planName}</p>
                    <div className="-mx-3 flex flex-wrap">
                        <div className="w-full px-3 sm:w-1/2">
                            <div className="mb-5">
                                <label
                                    htmlFor="fName"
                                    className="mb-3 block text-base font-medium text-[#07074D]"
                                >
                                    Duration (in months)
                                </label>
                                <input
                                    type="text"
                                    name="duration"
                                    value={values.duration}
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    placeholder="Subscription Duration"
                                    className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                                />
                            </div>
                            <p className="text-red-500">{errors.duration}</p>
                        </div>
                        <div className="w-full px-3 sm:w-1/2">
                            <div className="mb-5">
                                <label
                                    htmlFor="lName"
                                    className="mb-3 block text-base font-medium text-[#07074D]"
                                >
                                    Amount
                                </label>
                                <input
                                    type="text"
                                    name="amount"
                                    value={values.amount}
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    placeholder="Subscription Amount"
                                    className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                                />
                            </div>
                            <p className="text-red-500">{errors.amount}</p>
                        </div>
                    </div>
                    <div className="mb-5">
                        <label
                            htmlFor="guest"
                            className="mb-3 block text-base font-medium text-[#07074D]"
                        >
                            description
                        </label>
                        <textarea
                            name="description"
                            value={values.description}
                            onBlur={handleBlur}
                            onChange={handleChange}
                            placeholder="type something.."
                            className="w-full appearance-none rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                        />
                    </div>
                    <p className="text-red-500">{errors.description}</p>
                    <div className='flex justify-end'>
                        <button
                            className="hover:shadow-form rounded-md bg-[#6A64F1] py-3 px-8 text-center text-base font-semibold text-white outline-none"
                            type='submit'
                        > Submit </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default SubscriptionForm
