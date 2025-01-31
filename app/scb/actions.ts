export default async function getQRtext() {
  const requestUId = '1b01dffa-b3a3-4567-adde-cd9ed73c8b6d'; // ใช้ UUID ที่เหมาะสม

  const response = await fetch('https://api-sandbox.partners.scb/partners/sandbox/v1/payment/qrcode/create', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'accept-language': 'EN',
      authorization: `Bearer ${process.env.SCB_ACCESS_TOKEN}`,
      requestUId,
      resourceOwnerId: `${process.env.SCB_API_KEY}`,
    },
    body: JSON.stringify({
      "qrType": "PP",
      "ppType": "BILLERID",
      "ppId": "024515439173976",
      "amount": "100.00",
      "ref1": "111",
      "ref2": "222",
      "ref3": "SCB"
    }),
  });

  const data = await response.json();
  // console.log(data);
  return data;

}