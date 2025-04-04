'use client';

import { useState } from 'react';
import { QRCodeCanvas } from 'qrcode.react';

const QrGenerator = () => {
    const [text, setText] = useState<string>('');

    return (
        <div className='flex flex-col items-center gap-4 p-4'>
            <input 
                type="text" 
                placeholder = "Enter text or URL"
                value={text}
                onChange={(e) => setText(e.target.value)}
                className='p-2 border rounded w-80 text-center'
            />
            {text && <QRCodeCanvas value={text} size={200} />}
        </div>
    )
}

export default QrGenerator;