
const Incident = require('../models/incidentModel');

function IncidentService() {

    async function getCountByMonth() {
        try {
            return await Incident.getCountByMonth();
        } catch (err) {
            console.error('Error fetching incidents count by month:', err);
            throw err;
        }
    };

    async function getCountByDepartment() {
        try {
            return await Incident.getCountByDepartment();
        } catch (err) {
            console.error('Error fetching incidents count by department:', err);
            throw err;
        }
    };

    async function getCountByCategory() {
        try {
            return await Incident.getCountByCategory();
        } catch (err) {
            console.error('Error fetching incidents count by category:', err);
            throw err;
        }
    };

    async function getByDepartment(id) {
        try {
            if (!id) {
                throw new Error('Department id is required.');
            }
            return await Incident.getByDepartment(id);
        } catch (err) {
            console.error('Error fetching incidents by department:', err);
            throw err;
        }
    };

    async function getByMonth(id) {
        try {
            if (!id) {
                throw new Error('Month id is required.');
            }
            return await Incident.getByMonth(id);
        } catch (err) {
            console.error('Error fetching incidents by month:', err);
            throw err;
        }
    };

    async function getByCategory(id) {
        try {
            if (!id) {
                throw new Error('Category id is required.');
            }
            return await Incident.getByCategory(id);
        } catch (err) {
            console.error('Error fetching incidents by category:', err);
            throw err;
        }
    };

    return {
        getCountByDepartment,
        getCountByMonth,
        getCountByCategory,
        getByDepartment,
        getByMonth,
        getByCategory
    };
}

module.exports = IncidentService();