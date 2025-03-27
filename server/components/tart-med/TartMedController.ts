import type { NextFunction, Request, Response } from 'express';
import type { RouteDefinition } from '../../types/RouteDefinition';
import { StatusCodes } from 'http-status-codes';

// import { db } from '../../lib/prisma.db';
// import oracledb from 'oracledb';
import ApiError from '../../abstractions/ApiError';
// import { dayjsEndDate, dayjsStartDate } from '../../lib/date';
import BaseController from '../BaseController';

// import cron from "node-cron";
/**
 * Status controller
 */

// oracledb.getConnection(config, (err) => {
//   if (err) {
//     console.error('❌ Connection failed :', err.message);
//     throw err; // จัดการข้อผิดพลาดถ้ามีปัญหาในการเชื่อมต่อ
//   }
//   // eslint-disable-next-line no-console
//   console.log('✅ Connection Data Hospital Successful!');
// });// TODOอย่าลืมเปิดตัวนี้ เป็นการเช็คว่าได้เชื่อมต่อข้อมูลกับ รพ หรือไม่

export default class TartMedController extends BaseController {
  // base path
  public basePath = 'tart';

  /**
   *
   */
  public routes(): RouteDefinition[] {
    return [
      // {
      //   path: '/',
      //   method: 'get',
      //   handler: this.getall.bind(this),
      // },
      // {
      //   path: '/info',
      //   method: 'get',
      //   handler: this.getSystemInfo.bind(this),
      // },
      // {
      //   path: '/med-time',
      //   method: 'get',
      //   handler: this.getDateInfo.bind(this),
      // },
      // {
      //   path: '/medicu-info',
      //   method: 'get',
      //   handler: this.getMedInfoICU.bind(this),
      // },
      // {
      //   path: '/meder-info',
      //   method: 'get',
      //   handler: this.getMedInfoER.bind(this),
      // },
      // {
      //   path: '/med-pay',
      //   method: 'get',
      //   handler: this.getMedPay.bind(this),
      // },
      // {
      //   path: '/med-hn',
      //   method: 'get',
      //   handler: this.getMedHn.bind(this),
      // },
      // {
      //   path: '/drug-info',
      //   method: 'get',
      //   handler: this.getDrugInfo.bind(this),
      // },
      {
        path: '/error',
        method: 'get',
        handler: this.getError.bind(this),
      },
      // These are the examples added here to follow if we need to create a different type of HTTP method.
      { path: '/', method: 'post', handler: this.getError.bind(this) },
      { path: '/', method: 'put', handler: this.getError.bind(this) },
      { path: '/', method: 'patch', handler: this.getError.bind(this) },
      { path: '/', method: 'delete', handler: this.getError.bind(this) },
    ];
  }

  //   /**
  //    *
  //    * @param _req
  //    * @param res
  //    * @param next
  //    */
  //   public getSystemInfo(
  //     _req: Request,
  //     res: Response,
  //     next: NextFunction,
  //   ): void {
  //     try {
  //       res.locals.data = 'ok ครับ';
  //       // call base class method
  //       super.send(res);
  //     } catch (err) {
  //       next(err);
  //     }
  //   }

  //   /**
  //    *
  //    * @param _req
  //    * @param res
  //    * @param next
  //    */
  //   public async getDateInfo(
  //     _req: Request,
  //     res: Response,
  //     next: NextFunction,
  //   ): Promise<void> {
  //     try {
  //       const response = new Date().toLocaleDateString('th-TH', {
  //         year: 'numeric',
  //         month: 'long',
  //         day: 'numeric',
  //         weekday: 'long',
  //         hour: 'numeric',
  //         minute: 'numeric',
  //         second: '2-digit',
  //       });
  //       res.locals.data = response;
  //       super.send(res);
  //     } catch (err) {
  //       next(err); // Send error to error handler
  //     }
  //   }

  //   /**
  //    *
  //    * @param req
  //    * @param res
  //    * @param next
  //    */
  //   public async getall(
  //     req: Request,
  //     res: Response,
  //     next: NextFunction,
  //   ): Promise<void> {
  //     let connection;
  //     try {
  //       // Connect to the database
  //       // await oracledb.getConnection(config);// TODOอย่าลืมเปิดตัวนี้
  //       connection = await oracledb.getConnection(config);
  //       // Run query to fetch data from the database
  //       const result = await connection.execute(`
  //   SELECT aa.vn, aa.an, aa.hn, aa.ptname, aa.main_date, aa.main_time, aa.code, aa.dname, aa.quantity, bb.label, aa.place
  //   FROM
  //     (SELECT ofh_opd_finance_no vn, d.code, d.an, d.hn, p.prename || p.name || ' ' || p.surname ptname,
  //     d.main_date, d.main_time, d.quantity, dcode.name dname, pl.halfplace place
  //     FROM data_drug_wh d
  //     LEFT JOIN drugcodes dcode ON (d.code = dcode.code)
  //     LEFT JOIN places pl ON (d.pla_placecode1 = pl.placecode)
  //     LEFT JOIN patients p ON (d.hn = p.hn)
  //     WHERE d.main_date BETWEEN SYSDATE - 1 AND SYSDATE
  //       AND d.special_hn IS NULL
  //       AND d.hn IS NOT NULL
  //       AND d.quantity > 0
  //       AND opdipd = 'I'
  //       AND pla_placecode1 = '1200'
  //       AND dcode.DTC2_TYPE_CODE = '1'
  //     UNION ALL
  //     SELECT ofh_opd_finance_no vn, d.code, d.an, d.hn, p.prename || p.name || ' ' || p.surname ptname,
  //             d.main_date, d.main_time, d.quantity, dcode.name dname, pl.halfplace
  //     FROM data_drug_wh d
  //     LEFT JOIN drugcodes dcode ON (d.code = dcode.code)
  //     LEFT JOIN places pl ON (d.pla_placecode1 = pl.placecode)
  //     LEFT JOIN patients p ON (d.hn = p.hn)
  //     WHERE d.main_date BETWEEN SYSDATE - 1 AND SYSDATE
  //       AND d.special_hn IS NULL
  //       AND d.hn IS NOT NULL
  //       AND d.quantity > 0
  //       AND opdipd = 'O'
  //       AND pla_placecode1 = 'EM'
  //       AND dcode.DTC2_TYPE_CODE = '1') aa
  //   LEFT JOIN
  //     (SELECT ofh_opd_finance_no vn, dru_code,
  //             CASE
  //               WHEN drug_using_remark IS NOT NULL THEN drug_using_remark
  //               ELSE CASE
  //                     WHEN dtc1_label_code IS NOT NULL THEN dto.name
  //                     ELSE duc.name || ' ' || dtc.name
  //                   END
  //             END label
  //     FROM drug_finance_details dd
  //     LEFT JOIN DRUG_USING_CODES duc ON (dd.duc_using_code = duc.using_code)
  //     LEFT JOIN DRUG_TIMING_CODES dtc ON (dd.dtc_timing_code = dtc.timing_code)
  //     LEFT JOIN DRUG_TOTAL_CODES dto ON (dd.dtc1_label_code = dto.label_code)) bb
  //   ON aa.vn = bb.vn
  //   AND aa.code = bb.dru_code
  //   WHERE aa.place ='หอผู้ป่วยหนัก'
  // `);
  //       // ป้องกัน result.rows เป็น undefined
  //       const rows = result?.rows ?? [];
  //       const data = rows.map((row: any) => ({
  //         vn: row[0], // ofh_opd_finance_no
  //         an: row[1], // an
  //         hn: row[2], // hn
  //         ptname: row[3], // ชื่อผู้ป่วย
  //         main_date: row[4], // main_date
  //         main_time: row[5], // main_time
  //         code: row[6], // code
  //         dname: row[7], // drug name (dname)
  //         quantity: row[8], // quantity
  //         label: row[9], // label
  //         place: row[10], // place
  //       }));
  //       // ตั้งค่าการแบ่งหน้า
  //       const total = data.length;
  //       const page = Number.parseInt(req.query.page as string) || 1;
  //       const pageSize = Number.parseInt(req.query.pageSize as string) || 4000;
  //       const startIndex = (page - 1) * pageSize;
  //       const endIndex = Math.min(startIndex + pageSize, total);
  //       const pages = Math.ceil(total / pageSize);
  //       const paginatedData = data.slice(startIndex, endIndex);

  //       // ส่งข้อมูลกลับ
  //       const response = {
  //         data: paginatedData,
  //         page,
  //         pages,
  //         total,
  //         startIndex,
  //         endIndex,
  //       };

  //       // const response = result.recordset

  //       // Send the response back to the client
  //       res.locals.data = response;
  //       super.send(res);
  //     } catch (err) {
  //       next(err); // Send error to error handler
  //     }
  //   }

  //   /**
  //    *
  //    * @param req
  //    * @param res
  //    * @param next
  //    */
  //   public async getMedInfoICU(
  //     req: Request,
  //     res: Response,
  //     next: NextFunction,
  //   ): Promise<void> {
  //     let connection;
  //     try {
  //       // Connect to the database
  //       // await oracledb.getConnection(config);// TODOอย่าลืมเปิดตัวนี้
  //       connection = await oracledb.getConnection(config);
  //       // Run query to fetch data from the database
  //       const result = await connection.execute(`
  //   SELECT aa.vn, aa.an, aa.hn, aa.ptname, aa.main_date, aa.main_time, aa.code, aa.dname, aa.quantity, bb.label, aa.place
  //   FROM
  //     (SELECT ofh_opd_finance_no vn, d.code, d.an, d.hn, p.prename || p.name || ' ' || p.surname ptname,
  //     d.main_date, d.main_time, d.quantity, dcode.name dname, pl.halfplace place
  //     FROM data_drug_wh d
  //     LEFT JOIN drugcodes dcode ON (d.code = dcode.code)
  //     LEFT JOIN places pl ON (d.pla_placecode1 = pl.placecode)
  //     LEFT JOIN patients p ON (d.hn = p.hn)
  //     WHERE d.main_date BETWEEN SYSDATE - 1 AND SYSDATE
  //       AND d.special_hn IS NULL
  //       AND d.hn IS NOT NULL
  //       AND d.quantity > 0
  //       AND opdipd = 'I'
  //       AND pla_placecode1 = '1200'
  //       AND dcode.DTC2_TYPE_CODE = '1'
  //     UNION ALL
  //     SELECT ofh_opd_finance_no vn, d.code, d.an, d.hn, p.prename || p.name || ' ' || p.surname ptname,
  //             d.main_date, d.main_time, d.quantity, dcode.name dname, pl.halfplace
  //     FROM data_drug_wh d
  //     LEFT JOIN drugcodes dcode ON (d.code = dcode.code)
  //     LEFT JOIN places pl ON (d.pla_placecode1 = pl.placecode)
  //     LEFT JOIN patients p ON (d.hn = p.hn)
  //     WHERE d.main_date BETWEEN SYSDATE - 1 AND SYSDATE
  //       AND d.special_hn IS NULL
  //       AND d.hn IS NOT NULL
  //       AND d.quantity > 0
  //       AND opdipd = 'O'
  //       AND pla_placecode1 = 'EM'
  //       AND dcode.DTC2_TYPE_CODE = '1') aa
  //   LEFT JOIN
  //     (SELECT ofh_opd_finance_no vn, dru_code,
  //             CASE
  //               WHEN drug_using_remark IS NOT NULL THEN drug_using_remark
  //               ELSE CASE
  //                     WHEN dtc1_label_code IS NOT NULL THEN dto.name
  //                     ELSE duc.name || ' ' || dtc.name
  //                   END
  //             END label
  //     FROM drug_finance_details dd
  //     LEFT JOIN DRUG_USING_CODES duc ON (dd.duc_using_code = duc.using_code)
  //     LEFT JOIN DRUG_TIMING_CODES dtc ON (dd.dtc_timing_code = dtc.timing_code)
  //     LEFT JOIN DRUG_TOTAL_CODES dto ON (dd.dtc1_label_code = dto.label_code)) bb
  //   ON aa.vn = bb.vn
  //   AND aa.code = bb.dru_code
  //   WHERE aa.place ='หอผู้ป่วยหนัก'
  // `);
  //       // ป้องกัน result.rows เป็น undefined
  //       const rows = result?.rows ?? [];
  //       const data = rows.map((row: any) => ({
  //         vn: row[0], // ofh_opd_finance_no
  //         an: row[1], // an
  //         hn: row[2], // hn
  //         ptname: row[3], // ชื่อผู้ป่วย
  //         main_date: row[4], // main_date
  //         main_time: row[5], // main_time
  //         code: row[6], // code
  //         dname: row[7], // drug name (dname)
  //         quantity: row[8], // quantity
  //         label: row[9], // label
  //         place: row[10], // place
  //       }));
  //       // ตั้งค่าการแบ่งหน้า
  //       const total = data.length;
  //       const page = Number.parseInt(req.query.page as string) || 1;
  //       const pageSize = Number.parseInt(req.query.pageSize as string) || 4000;
  //       const startIndex = (page - 1) * pageSize;
  //       const endIndex = Math.min(startIndex + pageSize, total);
  //       const pages = Math.ceil(total / pageSize);
  //       const paginatedData = data.slice(startIndex, endIndex);

  //       // ส่งข้อมูลกลับ
  //       const response = {
  //         data: paginatedData,
  //         page,
  //         pages,
  //         total,
  //         startIndex,
  //         endIndex,
  //       };

  //       // const response = result.recordset

  //       // Send the response back to the client
  //       res.locals.data = response;
  //       super.send(res);
  //     } catch (err) {
  //       next(err); // Send error to error handler
  //     }
  //   }

  //   /**
  //    *
  //    * @param req
  //    * @param res
  //    * @param next
  //    */
  //   public async getMedInfoER(
  //     req: Request,
  //     res: Response,
  //     next: NextFunction,
  //   ): Promise<void> {
  //     let connection;
  //     try {
  //       // Connect to the database
  //       // await oracledb.getConnection(config);// TODOอย่าลืมเปิดตัวนี้
  //       connection = await oracledb.getConnection(config);
  //       // Run query to fetch data from the database
  //       const result = await connection.execute(`
  //   SELECT aa.vn, aa.an, aa.hn, aa.ptname, aa.main_date, aa.main_time, aa.code, aa.dname, aa.quantity, bb.label, aa.place
  //   FROM
  //     (SELECT ofh_opd_finance_no vn, d.code, d.an, d.hn, p.prename || p.name || ' ' || p.surname ptname,
  //             d.main_date, d.main_time, d.quantity, dcode.name dname, pl.halfplace place
  //     FROM data_drug_wh d
  //     LEFT JOIN drugcodes dcode ON (d.code = dcode.code)
  //     LEFT JOIN places pl ON (d.pla_placecode1 = pl.placecode)
  //     LEFT JOIN patients p ON (d.hn = p.hn)
  //     WHERE d.main_date BETWEEN SYSDATE - 1 AND SYSDATE
  //       AND d.special_hn IS NULL
  //       AND d.hn IS NOT NULL
  //       AND d.quantity > 0
  //       AND opdipd = 'I'
  //       AND pla_placecode1 = '1200'
  //       AND dcode.DTC2_TYPE_CODE = '1'
  //     UNION ALL
  //     SELECT ofh_opd_finance_no vn, d.code, d.an, d.hn, p.prename || p.name || ' ' || p.surname ptname,
  //             d.main_date, d.main_time, d.quantity, dcode.name dname, pl.halfplace
  //     FROM data_drug_wh d
  //     LEFT JOIN drugcodes dcode ON (d.code = dcode.code)
  //     LEFT JOIN places pl ON (d.pla_placecode1 = pl.placecode)
  //     LEFT JOIN patients p ON (d.hn = p.hn)
  //     WHERE d.main_date BETWEEN SYSDATE - 1 AND SYSDATE
  //       AND d.special_hn IS NULL
  //       AND d.hn IS NOT NULL
  //       AND d.quantity > 0
  //       AND opdipd = 'O'
  //       AND pla_placecode1 = 'EM'
  //       AND dcode.DTC2_TYPE_CODE = '1') aa
  //   LEFT JOIN
  //     (SELECT ofh_opd_finance_no vn, dru_code,
  //             CASE
  //               WHEN drug_using_remark IS NOT NULL THEN drug_using_remark
  //               ELSE CASE
  //                     WHEN dtc1_label_code IS NOT NULL THEN dto.name
  //                     ELSE duc.name || ' ' || dtc.name
  //                   END
  //             END label
  //     FROM drug_finance_details dd
  //     LEFT JOIN DRUG_USING_CODES duc ON (dd.duc_using_code = duc.using_code)
  //     LEFT JOIN DRUG_TIMING_CODES dtc ON (dd.dtc_timing_code = dtc.timing_code)
  //     LEFT JOIN DRUG_TOTAL_CODES dto ON (dd.dtc1_label_code = dto.label_code)) bb
  //   ON aa.vn = bb.vn
  //   AND aa.code = bb.dru_code
  //   WHERE aa.place ='EMERGENCY'
  // `);

  //       // ป้องกัน result.rows เป็น undefined
  //       const rows = result?.rows ?? [];
  //       const data = rows.map((row: any) => ({
  //         vn: row[0], // ofh_opd_finance_no
  //         an: row[1], // an
  //         hn: row[2], // hn
  //         ptname: row[3], // ชื่อผู้ป่วย
  //         main_date: row[4], // main_date
  //         main_time: row[5], // main_time
  //         code: row[6], // code
  //         dname: row[7], // drug name (dname)
  //         quantity: row[8], // quantity
  //         label: row[9], // label
  //         place: row[10], // place
  //       }));
  //       // ตั้งค่าการแบ่งหน้า
  //       const total = data.length;
  //       const page = Number.parseInt(req.query.page as string) || 1;
  //       const pageSize = Number.parseInt(req.query.pageSize as string) || 4000;
  //       const startIndex = (page - 1) * pageSize;
  //       const endIndex = Math.min(startIndex + pageSize, total);
  //       const pages = Math.ceil(total / pageSize);
  //       const paginatedData = data.slice(startIndex, endIndex);

  //       // ส่งข้อมูลกลับ
  //       const response = {
  //         data: paginatedData,
  //         page,
  //         pages,
  //         total,
  //         startIndex,
  //         endIndex,
  //       };

  //       // const response = result.recordset

  //       // Send the response back to the client
  //       res.locals.data = response;
  //       super.send(res);
  //     } catch (err) {
  //       next(err); // Send error to error handler
  //     }
  //   }

  //   /**
  //    *
  //    * @param req
  //    * @param res
  //    * @param next
  //    */
  //   public async getMedPay(
  //     req: Request,
  //     res: Response,
  //     next: NextFunction,
  //   ): Promise<void> {
  //     let connection;
  //     try {
  //       // Connect to the database
  //       // await oracledb.getConnection(config);// TODOอย่าลืมเปิดตัวนี้
  //       connection = await oracledb.getConnection(config);
  //       const result = await connection.execute(`
  //         SELECT aa.vn, aa.an, aa.hn, NULL AS ptname, aa.main_date, aa.main_time, aa.code, aa.dname, aa.quantity, bb.label, aa.place
  //         FROM
  //           (SELECT ofh_opd_finance_no vn, d.code, d.an, d.hn,
  //             NULL AS ptname,
  //             d.main_date, d.main_time, d.quantity, dcode.name dname, pl.halfplace place
  //           FROM data_drug_wh d
  //           LEFT JOIN drugcodes dcode ON (d.code = dcode.code)
  //           LEFT JOIN places pl ON (d.pla_placecode1 = pl.placecode)
  //           LEFT JOIN patients p ON (d.hn = p.hn)
  //           WHERE d.main_date BETWEEN SYSDATE - 1 AND SYSDATE
  //             AND d.special_hn IS NULL
  //             AND d.hn IS NOT NULL
  //             AND d.quantity > 0
  //             AND opdipd = 'I'
  //             AND pla_placecode1 = '1200'
  //             AND dcode.DTC2_TYPE_CODE = '1'
  //           UNION ALL
  //           SELECT ofh_opd_finance_no vn, d.code, d.an, d.hn,
  //             NULL AS ptname,
  //             d.main_date, d.main_time, d.quantity, dcode.name dname, pl.halfplace
  //           FROM data_drug_wh d
  //           LEFT JOIN drugcodes dcode ON (d.code = dcode.code)
  //           LEFT JOIN places pl ON (d.pla_placecode1 = pl.placecode)
  //           LEFT JOIN patients p ON (d.hn = p.hn)
  //           WHERE d.main_date BETWEEN SYSDATE - 1 AND SYSDATE
  //             AND d.special_hn IS NULL
  //             AND d.hn IS NOT NULL
  //             AND d.quantity > 0
  //             AND opdipd = 'O'
  //             AND pla_placecode1 = 'EM'
  //             AND dcode.DTC2_TYPE_CODE = '1') aa
  //         LEFT JOIN
  //           (SELECT ofh_opd_finance_no vn, dru_code,
  //                   CASE
  //                     WHEN drug_using_remark IS NOT NULL THEN drug_using_remark
  //                     ELSE CASE
  //                           WHEN dtc1_label_code IS NOT NULL THEN dto.name
  //                           ELSE duc.name || ' ' || dtc.name
  //                         END
  //                   END label
  //           FROM drug_finance_details dd
  //           LEFT JOIN DRUG_USING_CODES duc ON (dd.duc_using_code = duc.using_code)
  //           LEFT JOIN DRUG_TIMING_CODES dtc ON (dd.dtc_timing_code = dtc.timing_code)
  //           LEFT JOIN DRUG_TOTAL_CODES dto ON (dd.dtc1_label_code = dto.label_code)) bb
  //         ON aa.vn = bb.vn
  //         AND aa.code = bb.dru_code
  //         WHERE aa.place ='หอผู้ป่วยหนัก'
  //       `);

  //       // ป้องกัน result.rows เป็น undefined
  //       const rows = result?.rows ?? [];
  //       const data = rows.map((row: any) => ({
  //         vn: row[0], // ofh_opd_finance_no
  //         an: row[1], // an
  //         hn: row[2], // hn
  //         ptname: row[3], // ชื่อผู้ป่วย
  //         main_date: row[4], // main_date
  //         main_time: row[5], // main_time
  //         code: row[6], // code
  //         dname: row[7], // drug name (dname)
  //         quantity: row[8], // quantity
  //         label: row[9], // label
  //         place: row[10], // place
  //       }));
  //       // ตั้งค่าการแบ่งหน้า
  //       const total = data.length;
  //       const page = Number.parseInt(req.query.page as string) || 1;
  //       const pageSize = Number.parseInt(req.query.pageSize as string) || 4000;
  //       const startIndex = (page - 1) * pageSize;
  //       const endIndex = Math.min(startIndex + pageSize, total);
  //       const pages = Math.ceil(total / pageSize);
  //       const paginatedData = data.slice(startIndex, endIndex);

  //       // ส่งข้อมูลกลับ
  //       const response = {
  //         data: paginatedData,
  //         page,
  //         pages,
  //         total,
  //         startIndex,
  //         endIndex,
  //       };

  //       // const response = result.recordset

  //       // Send the response back to the client
  //       res.locals.data = response;
  //       super.send(res);
  //     } catch (err) {
  //       next(err); // Send error to error handler
  //     }
  //   }

  //   /**
  //    *
  //    * @param req
  //    * @param res
  //    * @param next
  //    */
  //   public async getMedHn(
  //     req: Request,
  //     res: Response,
  //     next: NextFunction,
  //   ): Promise<void> {
  //     let connection;
  //     try {
  //       // Connect to the database
  //       // await oracledb.getConnection(config);// TODOอย่าลืมเปิดตัวนี้
  //       connection = await oracledb.getConnection(config);

  //       const result = await connection.execute(`
  //   SELECT DISTINCT aa.hn, aa.ptname
  //   FROM (
  //     SELECT d.hn, p.prename || p.name || ' ' || p.surname ptname
  //     FROM data_drug_wh d
  //     LEFT JOIN patients p ON (d.hn = p.hn)
  //     LEFT JOIN drugcodes dcode ON (d.code = dcode.code)
  //     WHERE d.main_date BETWEEN SYSDATE - 1 AND SYSDATE
  //       AND d.special_hn IS NULL
  //       AND d.hn IS NOT NULL
  //       AND d.quantity > 0
  //       AND d.pla_placecode1 IN ('1200', 'EM')
  //       AND dcode.DTC2_TYPE_CODE = '1'
  //   ) aa
  // `);

  //       // ป้องกัน result.rows เป็น undefined
  //       const rows = result?.rows ?? [];
  //       const data = rows.map((row: any) => ({
  //         hn: row[0], // hn
  //         ptname: row[1], // ชื่อผู้ป่วย

  //       }));
  //       // ตั้งค่าการแบ่งหน้า
  //       const total = data.length;
  //       const page = Number.parseInt(req.query.page as string) || 1;
  //       const pageSize = Number.parseInt(req.query.pageSize as string) || 4000;
  //       const startIndex = (page - 1) * pageSize;
  //       const endIndex = Math.min(startIndex + pageSize, total);
  //       const pages = Math.ceil(total / pageSize);
  //       const paginatedData = data.slice(startIndex, endIndex);

  //       // ส่งข้อมูลกลับ
  //       const response = {
  //         data: paginatedData,
  //         page,
  //         pages,
  //         total,
  //         startIndex,
  //         endIndex,
  //       };

  //       // const response = result.recordset

  //       // Send the response back to the client
  //       res.locals.data = response;
  //       super.send(res);
  //     } catch (err) {
  //       next(err); // Send error to error handler
  //     }
  //   }

  //   /**
  //    *
  //    * @param req
  //    * @param res
  //    * @param next
  //    */
  //   public async getDrugInfo(
  //     req: Request,
  //     res: Response,
  //     next: NextFunction,
  //   ): Promise<void> {
  //     let connection;
  //     try {
  //       // Connect to the database
  //       // await oracledb.getConnection(config);// TODOอย่าลืมเปิดตัวนี้
  //       connection = await oracledb.getConnection(config);
  //       const code = req.query.code as string;
  //       let result;
  //       if (!code) {
  //         result = await connection.execute(`
  //         SELECT dd.code, dd.name AS dname,
  //         CASE
  //           WHEN dtc1_label_code IS NOT NULL THEN dto.name
  //           ELSE duc.name || ' ' || dtc.name
  //         END AS label
  //   FROM drugcodes dd
  //   LEFT JOIN DRUG_USING_CODES duc ON dd.duc_using_code = duc.using_code
  //   LEFT JOIN DRUG_TIMING_CODES dtc ON dd.dtc_timing_code = dtc.timing_code
  //   LEFT JOIN DRUG_TOTAL_CODES dto ON dd.dtc1_label_code = dto.label_code
  //   WHERE DTC2_TYPE_CODE = '1' AND dd.del_flag IS NULL
  //         `);
  //       } else {
  //         result = await connection.execute(`
  //   SELECT dd.code, dd.name AS dname,
  //         CASE
  //           WHEN dtc1_label_code IS NOT NULL THEN dto.name
  //           ELSE duc.name || ' ' || dtc.name
  //         END AS label
  //   FROM drugcodes dd
  //   LEFT JOIN DRUG_USING_CODES duc ON dd.duc_using_code = duc.using_code
  //   LEFT JOIN DRUG_TIMING_CODES dtc ON dd.dtc_timing_code = dtc.timing_code
  //   LEFT JOIN DRUG_TOTAL_CODES dto ON dd.dtc1_label_code = dto.label_code
  //   WHERE DTC2_TYPE_CODE = '1' AND dd.del_flag IS NULL AND dd.code =:code
  // `, { code });
  //       }

  //       // ป้องกัน result.rows เป็น undefined
  //       const rows = result?.rows ?? [];
  //       // ตั้งค่าการแบ่งหน้า
  //       const total = rows.length;
  //       const page = Number.parseInt(req.query.page as string) || 1;
  //       const pageSize = Number.parseInt(req.query.pageSize as string) || 4000;
  //       const startIndex = (page - 1) * pageSize;
  //       const endIndex = Math.min(startIndex + pageSize, total);
  //       const pages = Math.ceil(total / pageSize);
  //       const paginatedData = rows.slice(startIndex, endIndex);

  //       // ส่งข้อมูลกลับ
  //       const response = {
  //         data: paginatedData,
  //         page,
  //         pages,
  //         total,
  //         startIndex,
  //         endIndex,
  //       };

  //       // Send the response back to the client
  //       res.locals.data = response;
  //       super.send(res);
  //     } catch (err) {
  //       next(err); // Send error to error handler
  //     }
  //   }

  /**
   *
   * @param _req
   * @param _res
   * @param next
   */
  public getError(_req: Request, _res: Response, next: NextFunction): void {
    try {
      throw new ApiError('null', StatusCodes.BAD_REQUEST);
    } catch (error) {
      // from here error handler will get call
      next(error);
    }
  }
}
