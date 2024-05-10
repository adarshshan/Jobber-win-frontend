export const EMAIL_PATTERN = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export const MOBILE_NUM_REGEX = /^[0-9]{10}$/;

export const reason = {
    A: 'Its spam',
    B: 'Nudity or sexual activity',
    C: 'Hate speech or symbols',
    D: 'Violence or dangerous organizations',
    E: 'Sale of Illegal regulated goods',
    F: 'Bullying or harassment',
    G: 'Intellectual Property violation',
    H: 'Suicide or self injury',
    I: 'Eating disorders',
    J: 'Scam or fraud',
    K: 'Drugs',
    L: 'False information',
    M: 'I just don`t like it',
    N: 'other reason'
}