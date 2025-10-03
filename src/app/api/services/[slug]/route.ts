import { deleteFromCloudinary, uploadToCloudinary } from '@/lib/cloudinary';
import { db, ServiceFirestore } from '@/lib/firebaseBackend/firebaseAdmin';
import { NextRequest, NextResponse } from 'next/server';

// GET /api/services/[slug]
export async function GET(
  req: NextRequest,
  context: { params: Promise<{ slug: string; }> }
) {
  try {
    const { slug } = await context.params;
    const doc = await db.collection('services').doc(slug).get();

    if (!doc.exists) {
      return NextResponse.json(
        { error: 'Service not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ id: doc.id, ...doc.data() });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch service' },
      { status: 500 }
    );
  }
}

// PUT /api/services/[slug]
export async function PUT(
  req: NextRequest,
  context: { params: Promise<{ slug: string; }>; }
) {
  const { slug } = await context.params;

  try {
    // Cek apakah dokumen ada
    const docRef = db.collection('services').doc(slug);
    const docSnap = await docRef.get();

    if (!docSnap.exists) {
      return NextResponse.json({ error: 'Service you want to edit not found' }, { status: 404 });
    }

    const formData = await req.formData();
    const title = formData.get('title') as string | null;
    const description = formData.get('description') as string | null;
    const longDescription = formData.get('longDescription') as string | null;
    const imageUrlEdited = formData.getAll('imageUrlEdited') as string[] || []; // Bisa berupa URL string atau kosong array

    // Ambil data lama dari Firestore
    const existingData = docSnap.data() as ServiceFirestore;
    const existingImageUrls: string[] = existingData.images || [];
    const imageUrlEditedToDelete: string[] = existingImageUrls.filter(url => !imageUrlEdited.includes(url));

    // Hapus gambar yang sudah tidak ada di edit form dari Cloudinary
    for (const url of imageUrlEditedToDelete) {
      await deleteFromCloudinary(url);
    }

    // Cek apakah ada file gambar baru yang diupload
    const newFiles = formData.getAll('images') as File[];
    const hasNewImages = newFiles && newFiles.length > 0 && newFiles[0].size > 0;

    let newImageUrls: string[] = [];
    if (hasNewImages) {
      const uploadedUrls = [];
      for (const file of newFiles) {
        const url = await uploadToCloudinary(file);
        uploadedUrls.push(url);
      }
      newImageUrls = uploadedUrls;
    }

    await docRef.update({
      title: title ?? existingData.title,
      description: description ?? existingData.description,
      longDescriptionHtml: longDescription ?? existingData.longDescription,
      images: imageUrlEdited.concat(newImageUrls),
    });

    return NextResponse.json({ message: 'Service updated successfully' });
  } catch (error: unknown) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to update service' }, { status: 500 });
  }
}

// DELETE /api/services/[slug]
export async function DELETE(
  req: NextRequest,
  context: { params: Promise<{ slug: string; }>; }
) {
  const { slug } = await context.params;

  try {
    const docRef = db.collection('services').doc(slug);
    const docSnap = await docRef.get();

    if (!docSnap.exists) {
      return NextResponse.json({ error: 'Service not found' }, { status: 404 });
    }

    const data = docSnap.data() as ServiceFirestore;
    const images = data.images || [];

    for (const url of images) {
      await deleteFromCloudinary(url);

    }

    await docRef.delete();

    return NextResponse.json({ message: 'Service deleted successfully' });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to delete service' }, { status: 500 });
  }
}
