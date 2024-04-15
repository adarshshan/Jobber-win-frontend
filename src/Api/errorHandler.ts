import { AxiosError } from 'axios'
import toast from 'react-hot-toast';

interface ErrorResponse {
    status: number;
    data: {
        message: string;
    };
}
const errorHandler = async (error: Error | AxiosError): Promise<void> => {
    const axiosError = error as AxiosError;

    if (axiosError.response?.data) {
        const errorResponse = axiosError.response.data as ErrorResponse;
        console.log(errorResponse.data.message);

        const errorMessage = errorResponse.data.message || 'Something went wrong! Please try again.';
        toast.error(errorMessage);
    } else {
        toast.error('Something went wrong! Please try again.');
    }
}

export default errorHandler;