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
import { isConstructorDeclaration } from 'typescript';
import { CRUD_ACTIONS, LANGUAGES } from '../../../utils';
import { getDetailInforDoctor } from '../../../services/userService'





const mdParser = new MarkdownIt(/* Markdown-it options */);




class ManageDoctor extends Component {

    constructor(props) {
        super(props);
        this.state = {
            contentMarkdown: '',
            contentHTML: '',
            selectedDoctor: '',
            description: '',
            listDoctors: [],
            hasOldData: false
        }

    }
    componentDidMount = () => {
        this.props.fetchAllDoctor()
    }
    componentDidUpdate = (prevProps, prevState, snapshot) => {
        if (prevProps.allDoctors !== this.props.allDoctors) {
            let dataSelected = this.builDataInputSelect(this.props.allDoctors)
            this.setState({
                listDoctors: dataSelected
            })
        }
        if (prevProps.language !== this.props.language) {
            let dataSelected = this.builDataInputSelect(this.props.allDoctors)
            this.setState({
                listDoctors: dataSelected
            })
        }
    }

    builDataInputSelect = (inputData) => {
        let result = [];
        let { language } = this.props;
        if (inputData && inputData.length > 0) {
            inputData.map((item, index) => {
                let object = {};
                let labelVi = `${item.lastName} ${item.firstName}`
                let labelEn = `${item.firstName} ${item.lastName}`
                console.log('check object', object)
                object.label = language === LANGUAGES.VI ? labelVi : labelEn

                object.value = item.id
                result.push(object)
            })
        }
        return result

    }

    handleEditorChange = ({ html, text }) => {
        this.setState({
            contentMarkdown: text,
            contentHTML: html
        })
    }

    handleChangeSelect = async (selectedDoctor) => {
        this.setState({ selectedDoctor });

        let res = await getDetailInforDoctor(selectedDoctor.value)

        if (res && res.errCode === 0 && res.data && res.data.Markdown) {
            this.setState({
                contentHTML: res.data.Markdown.contentHTML,
                contentMarkdown: res.data.Markdown.contentMarkdown,
                description: res.data.Markdown.description,
                hasOldData: true

            })
        }
        else {
            this.setState({
                contentHTML: '',
                contentMarkdown: '',
                description: '',
                hasOldData: false
            })
        }
        console.log(' check res gandlechan', res)

    };

    handleSaveContentMarkdown = () => {
        let { hasOldData } = this.state
        this.props.saveDetailDoctor({
            contentHTML: this.state.contentHTML,
            contentMarkdown: this.state.contentMarkdown,
            description: this.state.description,
            doctorId: this.state.selectedDoctor.value,
            action: hasOldData === true ? CRUD_ACTIONS.EDIT : CRUD_ACTIONS.CREAT
        });

    }
    handleOnchangeDes = (event) => {
        this.setState({
            description: event.target.value
        })
    }
    render() {

        let { hasOldData } = this.state
        console.log('check listDoctors :', this.state.listDoctors)
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
                            onChange={this.handleChangeSelect}
                            options={this.state.listDoctors}
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
                        onChange={this.handleEditorChange}
                        value={this.state.contentMarkdown}
                    />


                </div>
                <button className={hasOldData === true ? 'save-content-doctor' : 'creat-content-doctor'}
                    onClick={() => this.handleSaveContentMarkdown()}

                >{hasOldData === true ?
                    <span>Lưu thông tin </span> : <span>Tạo thông tin</span>
                    }

                </button>



            </div>



        );
    }

}

const mapStateToProps = state => {
    return {
        allDoctors: state.admin.allDoctors,
        language: state.app.language,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchAllDoctor: () => dispatch(actions.fetchAllDoctor()),
        saveDetailDoctor: (data) => dispatch(actions.saveDetailDoctor(data))

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageDoctor);
