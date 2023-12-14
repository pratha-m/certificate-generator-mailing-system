import mongoose from "mongoose";
import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import multer from "multer";
import nodemailer from "nodemailer";
import XLSX from "xlsx"
import ejs from "ejs";
import fs from "fs";
import puppeteer from "puppeteer";

export {
    dotenv,
    express,
    cors,
    multer,
    mongoose,
    nodemailer,
    XLSX,
    ejs,
    fs,
    puppeteer  
}