import React from "react";
import { Button, Stack } from "@mui/material";
import { useNavigate } from "react-router-dom";
import "./mainpage.css"
import { routes } from "../../routes/Routes";

export default function Mainpage() {
    const navigation = useNavigate()
  return (
    <Stack spacing={3}>
      <Button  variant="contained"  onClick={() => {navigation(routes.inspiration.path)}}> Inspiration Lines </Button>

      <Button variant="contained"  onClick={() => {navigation(routes.TodoList.path)}}> Todo List </Button>
    </Stack>
  );
}
;
