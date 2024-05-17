export const isSameSenderMargin = (messages: any[], m: any, i: number, userId: string) => {
    try {
        if (i < messages.length - 1 && messages[i + 1].sender._id === m.sender._id &&
            messages[i].sender._id !== userId)
            return 33;
        else if (
            (i < messages.length - 1 &&
                messages[i + 1].sender._id !== m.sender._id &&
                messages[i].sender._id !== userId) ||
            (i === messages.length - 1 && messages[i].sender._id !== userId)
        )
            return 0;
        else return "auto";
    } catch (error) {
        console.log(error);
    }
};

export const isSameSender = (messages: any[], m: any, i: number, userId: string) => {
    try {
        return (
            i < messages.length - 1 &&
            (messages[i + 1].sender._id === undefined || messages[i + 1].sender._id !== m.sender._id) && messages[i].sender._id !== userId
        );
    } catch (error) {
        console.log(error);
    }
};

export const isLastMessage = (messages: any[], i: number, userId: string) => {
    try {
        return (
            i === messages.length - 1 &&
            messages[messages.length - 1].sender._id !== userId &&
            messages[messages.length - 1].sender._id
        );
    } catch (error) {
        console.log(error);
    }
};

export const isSameUser = (messages: any[], m: any, i: number) => {
    try {
        if (messages[i - 1] && m.sender._id) {
            return i > 0 && messages[i - 1].sender._id === m.sender._id;
        }

    } catch (error) {
        console.log(error);
    }
};

export const getSender = (loggedUser: any, users: any[]) => {
    try {
        console.log(loggedUser);console.log('this is the result')
        return users[0]._id == loggedUser._id ? users[1].name : users[0].name;
    } catch (error) {
        console.log(error)
    }
};

export const getSenderFull = (loggedUser: any, users: any[]) => {
    try {
        return users[0]._id === loggedUser._id ? users[1] : users[0];
    } catch (error) {
        console.log(error);
    }
};
