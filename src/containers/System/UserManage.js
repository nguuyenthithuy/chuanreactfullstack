import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './UserManage.scss'
import { GetAllUser, creatNewUserReact, DeleteUserService, UpdateUserService } from '../../services/userService'
import ModalUser from './ModalUser';
import { emitter } from "../../utils/emitter"
import ModalEditUser from './ModalEditUser';
class UserManage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            arrUsers: [],
            isOpenModalUser: false,
            isOpenModalEditUser: false,
            currentUser: {}
        }

    }



    async componentDidMount() {
        await this.getAllSuerFromReact()
    }
    /**Lifi cycle
     *  Run component
     * 1. Run construct -> init state
     * 2. Did mount (set state)
     * 3. Render
     * 
     */

    getAllSuerFromReact = async () => {
        let response = await GetAllUser('ALL')
        if (response && response.errCode === 0) {
            this.setState({
                arrUsers: response.user
            })
        }
    }

    handleCreatNewUser = () => {
        this.setState({
            isOpenModalUser: true,
        })
    }
    toggleUserModal = () => {
        this.setState({
            isOpenModalUser: !this.state.isOpenModalUser,
        })
    }
    toggleUserEditModal = () => {
        this.setState({
            isOpenModalEditUser: !this.state.isOpenModalEditUser,
        })
    }
    creatNewUser = async (data) => {
        try {

            let response = await creatNewUserReact(data);
            if (response && response.errCode !== 0) {
                alert(response.errMassage)
            }
            else {
                await this.getAllSuerFromReact()
                this.setState({
                    isOpenModalUser: false
                })
                emitter.emit('EVENT_CLEAR_MODAL_DATA')
            }

        }
        catch (e) {
            console.log(e)
        }

    }

    handleOnClickDelete = async (user) => {
        try {
            let res = await DeleteUserService(user.id)
            if (res && res.errCode === 0) {
                await this.getAllSuerFromReact()
            }
            else {
                alert(res.errMesage)
            }
        }
        catch (e) {
            console.log(e)
        }
    }

    handleEditUser = (user) => {
        console.log(' Check data user', user)
        this.setState({
            isOpenModalEditUser: true,
            currentUser: user
        })
    }
    doEditUser = async (user) => {
        try {
            let res = await UpdateUserService(user)

            if (res && res.errCode === 0) {
                this.setState({
                    isOpenModalEditUser: false
                })

                await this.getAllSuerFromReact()
            }
            else {
                alert(res.errMessage)
            }
        }
        catch (e) {
            console.log(e)
        }


    }
    render() {
        console.log(this.state)
        let arrUsers = this.state.arrUsers;
        return (
            <div className="users-container">
                <ModalUser
                    isOpen={this.state.isOpenModalUser}
                    toggleFromParent={this.toggleUserModal}
                    creatNewUser={this.creatNewUser}
                />
                {this.state.isOpenModalEditUser &&
                    <ModalEditUser
                        isOpen={this.state.isOpenModalEditUser}
                        toggleFromParent={this.toggleUserEditModal}
                        currentUser={this.state.currentUser}
                        editUser={this.doEditUser}
                    // creatNewUser={this.creatNewUser}
                    />
                }
                <div className='title text-center'>Manage user with NTT</div>
                <div className='mx-1'>
                    <button className='btn btn-primary px-3'
                        onClick={() => this.handleCreatNewUser()}
                    ><i className='fas fa-plus'></i> Add new user</button>
                </div>
                <div className='user-table mt-3 mx-1'>
                    <table id="customers">
                        <tbody>
                            <tr>
                                <th>Email</th>
                                <th>First name</th>
                                <th>Last name</th>
                                <th>Address</th>
                                <th>Actions</th>
                            </tr>

                            {arrUsers && arrUsers.length > 0 &&
                                arrUsers.map((item, index) => {
                                    return (
                                        <tr>
                                            <td>{item.email}</td>
                                            <td>{item.firstName}</td>
                                            <td>{item.lastName}</td>
                                            <td>{item.address}</td>
                                            <td>
                                                <button className='btn-edit'><i className='fas fa-pencil-alt'
                                                    onClick={() => this.handleEditUser(item)}
                                                ></i></button>
                                                <button className='btn-delete'><i className='fas fa-trash'
                                                    onClick={() => this.handleOnClickDelete(item)}
                                                ></i></button>
                                            </td>
                                        </tr>
                                    )
                                })}


                        </tbody>
                    </table>
                </div>
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserManage);
