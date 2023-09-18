require('dotenv').config();
const express = require('express');
const puppeteer = require('puppeteer');

const app = express();
const port = 3000;

// Jumlah peserta yang diperlukan sebelum bot bergabung dan keluar
// const JOIN_PEOPLE = 1;
// const LEAVE_PEOPLE = 5;


app.get('/', async (req, res) => {
  try {
    const browser = await puppeteer.launch({
      args: ['--use-fake-ui-for-media-stream'],
      // args: ["--disable-notifications", "--mute-audio", "--enable-automation"],
      // ignoreDefaultArgs: true,
      headless: false
    });
    const page = await browser.newPage();
    // const navigationPromise = page.waitForNavigation({ timeout: 60000 });
    const email = 'input[type="email"]';
    const password = 'input[type="password"]';

    await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4324.150 Safari/537.36');
    const context = browser.defaultBrowserContext();
    await context.overridePermissions(
      "https://meet.google.com/", ["microphone", "camera", "notifications"]
    );

    // await navigationPromise;
    const loginLink = 'https://accounts.google.com/v3/signin/identifier?continue=https%3A%2F%2Faccounts.google.com%2F&followup=https%3A%2F%2Faccounts.google.com%2F&ifkv=AYZoVhfw--2EQ6Ryvvt3fdyMLJyJC_fOCW7eXIGv4Qrr7gp7RXUpSD3eS-soiiAtQz7i44p2mmNNmw&passive=1209600&flowName=GlifWebSignIn&flowEntry=ServiceLogin&dsh=S1744914679%3A1694763192362364&theme=glif';

    // Login ke akun Google
    await page.goto(loginLink);

    // await page.type('input[type="email"]', process.env.EMAIL); 
    await page.type(email, process.env.EMAIL);
    const nextPage = await page.waitForSelector('#identifierNext > div > button')
    await nextPage.click();
    await page.waitForTimeout(3000);

    await page.type(password, process.env.PASSWORD);
    const passPage = await page.waitForSelector('#passwordNext > div > button')
    await passPage.click();
    await page.waitForTimeout(3000);

    const meetLink = 'https://meet.google.com/ccj-thup-tad';

    const joinMeeting = async (link) => {
      await page.goto(link);

      //Join Meeting
      const btnJoin = await page.waitForSelector('#yDmH0d > c-wiz > div > div > div:nth-child(15) > div.crqnQb > div > div.gAGjv > div.vgJExf > div > div > div.d7iDfe.NONs6c > div.shTJQe > div.jtn8y > div.XCoPyb > div:nth-child(1) > button')

      // Tunggu hingga tombol untuk mengaktifkan audio dan kamera muncul
      await page.waitForSelector('#yDmH0d > c-wiz > div > div > div:nth-child(15) > div.crqnQb > div > div.gAGjv > div.vgJExf > div > div > div.ZUpb4c > div.oORaUb.NONs6c > div > div.EhAUAc > div.ZB88ed > div > div > div.U26fgb.JRY2Pb.mUbCce.kpROve.yBiuPb.y1zVCf.M9Bg4d.HNeRed');
      await page.waitForSelector('#yDmH0d > c-wiz > div > div > div:nth-child(15) > div.crqnQb > div > div.gAGjv > div.vgJExf > div > div > div.ZUpb4c > div.oORaUb.NONs6c > div > div.EhAUAc > div.GOH7Zb > div > div.U26fgb.JRY2Pb.mUbCce.kpROve.yBiuPb.y1zVCf.M9Bg4d.HNeRed');

      // Nonaktifkan audio
      await page.click('#yDmH0d > c-wiz > div > div > div:nth-child(15) > div.crqnQb > div > div.gAGjv > div.vgJExf > div > div > div.ZUpb4c > div.oORaUb.NONs6c > div > div.EhAUAc > div.ZB88ed > div > div > div.U26fgb.JRY2Pb.mUbCce.kpROve.yBiuPb.y1zVCf.M9Bg4d.HNeRed');

      // Nonaktifkan kamera
      await page.click('#yDmH0d > c-wiz > div > div > div:nth-child(15) > div.crqnQb > div > div.gAGjv > div.vgJExf > div > div > div.ZUpb4c > div.oORaUb.NONs6c > div > div.EhAUAc > div.GOH7Zb > div > div.U26fgb.JRY2Pb.mUbCce.kpROve.yBiuPb.y1zVCf.M9Bg4d.HNeRed');
      await btnJoin.click();
      await page.waitForTimeout(3000);
      
      // Bergabung dengan pertemuan
      
      // await waitForParticipants(3);
    };

    // const leaveMeeting = async () => {
    //   const participantCount = await page.evaluate(() => {
    //     const participantList = document.querySelector('.participant-list');
    //     const participants = participantList.querySelectorAll('.participant-item');
    //     return participants.length;
    //   });
    
    //   if (participantCount <= 5) {
    //     const btnLeave = await page.waitForSelector('div[data-tooltip="Leave call"]');
    //     await btnLeave.click();
    //     await page.waitForTimeout(3000);
    //     await browser.close();
    //   }
    // };

    await joinMeeting(meetLink);
    // await leaveMeeting();

    // Keluar dari pertemuan jika jumlah peserta kurang dari LEAVE_PEOPLE
    // await leaveMeeting(LEAVE_PEOPLE);

    // await browser.close();

    res.send('Bot telah bergabung dan keluar dari pertemuan.');
  } catch (error) {
    console.error('Terjadi kesalahan:', error);
    res.status(500).send('Terjadi kesalahan: ' + error);
  }
});

app.listen(port, () => {
  console.log(`Bot Google Meet berjalan di http://localhost:${port}`);
});