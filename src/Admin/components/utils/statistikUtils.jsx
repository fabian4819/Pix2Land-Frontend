// --- FUNGSI FORMAT ---

/**
 * Mengubah angka menjadi format Rupiah (misal: 1500000 -> "Rp 1.500.000")
 */
export const formatRupiah = (number) => {
  if (isNaN(number)) number = 0;
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(number);
};

/**
 * Menghitung persentase perubahan (misal: (10, 8) -> "25% vs bulan lalu")
 */
export const calculatePercentage = (
  current,
  previous,
  label = "vs bulan lalu"
) => {
  if (previous === 0) {
    if (current > 0) return `100% ${label}`;
    return `0% ${label}`;
  }
  const diff = ((current - previous) / previous) * 100;
  return `${diff.toFixed(0)}% ${label}`;
};

// --- FUNGSI LOGIKA INTI ---

/**
 * Menganalisis historiData untuk menemukan tanggal terbaru
 * dan mengembalikan bulan "saat ini" & "bulan lalu" secara dinamis.
 */
export const getDynamicMonths = (historiData) => {
  // Jika tidak ada data, gunakan tanggal hari ini
  let dataTanggalTerbaru = new Date();

  if (historiData && historiData.length > 0) {
    // 1. Temukan tanggal terbaru di dalam data
    dataTanggalTerbaru = new Date(0); // Mulai dari epoch
    historiData.forEach((item) => {
      const tgl = new Date(item.tgl);
      if (tgl > dataTanggalTerbaru) {
        dataTanggalTerbaru = tgl; // Ditemukan tanggal yang lebih baru
      }
    });
  }

  // 2. Tetapkan bulan "saat ini"
  const currentYear = dataTanggalTerbaru.getFullYear();
  const currentMonth = dataTanggalTerbaru.getMonth(); // misal: 10 (November)

  // 3. Tetapkan "bulan lalu" dengan aman
  const lastMonthDate = new Date(
    dataTanggalTerbaru.getFullYear(),
    dataTanggalTerbaru.getMonth(),
    1
  );
  lastMonthDate.setMonth(lastMonthDate.getMonth() - 1);

  const lastMonthYear = lastMonthDate.getFullYear();
  const lastMonth = lastMonthDate.getMonth(); // misal: 9 (Oktober)

  return { currentYear, currentMonth, lastMonthYear, lastMonth };
};

// --- KONSTANTA ---

export const NAMA_BULAN = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "Mei",
  "Jun",
  "Jul",
  "Ags",
  "Sep",
  "Okt",
  "Nov",
  "Des",
];
