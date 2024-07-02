
const pick = (obj, keys) => {
    const output = {};
    keys.forEach((key) => {
        output[key] = obj[key];
    });
    return output;
}

const omit = (obj, keys) => {
    const output = {};
    Object.keys(obj).forEach((key) => {
        if (!keys.includes(key)) {
            output[key] = obj[key];
        }
    });
    return output;
}

const getMonthName = (idx) => {
    const months = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
    return months[idx - 1];
}

const arrangeByCategory = (rows) => {
    return Object.values(rows.reduce((acc, row) => {
        const { crime_category_name } = row;
        if (!acc[crime_category_name]) {
          acc[crime_category_name] = {
            ...pick(row, ['crime_category_name', 'crime_category_id']),
            incidents: []
          };
        }
        acc[crime_category_name]['incidents'].push(omit(row, ['crime_category_name', 'crime_category_id']));
        return acc;
      }, {}));
}

module.exports = {
    pick,
    omit,
    getMonthName,
    arrangeByCategory,
}