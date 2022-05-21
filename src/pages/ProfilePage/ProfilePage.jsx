import React, { useState, useEffect } from 'react';
import {  Grid } from 'semantic-ui-react'
import ProfileBio from '../../components/ProfileBio/ProfileBio';
import ProfilePostDisplay from '../../components/ProfilePostDisplay/ProfilePostDisplay';
import PageHeader from '../../components/Header/Header';
import userService from '../../utils/userService';
import { useParams } from 'react-router-dom';


export default function ProfilePage(){
    const [posts, setPosts] = useState([])
    const [user, setUser] = useState({})
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')

    const { username } = useParams(); //make sure parameter matches the key in routes

    async function getProfile() {
        try {
          const data = await userService.getProfile(username); //passing in the param
          console.log(data, " data");

          // data is the response from the controller function /api/users/profile
          // posts and user are the properties on the data object
          setLoading(() => false);
          setPosts(() => [...data.posts]);
          setUser(() => data.user);
        } catch (err) {
          console.log(err);
          setError("Profile does not Exist");
        }
  } 

    useEffect(() => { //call this function when the component mounts
        getProfile()
    }, [])
    
    
        if (error) {
            return (
            <>
                <PageHeader />
                <h1>{error}</h1>
            </>
            );
        }
        
        if (loading) {
        return (
            <h1>Loading....</h1>
        );
        }

    return (
        <Grid>
            <Grid.Row>
                <Grid.Column>
                    <PageHeader />
                </Grid.Column>
            </Grid.Row>
            <Grid.Row>
                <Grid.Column>
                    {/* passing user information as a prop to ProfileBio so we can render out the users information and profile bio info */}
                    <ProfileBio user={user}/>
                </Grid.Column>
            </Grid.Row>
            <Grid.Row centered>
                <Grid.Column style={{ maxWidth: 750 }}>
                    <ProfilePostDisplay />
                </Grid.Column>
            </Grid.Row>
        </Grid>     
    )
}