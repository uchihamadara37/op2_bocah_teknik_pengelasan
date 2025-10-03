'use client';

import { useState, useEffect, FormEvent } from 'react';
import { useAuth } from '@/lib/useAuth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { toast } from 'react-hot-toast';
import { Loader2, UploadCloud, X } from 'lucide-react';
import { cn } from '@/lib/utils';

// Tipe data untuk form
export interface ServiceFormData {
    id?: string;
    slug: string;
    title: string;
    description: string;
    longDescription: string;
    images: (File | string)[]; // Bisa berupa File baru atau URL string yang sudah ada
    imageUrlEdited?: string[]; // URL gambar yang masih dipertahankan saat edit
}

// Tipe props untuk komponen
interface ServiceFormProps {
    onSuccess: () => void;
    initialData?: ServiceFormData | null;
}

export default function ServiceForm({ onSuccess, initialData }: ServiceFormProps) {
    const { token } = useAuth();
    const [service, setService] = useState<ServiceFormData>({
        slug: '',
        title: '',
        description: '',
        longDescription: '',
        images: [],
        imageUrlEdited: [],
    });
    const [isLoading, setIsLoading] = useState(false);
    const [isEditMode, setIsEditMode] = useState(!!initialData && initialData.slug != '');
    const [dragActive, setDragActive] = useState(false);

    // Efek untuk mengisi form saat mode edit
    useEffect(() => {
        if (initialData && initialData.slug != '') {
            setService({
                id: initialData.id,
                slug: initialData.slug || '',
                title: initialData.title || '',
                description: initialData.description || '',
                longDescription: initialData.longDescription || '',
                images: [],
                imageUrlEdited: initialData.images as string[] || [],
            });
            setIsEditMode(true);
        } else {
            // Reset form ke keadaan awal
            setService({ slug: '', title: '', description: '', longDescription: '', images: [], imageUrlEdited: [] });
            setIsEditMode(false);
        }
    }, [initialData, setIsEditMode]);

    const clearForm = () => {
        onSuccess(); // Ini akan mengatur selectedService di parent menjadi null, yang memicu useEffect
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        if (name === 'slug') {
            // Hanya izinkan karakter alfanumerik, strip, dan underscore untuk slug
            const formattedValue = value.toLowerCase().replace(/[^a-z0-9-_]/g, '');
            setService(prev => ({ ...prev, [name]: formattedValue }));
        } else {
            setService(prev => ({ ...prev, [name]: value }));
        }
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setService(prev => ({ ...prev, images: [...prev.images, ...Array.from(e.target.files!)] }));
        }
    };

    const removeImage = (indexToRemove: number) => {
        setService(prev => ({
            ...prev,
            images: prev.images.filter((_, index) => index !== indexToRemove)
        }));
    };

    const removeImageEdited = (indexToRemove: number) => {
        setService(prev => ({
            ...prev,
            imageUrlEdited: prev.imageUrlEdited?.filter((_, index) => index !== indexToRemove)
        }));
    }
    const handleDrag = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === "dragenter" || e.type === "dragover") {
            setDragActive(true);
        } else if (e.type === "dragleave") {
            setDragActive(false);
        }
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            setService(prev => ({ ...prev, images: [...prev.images, ...Array.from(e.dataTransfer.files)] }));
        }
    };

    // Fungsi untuk mengirim data ke backend
    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        if (!token) {
            toast.error('Anda harus login untuk melakukan aksi ini.');
            return;
        }
        setIsLoading(true);

        const formData = new FormData();
        formData.append('slug', service.slug);
        formData.append('title', service.title);
        formData.append('description', service.description);
        formData.append('longDescription', service.longDescription);

        service.images.forEach(image => {
            if (image instanceof File) {
                formData.append('images', image);
            }
        });

        try {
            if (isEditMode) {
                if (!service.slug) {
                    toast.error('Slug tidak ditemukan untuk proses update.');
                    throw new Error("Slug tidak ditemukan untuk proses update.");
                }

                // 1. Pisahkan URL gambar yang sudah ada dan file gambar yang baru
                // const newImageFiles = service.images.filter(
                //     (img): img is File => img instanceof File
                // );

                service.imageUrlEdited?.forEach(url => {
                    formData.append('imageUrlEdited', url);
                });

                const response = await fetch(`/api/services/${service.slug}`, {
                    method: 'PUT',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                    body: formData,
                });

                const result = await response.json();
                if (!response.ok) {
                    toast.error(result.error || 'Gagal memperbarui layanan');
                    throw new Error(result.error || 'Gagal memperbarui layanan');
                }
                toast.success('Layanan berhasil diperbarui!');
                // --- LOGIKA UPDATE (PUT) SELESAI ---
            } else {
                // Logika untuk CREATE (POST)
                const response = await fetch('/api/services', {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                    body: formData,
                });

                const result = await response.json();
                if (!response.ok) {
                    throw new Error(result.error || 'Terjadi kesalahan pada server');
                }
                toast.success('Layanan berhasil ditambahkan!');
            }

            onSuccess(); // Memanggil fungsi dari parent untuk refresh & reset
        } catch (error: unknown) {
            toast.error(`Gagal menyimpan layanan: ${error}`);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6" onDragEnter={handleDrag}>
            <div>
                <Label htmlFor="slug" className='mb-2 font-semibold'>Slug (untuk URL, cth: pagar-besi)</Label>
                <Input id="slug" className='border border-slate-500' name="slug" value={service.slug} onChange={handleInputChange} required disabled={isEditMode} />
                {isEditMode && <p className="text-xs text-muted-foreground mt-1">Slug tidak dapat diubah saat mengedit.</p>}
            </div>
            <div>
                <Label htmlFor="title" className='mb-2 font-semibold'>Judul Layanan</Label>
                <Input id="title" className='border border-slate-500' name="title" value={service.title} onChange={handleInputChange} required />
            </div>
            <div>
                <Label htmlFor="description" className='mb-2 font-semibold'>Deskripsi Singkat</Label>
                <Textarea id="description" className='border border-slate-500' name="description" value={service.description} onChange={handleInputChange} />
            </div>
            <div>
                <Label htmlFor="longDescription" className='mb-2 font-semibold'>Deskripsi Panjang</Label>
                <Textarea id="longDescription" className='border border-slate-500' name="longDescription" value={service.longDescription} onChange={handleInputChange} rows={5} />
            </div>
            <div>
                <Label htmlFor="images" className='mb-2 font-semibold'>Upload Gambar</Label>
                <Label
                    htmlFor="images"
                    className={`mt-2 flex justify-center w-full rounded-md border-2 border-dashed px-6 pt-5 pb-6 transition-colors ${dragActive ? "border-lime-400 bg-lime-50" : "border-gray-300 hover:border-lime-400"}`}
                >
                    <div className="space-y-1 text-center">
                        <UploadCloud className="mx-auto h-12 w-12 text-gray-400" />
                        <div className="flex text-sm text-gray-600">
                            <p className="relative cursor-pointer rounded-md bg-white font-medium text-lime-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-lime-500 focus-within:ring-offset-2 hover:text-lime-500">
                                <span>Upload a file</span>
                            </p>
                            <p className="pl-1">or drag and drop</p>
                        </div>
                        <p className="text-xs text-gray-500">File gambar up to 10MB</p>
                    </div>
                </Label>
                <Input
                    id="images"
                    name="images"
                    type="file"
                    multiple
                    onChange={handleFileChange}
                    accept="image/*"
                    className="sr-only" // 1. Sembunyikan input asli
                />
                <div className="mt-4 flex flex-wrap gap-2">
                    {service.imageUrlEdited && service.imageUrlEdited.length > 0 &&
                        service.imageUrlEdited.map((image, index) => (
                            <div key={index} className="relative group">
                                <img
                                    src={image}
                                    alt={`preview ${index}`}
                                    className="h-20 w-20 rounded object-cover"
                                    onLoad={undefined}
                                />
                                <X onClick={() => removeImageEdited(index)} className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full h-5 w-5 p-1" />
                            </div>
                        ))
                        // cek sementara urlnya
                    }
                    {/* {service.imageUrlEdited?.map((url, idx) => (
                        <div className="" key={idx}>
                            <p>{url}</p>
                        </div>
                    ))} */}
                    {service.images && service.images.length > 0 &&
                        service.images.map((image, index) => (
                            <div key={index} className="relative group">
                                <img
                                    src={image instanceof File ? URL.createObjectURL(image) : image}
                                    alt={`preview ${index}`}
                                    className="h-20 w-20 rounded object-cover"
                                    onLoad={image instanceof File ? () => URL.revokeObjectURL(image.name) : undefined}
                                />
                                <X onClick={() => removeImage(index)} className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full h-5 w-5 p-1" />
                            </div>
                        ))}
                </div>
            </div>
            <div className="flex items-center gap-4 pt-2">
                <Button type="submit" disabled={isLoading} className={cn(" text-black font-semibold",
                    isEditMode ? "bg-blue-400 hover:bg-blue-500" : "bg-lime-400 hover:bg-lime-500"
                )}>
                    {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    {isEditMode ? 'Update Layanan' : 'Tambah Layanan Baru'}
                </Button>
                {isEditMode ? (
                    <Button type="button" variant="outline" onClick={onSuccess}>Batal</Button>
                ) : (
                    <Button type="button" variant="secondary" onClick={clearForm}>Clear</Button>
                )}
            </div>
            { dragActive && <div className="absolute w-full h-full top-0 left-0" onDragEnter={handleDrag} onDragLeave={handleDrag} onDragOver={handleDrag} onDrop={handleDrop}></div> }
        </form>
    );
}
