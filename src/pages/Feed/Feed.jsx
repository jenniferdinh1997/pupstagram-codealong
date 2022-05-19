import React from 'react';
import PageHeader from '../../components/Header/Header';
import AddPostForm from '../../components/AddPostForm/AddPostForm';
import PostFeed from '../../components/PostFeed/PostFeed'; 
import * as postsAPI from '../../utils/postApi';

export default function Feed({ user, handleLogout }){  
    const [posts, setPosts] = useState([])

    async function handleAddPost (post) {
        const data = await postsAPI.create(post);
        console.log(data)
        setPosts(posts => [data.post, ...posts])
    }

    async function getPosts(){

        try {
          const data = await postsAPI.getAll();
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