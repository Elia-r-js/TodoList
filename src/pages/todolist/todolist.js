import React, { useState, useEffect, useRef, use } from "react";
import { Stack, Typography, TextField, Button } from "@mui/material";

export default function Todolist() {
  const [add, setAdd] = useState([]);
  const [item, setItem] = useState("");
  const [editId, setEditId] = useState(null); // which item is being edited
  const [editText, setEditText] = useState(""); // the new text being typed
  const [save, setSave] = useState(false);

  const isFirstRender = useRef(true);

  const editor = (text, id) => {
    setEditId(id); // marks this item as being edited
    setEditText(text); // puts the current text in the input field
  };

  const savedData = (id) => {
    setAdd(
      (prev) =>
        prev.map((item) =>
          item.id === id ? { ...item, text: editText.trim() } : item
        ) //if the item id is the same update the text and edit for me
    );
    setEditId(null);
  };

  const handleAdd = () => {
    if (item.trim() === "") return;

    const newItem = {
      id: Date.now(),
      text: item.trim(), //"     item       " => doing this "item"
      date: new Date(),
    };

    setAdd((prev) => [...prev, newItem]);
    // this line is hold the pervios item in list of array and add the new one
    setItem("");
  };

  const handleDelete = (id) => {
    setAdd((prev) => prev.filter((todo) => todo.id !== id));
  };

  useEffect(() => {
    const storer = JSON.parse(localStorage.getItem("add"));
    console.log("🚀 Loaded from localStorage:", storer);

    if (storer) {
      const cleaned = storer.map((todo) => ({
        ...todo,
        date: new Date(todo.date),
      }));
      console.log("✅ Cleaned data:", cleaned);
      setAdd(cleaned);
    }
  }, []);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    localStorage.setItem("add", JSON.stringify(add));
    console.log("saved to localstorage", add);
  }, [add]);

  // Create a new array that includes only the items I want to keep.”
  return (
    <Stack sx={{ width: 400, margin: "auto", mt: 4 }}>
      <Typography sx={{ textAlign: "center" }} variant="h3" gutterBottom>
        ToDoList
      </Typography>

      <Stack direction="row" spacing={1} sx={{ mb: 2 }}>
        <Button onClick={handleAdd} variant="contained" color="primary">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="2em"
            height="2em"
            viewBox="0 0 24 24"
          >
            <path
              fill="currentColor"
              d="M19 12.998h-6v6h-2v-6H5v-2h6v-6h2v6h6z"
            />
          </svg>
        </Button>

        <TextField
          sx={{ width: "400px" }}
          value={item}
          type="text"
          variant="outlined"
          onChange={(e) => setItem(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              handleAdd();
            }
          }}
          placeholder="Enter your todo..."
        />
      </Stack>

      <Stack
        spacing={2}
        sx={{
          maxHeight: 600,
          width: "100%",
          overflowY: "auto",
          border: "1px solid #ccc",
          p: 1,
          borderRadius: 1,
          bgcolor: "background.paper",
        }}
      >
        {add.map((item, index) => (
          <Stack
            key={item.id}
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            {editId=== item.id ?(
              <TextField 
              value={editText}
              onChange={(e) => setEditText(e.target.value)}
              size="small"
              sx={{flexGrow:1,mr:1}}
              />
            ): <Typography variant="body1" sx={{flexGrow:1}}>
                {index + 1}. {item.text}
              </Typography>}

            <Typography
              variant="caption"
              sx={{ minWidth: 90, textAlign: "right" }}
            >
              {`${item.date.getDate()}/${
                item.date.getMonth() + 1
              }/${item.date.getFullYear()}`}
            </Typography>
            <Stack>
              <Button
                onClick={() => handleDelete(item.id)}
                variant="outlined"
                color="error"
                sx={{ ml: 1 }}
                size="small"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="2em"
                  height="1em"
                  viewBox="0 0 48 48"
                >
                  <path
                    fill="none"
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M31.945 7.624L28.84 4.5h-9.68l-3.105 3.124H8.872v4.647h30.256V7.624zm-19.9 4.647h23.95v28.124A3.106 3.106 0 0 1 32.89 43.5H15.15a3.106 3.106 0 0 1-3.105-3.105zM24 17.886v20m6-20v20m-12-20v20"
                    stroke-width="1"
                  />
                </svg>
              </Button>
              <Button
                variant="outlined"
                size="small"
                sx={{ ml: 1 }}
                onClick={() => 
                  editId === item.id 
                  ? savedData(item.id)
                  :editor(item.text , item.id)
                }
              >
                {editId === item.id ?  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="1em"
                    height="1em"
                    viewBox="0 0 16 16"
                  >
                    <path
                      fill="none"
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="1.5"
                      d="m2.75 8.75l3.5 3.5l7-7.5"
                    />
                  </svg>: 
                      (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="1em"
                    height="1em"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fill="none"
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="m5 16l-1 4l4-1L19.586 7.414a2 2 0 0 0 0-2.828l-.172-.172a2 2 0 0 0-2.828 0zM15 6l3 3m-5 11h8"
                    />
                  </svg>
                ) 
                }
              </Button>
            </Stack>
          </Stack>
        ))}
      </Stack>
    </Stack>
  );
}
