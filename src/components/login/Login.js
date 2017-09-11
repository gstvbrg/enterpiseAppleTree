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
        const colors = {
            shuttle: 'cadetblue',
            title: 'mediumturquoise',
            subTitle: 'slateblue',
            accountLogin: 'cadetblue',
            submit: 'lightseagreen'
        }
        return (
        <Container textAlign='center'>
            <Divider hidden section />
            <Segment.Group raised size='small' >
                <Segment>
                    <Header />
                    <Header icon as='h1' textAlign='center'>
                        <Icon name='space shuttle' size='big' rotated='counterclockwise' style={{color: colors.shuttle}}/>
                        <Header.Content style={{color: colors.title}}>INNER SPACE</Header.Content>
                        <Header.Subheader  style={{color: colors.subTitle}}>HOLISTIC HEALTH</Header.Subheader>
                    </Header>
                    <Divider/>
                    <Header.Subheader as='h4' style={{color: colors.accountLogin}}>
                        LOGIN  -  SIGN UP
                    </Header.Subheader>
                    <Input fluid label='Username' placeholder='Email' />
                        { true && <Header.Subheader style={{color: 'red'}}>Invalid Email</Header.Subheader> }
                    <br />
                    <Input fluid label='Password' placeholder='Password' />
                        { true && <Header.Subheader style={{color: 'red'}}>Invalid Password</Header.Subheader> }
                    <br />
               </Segment>
                <Button basic attached='bottom'>
                    <Header as='h3' onClick={() => console.log('click')} style={{color: colors.submit}}>SUBMIT</Header>
                </Button>
            </Segment.Group>
            Forgot <a style={{color: 'slateblue'}}>Email</a> or <a style={{color: 'slateblue'}}>Password</a> ?
        </Container>
        )
        
    }
}