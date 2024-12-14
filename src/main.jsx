import React, { useState, useEffect } from "react";
import { getInitialData, showFormattedDate } from "./utils";
import { Card } from './components/Card';
import { NotesList } from './components/NotesList';
import { Notes } from './components/Notes';
import { NoteDetail } from './components/NoteDetail';
import { FormNote } from './components/FormNote';

function formatText(text,maxLength = 67) {
    if (text.length > maxLength) {
        return text.slice(0, maxLength) + "...";
    }
    return text;
}

export function Main() {
    const [notes, setNotes] = useState([]);
    const [selectedNote, setSelectedNote] = useState(null);
    const [showArchived, setShowArchived] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [isAdding, setIsAdding] = useState(false);
    const [isListening, setIsListening] = useState(false);

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.lang = 'id-ID';
    recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setNotes((prevNotes) => [
            {
                id: Date.now().toString(),
                title: "Catatan Baru",
                body: `<p>${transcript}</p>`,
                createdAt: new Date().toISOString(),
                archived: false,
            },
            ...prevNotes,
        ]);
    };
    recognition.onend = () => {
        setIsListening(false);
    };

    const handleSpeechToText = () => {
        if (isListening) {
            recognition.stop();
        } else {
            recognition.start();
        }
        setIsListening(!isListening);
    };

    useEffect(() => {
        const data = getInitialData();
        setNotes(data);
    }, []);

    const handleNoteClick = (note) => {
        setSelectedNote(note);
        setIsAdding(false);
    };

    const handleArchive = (id) => {
        setNotes((prevNotes) =>
            prevNotes.map((note) =>
                note.id === id ? { ...note, archived: true } : note
            )
        );
        setSelectedNote(null);
    };

    const handleDelete = (id) => {
        setNotes((prevNotes) => prevNotes.filter((note) => note.id !== id));
        setSelectedNote(null);
    };

    const handleDeleteAll = () => {
        setNotes([]);
        setSelectedNote(null);
        alert("Semua catatan telah dihapus.");
    };

    const handleArchiveAll = () => {
        setNotes((prevNotes) =>
            prevNotes.map((note) => ({ ...note, archived: true }))
        );
        alert("Semua catatan telah diarsipkan.");
    };

    const handleSaveNote = (newNote) => {
        setNotes((prevNotes) => [
            { ...newNote, id: Date.now().toString() },
            ...prevNotes,
        ]);
        setIsAdding(false);
    };

    const filteredNotes = notes.filter((note) =>
        note.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const activeNotes = filteredNotes.filter((note) => !note.archived);
    const archivedNotes = filteredNotes.filter((note) => note.archived);

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.ctrlKey && e.shiftKey && e.key === 'D') {
                handleDeleteAll();
            } else if (e.ctrlKey && e.key === 'D') {
                if (selectedNote) handleDelete(selectedNote.id);
            } else if (e.ctrlKey && e.shiftKey && e.key === 'A') {
                handleArchiveAll();
            } else if (e.ctrlKey && e.key === 'A') {
                if (selectedNote) handleArchive(selectedNote.id);
            } else if (e.ctrlKey && e.key === 'S') {
                handleSpeechToText();
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [selectedNote, notes, isListening]);

    return (
        <div className="container">
            <NotesList>
                <Card
                    title={showArchived ? "Daftar Catatan Arsip" : "Daftar Catatan Aktif"}
                    description={showArchived ? "Catatan yang telah diarsipkan" : "Catatan yang masih aktif"}
                    header={(
                        <div className="notes-header">
                            <button className="primary" onClick={() => {
                                setShowArchived(!showArchived);
                                setIsAdding(false);
                            }}>
                                {showArchived ? "Catatan" : "Daftar Arsip"}
                            </button>
                            <button className="success" onClick={() => {
                                setIsAdding(true);
                                setSelectedNote(null);
                            }}>
                                Tambah
                            </button>
                        </div>
                    )}
                >
                    <div className="search">
                        <input
                            type="text"
                            placeholder="Cari catatan..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                    {(showArchived ? archivedNotes : activeNotes).length > 0 ? (
                        (showArchived ? archivedNotes : activeNotes).map((note) => (
                            <Notes
                                key={note.id}
                                title={note.title}
                                body={formatText(note.body)}
                                date={note.createdAt}
                                onClick={() => handleNoteClick(note)}
                            />
                        ))
                    ) : (
                        <p style={{ textAlign: "center", color: "#888" }}>
                            Tidak ada catatan ditemukan.
                        </p>
                    )}
                </Card>
            </NotesList>

            {isAdding ? (
                <FormNote onSave={handleSaveNote} />
            ) : selectedNote ? (
                <NoteDetail
                    title={selectedNote.title}
                    date={showFormattedDate(selectedNote.createdAt)}
                    body={selectedNote.body}
                >
                    <div className="note-actions">
                        {!selectedNote.archived && (
                            <button className="primary" onClick={() => handleArchive(selectedNote.id)}>Archive</button>
                        )}
                        <button className="danger" onClick={() => handleDelete(selectedNote.id)}>Delete</button>
                    </div>
                </NoteDetail>
            ) : ( <FormNote onSave={handleSaveNote} />)}
        </div>
    );
}
