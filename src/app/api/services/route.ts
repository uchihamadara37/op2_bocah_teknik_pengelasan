import cloudinary, { bufferToStream, fileToBuffer, uploadToCloudinary } from '@/lib/cloudinary';
import { db, ServiceFirestore, auth as adminAuth } from '@/lib/firebaseBackend/firebaseAdmin';
import { NextRequest, NextResponse } from 'next/server';

// GET /api/services → Ambil semua layanan
export async function GET(req: NextRequest) {
    try {
        
        // Ambil query params: page & data_count
        const { searchParams } = new URL(req.url);

        const page = parseInt(searchParams.get('page') || '1', 10);
        const dataCount = parseInt(searchParams.get('data_count') || "30", 10);

        if (page < 1 || dataCount < 1) {
            return NextResponse.json(
                { error: 'Invalid page or data_count parameter' },
                { status: 400 }
            );
        }

        // Ambil semua dokumen dulu (untuk total count)
        const snapshot = await db.collection('services').get();
        const totalData = snapshot.size;

        // Hitung pagination
        const lastPage = Math.ceil(totalData / dataCount);
        const offset = (page - 1) * dataCount;

        // Ambil data terbatas sesuai halaman
        const limitedSnapshot = await db
            .collection('services')
            .orderBy('slug')
            .offset(offset)
            .limit(dataCount)
            .get();

        const services = limitedSnapshot.docs.map((doc) => doc.data());

        const response = {
            metadata: {
                total_data: totalData,
                page,
                data_count: dataCount,
                first_page: 1,
                last_page: lastPage,
            },
            data: services,
        };

        return NextResponse.json(response);
    } catch (error) {
        console.error('Error fetching services:', error);
        return NextResponse.json(
            { error: 'Failed to fetch services' },
            { status: 500 }
        );
    }
}

// POST /api/services → Tambah layanan baru
export async function POST(req: NextRequest) {
    console.log('Received POST request to /api/services');
    try {
        const formData = await req.formData();

        const slug = formData.get('slug') as string;
        const title = formData.get('title') as string;
        const description = formData.get('description') as string;
        const longDescription = formData.get('longDescription') as string;
        const files = formData.getAll('images') as File[];

        if (!slug || !title) {
            return NextResponse.json(
                { error: 'Slug is required' },
                { status: 400 }
            );
        }
        if (slug.includes(' ')) {
            return NextResponse.json(
                { error: 'Slug cannot contain spaces' },
                { status: 400 }
            );
        }
        if (slug) {
            const existingDoc = await db.collection('services').doc(slug).get();
            if (existingDoc.exists) {
                return NextResponse.json(
                    { error: 'That service slug already exists' },
                    { status: 400 }
                );
            }
        }

        // sementara simpan gambar di array kosong
        const images: string[] = [];
        for (const file of files) {
            const url = await uploadToCloudinary(file); // folder default 'services'
            images.push(url);
        }

        const data = {
            slug,
            title,
            description,
            longDescription,
            images,
        };

        console.log('Creating service with slug:', slug);
        await db
            .collection('services')
            .doc(slug)
            .set(data);
        return NextResponse.json({ success: true });
    } catch (error) {
        console.log('Error creating service:', error);
        return NextResponse.json(
            { error: 'Failed to create service' },
            { status: 500 }
        );
    }
}
