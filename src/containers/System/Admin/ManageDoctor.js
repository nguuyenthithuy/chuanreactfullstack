import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './TableManageUser.scss';
import *as actions from '../../../store/actions';
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
// import style manually
import 'react-markdown-editor-lite/lib/index.css';
import './ManageDoctor.scss';
import Select from 'react-select';

const options = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' },
];


const mdParser = new MarkdownIt(/* Markdown-it options */);




class ManageDoctor extends Component {

    constructor(props) {
        super(props);
        this.state = {
            contentMarkdown: '',
            contentHTML: '',
            selectedDoctor: '',
            description: ''
        }

    }
    componentDidMount = () => {

    }
    componentDidUpdate = (prevProps, prevState, snapshot) => {

    }

    handleEditorChange = ({ html, text }) => {
        this.setState({
            contentMarkdown: text,
            contentHTML: html
        })
    }

    handleChange = (selectedDoctor) => {
        this.setState({ selectedDoctor }, () =>
            console.log(`Option selected:`, this.state.selectedDoctor)
        );
    };

    handleSaveContentMarkdown = () => {
        console.log('check state ', this.state)
    }
    handleOnchangeDes = (event) => {
        this.setState({
            description: event.target.value
        })
    }
    render() {


        return (


            <div className='manage-doctor-container'>
                <div className='manage-doctor-title'>
                    Tạo thêm thông tin doctor
                </div>
                <div className='more-infor'>


                    <div className='content-left form-group'>
                        <label>Chọn bác sĩ</label>
                        <Select
                            value={this.state.selectedDoctor}
                            onChange={this.handleChange}
                            options={options}
                        />

                    </div>
                    <div className='content-right'>
                        <label>Thông tin giới thiệu:</label>
                        <textarea className='form-control' rows='4'
                            onChange={(event) => this.handleOnchangeDes(event)}
                            value={this.state.description}
                        >
                            ahiahi con bò cười
                        </textarea>
                    </div>
                </div>
                <div className='manage-doctor-editor'>
                    <MdEditor style={{ height: '500px' }}
                        renderHTML={text => mdParser.render(text)}
                        onChange={this.handleEditorChange} />

                </div>
                <button className='save-content-doctor'
                    onClick={() => this.handleSaveContentMarkdown()}
                >Lưu thông tin</button>



            </div>



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

export default connect(mapStateToProps, mapDispatchToProps)(ManageDoctor);
