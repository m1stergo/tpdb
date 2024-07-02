const Incident = require('../services/incidentService');

exports.getByDepartment = async (req, res) => {
  try {
    const data = await Incident.getByDepartment(req.params.id);
    return res.render('incident/details', {...data, layout: false });
  } catch (err) {
    res.status(500).send('Error fetching incidents by department');
  }
};

exports.getByMonth = async (req, res) => {
  try {
    const data = await Incident.getByMonth(req.params.id);
    return res.render('incident/details', {...data, layout: false });
  } catch (err) {
    res.status(500).send('Error fetching incidents by month');
  }
};

exports.getByCategory = async (req, res) => {
  try {
    const data = await Incident.getByCategory(req.params.id);
    return res.render('incident/details', {...data, layout: false });
  } catch (err) {
    res.status(500).send('Error fetching incidents by category');
  }
};
