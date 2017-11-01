import React from 'react'
import { Container, 
         Segment, 
         Header, 
         Icon,
         Input,
         Divider,
         Button } from 'semantic-ui-react'
import { gql, graphql, compose } from 'react-apollo'
import { Redirect } from 'react-router'


const SIGN_IN_USER = gql`
    mutation signInUser($email: String!, $password: String!) {
        signinUser( email: {email: $email, password: $password} ){
            token
        }
    }
`
const USER_QUERY = gql`
    query {
        user {
            id
        }
    }
`

class Login extends React.Component {

    constructor(){
        super()
        this.state = {
            email: '',
            password: '',
            validEmail: false,
            validPassword: false,
        }
    }

    _handleEmailInput = (e) => {
        e.preventDefault()
        this.setState({ 
            [e.target.name] :  e.target.value,
            validEmail: (/(@gmail.com)$/g).test(e.target.value)
        })
    }

    _handlePasswordInput = (e) => {
        e.preventDefault()
        this.setState({ [e.target.name] :  e.target.value })
    }

    _signInUser = async () => {
        const { email, password } = this.state
          try {
            const response = await this.props.signInUser({variables: { email, password }})
            sessionStorage.setItem('graphcoolToken', response.data.signinUser.token)
            this.props.setAuthState(true)
          } catch (e) {
            console.error('An error occured: ', e)
          }        
    }

    render() {
        const colors = {
            shuttle: 'white',
            title: 'white',
            subTitle: 'lightgreen',
            accountLogin: 'aquamarine',
            submit: 'lightseagreen'
        }

        return (
        <Container textAlign='center'>
            { sessionStorage.getItem('graphcoolToken') !== undefined && <Redirect to='/orders'/> }
            <Divider hidden section />
            <Segment.Group raised size='small'>
                <Segment style={{backgroundImage: 'url(' + require('./backgroundStars.jpg') + ')', backgroundRepeat: "no-repeat", backgroundSize: "cover",}}>
                    <Header />
                    <Header icon as='h1' textAlign='center'>
                        <Icon name='space shuttle' size='big' rotated='counterclockwise' style={{color: colors.shuttle}}/>
                        <Header.Content style={{color: colors.title}}>INNER SPACE</Header.Content>
                        <Header.Subheader  style={{color: colors.subTitle}}>(( HOLISTIC HEALTH ))</Header.Subheader>
                    </Header>
                    <Divider/>
                    <Header.Subheader as='h4' style={{color: colors.accountLogin}}>
                        LOGIN  –  SIGN UP
                    </Header.Subheader>
                    <Input fluid label='Username' placeholder='Email' name='email' onChange={this._handleEmailInput}/>
                        { this.state.validEmail === false && <Header.Subheader style={{color: 'red'}}>Invalid Email</Header.Subheader> }
                    <br />
                    <Input fluid label='Password' placeholder='Password' name='password' type='password' onChange={this._handlePasswordInput}/>
                        { false && <Header.Subheader style={{color: 'red'}}>Invalid Password</Header.Subheader> }
                    <br />
               </Segment>
                <Button basic attached='bottom'>
                    <Header as='h3' onClick={() => this._signInUser()} style={{color: colors.submit}}>SUBMIT</Header>
                </Button>
            </Segment.Group>
            Forgot <a style={{color: 'slateblue'}}>Email</a> or <a style={{color: 'slateblue'}}>Password</a> ?
        </Container>
        )
        
    }
}


export default compose(
    graphql( USER_QUERY, { options: { fetchPolicy: 'network-only' }}),
    graphql( SIGN_IN_USER, {name: 'signInUser' } )
)(Login)