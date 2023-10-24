import moment from 'moment'

const formatDate = (value, format = 'DD/MM/YYYY') => {
    return value ? moment.utc(value).local(true).format(format) : '-';
}

const formatEmptyRow = (row, column, prop) => prop || '-'

export default {
    formatDate,
    formatEmptyRow
}