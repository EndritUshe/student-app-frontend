import React, {useEffect, useState} from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Container, Paper, Button } from '@mui/material';


export default function Student() { 
    const paperStyle = {padding:`50px 20px`,margin:`20px auto`, width:600}
    const[name,setName]=useState('')
    const[address,setAddress]=useState('')
    const[students, setStudents] =useState([])

    const handeClick=(e)=>{
        e.preventDefault()
        const student={name,address}
        console.log(student)
        fetch("http://localhost:8080/students/add",{
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify(student)
    }).then(()=>{
        console.log("Student Added!!")
    })
        
    }
    useEffect(()=>{
        fetch("http://localhost:8080/students/all")
        .then(res=>res.json())
        .then((result)=>{
            setStudents(result);

        }
    )
},[])
  return (
    <Box
      component="form"
      sx={{
        '& > :not(style)': { m: 2, width: '25ch' },
      }}
      noValidate
      autoComplete="off"
    >
        <Container>
            <Paper elevation={3} style={paperStyle}>
                <h1 style={{color:"blue"}}><u>Add Student</u></h1>
             
      <TextField id="outlined-basic" label="Student Name" variant="outlined" fullWidth
      value={name}
      onChange={(e)=>setName(e.target.value)}
      />
      <TextField id="outlined-basic" label="Student Address" variant="outlined" fullWidth 
      value={address}
      onChange={(e)=>setAddress(e.target.value)}
      />
        <Button variant="contained" color="secondary" onClick={handeClick}>
            Submit
        </Button>
      </Paper>
      <h1>Students</h1>

    <Paper elevation={3} style={paperStyle}>
    {students.map(student=>(
        <Paper elevation={6} style={{margin:"10px", padding:"15px",textAlign:"left"}} key={student.id}>
            Id:{student.id}<br/>
            Name:{student.name}<br/>
            Address:{student.address}<br/>
        </Paper>
        ))}
 
    </Paper>
      </Container>
    </Box>
  );
}
 