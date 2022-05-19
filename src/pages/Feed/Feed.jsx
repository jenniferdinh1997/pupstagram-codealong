import React, { useState, useEffect } from 'react';
import PageHeader from '../../components/Header/Header';
import AddPostForm from '../../components/AddPostForm/AddPostForm';
import PostFeed from '../../components/PostFeed/PostFeed'; 
import * as postsApi from '../../utils/postApi';
import { Grid } from "semantic-ui-react";

export default function Feed({ user, handleLogout }){  
    const [posts, setPosts] = useState([])

    async function handleAddPost (post) {
      console.log(post)
      const data = await postsApi.create(post);
      console.log(data.post, 'This is new pup', data, ' data variable')
      setPosts(posts => [data.post, ...posts])
    }

    async function getPosts() {
        try {
          const data = await postsApi.getAll();
          setPosts([...data.posts])
        } catch(err){
          console.log(err, ' this is the error')
        }
      }
    
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
              <PostFeed posts={posts} numPhotosCol={1} />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      );
}