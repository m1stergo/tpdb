const express = require('express');
const expressEjsLayouts = require('express-ejs-layouts');

const bodyParser = require('body-parser');
const path = require('path');
const { t } = require('./i18n');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// static
app.use(express.static(path.join(__dirname, 'public')));

// view engine
app.use(expressEjsLayouts);
app.set('layout', './layouts/main')
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// localization
app.use((req, res, next) => {
    const lang = req.query.lang || 'en';
    res.locals.t = (key) => t(key, lang);
    next();
});

// routes
const homeRoutes = require('./routes/homeRoutes');
const incidentRoutes = require('./routes/incidentRoutes');
app.use('/', homeRoutes);
app.use(incidentRoutes);

// start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
console.log('STARTED');