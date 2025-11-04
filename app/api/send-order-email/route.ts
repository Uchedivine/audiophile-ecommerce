import { Resend } from 'resend';
import { NextResponse } from 'next/server';
import { OrderConfirmationEmail } from '@/lib/email-template';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      email,
      customerName,
      orderId,
      items,
      subtotal,
      shipping,
      tax,
      total,
      shippingAddress,
    } = body;

    console.log('📧 Attempting to send email to:', email);
    console.log('📦 Order ID:', orderId);

    // Validate required fields
    if (!email || !customerName || !orderId) {
      console.error('❌ Missing required fields');
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Check if API key is configured
    if (!process.env.RESEND_API_KEY) {
      console.error('❌ RESEND_API_KEY is not configured');
      return NextResponse.json(
        { success: false, error: 'Email service not configured' },
        { status: 500 }
      );
    }

    // Send email
    const data = await resend.emails.send({
      from: 'Audiophile <onboarding@resend.dev>',
      to: [email],
      subject: `Order Confirmation - ${orderId}`,
      react: OrderConfirmationEmail({
        customerName,
        orderId,
        items,
        subtotal,
        shipping,
        tax,
        total,
        shippingAddress,
      }),
    });

    console.log('✅ Email sent successfully!');
    console.log('📨 Resend response:', data);

    return NextResponse.json({ 
      success: true, 
      data,
      message: 'Email sent successfully. Check your inbox and spam folder.' 
    });
  } catch (error: any) {
    console.error('❌ Email send error:', error);
    console.error('Error details:', error.message);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to send email',
        details: error.message 
      },
      { status: 500 }
    );
  }
}
