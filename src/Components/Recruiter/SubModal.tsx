import { Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, Text, useDisclosure } from "@chakra-ui/react"
import { getCurrentSubDetails } from "Api/recruiter";
import { ReactNode, useEffect, useState } from "react"


interface ISubModalProps {
    children: ReactNode;
}
interface planInterface {
    planName: string;
    description: string;
    duration: number;
    amount: number;
    status: 'active' | 'inactive',
    expire_at?: string;
}
const SubModal: React.FC<ISubModalProps> = ({ children }) => {
    const [planDetails, setPlanDetails] = useState<planInterface>();
    const [err, setErr] = useState('');
    const { isOpen, onOpen, onClose } = useDisclosure()


    useEffect(() => {
        const fetchCurrSub = async () => {
            try {
                const res = await getCurrentSubDetails();
                console.log(res);
                if (res?.data.success) {
                    setPlanDetails(res.data.planData)
                } else setErr(res?.data.message);
            } catch (error) {
                console.log(error as Error);
            }
        }
        fetchCurrSub()
    }, [isOpen])

    const isExpired = planDetails?.expire_at && new Date(planDetails.expire_at).getTime() < Date.now();

    return (
        <>
            <Button onClick={onOpen}>{children}</Button>

            <Modal blockScrollOnMount={false} isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Your Subscription plan</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        {err.length ? (
                            <Text fontWeight='bold' className="text-red-500">
                                {err}
                            </Text>
                        ) : (
                            <Text fontWeight='bold' mb='1rem'>
                                <p> Plan name   : <span className="text-yellow-500 font-mono">{planDetails?.planName}</span></p>
                                <p>Amount      : <span className="text-yellow-500 font-mono">{planDetails?.amount}</span></p>
                                <p>Description : <span className="text-yellow-500 font-mono">{planDetails?.description}</span></p>
                                <p>Duration    : <span className="text-yellow-500 font-mono">{planDetails?.duration}</span></p>
                                <p>Status      : <span className={`${planDetails?.status === 'active' ? 'text-yellow-500' : 'text-red-500'} font-mono`}>{planDetails?.status}</span></p>
                                {planDetails?.expire_at && <p>Expire at    : <span className="text-yellow-500 font-mono">{planDetails?.expire_at.slice(0, 10)}</span></p>}

                                {planDetails?.status === 'inactive' && <p className="text-red-500 text-xl mt-5">This plan is not available. please purchase another one </p>}
                                {isExpired && <p className="text-red-500 mt-8 p-4">plan expired!</p>}
                            </Text>
                        )}
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    )
}
export default SubModal;