import { v2 as cloudinary } from 'cloudinary';
import { Readable } from 'stream';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
  api_key: process.env.CLOUDINARY_API_KEY!,
  api_secret: process.env.CLOUDINARY_API_SECRET!,
});

export async function fileToBuffer(file: File) {
  const arrayBuffer = await file.arrayBuffer();
  return Buffer.from(arrayBuffer);
}

export function bufferToStream(buffer: Buffer) {
  const readable = new Readable();
  readable.push(buffer);
  readable.push(null);
  return readable;
}

export async function uploadToCloudinary(file: File, folder = 'services'): Promise<string> {
  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  // Ambil nama file asli sebagai dasar
  const originalName = file.name.split('.')[0];
  const extension = file.name.split('.').pop();
  const timestamp = Date.now();
  // Buat nama publik unik
  const publicId = `${timestamp}-${originalName}`;

  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        public_id: publicId, 
        folder,                // masih berguna agar ditaruh di foldernya
        resource_type: 'auto',
      },
      (error, result) => {
        if (error) return reject(error);
        resolve(result?.secure_url || '');
      }
    );

    // Convert buffer ke stream
    const readable = new Readable();
    readable.push(buffer);
    readable.push(null);
    readable.pipe(uploadStream);
  });
}

export async function deleteFromCloudinary(url: string): Promise<{ result: string }> {
  
  try {
    // Contoh URL Cloudinary:
    // https://res.cloudinary.com/<cloud_name>/image/upload/v1234/folder/subfolder/fileName.jpg
    console.log("mencoba menghapus gambar dengan url:", url);
    // 1. Ambil path setelah "/upload/"
    const withoutBase = url.split('/upload/')[1]; // v1234/folder/.../fileName.jpg

    // 2. Hilangkan versi (v1234)
    const pathParts = withoutBase.split('/');
    const withoutVersion = pathParts[0].startsWith('v')
      ? pathParts.slice(1)
      : pathParts;

    // 3. Ambil nama file tanpa ekstensi
    const fileWithExt = withoutVersion[withoutVersion.length - 1];
    const fileNameOnly = fileWithExt.split('.')[0];

    let publicId = '';
    // 4. Satukan folder + fileNameOnly
    if (withoutVersion.length > 1) {
      // Ada folder
      const folderPath = withoutVersion.slice(0, -1).join('/');
      publicId = `${folderPath}/${fileNameOnly}`;
    }else{
      // Tidak ada folder, hanya file di root
      publicId = fileNameOnly;
    }

    // mulai penghapusan
    const res = await cloudinary.uploader.destroy(publicId);
    console.log('Cloudinary deletion response:', res);
    return res;
  } catch (error) {
    throw error;
  }
}

export default cloudinary;
