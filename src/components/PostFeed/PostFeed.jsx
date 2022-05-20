import React from 'react';
import PostCard from '../PostCard/PostCard';
import { Card, Image, Dimmer, Segment } from 'semantic-ui-react';

export default function PostFeed({posts, numPhotosCol }){

    return (
        <Card.Group itemsPerRow={numPhotosCol} stackable>
          <Segment>
            <Dimmer active inverted></Dimmer>
            <Image src="https://react.semantic-ui.com/images/wireframe/short-paragraph.png" />
          </Segment>
        {posts.map((post) => {
          return (
            <PostCard
              post={post}
              key={post._id}
            />
          );
        })}
      </Card.Group>
  
    )
}