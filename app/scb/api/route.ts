import { NextResponse } from 'next/server';

type CreateQrCodeRequest = {
  qrType: string;
  ppType: string;
  ppId: string;
  amount: string;
  ref1: string;
  ref2: string;
  ref3: string;
};

export async function POST(request: Request) {
  const body: CreateQrCodeRequest = await request.json();

  const requestUId = '1b01dffa-b3a3-4567-adde-cd9dd73c8b6d'; // ใช้ UUID ที่เหมาะสม

  try {
    const response = await fetch(
      'https://api-sandbox.partners.scb/partners/sandbox/v1/payment/qrcode/create',
      // 'https://api-sandbox.partners.scb/partners/sandbox/v1/oauth/token',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'accept-language': 'EN',
          authorization: `Bearer ${process.env.SCB_ACCESS_TOKEN}`,
          requestUId,
          resourceOwnerId: `${process.env.SCB_API_KEY}`,
        },
        body: JSON.stringify(body),
      }
    );

    const data = await response.json();
// console.log(data);
    if (!response.ok) {
      return NextResponse.json(
        { statusCode: response.status.toString(), statusMessage: data.statusMessage || 'Error' },
        { status: response.status }
      );
    }

    return NextResponse.json({
      statusCode: '200',
      statusMessage: 'Success',
      data,
    });
  } catch (error: any) {
    return NextResponse.json(
      { statusCode: '500', statusMessage: error.message || 'Internal Server Error' },
      { status: 500 }
    );
  }
}
