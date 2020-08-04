import React, { Component } from 'react'
import ActionCreators from '../redux/actionCreators'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom' 
import { Button, Segment, Form } from 'semantic-ui-react'

import Header from '../Header'

class CreateAccount extends Component{

    state = {
        name: '',
        email: '',
        passwd: '',
        passwd2: '',
        error: ''
    }

    componentDidMount() {
        this.props.reset()
    }

    handleChange = fieldname => event => {
        this.setState({
            [fieldname]: event.target.value
        })
    }

    handleSave = () => {

        if(this.state.passwd !== this.state.passwd2) {
            this.setState({
                error: 'equal'
            })
        }else if(this.state.passwd.length < 6){
            this.setState({
                error: 'length'
            })
        }else
            this.setState({
                error: ''
            })
            this.props.save({
                name: this.state.name,
                email: this.state.email,
                passwd: this.state.passwd,
            })
        

       
    }

    render(){

        if(this.props.auth.isAuth) {
            return <Redirect to='/restrito' />
        }

        //{JSON.stringify(this.props.auth)}
        return (
            <div>
            {
                this.props.auth.error && <Segment color='red'>Erro - E-mail já existe!</Segment>
            }
                <Header />
                <h1>Criar Conta</h1>

                {
                    this.state.error === 'equal' && <Segment color='red'>Erro - Senhas diferentes!</Segment>
                }

                {
                    this.state.error === 'length' && <Segment color='red'>Erro - A Senha deve conter no mínimo 6 caracteres!</Segment>
                }

                {
                    this.props.auth.saved && <Segment color='green'>Conta Criada com sucesso!</Segment>
                }

                {
                    !this.props.auth.saved && 
                    <Form>
                    <Form.Field>
                        <label>Nome:</label>
                        <input type='text' value={this.state.name} onChange={this.handleChange('name')} />
                    </Form.Field>

                    <Form.Field>
                        <label>E-mail:</label>
                        <input type='email' value={this.state.email} onChange={this.handleChange('email')} />
                    </Form.Field>

                        <Form.Field>
                            <label >Senha:</label>
                            <input type='password' value={this.state.passwd} onChange={this.handleChange('passwd')} />
                        </Form.Field>

                        <Form.Field>
                            <label>Digite Novamente:</label>
                            <input type='password' value={this.state.passwd2} onChange={this.handleChange('passwd2')} />
                        </Form.Field>

                        <Button inverted color='blue' size='big' onClick={this.handleSave}>Criar Conta</Button>   
                    </Form>
                }
                
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        auth: state.auth
    }
}

const mapDispatchToProps = dispatch => {
    return {
        save: (user) => dispatch(ActionCreators.createProfileRequest(user)),
        reset: () => dispatch(ActionCreators.createProfileReset())

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateAccount)
