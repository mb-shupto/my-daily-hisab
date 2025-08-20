
import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';
import { bkashConfig } from '@/config/bkashConfig';

export async function POST(req: NextRequest) {
  const { amount, debtId } = await req.json();

  try {
    console.log('Attempting to get access token with config:', bkashConfig);
    // Step 1: Get Access Token
    const authResponse = await axios.post(
      `${bkashConfig.baseUrl}checkout/token/grant`,
      `grant_type=client_credentials&scope=storefront`,
      {
        headers: {
          username: bkashConfig.username,
          password: bkashConfig.password,
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      }
    );

    const accessToken = authResponse.data.id_token;
    console.log('Access token obtained:', accessToken);

    // Step 2: Create Payment
    const paymentResponse = await axios.post(
      `${bkashConfig.baseUrl}checkout/create`,
      {
        amount,
        currency: 'BDT',
        intent: 'sale',
        merchantInvoiceNumber: `INV-${debtId}-${Date.now()}`,
        callbackURL: bkashConfig.callbackUrl,
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
          username: bkashConfig.username,
          password: bkashConfig.password,
        },
      }
    );

    console.log('Payment created successfully:', paymentResponse.data);
    const paymentURL = paymentResponse.data.bkashURL;

    return NextResponse.json({ paymentURL });
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error('Payment creation error:', {
        message: error.message,
      });
    } else {
      console.error('Payment creation error:', error);
    }
    return NextResponse.json({ error: 'Failed to create payment' }, { status: 500 });
  }
}