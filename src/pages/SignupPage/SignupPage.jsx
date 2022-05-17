import React, { useState } from 'react';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';
import { Button, Form, Grid, Header, Image, Segment } from 'semantic-ui-react'
import userService from '../../utils/userService';
import { useNavigate } from "react-router-dom";

export default function SignUpPage(props) {
  const navigate = useNavigate()
  const [error, setError ] = useState('')
  const [selectedFile, setSelectedFile] = useState('');
  const [state, setState] = useState({
    username: '',
    email: '',
    password: '',
    passwordConf: '',
    bio: ''
  });
  
  async function handleSubmit(e) {
    e.preventDefault()

    //create form data because we're sending a multipart formdata request bc we are sending over multiple requests bc we're uploading a photo
    const formData = new FormData(); //new FormData is from the browser
    formData.append('photo', selectedFile);

    for (let fieldName in state) {
      formData.append(fieldName, state[fieldName])
    }
 
    try {
      await userService.signup(formData) //must pass the argument as formData when we have a photo
      props.handleSignUpOrLogin(); //decodes the token from local storage that we just received as a response to our userService.signup fetch call
      // and decode and update the state in our App component
      navigate('/')
      
    } catch(err) {
      console.log(err.message);
      setError(err.message)
    }
  }

  function handleChange(e){
    setState({
      ...state,
      [e.target.name]: e.target.value
    })
  }

  function handleFileInput(e){
    console.log(e.target.files)
    setSelectedFile(e.target.files[0]) //uploading a file puts it in first place of files array given to us by dom api
  }
    
  return (
    <Grid textAlign="center" style={{ height: "100vh" }} verticalAlign="middle">
    <Grid.Column style={{ maxWidth: 450 }}>
     <Header as="h2" color="teal" textAlign="center">
       <Image src="https://i.imgur.com/s4LrnlU.png" /> Sign Up
     </Header>
     <Form autoComplete="off" onSubmit={handleSubmit}>
       <Segment stacked>
         <Form.Input
           name="username"
           placeholder="username"
           value={state.username}
           onChange={handleChange}
           required
         />
         <Form.Input
           type="email"
           name="email"
           placeholder="email"
           value={state.email}
           onChange={handleChange}
           required
         />
         <Form.Input
           name="password"
           type="password"
           placeholder="password"
           value={state.password}
           onChange={handleChange}
           required
         />
         <Form.Input
           name="passwordConf"
           type="password"
           placeholder="Confirm Password"
           value={state.passwordConf}
           onChange={handleChange}
           required
         />
         <Form.TextArea
           label="bio"
           name="bio"
           placeholder="Tell us more about your dogs..."
           onChange={handleChange}
         />
         <Form.Field>
           <Form.Input
             type="file"
             name="photo"
             placeholder="upload image"
             onChange={handleFileInput}
           />
         </Form.Field>
         <Button type="submit" className="btn">
           Signup
         </Button>
       </Segment>
       {error ? <ErrorMessage error={error} /> : null}
     </Form>
   </Grid.Column>
 </Grid>

   );
}
