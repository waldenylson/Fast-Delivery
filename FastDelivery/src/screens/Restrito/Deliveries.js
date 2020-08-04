import React, { Component } from 'react'
import ActionCreators from '../../redux/actionCreators'
import { connect } from 'react-redux'
import { Table, Button, Segment, Icon } from 'semantic-ui-react'
import { Link } from 'react-router-dom'



class Deliveries extends Component{
    componentDidMount(){
        this.props.load()
        console.log(this.props.auth)
    }

    renderDelivery = (delivery) => {
        return(
            <Table.Row key={delivery.id}>
                <Table.Cell>
                  {delivery.name_client}
                </Table.Cell>
                <Table.Cell>
                  {delivery.starting_point}   
                </Table.Cell>
                <Table.Cell>
                  {delivery.destination_point}
                </Table.Cell>
                <Table.Cell>
                  {delivery.date}
                </Table.Cell>
                <Table.Cell>
                  <Button inverted color='red' onClick={() => this.props.remove(delivery.id)}>Remover</Button>
                </Table.Cell>
            </Table.Row>
        )
    }

    render(){

        return (
            <div>
                <h1>Entregas</h1>

                <Button animated color='green' size='big' as={Link} to='/restrito/create-delivery'>
                    <Button.Content visible>Criar Entrega</Button.Content>
                        <Button.Content hidden>
                        <Icon name='angle double right' />
                    </Button.Content>
                </Button>
                
                { this.props.deliveries.isLoading && <p>Carregando...</p> }

                {
                    !this.props.deliveries.isLoading && this.props.deliveries.data.length === 0 &&
                        <Segment color='blue'>Nenhuma Entrega Cadastrada!</Segment>
                }

                {
                    !this.props.deliveries.isLoading && this.props.deliveries.data.length > 0 && 
                
                    <Table celled>
                        <Table.Header>
                            <Table.Row>
                                <Table.HeaderCell>Nome do Cliente</Table.HeaderCell>
                                <Table.HeaderCell>Ponto de Partida</Table.HeaderCell>
                                <Table.HeaderCell>Ponto de Destino</Table.HeaderCell>
                                <Table.HeaderCell>Data</Table.HeaderCell>
                                <Table.HeaderCell>Ações</Table.HeaderCell>
                            </Table.Row>
                        </Table.Header>
                        <Table.Body>
                            { this.props.deliveries.data.map(this.renderDelivery) }
                        </Table.Body>
                    </Table>
                }
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        deliveries: state.deliveries,
        auth: state.auth
    }
}

const mapDispatchToProps = dispatch => {
    return {
        load: () => dispatch(ActionCreators.getDeliveriesRequest(false)),
        create: (delivery) => dispatch(ActionCreators.createDeliveryRequest(delivery)),
        //remove: id => dispatch(ActionCreators.removeDeliveryRequest(id))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Deliveries)