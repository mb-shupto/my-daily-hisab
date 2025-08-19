import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';
import { bkashConfig } from '@/config/bkashConfig';

interface Debt {
  id: string;
  person: string;
  amount: number;
  isOwedToUser: boolean;
  date: string;
  paid?: boolean;
}
export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const paymentID = url.searchParams.get('paymentID');
  const status = url.searchParams.get('status');

  if (status === 'success' && paymentID) {
    try {
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

      // Step 2: Execute Payment
      const executeResponse = await axios.post(
        `${bkashConfig.baseUrl}checkout/execute`,
        { paymentID },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
            username: bkashConfig.username,
            password: bkashConfig.password,
          },
        }
      );

      if (executeResponse.data.statusCode === '0000') {
        // Update debt status in localStorage (mark as paid)
        const debts = JSON.parse(localStorage.getItem('debts') || '[]');
        const updatedDebts = debts.map((debt: Debt) =>
          debt.id === paymentID ? { ...debt, paid: true } : debt
        );
        localStorage.setItem('debts', JSON.stringify(updatedDebts));

        return NextResponse.json({ success: true, message: 'Payment successful' });
      }
    } catch (error) {
      console.error('Payment execution error:', error);
      return NextResponse.json({ error: 'Payment execution failed' }, { status: 500 });
    }
  }

  return NextResponse.json({ error: 'Invalid payment status' }, { status: 400 });
}
