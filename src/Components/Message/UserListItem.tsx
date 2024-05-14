import { Avatar } from "@chakra-ui/avatar";
import { Box, Text } from "@chakra-ui/layout";

interface IUserListItemProps {
    user: any;
    handleFunction: (user1: any) => Promise<void>;
}
const UserListItem: React.FC<IUserListItemProps> = ({ user, handleFunction }) => {


    return (
        <Box
            onClick={handleFunction}
            cursor="pointer"
            bg="#E8E8E8"
            _hover={{
                background: "#38B2AC",
                color: "white",
            }}
            w="100%"
            display="flex"
            alignItems="center"
            color="black"
            px={3}
            py={2}
            mb={2}
            borderRadius="lg"
        >
            <Avatar
                mr={2}
                size="sm"
                cursor="pointer"
                name={user.name}
                src={user.profile_picture}
            />
            <Box>
                <Text>{user.name}</Text>
                <Text fontSize="xs">
                    <b>Email :{user.email} </b>
                </Text>
            </Box>
        </Box>
    );
};

export default UserListItem;
