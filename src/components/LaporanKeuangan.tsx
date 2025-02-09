import { BarChart, Download, TrendingUp, DollarSign } from "lucide-react";

interface LaporanProps {
  periode: string;
  pendapatan: string;
  pengeluaran: string;
  keuntungan: string;
  pertumbuhan: string;
}

const dataKeuangan: LaporanProps[] = [
  {
    periode: "Q1 2025",
    pendapatan: "Rp -",
    pengeluaran: "Rp -",
    keuntungan: "Rp -",
    pertumbuhan: "+0%",
  },
  {
    periode: "Q2 2024",
    pendapatan: "Rp -",
    pengeluaran: "Rp -",
    keuntungan: "Rp -",
    pertumbuhan: "+0%",
  },
  {
    periode: "Q1 2024",
    pendapatan: "Rp -",
    pengeluaran: "Rp -",
    keuntungan: "Rp -",
    pertumbuhan: "+0%",
  },
];

const LaporanKeuangan = () => {
  return (
    <section id="laporan" className="py-20 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Laporan Keuangan
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Transparansi kinerja keuangan BUMDesa
          </p>
        </div>

        {/* Ringkasan Keuangan */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div className="bg-white dark:bg-gray-700 p-6 rounded-xl shadow-lg">
            <div className="flex items-center mb-4">
              <DollarSign className="h-8 w-8 text-green-600 dark:text-green-500 mr-3" />
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                Total Pendapatan
              </h3>
            </div>
            <p className="text-3xl font-bold text-green-600 dark:text-green-500">
              Rp 0
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
              Total 3 kuartal terakhir
            </p>
          </div>

          <div className="bg-white dark:bg-gray-700 p-6 rounded-xl shadow-lg">
            <div className="flex items-center mb-4">
              <BarChart className="h-8 w-8 text-blue-600 dark:text-blue-500 mr-3" />
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                Rata-rata Keuntungan
              </h3>
            </div>
            <p className="text-3xl font-bold text-blue-600 dark:text-blue-500">
              Rp 0
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
              Per kuartal
            </p>
          </div>

          <div className="bg-white dark:bg-gray-700 p-6 rounded-xl shadow-lg">
            <div className="flex items-center mb-4">
              <TrendingUp className="h-8 w-8 text-purple-600 dark:text-purple-500 mr-3" />
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                Pertumbuhan
              </h3>
            </div>
            <p className="text-3xl font-bold text-purple-600 dark:text-purple-500">
              +0%
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
              Rata-rata pertumbuhan
            </p>
          </div>
        </div>

        {/* Tabel Laporan */}
        <div className="bg-white dark:bg-gray-700 rounded-xl shadow-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 dark:bg-gray-800">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Periode
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Pendapatan
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Pengeluaran
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Keuntungan
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Pertumbuhan
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-600">
                {dataKeuangan.map((data, index) => (
                  <tr key={index}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                      {data.periode}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                      {data.pendapatan}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                      {data.pengeluaran}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                      {data.keuntungan}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-green-600 dark:text-green-500 font-medium">
                      {data.pertumbuhan}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Unduh Laporan */}
        <div className="text-center mt-8">
          <button className="inline-flex items-center px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors duration-300">
            <Download className="h-5 w-5 mr-2" />
            Unduh Laporan Lengkap
          </button>
        </div>
      </div>
    </section>
  );
};

export default LaporanKeuangan;
