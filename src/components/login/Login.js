import React from 'react'
import { Container, 
         Segment, 
         Header, 
         Icon,
         Input,
         Divider,
         Button } from 'semantic-ui-react'

export default class Login extends React.Component {

    render() {
        return (
        <Container>
            <Segment.Group raised >
                <Segment>
                    <Header />
                    <Header icon as='h1' textAlign='center'>
                        <Icon name='space shuttle'rotated='counterclockwise' />
                        <Header.Content>INNER SPACE</Header.Content>
                        <Header.Subheader>HOLISTIC HEALTH</Header.Subheader>
                    </Header>
                    <Divider/>
                    <Header.Subheader as='h4'>ACCOUNT LOGIN</Header.Subheader>
                    <Input fluid label='Username' placeholder='Email' />
                    <br />
                    <Input fluid label='Password' placeholder='Password' />
                    <br />
               </Segment>
                <Button basic attached='bottom'>
                    <Header as='h3'>SUBMIT</Header>
                </Button>
            </Segment.Group>
            Forgot <a>Email</a> or <a>Password</a> ?
        </Container>
        )
        
    }
}