import { useState } from 'react';
import { Dialog } from '@headlessui/react';
import { X } from 'lucide-react';
import { supabase } from '../lib/supabase';
import toast from 'react-hot-toast';

interface BeritaFormProps {
  isOpen: boolean;
  onClose: () => void;
  beritaToEdit?: {
    id: string;
    judul: string;
    ringkasan: string;
    isi: string;
    kategori: 'berita' | 'pengumuman';
    gambar?: string;
  };
}

const BeritaForm = ({ isOpen, onClose, beritaToEdit }: BeritaFormProps) => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    judul: beritaToEdit?.judul || '',
    ringkasan: beritaToEdit?.ringkasan || '',
    isi: beritaToEdit?.isi || '',
    kategori: beritaToEdit?.kategori || 'berita',
    gambar: beritaToEdit?.gambar || '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const fileInput = document.getElementById('gambar') as HTMLInputElement;
      let gambarUrl = formData.gambar;

      if (fileInput.files && fileInput.files[0]) {
        const file = fileInput.files[0];
        const fileExt = file.name.split('.').pop();
        const fileName = `${Math.random()}.${fileExt}`;
        const filePath = `berita/${fileName}`;

        const { error: uploadError } = await supabase.storage
          .from('media')
          .upload(filePath, file);

        if (uploadError) throw uploadError;

        gambarUrl = supabase.storage.from('media').getPublicUrl(filePath).data.publicUrl;
      }

      console.log('Submitting form data:', formData); // Debug log

      // Validasi data sebelum dikirim
      if (!formData.judul.trim()) {
        throw new Error('Judul harus diisi');
      }

      const now = new Date().toISOString();
      const beritaData: any = {
        judul: formData.judul.trim(),
        ringkasan: formData.ringkasan.trim(),
        isi: formData.isi.split('\n').map(para => para.trim()).filter(para => para.length > 0).map(para => `<p>${para}</p>`).join('\n'),
        kategori: formData.kategori as 'berita' | 'pengumuman',
        gambar: gambarUrl || '',
        updated_at: now
      };

      // Hanya tambahkan created_at untuk data baru
      if (!beritaToEdit) {
        beritaData.created_at = now;
      }

      console.log('Prepared data for Supabase:', beritaData); // Debug log

      console.log('Sending data to Supabase:', beritaData);
      
      const { data, error } = beritaToEdit
        ? await supabase
            .from('berita')
            .update(beritaData)
            .eq('id', beritaToEdit.id)
            .select()
        : await supabase
            .from('berita')
            .insert([beritaData])
            .select();

      if (error) {
        console.error('Supabase error:', error);
        throw error;
      }

      console.log('Supabase response data:', data); // Debug log

      if (error) {
        console.error('Error saving berita:', error); // Untuk debugging
        throw error;
      }

      console.log('Saved data:', data); // Untuk debugging
      toast.success(beritaToEdit ? 'Berita berhasil diperbarui!' : 'Berita berhasil ditambahkan!');
      onClose();
      window.location.reload(); // Refresh halaman untuk memuat data terbaru

      onClose();
    } catch (error: any) {
      toast.error(error.message || 'Terjadi kesalahan');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />

      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="mx-auto max-w-2xl rounded-lg bg-white dark:bg-gray-800 p-6 w-full">
          <div className="flex justify-between items-center mb-4">
            <Dialog.Title className="text-lg font-medium text-gray-900 dark:text-white">
              {beritaToEdit ? 'Edit Berita' : 'Tambah Berita'}
            </Dialog.Title>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Judul
              </label>
              <input
                type="text"
                value={formData.judul}
                onChange={(e) => setFormData({ ...formData, judul: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Kategori
              </label>
              <select
                value={formData.kategori}
                onChange={(e) => setFormData({ ...formData, kategori: e.target.value as 'berita' | 'pengumuman' })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              >
                <option value="berita">Berita</option>
                <option value="pengumuman">Pengumuman</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Ringkasan
              </label>
              <textarea
                value={formData.ringkasan}
                onChange={(e) => setFormData({ ...formData, ringkasan: e.target.value })}
                rows={3}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Isi
              </label>
              <textarea
                value={formData.isi}
                onChange={(e) => setFormData({ ...formData, isi: e.target.value })}
                rows={6}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Gambar
              </label>
              <input
                type="file"
                id="gambar"
                accept="image/*"
                className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-green-50 file:text-green-700 hover:file:bg-green-100 dark:text-gray-400 dark:file:bg-gray-700 dark:file:text-gray-300"
              />
            </div>

            <div className="flex justify-end space-x-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
              >
                Batal
              </button>
              <button
                type="submit"
                disabled={loading}
                className="px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Menyimpan...' : 'Simpan'}
              </button>
            </div>
          </form>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};

export default BeritaForm;
