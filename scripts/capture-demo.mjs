import {copyFile, mkdir} from 'node:fs/promises';
import path from 'node:path';
import {chromium} from '@playwright/test';

const captureDir = path.resolve('artifacts/capture');
const screenshotDir = path.resolve('docs/screenshots');
await mkdir(captureDir, {recursive: true});
await mkdir(screenshotDir, {recursive: true});

const browser = await chromium.launch({channel: 'chrome', headless: true});
const context = await browser.newContext({
  viewport: {width: 1600, height: 900},
  recordVideo: {dir: captureDir, size: {width: 1600, height: 900}},
  colorScheme: 'dark',
});
const page = await context.newPage();
await page.goto('http://127.0.0.1:5173', {waitUntil: 'networkidle'});
const video = page.video();

await page.screenshot({path: path.join(screenshotDir, '01-start.png')});
await page.waitForTimeout(1800);

await page.getByTestId('switch-breaker-a').click();
await page.waitForTimeout(500);
await page.screenshot({path: path.join(screenshotDir, '02-blocked.png')});
await page.waitForTimeout(2300);

for (const [switchId, pause] of [
  ['iso-west', 1700],
  ['iso-east', 1800],
  ['breaker-a', 2100],
  ['tie-b', 2600],
]) {
  await page.getByTestId(`switch-${switchId}`).click();
  await page.waitForTimeout(pause);
}

await page.screenshot({path: path.join(screenshotDir, '03-restored.png')});
await context.close();
await browser.close();

if (!video) throw new Error('Playwright did not create a recording.');
const recordedPath = await video.path();
const finalPath = path.resolve('artifacts/restoration-lab-walkthrough.webm');
await copyFile(recordedPath, finalPath);
console.log(finalPath);
