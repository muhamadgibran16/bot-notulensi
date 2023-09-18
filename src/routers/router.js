const express = require('express')
const router = express.Router()
const puppeteer = require('puppeteer');

const {
  login,
  joinMeeting
} = require('../controller/meet')


/** Authenticate */
router.get('/', async (req, res) => {
  try {
    const browser = await puppeteer.launch({
      args: ['--use-fake-ui-for-media-stream'],
      headless: false
    });
    const page = await browser.newPage();

    await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4324.150 Safari/537.36');
    const context = browser.defaultBrowserContext();
    await context.overridePermissions(
      "https://meet.google.com/", ["microphone", "camera", "notifications"]
    );

    const meetLink = 'https://meet.google.com/kev-wrbd-xoo';

    // Login ke akun Google
    await login(page);

    // Bergabung dengan pertemuan
    await joinMeeting(page, meetLink);

    console.log('Bot telah bergabung ke pertemuan.');
    res.send('Bot telah bergabung ke pertemuan.');
  } catch (error) {
    console.error('Terjadi kesalahan:', error);
    res.status(500).send('Terjadi kesalahan: ' + error);
  }
});



module.exports = router