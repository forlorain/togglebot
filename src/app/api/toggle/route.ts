import { NextResponse } from 'next/server';
import { updateInstagramBio } from '@/lib/instagram';

export async function POST(request: Request) {
  try {
    const { targetBio } = await request.json();
    
    const bioContent = targetBio === 'A' 
      ? process.env.BIO_A 
      : process.env.BIO_B;

    const someString: string = bioContent ?? 'valeur par défaut';

    await updateInstagramBio(someString);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Erreur API:', error);
    return NextResponse.json(
      { error: 'Échec de la mise à jour de la bio' },
      { status: 500 }
    );
  }
}