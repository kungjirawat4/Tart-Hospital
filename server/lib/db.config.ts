// const config: {
//   user: string;
//   password: string;
//   server: string;
//   database: string;
//   pool: {
//     max: number;
//     min: number;
//     idleTimeoutMillis: number;
//   };
//   options: {
//     encrypt: boolean;
//     trustServerCertificate: boolean;
//     // trustedconnection: boolean;
//     // enableArithAbort: boolean;
//     // instancename: string;
//   };
//   port: number;
// } = {
//   user: 'ai_q_opd',
//   password: 'ai_q_opd11251126!@#',
//   server: '192.168.40.11',
//   database: 'UDON2',
//   options: {
//     encrypt: false,
//     trustServerCertificate: true,
//     // trustedconnection: true,
//     // enableArithAbort: true,
//     // instancename: 'SQLEXPRESS'
//   },
//   port: 1433,
//   pool: {
//     max: 1,
//     min: 0,
//     idleTimeoutMillis: 30000,
//   },
// };

// export default config;

// import oracledb from 'oracledb';

// // ระบุไดเร็กทอรีที่เก็บ Oracle Instant Client
// oracledb.initOracleClient({ libDir: 'C:/instantclient_19_20' });

// const config = {
//   user: 'admin',
//   password: 'admin',
//   connectString:
//     '(DESCRIPTION =(ADDRESS = (PROTOCOL = TCP)(HOST = 191.123.10.1)(PORT = 1521)) (CONNECT_DATA = (SERVICE_NAME = trad)))',
// };

// export default config;
import oracledb from 'oracledb';

// ระบุไดเร็กทอรีที่เก็บ Oracle Instant Client
oracledb.initOracleClient({ libDir: 'C:/instantclient_19_20' });

// กำหนดประเภทข้อมูลสำหรับ OracleDB Config
type OracleDBConfig = {
  user: string;
  password: string;
  connectString: string;
};

// กำหนดค่า Config สำหรับ Oracle
const config: OracleDBConfig = {
  user: 'admin',
  password: 'admin',
  connectString:
    '(DESCRIPTION =(ADDRESS = (PROTOCOL = TCP)(HOST = 191.123.10.1)(PORT = 1521)) (CONNECT_DATA = (SERVICE_NAME = trad)))',
};

export default config;
