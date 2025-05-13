import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useFirebase } from "../contexts/FirebaseContext";
import "./Dashboard.css";

const Dashboard = () => {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const { currentUser, logout, getCollection, createDocument, deleteDocument } =
    useFirebase();

  // Load notes when component mounts
  useEffect(() => {
    if (currentUser) {
      loadNotes(currentUser.uid);
    } else {
      setLoading(false);
    }
  }, [currentUser]);

  // Load notes from Firestore using context
  const loadNotes = async (userId) => {
    try {
      setLoading(true);
      const notesList = await getCollection(`users/${userId}/notes`);
      setNotes(notesList);
    } catch (err) {
      console.error("Error loading notes:", err);
      setError("Error al cargar las notas. Por favor intente nuevamente.");
    } finally {
      setLoading(false);
    }
  };

  // Add a new note using context
  const addNote = async (e) => {
    e.preventDefault();
    if (!newNote.trim()) return;

    try {
      const userId = currentUser.uid;

      const newNoteDoc = {
        content: newNote,
        userId: userId,
      };

      await createDocument(`users/${userId}/notes`, newNoteDoc);

      // Reload notes to get the updated list with server timestamps
      await loadNotes(userId);
      setNewNote("");
    } catch (err) {
      console.error("Error adding note:", err);
      setError("Error al agregar la nota. Por favor intente nuevamente.");
    }
  };

  // Delete a note using context
  const deleteNote = async (noteId) => {
    try {
      const userId = currentUser.uid;
      await deleteDocument(`users/${userId}/notes`, noteId);
      setNotes(notes.filter((note) => note.id !== noteId));
    } catch (err) {
      console.error("Error deleting note:", err);
      setError("Error al eliminar la nota. Por favor intente nuevamente.");
    }
  };

  // Handle logout using context
  const handleLogout = async () => {
    try {
      await logout();
      navigate("/login");
    } catch (err) {
      console.error("Error signing out:", err);
      setError("Error al cerrar sesión. Por favor intente nuevamente.");
    }
  };

  if (loading) {
    return <div className="loading">Cargando...</div>;
  }

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h1>BullaBank Dashboard</h1>
        <div className="user-info">
          <span>Hola, {currentUser?.email}</span>
          <button onClick={handleLogout} className="logout-button">
            Cerrar Sesión
          </button>
        </div>
      </header>

      <main className="dashboard-content">
        <section className="notes-section">
          <h2>Mis Notas</h2>

          {error && <div className="error-message">{error}</div>}

          <form onSubmit={addNote} className="add-note-form">
            <input
              type="text"
              value={newNote}
              onChange={(e) => setNewNote(e.target.value)}
              placeholder="Escribe una nueva nota..."
              className="note-input"
            />
            <button type="submit" className="add-note-button">
              Agregar
            </button>
          </form>

          <div className="notes-list">
            {notes.length === 0 ? (
              <p className="no-notes">No tienes notas. ¡Agrega una!</p>
            ) : (
              notes.map((note) => (
                <div key={note.id} className="note-item">
                  <p>{note.content}</p>
                  <button
                    onClick={() => deleteNote(note.id)}
                    className="delete-note-button"
                  >
                    Eliminar
                  </button>
                </div>
              ))
            )}
          </div>
        </section>
      </main>
    </div>
  );
};

export default Dashboard;
