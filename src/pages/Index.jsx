import { useState } from "react";
import { Box, Button, Container, Flex, Grid, IconButton, Input, Text, Textarea, useToast } from "@chakra-ui/react";
import { FaPlus, FaTrash, FaEdit, FaSave } from "react-icons/fa";

const Index = () => {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState("");
  const [editId, setEditId] = useState(null);
  const [editText, setEditText] = useState("");
  const toast = useToast();

  const handleAddNote = () => {
    if (!newNote.trim()) {
      toast({
        title: "Error",
        description: "Note cannot be empty",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
      return;
    }
    setNotes([...notes, { id: Date.now(), text: newNote }]);
    setNewNote("");
  };

  const handleDeleteNote = (id) => {
    setNotes(notes.filter((note) => note.id !== id));
  };

  const handleEditNote = (id) => {
    const note = notes.find((note) => note.id === id);
    setEditId(id);
    setEditText(note.text);
  };

  const handleSaveEdit = (id) => {
    const updatedNotes = notes.map((note) => {
      if (note.id === id) {
        return { ...note, text: editText };
      }
      return note;
    });
    setNotes(updatedNotes);
    setEditId(null);
    setEditText("");
  };

  return (
    <Container maxW="container.md" p={4}>
      <Flex mb={4} justifyContent="space-between">
        <Input placeholder="Add a new note..." value={newNote} onChange={(e) => setNewNote(e.target.value)} />
        <IconButton colorScheme="blue" aria-label="Add note" icon={<FaPlus />} onClick={handleAddNote} />
      </Flex>
      <Grid templateColumns="repeat(auto-fill, minmax(250px, 1fr))" gap={4}>
        {notes.map((note) => (
          <Box key={note.id} p={4} borderWidth="1px" borderRadius="lg">
            {editId === note.id ? <Textarea value={editText} onChange={(e) => setEditText(e.target.value)} placeholder="Edit note..." size="sm" /> : <Text mb={4}>{note.text}</Text>}
            <Flex justifyContent="space-between">
              {editId === note.id ? <IconButton icon={<FaSave />} onClick={() => handleSaveEdit(note.id)} aria-label="Save edit" colorScheme="green" /> : <IconButton icon={<FaEdit />} onClick={() => handleEditNote(note.id)} aria-label="Edit note" colorScheme="yellow" />}
              <IconButton icon={<FaTrash />} onClick={() => handleDeleteNote(note.id)} aria-label="Delete note" colorScheme="red" />
            </Flex>
          </Box>
        ))}
      </Grid>
    </Container>
  );
};

export default Index;
