-- CreateExtension
CREATE EXTENSION IF NOT EXISTS "postgis";

-- CreateEnum
CREATE TYPE "Method" AS ENUM ('GET', 'POST', 'PUT', 'DELETE');

-- CreateEnum
CREATE TYPE "Status" AS ENUM ('ACTIVE', 'INACTIVE', 'PENDING_VERIFICATION');

-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('MALE', 'FEMALE');

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "idCard" TEXT,
    "qrCode" TEXT,
    "name" TEXT NOT NULL,
    "image" TEXT,
    "mobile" TEXT,
    "address" TEXT,
    "bio" TEXT,
    "password" TEXT NOT NULL,
    "status" "Status" NOT NULL DEFAULT 'PENDING_VERIFICATION',
    "resetPasswordToken" TEXT,
    "resetPasswordExpire" BIGINT,
    "confirmed" BOOLEAN NOT NULL DEFAULT false,
    "blocked" BOOLEAN NOT NULL DEFAULT false,
    "isTwoFactorEnabled" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "roleId" TEXT,
    "config" TEXT,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "sessions" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "session_token" TEXT NOT NULL,
    "access_token" TEXT,
    "expires" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "sessions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Account" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "provider" TEXT NOT NULL,
    "providerAccountId" TEXT NOT NULL,
    "refresh_token" TEXT,
    "access_token" TEXT,
    "expires_at" INTEGER,
    "token_type" TEXT,
    "scope" TEXT,
    "id_token" TEXT,
    "session_state" TEXT,

    CONSTRAINT "Account_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "VerificationToken" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "VerificationToken_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PasswordResetToken" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PasswordResetToken_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TwoFactorToken" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "TwoFactorToken_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TwoFactorConfirmation" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "TwoFactorConfirmation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "roles" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "description" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "roles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "permissions" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "method" "Method" NOT NULL,
    "route" TEXT NOT NULL,
    "description" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "permissions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "client_permissions" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "sort" INTEGER NOT NULL,
    "menu" TEXT NOT NULL,
    "path" TEXT NOT NULL,
    "description" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "client_permissions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "configures" (
    "id" TEXT NOT NULL,
    "hospital_code" VARCHAR(13),
    "hospital_logo" TEXT,
    "hospital_initial" VARCHAR(7),
    "hospital_nameTH" TEXT,
    "hospital_nameEN" TEXT,
    "hospital_time" TIME,
    "hospital_date" DATE,
    "hospital_queue_day" SMALLINT DEFAULT 1,
    "hospital_status" BOOLEAN DEFAULT false,
    "hospital_station" TEXT,
    "hospital_channel" SMALLINT DEFAULT 0,
    "hospital_offTime" BOOLEAN NOT NULL DEFAULT false,
    "hospital_message" TEXT,
    "hospital_call_message" TEXT,
    "hospital_voice" TEXT,

    CONSTRAINT "configures_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "cabinets" (
    "id" TEXT NOT NULL,
    "cabinet" TEXT,
    "cabinet_size" TEXT,
    "mqtt_topic" TEXT,
    "plcId" TEXT,
    "storage_station" TEXT,
    "storage_location" TEXT,
    "storage_position" TEXT,
    "storage_capacity" INTEGER,
    "userLevel" TEXT,
    "cabinet_note" TEXT,
    "hospital_id" TEXT,
    "user_id" TEXT,
    "HouseId" TEXT,
    "medicine_id" TEXT,
    "storageMax" SMALLINT,
    "storageMin" SMALLINT,
    "storageAdd" INTEGER,
    "storagePay" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),
    "prescrip_id" TEXT,
    "datacabinet" TEXT,

    CONSTRAINT "cabinets_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "medicines" (
    "id" TEXT NOT NULL,
    "medicine_id" TEXT NOT NULL,
    "medicineImage1" TEXT,
    "medicineImage2" TEXT,
    "medicineImage3" TEXT,
    "name" TEXT,
    "medicineName_th" VARCHAR(250),
    "medicineName_en" VARCHAR(250),
    "medicinePackageSize" VARCHAR(20) NOT NULL,
    "medicine_method" VARCHAR(50),
    "medicineMethodEn" VARCHAR(50),
    "medicine_condition" VARCHAR(20),
    "medicine_unit_eating" VARCHAR(20),
    "medicineUnitEatingEn" VARCHAR(20),
    "medicine_frequency" VARCHAR(200),
    "medicineFrequencyEn" VARCHAR(200),
    "medicine_advice" VARCHAR(200),
    "medicineAdviceEn" VARCHAR(200),
    "medicine_value" DECIMAL(4,0),
    "medicineNote" TEXT,
    "medicineStatus" BOOLEAN DEFAULT true,
    "storageMax" SMALLINT,
    "storageMin" SMALLINT,
    "storageAdd" INTEGER,
    "medicinetype" VARCHAR(5),
    "hospital_id" TEXT,
    "user_id" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "medicines_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "arrangeds" (
    "id" TEXT NOT NULL,
    "hospital_id" TEXT,
    "prescrip_id" TEXT,
    "medicine_id" TEXT,
    "medicineCode" TEXT,
    "medicine_name" TEXT,
    "medicine_amount" SMALLINT,
    "med_detail" TEXT,
    "med_detail1" TEXT,
    "dispcause" TEXT,
    "lastDisp" TEXT,
    "medsts" TEXT,
    "prod_type" TEXT,
    "medicinePackageSize" VARCHAR(20) NOT NULL,
    "medicine_amount_edit" SMALLINT,
    "medicine_method" VARCHAR(50),
    "medicineMethodEn" VARCHAR(50),
    "medicine_condition" VARCHAR(20),
    "medicine_unit_eating" VARCHAR(20),
    "medicineUnitEatingEn" VARCHAR(20),
    "medicine_frequency" VARCHAR(200),
    "medicineFrequencyEn" VARCHAR(200),
    "medicine_advice" VARCHAR(200),
    "medicineAdviceEn" VARCHAR(200),
    "medicine_value" DECIMAL(4,0),
    "medicine_reason" TEXT,
    "user_arrang" TEXT,
    "user_arrang_time" TIMESTAMP(3),
    "user_double_check" TEXT,
    "user_check_time" TIMESTAMP(3),
    "user_dispense" TEXT,
    "user_dispense_time" TIMESTAMP(3),
    "arrang_status" TEXT,
    "print_status" SMALLINT DEFAULT 0,
    "labelNo" TEXT,
    "error00" TEXT,
    "error01" TEXT,
    "error02" TEXT,
    "error03" TEXT,
    "error04" TEXT,
    "error05" TEXT,
    "error06" TEXT,
    "error07" TEXT,
    "error08" TEXT,
    "error09" TEXT,
    "error10" TEXT,
    "checkComment" TEXT,
    "barcode" TEXT,
    "user_id" TEXT,
    "basketId" TEXT,
    "autoLoad" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "arrangeds_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "sreenings" (
    "id" TEXT NOT NULL,
    "prescripCode" VARCHAR(20),
    "urgent" BOOLEAN DEFAULT false,
    "basket_num" SMALLINT DEFAULT 1,
    "hnCode" TEXT,
    "vnCode" TEXT,
    "queue_code" TEXT,
    "queue_num" TEXT,
    "doctor_names" TEXT,
    "lap_name" TEXT,
    "dept_name" TEXT,
    "dept_code" TEXT,
    "drug_allergy" TEXT,
    "pay_type" TEXT,
    "queue_random" TEXT,
    "queue_type" VARCHAR(7),
    "full_name" TEXT,
    "age" TEXT,
    "nexttime" TEXT,
    "medicine_total" SMALLINT,
    "medicine_price" DECIMAL(9,2),
    "medicine_service" DECIMAL(9,2),
    "prescrip_status" TEXT,
    "delivery" TEXT,
    "startTime" TIMESTAMP(3),
    "arrangTime" TIMESTAMP(3),
    "userDoubleCheck" TEXT,
    "checkTime" TIMESTAMP(3),
    "userDispense" TEXT,
    "userDispenseTime" TIMESTAMP(3),
    "restBasket" TEXT,
    "userRestBasket" TIMESTAMP(3),
    "prescrip_comment" TEXT,
    "prescripAdd" BOOLEAN DEFAULT false,
    "hospital_id" TEXT,
    "user_id" TEXT,
    "basketId" TEXT,
    "autoLoad" TEXT,
    "cabinetId" TEXT,
    "firstIssTime" TIMESTAMP(3),
    "lastDispense" TIMESTAMP(3),
    "lastDiff" SMALLINT DEFAULT 0,
    "dateQueue" DATE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),
    "channel" SMALLINT DEFAULT 0,
    "channel2" SMALLINT DEFAULT 0,

    CONSTRAINT "sreenings_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "arrangeds_backup" (
    "id" TEXT NOT NULL,
    "arranged_id" TEXT,
    "hospital_id" TEXT,
    "prescrip_id" TEXT,
    "medicine_id" TEXT,
    "medicineCode" TEXT,
    "medicine_name" TEXT,
    "medicine_amount" SMALLINT,
    "med_detail" TEXT,
    "med_detail1" TEXT,
    "dispcause" TEXT,
    "lastDisp" TEXT,
    "medsts" TEXT,
    "prod_type" TEXT,
    "medicinePackageSize" VARCHAR(20) NOT NULL,
    "medicine_amount_edit" SMALLINT,
    "medicine_method" VARCHAR(50),
    "medicineMethodEn" VARCHAR(50),
    "medicine_condition" VARCHAR(20),
    "medicine_unit_eating" VARCHAR(20),
    "medicineUnitEatingEn" VARCHAR(20),
    "medicine_frequency" VARCHAR(200),
    "medicineFrequencyEn" VARCHAR(200),
    "medicine_advice" VARCHAR(200),
    "medicineAdviceEn" VARCHAR(200),
    "medicine_value" DECIMAL(4,0),
    "medicine_reason" TEXT,
    "user_arrang" TEXT,
    "user_arrang_time" TIMESTAMP(3),
    "user_double_check" TEXT,
    "user_check_time" TIMESTAMP(3),
    "user_dispense" TEXT,
    "user_dispense_time" TIMESTAMP(3),
    "arrang_status" TEXT,
    "print_status" SMALLINT DEFAULT 0,
    "labelNo" TEXT,
    "error00" TEXT,
    "error01" TEXT,
    "error02" TEXT,
    "error03" TEXT,
    "error04" TEXT,
    "error05" TEXT,
    "error06" TEXT,
    "error07" TEXT,
    "error08" TEXT,
    "error09" TEXT,
    "error10" TEXT,
    "checkComment" TEXT,
    "barcode" TEXT,
    "user_id" TEXT,
    "basketId" TEXT,
    "autoLoad" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "arrangeds_backup_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "sreenings_backup" (
    "id" TEXT NOT NULL,
    "prescrip_id" TEXT,
    "prescripCode" VARCHAR(20),
    "urgent" BOOLEAN DEFAULT false,
    "basket_num" SMALLINT DEFAULT 1,
    "hnCode" TEXT,
    "vnCode" TEXT,
    "queue_code" TEXT,
    "queue_num" TEXT,
    "doctor_names" TEXT,
    "lap_name" TEXT,
    "dept_name" TEXT,
    "dept_code" TEXT,
    "drug_allergy" TEXT,
    "pay_type" TEXT,
    "queue_random" TEXT,
    "queue_type" VARCHAR(7),
    "full_name" TEXT,
    "age" TEXT,
    "nexttime" TEXT,
    "medicine_total" SMALLINT,
    "medicine_price" DECIMAL(9,2),
    "medicine_service" DECIMAL(9,2),
    "prescrip_status" TEXT,
    "delivery" TEXT,
    "startTime" TIMESTAMP(3),
    "arrangTime" TIMESTAMP(3),
    "userDoubleCheck" TEXT,
    "checkTime" TIMESTAMP(3),
    "userDispense" TEXT,
    "userDispenseTime" TIMESTAMP(3),
    "restBasket" TEXT,
    "userRestBasket" TIMESTAMP(3),
    "prescrip_comment" TEXT,
    "prescripAdd" BOOLEAN DEFAULT false,
    "hospital_id" TEXT,
    "user_id" TEXT,
    "basketId" TEXT,
    "autoLoad" TEXT,
    "cabinetId" TEXT,
    "firstIssTime" TIMESTAMP(3),
    "lastDispense" TIMESTAMP(3),
    "lastDiff" SMALLINT DEFAULT 0,
    "dateQueue" DATE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),
    "channel" SMALLINT DEFAULT 0,
    "channel2" SMALLINT DEFAULT 0,

    CONSTRAINT "sreenings_backup_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "queues" (
    "id" TEXT NOT NULL,
    "hospital_id" TEXT,
    "user_id" TEXT,
    "prescrip_id" TEXT,
    "regNo" TEXT,
    "hnCode" TEXT,
    "vnCode" TEXT,
    "fullName" TEXT,
    "queueCode" TEXT,
    "queueNum" TEXT,
    "queueRandom" TEXT,
    "queueStatus" SMALLINT DEFAULT 0,
    "queueCounts" SMALLINT DEFAULT 0,
    "basketShelf" VARCHAR(20),
    "channel" SMALLINT NOT NULL,
    "channel2" SMALLINT DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "queues_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "QueueMsg" (
    "id" TEXT NOT NULL,
    "callMsg" TEXT,
    "queueStatus" SMALLINT DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "QueueMsg_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "auto_loads" (
    "id" TEXT NOT NULL,
    "mqtt_topic" TEXT NOT NULL,
    "plcId" TEXT,
    "load_number" SMALLINT DEFAULT 0,
    "drug_count" SMALLINT DEFAULT 0,
    "load_status" BOOLEAN DEFAULT false,
    "rfid_code" TEXT,
    "load_diff" SMALLINT DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),
    "basketId" TEXT,
    "orderId" TEXT,

    CONSTRAINT "auto_loads_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "baskets" (
    "id" TEXT NOT NULL,
    "hospital_id" TEXT,
    "user_id" TEXT,
    "qrCode" VARCHAR(255),
    "name" TEXT,
    "basket_color" VARCHAR(7),
    "basket_status" BOOLEAN DEFAULT true,
    "basket_type" TEXT,
    "basket_floor" SMALLINT,
    "basket_match" BOOLEAN DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "baskets_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Plc" (
    "id" TEXT NOT NULL,
    "queueType" TEXT,
    "channel1" BOOLEAN DEFAULT false,
    "channel2" BOOLEAN DEFAULT false,
    "channel3" BOOLEAN DEFAULT false,
    "channel4" BOOLEAN DEFAULT false,

    CONSTRAINT "Plc_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_PermissionToRole" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_PermissionToRole_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateTable
CREATE TABLE "_ClientPermissionToRole" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_ClientPermissionToRole_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "sessions_user_id_key" ON "sessions"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "sessions_session_token_key" ON "sessions"("session_token");

-- CreateIndex
CREATE UNIQUE INDEX "Account_provider_providerAccountId_key" ON "Account"("provider", "providerAccountId");

-- CreateIndex
CREATE UNIQUE INDEX "VerificationToken_token_key" ON "VerificationToken"("token");

-- CreateIndex
CREATE UNIQUE INDEX "VerificationToken_email_token_key" ON "VerificationToken"("email", "token");

-- CreateIndex
CREATE UNIQUE INDEX "PasswordResetToken_token_key" ON "PasswordResetToken"("token");

-- CreateIndex
CREATE UNIQUE INDEX "PasswordResetToken_email_token_key" ON "PasswordResetToken"("email", "token");

-- CreateIndex
CREATE UNIQUE INDEX "TwoFactorToken_token_key" ON "TwoFactorToken"("token");

-- CreateIndex
CREATE UNIQUE INDEX "TwoFactorToken_email_token_key" ON "TwoFactorToken"("email", "token");

-- CreateIndex
CREATE UNIQUE INDEX "TwoFactorConfirmation_userId_key" ON "TwoFactorConfirmation"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "roles_name_key" ON "roles"("name");

-- CreateIndex
CREATE UNIQUE INDEX "roles_type_key" ON "roles"("type");

-- CreateIndex
CREATE UNIQUE INDEX "permissions_method_route_key" ON "permissions"("method", "route");

-- CreateIndex
CREATE UNIQUE INDEX "client_permissions_name_key" ON "client_permissions"("name");

-- CreateIndex
CREATE UNIQUE INDEX "client_permissions_path_key" ON "client_permissions"("path");

-- CreateIndex
CREATE UNIQUE INDEX "medicines_medicine_id_key" ON "medicines"("medicine_id");

-- CreateIndex
CREATE INDEX "_PermissionToRole_B_index" ON "_PermissionToRole"("B");

-- CreateIndex
CREATE INDEX "_ClientPermissionToRole_B_index" ON "_ClientPermissionToRole"("B");

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "roles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_config_fkey" FOREIGN KEY ("config") REFERENCES "configures"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sessions" ADD CONSTRAINT "sessions_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Account" ADD CONSTRAINT "Account_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TwoFactorConfirmation" ADD CONSTRAINT "TwoFactorConfirmation_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cabinets" ADD CONSTRAINT "cabinets_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cabinets" ADD CONSTRAINT "cabinets_medicine_id_fkey" FOREIGN KEY ("medicine_id") REFERENCES "medicines"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "medicines" ADD CONSTRAINT "medicines_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "arrangeds" ADD CONSTRAINT "arrangeds_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "arrangeds" ADD CONSTRAINT "arrangeds_prescrip_id_fkey" FOREIGN KEY ("prescrip_id") REFERENCES "sreenings"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "arrangeds" ADD CONSTRAINT "arrangeds_medicine_id_fkey" FOREIGN KEY ("medicine_id") REFERENCES "medicines"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "arrangeds" ADD CONSTRAINT "arrangeds_basketId_fkey" FOREIGN KEY ("basketId") REFERENCES "baskets"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "arrangeds" ADD CONSTRAINT "arrangeds_autoLoad_fkey" FOREIGN KEY ("autoLoad") REFERENCES "auto_loads"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sreenings" ADD CONSTRAINT "sreenings_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sreenings" ADD CONSTRAINT "sreenings_basketId_fkey" FOREIGN KEY ("basketId") REFERENCES "baskets"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "arrangeds_backup" ADD CONSTRAINT "arrangeds_backup_arranged_id_fkey" FOREIGN KEY ("arranged_id") REFERENCES "arrangeds"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sreenings_backup" ADD CONSTRAINT "sreenings_backup_prescrip_id_fkey" FOREIGN KEY ("prescrip_id") REFERENCES "sreenings"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "queues" ADD CONSTRAINT "queues_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "queues" ADD CONSTRAINT "queues_prescrip_id_fkey" FOREIGN KEY ("prescrip_id") REFERENCES "sreenings"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "auto_loads" ADD CONSTRAINT "auto_loads_basketId_fkey" FOREIGN KEY ("basketId") REFERENCES "baskets"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "auto_loads" ADD CONSTRAINT "auto_loads_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "sreenings"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PermissionToRole" ADD CONSTRAINT "_PermissionToRole_A_fkey" FOREIGN KEY ("A") REFERENCES "permissions"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PermissionToRole" ADD CONSTRAINT "_PermissionToRole_B_fkey" FOREIGN KEY ("B") REFERENCES "roles"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ClientPermissionToRole" ADD CONSTRAINT "_ClientPermissionToRole_A_fkey" FOREIGN KEY ("A") REFERENCES "client_permissions"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ClientPermissionToRole" ADD CONSTRAINT "_ClientPermissionToRole_B_fkey" FOREIGN KEY ("B") REFERENCES "roles"("id") ON DELETE CASCADE ON UPDATE CASCADE;
