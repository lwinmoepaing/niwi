"use server";

import {
  responseError,
  responseSuccess,
} from "@/libs/response/response-helper";
import puppeteer from "puppeteer";
import { z } from "zod";

// Define the URL schema
const urlSchema = z.string().url({ message: "Invalid URL format" });

export async function captureScreenshot(url: string) {
  // Validation
  const { error } = urlSchema.safeParse(url);
  if (error) {
    return responseError("Invalid Url", error.format());
  }

  try {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url, { waitUntil: "networkidle2" });

    const screenshot = await page.screenshot({ fullPage: true });
    await browser.close();

    const b64 = Buffer.from(screenshot).toString("base64");
    return responseSuccess("Successfully fetched Screenshot", b64);
  } catch (error) {
    console.error("Error capturing screenshot:", error);
    return responseError("Failed to capture screenshot");
  }
}
