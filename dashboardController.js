const pool = require("../config/db");

exports.getKPIs = async (req, res) => {
  try {
    const totalEntries = await pool.query(
      "SELECT COUNT(*) FROM pcb_data"
    );

    const totalCount = await pool.query(
      "SELECT SUM(count) FROM pcb_data"
    );

    res.json({
      total_entries: totalEntries.rows[0].count,
      total_count: totalCount.rows[0].sum,
    });
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.getStatusSummary = async (req, res) => {
  try {
    const data = await pool.query(`
      SELECT status, SUM(count) as total
      FROM pcb_data
      GROUP BY status
    `);

    res.json(data.rows);
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.getComponentAnalysis = async (req, res) => {
  try {
    const data = await pool.query(`
      SELECT component, SUM(count) as total
      FROM pcb_data
      GROUP BY component
      ORDER BY total DESC
    `);

    res.json(data.rows);
  } catch (err) {
    res.status(500).json(err);
  }
};