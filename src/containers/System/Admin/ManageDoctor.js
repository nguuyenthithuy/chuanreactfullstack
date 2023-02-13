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
import { disposeEmitNodes, isConstructorDeclaration } from 'typescript';
import { CRUD_ACTIONS, LANGUAGES } from '../../../utils';
import { getDetailInforDoctor } from '../../../services/userService'





const mdParser = new MarkdownIt(/* Markdown-it options */);




class ManageDoctor extends Component {

    constructor(props) {
        super(props);
        this.state = {
            // Save to markdown table
            contentMarkdown: '',
            contentHTML: '',
            selectedDoctor: '',
            description: '',
            listDoctors: [],
            hasOldData: false,

            // Save to doctor-infor table
            listPrice: [],
            listPayment: [],
            listProvince: [],
            selectedPrice: '',
            selectedPayment: '',
            selectedProvince: '',
            nameClinic: '',
            addressClinic: '',
            note: ''
        }

    }
    componentDidMount = () => {
        this.props.fetchAllDoctor();
        this.props.getAllRequireDoctorInfor()
    }
    componentDidUpdate = (prevProps, prevState, snapshot) => {
        if (prevProps.allDoctors !== this.props.allDoctors) {
            let dataSelected = this.builDataInputSelect(this.props.allDoctors, 'USER')
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
        if (prevProps.allRequireDoctorInfor !== this.props.allRequireDoctorInfor) {
            let { resPresPaymentrice, resPrice, resProvince } = this.props.allRequireDoctorInfor
            let Payment = this.builDataInputSelect(resPresPaymentrice)
            let Price = this.builDataInputSelect(resPrice)
            let Province = this.builDataInputSelect(resProvince)

            console.log('check data paymen,...', Payment, Price, Province)
            this.setState({
                listPrice: Price,
                listPayment: Payment,
                listProvince: Province,
            })
        }

    }

    builDataInputSelect = (inputData, type) => {
        let result = [];
        let { language } = this.props;
        if (inputData && inputData.length > 0) {
            inputData.map((item, index) => {
                let object = {};
                let labelVi = type === 'USER' ? `${item.lastName} ${item.firstName}` : item.valueVi
                let labelEn = type === 'USER' ? `${item.firstName} ${item.lastName}` : item.valueEn
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
                    <FormattedMessage id="admin.manage-doctor.title" />
                </div>
                <div className='more-infor'>


                    <div className='content-left form-group'>
                        <label><FormattedMessage id="admin.manage-doctor.selected-doctor" /></label>
                        <Select
                            value={this.state.selectedDoctor}
                            onChange={this.handleChangeSelect}
                            options={this.state.listDoctors}
                            placeholder="Chọn bác sĩ"
                        />

                    </div>
                    <div className='content-right'>
                        <label><FormattedMessage id="admin.manage-doctor.Information" /></label>
                        <textarea className='form-control'
                            onChange={(event) => this.handleOnchangeDes(event)}
                            value={this.state.description}
                        >
                            ahiahi con bò cười
                        </textarea>
                    </div>
                </div>
                <div className='more-infor-extra row'>
                    <div className='col-4 form-group'>
                        <label>Chọn giá</label>
                        <Select
                            // value={this.state.selectedDoctor}
                            // onChange={this.handleChangeSelect}
                            options={this.state.listPrice}
                            placeholder="Chọn giá"
                        />
                    </div>
                    <div className='col-4 form-group'>
                        <label>Chọn phương thức thanh toán</label>
                        <Select
                            // value={this.state.selectedDoctor}
                            // onChange={this.handleChangeSelect}
                            options={this.state.listPayment}
                            placeholder="Chọn phương thức thanh toán"
                        />
                    </div>
                    <div className='col-4 form-group'>
                        <label>Chọn tỉnh thành</label>
                        <Select
                            // value={this.state.selectedDoctor}
                            // onChange={this.handleChangeSelect}
                            options={this.state.listProvince}
                            placeholder="Chọn tỉnh thành"
                        />
                    </div>
                    <div className='col-4 form-group'>
                        <label>Tên phòng khám</label>
                        <input className='form-control' />
                    </div>
                    <div className='col-4 form-group'>
                        <label>Địa chỉ phòng khám </label>
                        <input className='form-control' />
                    </div>
                    <div className='col-4 form-group'>
                        <label>Chú ý </label>
                        <input className='form-control' />
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
                    <span><FormattedMessage id="admin.manage-doctor.Save-Information" /> </span> :
                    <span><FormattedMessage id="admin.manage-doctor.Creat-Information" /></span>
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
        allRequireDoctorInfor: state.admin.allRequireDoctor
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchAllDoctor: () => dispatch(actions.fetchAllDoctor()),
        saveDetailDoctor: (data) => dispatch(actions.saveDetailDoctor(data)),
        getAllRequireDoctorInfor: () => dispatch(actions.getAllRequireDoctorInfor())

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageDoctor);
