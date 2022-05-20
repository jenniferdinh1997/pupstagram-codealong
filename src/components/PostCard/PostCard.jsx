import React from 'react';
import { Card, Image } from 'semantic-ui-react';

function PostCard({ post }) { 

  return (
    <div>
        <Card key={post._id} raised>
          <Card.Content textAlign="left">
            <Card.Header>    
                <Image
                  size="large"
                  avatar
                  src={
                    post.user.photoUrl
                      ? post.user.photoUrl
                      : "https://react.semantic-ui.com/images/wireframe/square-image.png"
                  }
                />
            </Card.Header>
          </Card.Content>
          <Image src= {`${post.photoUrl}`} wrapped ui={false} />
          <Card.Content>
            <Card.Description>{post.caption}</Card.Description>
          </Card.Content>
        </Card>
    </div>
  );
}

export default PostCard;