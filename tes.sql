SHOW TABLES;

DESC siswa_dispen

SELECT

SELECT id_kelas, COUNT(*) AS jumlah
FROM siswa_dispen
GROUP BY
    id_kelas

SELECT kelas.nama AS nama_kelas, COUNT(siswa_dispen.id_dispen) AS jumlah_dispen
FROM siswa_dispen
    JOIN kelas ON siswa_dispen.id_kelas = kelas.id_kelas
GROUP BY
    kelas
--
SELECT COUNT(*) AS jumlah, 'dispen' AS label
FROM siswa_dispen
UNION
SELECT COUNT(*) AS jumlah, 'terlambat' AS label
FROM siswa_masuk

SELECT DATE(tanggal) AS tanggal, COUNT(*) AS jumlah_dispensasi
FROM siswa_dispen
WHERE
    tanggal >= DATE_SUB(CURDATE(), INTERVAL 30 DAY)
GROUP BY
    DATE(tanggal)
ORDER BY DATE(tanggal) DESC
--

SELECT kelas.nama AS nama_kelas, COUNT(siswa_masuk.id_masuk) AS jumlah_masuk
FROM siswa_masuk
    JOIN kelas ON siswa_masuk.id_kelas = kelas.id_kelas
GROUP BY
    kelas.nama

SELECT kelas.nama AS nama_kelas, COUNT(siswa_dispen.id_dispen) AS jumlah_dispen FROM siswa_dispen JOIN kelas ON siswa_dispen.id_kelas = kelas.id_kelas GROUP BY kelas.nama

--
SELECT *
FROM siswa_dispen
WHERE
    tanggal >= DATE_SUB(CURDATE(), INTERVAL 2 DAY)