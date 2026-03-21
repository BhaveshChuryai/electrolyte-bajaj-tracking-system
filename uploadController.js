const pool = require("../config/db");
const parseExcel = require("../utils/excelParser");

exports.uploadExcel = async (req, res) => {
  try {
    const rows = parseExcel(req.file.path);

    for (let row of rows) {
      await pool.query(
        `INSERT INTO pcb_data
        (spare_part_code, component, description, part_code,
         status, status_description, status_count,
         count, total_entries)
        VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9)`,
        [
          row["Spare Part Code"],
          row["Component"],
          row["Description"],
          row["Part Code"],
          row["Status"],
          row["Status Description"],
          row["Status Count"],
          row["Count"],
          row["Total Entries"],
        ]
      );
    }

    res.json({ message: "File uploaded successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Upload failed" });
  }
};