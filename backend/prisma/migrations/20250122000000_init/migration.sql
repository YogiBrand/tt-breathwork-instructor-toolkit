-- CreateTable
CREATE TABLE "codes" (
    "id" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'active',
    "issuedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "usedAt" TIMESTAMP(3),
    "usedByEmail" TEXT,

    CONSTRAINT "codes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "codeId" TEXT NOT NULL,
    "brandData" JSONB NOT NULL DEFAULT '{}',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "assets" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "assetType" TEXT NOT NULL,
    "fileName" TEXT NOT NULL,
    "filePath" TEXT NOT NULL,
    "fileSize" INTEGER NOT NULL,
    "customData" JSONB DEFAULT '{}',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "downloads" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "assets_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "launch_progress" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "week" INTEGER NOT NULL,
    "completed" BOOLEAN NOT NULL DEFAULT false,
    "completedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "launch_progress_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "codes_code_key" ON "codes"("code");

-- CreateIndex
CREATE INDEX "codes_code_idx" ON "codes"("code");

-- CreateIndex
CREATE INDEX "codes_status_idx" ON "codes"("status");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "users_codeId_key" ON "users"("codeId");

-- CreateIndex
CREATE INDEX "users_email_idx" ON "users"("email");

-- CreateIndex
CREATE INDEX "assets_userId_idx" ON "assets"("userId");

-- CreateIndex
CREATE INDEX "assets_assetType_idx" ON "assets"("assetType");

-- CreateIndex
CREATE UNIQUE INDEX "launch_progress_userId_week_key" ON "launch_progress"("userId", "week");

-- CreateIndex
CREATE INDEX "launch_progress_userId_idx" ON "launch_progress"("userId");

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_codeId_fkey" FOREIGN KEY ("codeId") REFERENCES "codes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "assets" ADD CONSTRAINT "assets_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "launch_progress" ADD CONSTRAINT "launch_progress_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
