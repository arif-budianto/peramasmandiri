import { useState, useEffect } from "react";
import { Plus, X, Loader, Copy, Check } from "lucide-react";
import { supabase } from "../lib/supabase";
import { useAuth } from "../contexts/AuthContext";
import toast from "react-hot-toast";

interface MediaManagerProps {
  kategori: "tenda" | "combine" | "internet";
  onClose: () => void;
}

interface MediaItem {
  id: string;
  url: string;
  type: "image" | "video";
  caption: string;
  created_at: string;
}

const MediaManager = ({ kategori, onClose }: MediaManagerProps) => {
  const { user } = useAuth();
  const [isUploading, setIsUploading] = useState(false);
  const [media, setMedia] = useState<MediaItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedMedia, setSelectedMedia] = useState<MediaItem | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [fileName, setFileName] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  useEffect(() => {
    fetchMedia();
  }, [kategori]);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validasi ukuran file (50MB)
    if (file.size > 50 * 1024 * 1024) {
      toast.error("Ukuran file terlalu besar. Maksimal 50MB");
      event.target.value = '';
      setSelectedFile(null);
      return;
    }

    // Validasi tipe file
    if (!file.type.startsWith("image/") && !file.type.startsWith("video/")) {
      toast.error("Format file tidak didukung");
      event.target.value = '';
      setSelectedFile(null);
      return;
    }

    setSelectedFile(file);
    // Set nama file default dari file yang dipilih
    if (!fileName) {
      setFileName(file.name.split('.')[0]);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile || !fileName.trim()) {
      toast.error("Mohon isi nama file dan pilih file yang akan diupload");
      return;
    }

    setIsUploading(true);

    try {
      // Upload file ke storage
      const fileExt = selectedFile.name.split(".").pop();
      const safeFileName = fileName.replace(/[^a-z0-9]/gi, '-').toLowerCase();
      const filePath = `${kategori}/${safeFileName}-${Date.now()}.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from("galeri")
        .upload(filePath, selectedFile, {
          cacheControl: "3600",
          upsert: false,
        });

      if (uploadError) throw uploadError;

      // Dapatkan public URL
      const {
        data: { publicUrl },
      } = supabase.storage.from("galeri").getPublicUrl(filePath);

      // Simpan data ke database
      const { error: dbError } = await supabase.from("galeri").insert([
        {
          url: publicUrl,
          kategori,
          type: selectedFile.type.startsWith("image/") ? "image" : "video",
          caption: fileName,
          created_at: new Date().toISOString(),
        },
      ]);

      if (dbError) throw dbError;

      toast.success("Media berhasil diupload!");
      fetchMedia();
    } catch (error: any) {
      toast.error("Gagal mengupload media: " + error.message);
    } finally {
      setIsUploading(false);
      setSelectedFile(null);
      setFileName('');
    }
  };

  const fetchMedia = async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from("galeri")
        .select("*")
        .eq("kategori", kategori)
        .order("created_at", { ascending: false });

      if (error) throw error;
      setMedia(data || []);
    } catch (error: any) {
      toast.error("Gagal memuat media: " + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEditCaption = async (id: string, currentCaption: string) => {
    const newCaption = window.prompt("Masukkan caption baru:", currentCaption);
    if (!newCaption || newCaption === currentCaption) return;

    try {
      const { error } = await supabase
        .from("galeri")
        .update({ caption: newCaption })
        .eq("id", id);

      if (error) throw error;

      toast.success("Caption berhasil diperbarui!");
      fetchMedia();
    } catch (error: any) {
      toast.error("Gagal memperbarui caption: " + error.message);
    }
  };

  const handleDelete = async (id: string, url: string) => {
    if (!window.confirm("Apakah Anda yakin ingin menghapus media ini?")) return;

    try {
      // Hapus file dari storage
      const filePath = url.split("/").slice(-2).join("/");
      const { error: storageError } = await supabase.storage
        .from("galeri")
        .remove([filePath]);

      if (storageError) throw storageError;

      // Hapus data dari database
      const { error: dbError } = await supabase
        .from("galeri")
        .delete()
        .eq("id", id);

      if (dbError) throw dbError;

      toast.success("Media berhasil dihapus!");
      fetchMedia();
    } catch (error: any) {
      toast.error("Gagal menghapus media: " + error.message);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      {selectedMedia && (
        <div
          className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 animate-fade-in"
          onClick={() => setSelectedMedia(null)}
        >
          <div className="relative max-w-[90vw] max-h-[90vh] animate-scale-in bg-white dark:bg-gray-800 p-4 rounded-xl shadow-2xl">
            <div className="relative">
              {selectedMedia.type === "image" ? (
                <img
                  src={selectedMedia.url}
                  alt={selectedMedia.caption}
                  className="max-w-full max-h-[90vh] object-contain"
                />
              ) : (
                <video
                  src={selectedMedia.url}
                  controls
                  className="max-w-full max-h-[90vh] object-contain"
                />
              )}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedMedia(null);
                }}
                className="absolute top-4 right-4 p-2 bg-white dark:bg-gray-800 rounded-full text-gray-800 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>
      )}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
            {kategori === "tenda" && "Media Tenda & Kursi"}
            {kategori === "combine" && "Media Combine Harvester"}
            {kategori === "internet" && "Media Layanan Internet"}
          </h3>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {user && (
          <div className="mb-6 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <div className="mb-4">
              <label htmlFor="fileName" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Nama File
              </label>
              <input
                type="text"
                id="fileName"
                value={fileName}
                onChange={(e) => setFileName(e.target.value)}
                placeholder="Masukkan nama file"
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
              />
            </div>

            <div className="flex items-center gap-4">
              <div className="flex-1">
                <label className="flex items-center justify-center w-full h-32 px-4 transition bg-white dark:bg-gray-800 border-2 border-gray-300 dark:border-gray-600 border-dashed rounded-md appearance-none cursor-pointer hover:border-green-500 dark:hover:border-green-500">
                  {isUploading ? (
                    <div className="flex items-center text-gray-500 dark:text-gray-400">
                      <Loader className="w-6 h-6 animate-spin" />
                      <span className="ml-2">Mengupload...</span>
                    </div>
                  ) : (
                    <div className="flex items-center text-gray-500 dark:text-gray-400">
                      <Plus className="w-6 h-6" />
                      <span className="ml-2">{selectedFile ? selectedFile.name : 'Pilih File'}</span>
                    </div>
                  )}
                  <input
                    type="file"
                    className="hidden"
                    onChange={handleFileSelect}
                    accept="image/*,video/*"
                    disabled={isUploading}
                  />
                </label>
              </div>
              <button
                onClick={handleUpload}
                disabled={isUploading || !selectedFile || !fileName.trim()}
                className={`px-4 py-2 h-12 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 ${isUploading || !selectedFile || !fileName.trim() ? 'bg-gray-400 cursor-not-allowed' : 'bg-green-600 hover:bg-green-700 focus:ring-green-500'} text-white`}
              >
                {isUploading ? 'Mengupload...' : 'Upload'}
              </button>
            </div>
          </div>
        )}

        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-16 space-y-4">
            <Loader className="w-12 h-12 animate-spin text-green-600" />
            <p className="text-gray-600 dark:text-gray-400">Memuat media...</p>
          </div>
        ) : media.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 space-y-4">
            <div className="text-gray-400 dark:text-gray-500">
              <Plus className="w-16 h-16" />
            </div>
            <p className="text-gray-600 dark:text-gray-400 text-lg">
              Belum ada media untuk kategori ini
            </p>
            {user && (
              <p className="text-gray-500 dark:text-gray-400 text-sm">
                Klik tombol Upload Media untuk menambahkan
              </p>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {media.map((item) => (
              <div key={item.id} className="relative group">
                <div
                  onClick={() => setSelectedMedia(item)}
                  className="cursor-pointer transition-all duration-300 transform hover:scale-105 hover:shadow-lg rounded-lg overflow-hidden group relative"
                >
                  {item.type === "image" ? (
                    <img
                      src={item.url}
                      alt={item.caption}
                      className="w-full h-48 object-cover rounded-lg"
                    />
                  ) : (
                    <video
                      src={item.url}
                      controls
                      className="w-full h-48 object-cover rounded-lg"
                    />
                  )}
                </div>
                <div className="mt-2 space-y-1">
                  <p
                    className="text-sm text-gray-600 dark:text-gray-400 cursor-pointer hover:text-green-600 dark:hover:text-green-500"
                    onClick={() =>
                      user && handleEditCaption(item.id, item.caption || "")
                    }
                    title={user ? "Klik untuk mengedit caption" : undefined}
                  >
                    {item.caption || "Tambahkan caption..."}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      {new Date(item.created_at).toLocaleDateString("id-ID", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </span>
                    <button
                      onClick={() => {
                        navigator.clipboard.writeText(item.url);
                        setCopiedId(item.id);
                        setTimeout(() => setCopiedId(null), 2000);
                        toast.success("URL berhasil disalin!");
                      }}
                      className="p-1 text-gray-500 hover:text-green-600 dark:text-gray-400 dark:hover:text-green-500"
                      title="Salin URL media"
                    >
                      {copiedId === item.id ? (
                        <Check className="w-4 h-4" />
                      ) : (
                        <Copy className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                </div>
                {user && (
                  <button
                    onClick={() => handleDelete(item.id, item.url)}
                    className="absolute top-2 right-2 p-2 bg-red-600 text-white rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 transform hover:scale-110 hover:bg-red-700 z-10"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export { MediaManager };
