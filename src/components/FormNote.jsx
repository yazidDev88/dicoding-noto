import React, { useState } from 'react';
import { Card } from './Card';
import Editor from 'react-simple-wysiwyg';

export function FormNote({ onSave }) {
    const [title, setTitle] = useState('');
    const [html, setHtml] = useState('<strong>Hello World</strong> <p>Lelah banyak projek yang numpuk :(</p>');
    const [isListening, setIsListening] = useState(false);

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();

    // Set language for SpeechRecognition
    recognition.lang = 'id-ID'; // Use 'en-US' for English

    recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setHtml((prevHtml) => `${prevHtml}<p>${transcript}</p>`);
    };

    recognition.onend = () => {
        setIsListening(false);
    };

    function handleSpeechToText() {
        if (isListening) {
            recognition.stop();
        } else {
            recognition.start();
        }
        setIsListening(!isListening);
    }

    function onChange(e) {
        setHtml(e.target.value);
    }

    function handleSave() {
        if (title.trim() === '') {
            alert('Judul tidak boleh kosong!');
            return;
        }
        if (title.length > 50) {
            alert('Judul harus lebih dari 50 karakter!');
            return;
        }
        onSave({
            title,
            body: html,
            createdAt: new Date().toISOString(),
            archived: false,
        });
    }

    return (
        <>
            <Card title="Tambah Catatan" description="Buat catatan baru" header={(   <div style={{ marginTop: '10px', display: 'flex', gap: '10px' }}>
                    <button className="success" onClick={handleSave}>
                        Simpan
                    </button>
                    <button
                        className={isListening ? "danger" : "primary"}
                        onClick={handleSpeechToText}
                    >
                        {isListening ? 'Stop' : 'Speach'}
                    </button>
                </div>)}>
                <div className='search'>
                    <input
                        type="text"
                        placeholder="Masukkan judul catatan"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        style={{ width: '100%', padding: '8px', marginBottom: '10px' }}
                    />
                </div>
                <Editor value={html} onChange={onChange} />

            </Card>
        </>
    );
}
