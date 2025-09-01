import React, { useState, useEffect } from "react";
import "./inspiration.css"
import { Stack } from "@mui/material";
import { inspirationLines } from "./inspirationLines";
import Button from "@mui/material/Button"
import Header from "../../layout/Header/Header";
import { Container } from "@mui/material";
 import Typography from "@mui/material/Typography";
export default function Inspiration () {
  const [line, setLine] = useState("");
  const [item , setItem] = useState([])




useEffect(()=>{
console.log(item)
},[item])



  const getRandomLine = ()=> {
    const randomIndex = Math.floor(Math.random() *(inspirationLines.length))
    setLine(inspirationLines[randomIndex])
    setItem(prev => [...prev,inspirationLines[randomIndex]])
    console.log("randomIndex" , randomIndex)
    console.log("set line" , line)
    console.log("set item" , item)

  }

// console.log(localStorage)

  return (
    <div>
      <Container width="100%" maxWidth="lg" style={{marginTop:"2px", marginLeft:"-1.3rem", textAlign:"center"}}>
      <Header/>

<Stack direction="row" spacing={2} justifyContent="center" mt={2}>
  <Button variant="contained" onClick={getRandomLine}>Show Me Inspiration</Button>
</Stack>

        
      {line && (
        <Typography variant="h5" color="primary" style={{ marginTop: "1rem" }}>
          {line}
          </Typography> 
      )}
      </Container>
    </div>
  );
}
