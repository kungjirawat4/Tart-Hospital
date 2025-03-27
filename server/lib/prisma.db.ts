// /* eslint-disable no-restricted-globals */
// /* eslint-disable ts/ban-ts-comment */
// // @ts-ignore
// import { PrismaClient, QueryMode } from '@prisma/client';

// // eslint-disable-next-line import/no-mutable-exports
// let db: PrismaClient;

// if (process.env.NODE_ENV === 'production') {
//   db = new PrismaClient();
// } else {
//   if (!global.db) {
//     global.db = new PrismaClient();
//   }

//   db = global.db;
// }

// export { db, QueryMode };

/* eslint-disable no-restricted-globals */
/* eslint-disable ts/ban-ts-comment */
// @ts-ignore
import { PrismaClient, QueryMode } from '@prisma/client';

declare global {
  // eslint-disable-next-line vars-on-top, no-var
  var db: PrismaClient | undefined; // บอก TypeScript ว่า global.db อาจมีค่า หรือเป็น undefined
}

// eslint-disable-next-line import/no-mutable-exports
let db: PrismaClient;

if (process.env.NODE_ENV === 'production') {
  db = new PrismaClient();
} else {
  if (!global.db) {
    global.db = new PrismaClient();
  }

  db = global.db;
}

export { db, QueryMode };
