const fs = require('fs');
const { spawn } = require('child_process');
const Recorder = require('node-record-lpcm16');


if (process.argv.length < 3) {
  console.error('Usage: node recordAudio.js <outputFilename>');
  process.exit(1);
}

const outputFilename = process.argv[2];

const fileStream = fs.createWriteStream(outputFilename, { encoding: 'binary' });

const audioStream = new Recorder({
  sampleRate: 16000, // Sesuaikan dengan kebutuhan Anda
  channels: 1, // Mono
});

audioStream.pipe(fileStream);

console.log('Mulai merekam audio...');

process.on('SIGINT', () => {
  console.log('Merekam audio selesai.');
  audioStream.stop();
  fileStream.end();
  process.exit();
});
