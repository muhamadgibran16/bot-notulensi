const puppeteer = require('puppeteer');
const { Readable } = require('stream');
const fs = require('fs');
const os = require('os');
const path = require('path'); // Tambahkan ini untuk mengimpor modul 'path'

const login = async (page) => {
  const emailSelector = 'input[type="email"]';
  const passwordSelector = 'input[type="password"]';

  await page.goto('https://accounts.google.com/v3/signin/identifier?continue=https%3A%2F%2Faccounts.google.com%2F&followup=https%3A%2F%2Faccounts.google.com%2F&ifkv=AYZoVhfw--2EQ6Ryvvt3fdyMLJyJC_fOCW7eXIGv4Qrr7gp7RXUpSD3eS-soiiAtQz7i44p2mmNNmw&passive=1209600&flowName=GlifWebSignIn&flowEntry=ServiceLogin&dsh=S1744914679%3A1694763192362364&theme=glif');
  
  await page.type(emailSelector, process.env.EMAIL);
  const nextPage = await page.waitForSelector('#identifierNext > div > button');
  await nextPage.click();
  await page.waitForTimeout(6000);
  
  await page.type(passwordSelector, process.env.PASSWORD);
  const passPage = await page.waitForSelector('#passwordNext > div > button');
  await passPage.click();
  await page.waitForTimeout(6000);
};

// Fungsi untuk join pertemuan
const joinMeeting = async (page, link) => {
  await page.goto(link);

  // Tunggu tombol "Join Meeting" muncul
  const btnJoin = await page.waitForSelector('#yDmH0d > c-wiz > div > div > div:nth-child(15) > div.crqnQb > div > div.gAGjv > div.vgJExf > div > div > div.d7iDfe.NONs6c > div.shTJQe > div.jtn8y > div.XCoPyb > div:nth-child(1) > button');
  
  // Tunggu hingga tombol untuk mengaktifkan audio dan kamera muncul
  await page.waitForSelector('#yDmH0d > c-wiz > div > div > div:nth-child(15) > div.crqnQb > div > div.gAGjv > div.vgJExf > div > div > div.ZUpb4c > div.oORaUb.NONs6c > div > div.EhAUAc > div.ZB88ed > div > div > div.U26fgb.JRY2Pb.mUbCce.kpROve.yBiuPb.y1zVCf.M9Bg4d.HNeRed');
  await page.waitForSelector('#yDmH0d > c-wiz > div > div > div:nth-child(15) > div.crqnQb > div > div.gAGjv > div.vgJExf > div > div > div.ZUpb4c > div.oORaUb.NONs6c > div > div.EhAUAc > div.GOH7Zb > div > div.U26fgb.JRY2Pb.mUbCce.kpROve.yBiuPb.y1zVCf.M9Bg4d.HNeRed');

  // Nonaktifkan audio
  await page.click('#yDmH0d > c-wiz > div > div > div:nth-child(15) > div.crqnQb > div > div.gAGjv > div.vgJExf > div > div > div.ZUpb4c > div.oORaUb.NONs6c > div > div.EhAUAc > div.ZB88ed > div > div > div.U26fgb.JRY2Pb.mUbCce.kpROve.yBiuPb.y1zVCf.M9Bg4d.HNeRed');

  // Nonaktifkan kamera
  await page.click('#yDmH0d > c-wiz > div > div > div:nth-child(15) > div.crqnQb > div > div.gAGjv > div.vgJExf > div > div > div.ZUpb4c > div.oORaUb.NONs6c > div > div.EhAUAc > div.GOH7Zb > div > div.U26fgb.JRY2Pb.mUbCce.kpROve.yBiuPb.y1zVCf.M9Bg4d.HNeRed');

  // Klik tombol "Join Meeting"
  await btnJoin.click();
  await page.waitForTimeout(10000);

  // Implementasi tambahan atau rekaman audio lainnya dapat ditempatkan di sini
};

module.exports = {
  login,
  joinMeeting,
}
