import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, phone, company, message } = body;

    // Basic Validation
    if (!name || !email || !message) {
      return NextResponse.json({ error: "Campos obligatorios faltantes" }, { status: 400 });
    }

    // Simple Sanitization (Anti-XSS Mock)
    const sanitize = (str: string) => str.replace(/<[^>]*>?/gm, '').trim();
    
    const leadData = {
      name: sanitize(name),
      email: sanitize(email),
      phone: phone ? sanitize(phone) : null,
      company: company ? sanitize(company) : null,
      message: sanitize(message),
      status: 'new',
      createdAt: new Date().toISOString()
    };

    // Note: In a real implementation, we would use Firebase Admin to save to Firestore
    // import { db } from '@/lib/firebase/admin';
    // await db.collection('leads').add(leadData);

    console.log('Lead Captured:', leadData);

    return NextResponse.json({ success: true, message: "Lead recibido correctamente" });
  } catch (error) {
    console.error('Lead API Error:', error);
    return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 });
  }
}