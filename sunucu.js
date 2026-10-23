const http = require('http');
const dayjs = require('dayjs');

const PORT = 3000;

const server = http.createServer((req, res) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);

    if (req.method !== 'GET') {
        res.writeHead(405, { 'Content-Type': 'text/plain; charset=utf-8', 'Allow': 'GET' });
        return res.end('Method Not Allowed');
    }

    if (req.url === '/') {
        res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
        res.end('<h1>BMH231 Ödev 1 Sunucusu</h1><p><a href="/hakkimda">Hakkımda Sayfası</a></p>');
    } else if (req.url === '/hakkimda') {
        res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
        res.end('<h1>Hakkımda</h1><p>Merhaba, ben Muhammed Nazım Karakoç. Bozok Üniversitesi Bilgisayar Mühendisliği 2. sınıf öğrencisiyim.</p>');
    } else if (req.url === '/api/ders') {
        res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
        res.end(JSON.stringify({ kod: 'BMH231', ad: 'Web Programlama', gun: 'Cuma' }));
    } else if (req.url === '/api/agep') {
        const sonTeslim = dayjs('2026-11-01');
        const bugun = dayjs();
        const kalanGun = sonTeslim.diff(bugun, 'day');

        res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
        res.end(JSON.stringify({ agepSonTeslim: '2026-11-01', kalanGun: kalanGun }));
    } else {
        res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
        res.end('Sayfa bulunamadı');
    }
});

server.listen(PORT, () => {
    console.log(`Sunucu http://localhost:${PORT} adresinde çalışıyor...`);
});