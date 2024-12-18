const db = require("../db");
const { NotFoundError} = require("../expressError");
const { sqlForPartialUpdate } = require("../helpers/sql");





class Job {
// create jobs
    static async create({ title, salary, equity, companyHandle }) {
        const result = await db.query(
          `INSERT INTO jobs (title, salary, equity, company_handle) 
           VALUES ($1, $2, $3, $4)
           RETURNING id, title, salary, equity, company_handle AS "companyHandle"`,
          [title, salary, equity, companyHandle]
        );
        return result.rows[0];
      }
  

// list all jobs or get a job by query string

      static async getAll({ title, minSalary, hasEquity }) {
        let queryString = `
          SELECT id, title, salary, equity, company_handle AS "companyHandle"
          FROM jobs
          WHERE 1=1
        `;
        const values = [];
    
        if (title) {
          queryString += ` AND title ILIKE $${values.length + 1}`;
          values.push(`%${title}%`);
        }
    
        if (minSalary) {
          queryString += ` AND salary >= $${values.length + 1}`;
          values.push(minSalary);
        }
    
        if (hasEquity) {
          queryString += ` AND equity > 0`;
        }
    
        queryString += ' ORDER BY title';
        
        const result = await db.query(queryString, values);
        return result.rows;
      }




// get a specific job by id

  static async get(id) {
    const jobRes = await db.query(
          `SELECT id,
                  title,
                  salary,
                  equity,
                  company_handle AS "companyHandle"
           FROM jobs
           WHERE id = $1`, [id]);

    const job = jobRes.rows[0];

    return job;
  };

  // Update job data with `data`.
  
  static async update(id, { title, salary, equity }) {
    const result = await db.query(
      `UPDATE jobs
       SET title = $1, salary = $2, equity = $3
       WHERE id = $4
       RETURNING id, title, salary, equity, company_handle AS "companyHandle"`,
      [title, salary, equity, id]
    );
    const job = result.rows[0];

    if (!job) {
      throw new NotFoundError(`No job found with id: ${id}`);
    }

    return job;
  }

  /** Delete given job from database; returns undefined.
   *
   * Throws NotFoundError if company not found.
   **/

  static async delete(id) {
    const result = await db.query(
      `DELETE FROM jobs WHERE id = $1 RETURNING id`,
      [id]
    );
    const job = result.rows[0];

    if (!job) {
      throw new NotFoundError(`No job found with id: ${id}`);
    }

    return job;
  }

}

module.exports = Job;
