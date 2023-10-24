const emptyMember = {
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    birthDate: '',
    entryDate: '',
    habilities: [],
    department: '',
    observations: ''
}

const emptyProject = {
    name: '',
    description: '',
    tags: [],
    team: [],
    startDate: '',
    finishDate: '',
    contractLink: '',
    customer: {
        name: '',
        email: '',
        contact: ''
    }
}

const emptyLink = {
    name: '',
    url: '',
    tags: [],
    departments: [],
    observations: ''
}

const emptyUser = {
    name: '',
    email: '',
    role: '',
    birthDate: '',
    password: '',
    confirmPassword: ''
}

const emptyNews = {
    description: '',
    image: '',
    updateLink: ''
}

export default {
    emptyMember,
    emptyProject,
    emptyLink,
    emptyUser,
    emptyNews
}