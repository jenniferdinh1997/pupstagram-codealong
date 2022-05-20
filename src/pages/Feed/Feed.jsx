import React, { useState, useEffect } from 'react';
import PageHeader from '../../components/Header/Header';
import AddPostForm from '../../components/AddPostForm/AddPostForm';
import PostFeed from '../../components/PostFeed/PostFeed'; 
import * as postsApi from '../../utils/postApi';
import { Grid } from "semantic-ui-react";

export default function Feed(){  
    const [posts, setPosts] = useState([]); // <- likes are inside of each post in the posts array
    const [error, setError] = useState("");

    //C create in CRUD
    //we invoke this function in addPost component when the submit button on our form is clicked so we need to pass it as a prop
    async function handleAddPost (post) {
      try {
        const data = await postsApi.create(post);
        console.log(data.post, 'This is new pup', data, ' data variable')
        setPosts([data.post, ...posts])
      } catch (err) {
        console.log(err);
        setError(err.message);
      }
    }

    //R read in CRUD
    async function getPosts() {
        try {
          const data = await postsApi.getAll();
          console.log(data, ' this is the data')
          setPosts([...data.posts])
        } catch(err){
          console.log(err, ' this is the error')
          setError(err.message)
        }
      }
    
      //useEffect runs once the component is first rendered
      useEffect(() => {
        getPosts()
      }, [])
    
      return (
        <Grid centered>
          <Grid.Row>
            <Grid.Column>
              <PageHeader />
            </Grid.Column>
          </Grid.Row>

          <Grid.Row>
            <Grid.Column style={{ maxWidth: 450 }}>
              <AddPostForm handleAddPost={handleAddPost} />
            </Grid.Column>
          </Grid.Row>

          <Grid.Row>
            <Grid.Column style={{ maxWidth: 450 }}>
              <PostFeed 
                posts={posts} 
                numPhotosCol={1} />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      );
}