'use client'
import { useState } from 'react'
import QRCode from 'react-qr-code'

export default function Page() {
    const [qrtext, setQrtext] = useState('')
    const [error, setError] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [amount, setAmount] = useState('100.00')
    const [ref1, setRef1] = useState('111')
    const [ref2, setRef2] = useState('222')

    const createQRCode = async () => {
        try {
            setIsLoading(true)
            setError('')

            const response = await fetch('/scb/api/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    "qrType": "PP",
                    "ppType": "BILLERID",
                    "ppId": "481615343687414",
                    "amount": amount,
                    "ref1": ref1,
                    "ref2": ref2,
                    "ref3": "SCB"
                })
            })

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`)
            }

            const data = await response.json()

            if (!data.data?.data.qrRawData) {
                throw new Error('QR data not found in response')
            }

            console.log('QR Data:', data.data.data.qrRawData)
            setQrtext(data.data.data.qrRawData)

        } catch (error) {
            console.error('Error:', error)
            setError(error instanceof Error ? error.message : 'Failed to create QR code')
            setQrtext('')
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className='min-h-full w-full flex flex-col items-center justify-center gap-4 p-4'>
            <div className="w-full max-w-md space-y-4">
                <div className="space-y-2">
                    <label className="block text-sm font-medium">Amount</label>
                    <input
                        type="text"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        className="w-full px-3 py-2 border rounded-md"
                        placeholder="Enter amount"
                    />
                </div>

                <div className="space-y-2">
                    <label className="block text-sm font-medium">Reference 1</label>
                    <input
                        type="text"
                        value={ref1}
                        onChange={(e) => setRef1(e.target.value)}
                        className="w-full px-3 py-2 border rounded-md"
                        placeholder="Enter ref1"
                    />
                </div>

                <div className="space-y-2">
                    <label className="block text-sm font-medium">Reference 2</label>
                    <input
                        type="text"
                        value={ref2}
                        onChange={(e) => setRef2(e.target.value)}
                        className="w-full px-3 py-2 border rounded-md"
                        placeholder="Enter ref2"
                    />
                </div>

                <button
                    onClick={createQRCode}
                    disabled={isLoading}
                    className="w-full px-4 py-2 bg-blue-500 text-white rounded-md disabled:bg-gray-300 hover:bg-blue-600"
                >
                    {isLoading ? 'Creating...' : 'Create QR Code'}
                </button>
            </div>

            {error && (
                <div className="text-red-500 text-center">
                    {error}
                </div>
            )}

            {qrtext && (
                <div className="flex flex-col items-center gap-4">
                    <div className="text-sm break-all max-w-md bg-gray-100 p-4 rounded">
                        {qrtext}
                    </div>
                    <QRCode
                        title="GeeksForGeeks"
                        value={qrtext}
                        bgColor="#FFFFFF"
                        fgColor="#000000"
                        size={256}
                    />
                </div>
            )}
        </div>
    )
}