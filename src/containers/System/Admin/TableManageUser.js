import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './TableManageUser.scss';
import *as actions from '../../../store/actions';

class TableManageUser extends Component {

    constructor(props) {
        super(props);
        this.state = {
            userRedux: []
        }

    }
    componentDidMount = () => {
        this.props.fetchUserRedux();
    }
    componentDidUpdate = (prevProps, prevState, snapshot) => {
        if (prevProps.listUsers !== this.props.listUsers) {
            this.setState({
                userRedux: this.props.listUsers
            })
        }
    }
    handleDeleteUser = (user) => {
        console.log('check user', user)
        this.props.deleteAUserRedux(user.id)
    }

    handleEditUser = (user) => {
        console.log('check user', user)
        this.props.handleEditUserFromParent(user)
    }

    render() {
        console.log('check listUser', this.props.listUsers)
        console.log('check state', this.state.userRedux)
        let arrUser = this.state.userRedux

        return (


            <table id='TableManageUser'>
                <tbody>
                    <tr>
                        <th>Email</th>
                        <th>First name</th>
                        <th>Last name</th>
                        <th>Address</th>
                        <th>Actions</th>
                    </tr>
                    {arrUser && arrUser.length > 0 &&
                        arrUser.map((item, index) => {
                            return (
                                <tr key={index}>
                                    <td>{item.email}</td>
                                    <td>{item.firstName}</td>
                                    <td>{item.lastName}</td>
                                    <td>{item.address}</td>
                                    <td>
                                        <button className='btn-edit'
                                            onClick={() => this.handleEditUser(item)}
                                        ><i className='fas fa-pencil-alt'

                                        ></i></button>
                                        <button className='btn-delete'
                                            onClick={() => this.handleDeleteUser(item)}
                                        ><i className='fas fa-trash'

                                        ></i></button>
                                    </td>

                                </tr>
                            )
                        })
                    }




                </tbody>
            </table>

        );
    }

}

const mapStateToProps = state => {
    return {
        listUsers: state.admin.users
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchUserRedux: () => dispatch(actions.fetchAllUsersStart()),
        deleteAUserRedux: (id) => dispatch(actions.deleteAUsser(id))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TableManageUser);