const Incident = require('../services/incidentService');

exports.getHome = async (req, res) => {
    try {
      const { departments } = await Incident.getCountByDepartment();
      const { months } = await Incident.getCountByMonth();
      const { categories } = await Incident.getCountByCategory();
      res.render('home/index', {
        departments,
        months,
        categories,
      });
    } catch (err) {
      console.error('Error fetching home page:', err);
      res.status(500).send('Error fetching home page');
    }
  };