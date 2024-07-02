const db = require('../config/db');
const { pick, omit, getMonthName, arrangeByCategory } = require('../utils');

exports.getCountByMonth = async () => {
  const [rows] = await db.execute(`
    SELECT
        month AS id,
        incidents,
        RANK() OVER (ORDER BY incidents DESC) AS ranking
    FROM
        (SELECT
            month,
            SUM(total_incidents) AS incidents
        FROM
            Incident
        WHERE
            year = 2022
        GROUP BY
            month) AS subquery
    ORDER BY
    month;
    `);
  
  const months = {
    first: rows.reduce((top, current) => {
      const month = current.ranking < top.ranking ? current : top;
      return { ...month, name: getMonthName(month.id) } 
    }, rows[0]),
    last: rows.reduce((top, current) => {
      const month = current.ranking < top.ranking ? top : current;
      return { ...month, name: getMonthName(month.id) }  
    }, rows[0]),
    entries: rows,
  }

  return { 
    months: {
      ...months, 
      entries: rows.map((entry) => ({
        ...entry,
        name: getMonthName(entry.id)
      })) 
    } 
  };
};

exports.getCountByDepartment = async () => {
  const [rows] = await db.execute(`
    SELECT
        d.id AS id,
        d.name AS name,
        incidents,
        RANK() OVER (ORDER BY incidents DESC) AS ranking
    FROM
        (SELECT
            department_id,
            SUM(total_incidents) AS incidents
        FROM
            Incident
        WHERE
            year = 2022
        GROUP BY
            department_id) AS subquery
    JOIN
        Department d ON subquery.department_id = d.id
    ORDER BY
        incidents DESC;
    `);

    const departments = {
      first: rows.reduce((top, current) => {
        return current.rank < top.rank ? current : top; 
      }, rows[0]),
      last: rows.reduce((top, current) => {
        return current.rank < top.rank ? top : current; 
      }, rows[0]),
      entries: rows,
    }

    return { departments };
}

exports.getCountByCategory = async () => {
  const [rows] = await db.execute(`
    SELECT
        cc.id AS id,
        cc.name AS name,
        incidents,
        RANK() OVER (ORDER BY incidents DESC) AS ranking
    FROM
        (SELECT
            c.crime_category_id,
            SUM(i.total_incidents) AS incidents
        FROM
            Incident i
        JOIN
            Crime c ON i.crime_id = c.id
        WHERE
            i.year = 2022
        GROUP BY
            c.crime_category_id) AS subquery
    JOIN
        Crime_Category cc ON subquery.crime_category_id = cc.id
    ORDER BY
        incidents DESC;
    `);

    const categories = {
      first: rows.reduce((top, current) => {
        return current.rank < top.rank ? current : top; 
      }, rows[0]),
      last: rows.reduce((top, current) => {
        return current.rank < top.rank ? top : current; 
      }, rows[0]),
      entries: rows,
    }

    return { categories };
}

exports.getByDepartment = async (id) => {
  const [department] = await db.execute(`
    SELECT 
      name 
    FROM 
      incident i 
    JOIN 
      department d ON d.id = i.department_id 
    WHERE 
      department_id = ?
    
  `, [id]);

  const [rows] = await db.execute(`
    SELECT
        c.id AS crime_id,
        c.name AS crime_name,
        cc.id AS crime_category_id,
        cc.name AS crime_category_name,
        SUM(i.total_incidents) AS incidents,
        SUM(i.male_victims) AS male_victims,
        SUM(i.female_victims) AS female_victims,
        SUM(i.unspecified_genre_victims) AS unspecified_genre_victims
    FROM
        Incident i
    JOIN
        Department d ON i.department_id = d.id
    JOIN
        Crime c ON i.crime_id = c.id
    JOIN
        Crime_Category cc ON c.crime_category_id = cc.id
    WHERE
        d.id = ?
    GROUP BY
        c.id, c.name, cc.id, cc.name
    ORDER BY
        cc.id;
    `, [id])

    return { 
      id: id,
      name: department[0].name,
      entries: arrangeByCategory(rows),
    };
}

exports.getByMonth = async (id) => {
  const [rows] = await db.execute(`
    SELECT
        c.id AS crime_id,
        c.name AS crime_name,
        cc.id AS crime_category_id,
        cc.name AS crime_category_name,
        SUM(i.total_incidents) AS incidents,
        SUM(i.male_victims) AS male_victims,
        SUM(i.female_victims) AS female_victims,
        SUM(i.unspecified_genre_victims) AS unspecified_genre_victims
    FROM
        Incident i
    JOIN
        Crime c ON i.crime_id = c.id
    JOIN
        Crime_Category cc ON c.crime_category_id = cc.id
    WHERE
        i.month = ?
    GROUP BY
        c.id, c.name, cc.id, cc.name
    ORDER BY
        cc.id;
    `, [id])

    return { 
      id: id,
      name: getMonthName(id),
      entries: arrangeByCategory(rows)
    };
}

exports.getByCategory = async (id) => {
  const [rows] = await db.execute(`
    SELECT
        c.id AS crime_id,
        c.name AS crime_name,
        cc.id AS crime_category_id,
        cc.name AS crime_category_name,
        SUM(i.total_incidents) AS incidents,
        SUM(i.male_victims) AS male_victims,
        SUM(i.female_victims) AS female_victims,
        SUM(i.unspecified_genre_victims) AS unspecified_genre_victims
    FROM
        Incident i
    JOIN
        Crime c ON i.crime_id = c.id
    JOIN
        Crime_Category cc ON c.crime_category_id = cc.id
    WHERE
        c.crime_category_id = ?
    GROUP BY
        c.id, c.name, cc.id, cc.name
    ORDER BY
        cc.id;
    `, [id])

    return { 
      id: id,
      name: rows[0].crime_category_name,
      entries: arrangeByCategory(rows)
    };
}