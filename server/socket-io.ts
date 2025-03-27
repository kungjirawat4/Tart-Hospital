import type { Socket } from 'socket.io';
import axios from 'axios';

import cron from 'node-cron';
import { Server as SocketIOServer } from 'socket.io';
import { db } from './lib/prisma.db';

import 'dotenv/config';

// eslint-disable-next-line import/no-mutable-exports
export let io: SocketIOServer | undefined;

const { NEXT_PUBLIC_API_URL } = process.env;

const initSocketSingleton = () => {
  if (!io) {
    io = new SocketIOServer({
      cors: {
        origin: '*',
        methods: ['GET', 'PUT', 'POST'],
        credentials: true,

      },
      connectionStateRecovery: {
        // the backup duration of the sessions and the packets
        maxDisconnectionDuration: 2 * 60 * 1000,
        // whether to skip middlewares upon successful recovery
        skipMiddlewares: true,
      },
    });

    io.on('connection', async (socket: Socket) => {
      cron.schedule('* * * * * 1,2,3,4,5,6', async () => {
        await Promise.all([
          await axios.get(`${NEXT_PUBLIC_API_URL}/tart`) // เรียก dashboard แสดงทุกๆ 1 วินาที
            .then((res) => {
              if (res.status === 200) {
                socket.emit('tart', res?.data); // ส่งไปยัง client
              }
              db.$disconnect();
            })
            .catch(() => {
              db.$disconnect();
              // console.error(error)
            }),
        ]);
      });

      // cron.schedule('*/3 * 1-21 * * 1,2,3,4,5,6', async () => { // ทุกๆ 3 วินาที ตั้งแต่ชั่วโมงที่ 1-21 ในวันจันทร์-วันศุกร์
      //   await Promise.all([
      //     await axios.get(`${NEXT_PUBLIC_API_URL}/udh/quemed-info`) // ดึงข้อมูลคิวโรงพยาบาล
      //       .then(async (res) => {
      //         if (res.status === 200) {
      //           const data = res?.data?.data;
      //           if (data?.length > 0) {
      //             await axios
      //               .post(`${NEXT_PUBLIC_API_URL}/udh/med-queue`, data) // ถ้ามีให้เพิ่มลงฐานข้อมูล
      //               .then((_res) => {
      //                 db.$disconnect();
      //               })
      //               .catch(() => {
      //                 db.$disconnect();
      //               });
      //           }
      //         }
      //       })
      //       .catch(() => {
      //         db.$disconnect();
      //       }),

      //     await axios.get(`${NEXT_PUBLIC_API_URL}/users`) // ดึงข้อมูลผู้ใช้ส่งไปยัง client
      //       .then((res) => {
      //         if (res.status === 200) {
      //           socket.emit('users', res?.data); // ส่งไปยัง client
      //         }
      //         db.$disconnect();
      //       })
      //       .catch(() => {
      //         db.$disconnect();
      //       }),
      //   ]);
      // });

      // cron.schedule('0 * 1-21 * * 1,2,3,4,5', async () => { // ทุกๆ วินาที ที่ 0 ตั้งแต่ชั่วโมงที่ 1-21 ในวันจันทร์-วันศุกร์
      //   await Promise.all([
      //     await axios.get(`${NEXT_PUBLIC_API_URL}/autoload/randomprescription`) // จัดคิวตามสัดส่วนชั้น2และ3
      //       .then((_res) => {
      //         db.$disconnect();
      //       })
      //       .catch(() => {
      //         db.$disconnect();
      //         // console.error(error)
      //       }),

      //     await axios.get(`${NEXT_PUBLIC_API_URL}/udh/quemed-pay`) // ดึงข้อมูลเรียกคิวโรงพยาบาล
      //       .then(async (res) => {
      //         if (res.status === 200) {
      //           const data = res?.data?.data;
      //           if (data?.length > 0) {
      //             await axios
      //               .post(`${NEXT_PUBLIC_API_URL}/udh/med-qpay`, data) // บันทึกลงฐานข้อมูล
      //               .then((_res) => {
      //                 db.$disconnect();
      //               })
      //               .catch(() => {
      //                 db.$disconnect();
      //               });
      //           }
      //         }
      //       })
      //       .catch(() => {
      //         db.$disconnect();
      //       }),

      //     await axios.get(`${NEXT_PUBLIC_API_URL}/dashboard/hospital`) // ดึงข้อมูลโรงพยาบาล
      //       .then((res) => {
      //         if (res.status === 200) {
      //           socket.emit('config', res?.data?.data); // ส่งไปยัง client
      //         }
      //         db.$disconnect();
      //       })
      //       .catch((error) => {
      //         db.$disconnect();
      //         console.error(error);
      //       }),
      //   ]);
      // });

      socket.on('disconnect', () => {
        // eslint-disable-next-line no-console
        console.log(`Client disconnected: ${socket.id}`);
      });
    });
  }
  return io!;
};

declare const globalThis: {
  ioGlobal: ReturnType<typeof initSocketSingleton>;
// eslint-disable-next-line no-restricted-globals
} & typeof global;

io = globalThis.ioGlobal ?? initSocketSingleton();

export default io;

if (process.env.NODE_ENV !== 'production') {
  globalThis.ioGlobal = io;
}
