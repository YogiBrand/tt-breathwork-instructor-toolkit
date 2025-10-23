-- Initial database setup for TT Toolkit
-- This file is automatically executed when the PostgreSQL container starts

-- Create database if it doesn't exist (handled by Docker environment)
-- CREATE DATABASE tt_toolkit;

-- Set timezone
SET timezone = 'UTC';

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create indexes for better performance (Prisma will create the tables)
-- These will be added after Prisma migration

-- Add any initial data or configurations here
-- (Actual table creation will be handled by Prisma migrations)