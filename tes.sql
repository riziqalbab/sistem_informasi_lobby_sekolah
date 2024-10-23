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




WITH RECURSIVE date_range AS (
    SELECT CURDATE() - INTERVAL 30 DAY AS tanggal
    UNION ALL
    SELECT tanggal + INTERVAL 1 DAY FROM date_range
    WHERE tanggal + INTERVAL 1 DAY <= CURDATE()
)
SELECT dr.tanggal, COALESCE(sd.jumlah_dispensasi, 0) AS jumlah_dispensasi
FROM date_range dr
LEFT JOIN (
    SELECT DATE(tanggal) AS tanggal, COUNT(*) AS jumlah_dispensasi
    FROM siswa_dispen
    WHERE tanggal >= DATE_SUB(CURDATE(), INTERVAL 30 DAY)
    GROUP BY DATE(tanggal)
) sd ON dr.tanggal = sd.tanggal
ORDER BY dr.tanggal DESC


WITH RECURSIVE date_range AS (
    SELECT CURDATE() - INTERVAL 30 DAY AS tanggal
    UNION ALL
    SELECT tanggal + INTERVAL 1 DAY FROM date_range
    WHERE tanggal + INTERVAL 1 DAY <= CURDATE()
)
SELECT date_range.tanggal, COALESCE(siswa_masuk.count, 0) AS count
FROM date_range
LEFT JOIN (
    SELECT DATE(tanggal) AS tanggal, COUNT(*) AS count
    FROM siswa_masuk
    WHERE tanggal >= DATE_SUB(CURDATE(), INTERVAL 30 DAY)
    GROUP BY DATE(tanggal)
) siswa_masuk ON date_range.tanggal = siswa_masuk.tanggal
ORDER BY date_range.tanggal DESC;