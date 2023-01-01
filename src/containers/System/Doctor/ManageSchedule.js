import React, { Component } from 'react';
import { connect } from "react-redux";
import { Redirect, Route, Switch } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import *as actions from '../../../store/actions';
import Select from 'react-select';
import { CRUD_ACTIONS, LANGUAGES, dateFormat } from '../../../utils';
import DatePicker from '../../../components/Input/DatePicker';
import moment from 'moment';

import './ManageSchedule.scss'
import { isConstructorDeclaration } from 'typescript';
import { toast } from "react-toastify";
import _ from 'lodash';


class ManageSchedule extends Component {
    constructor(props) {
        super(props)

        this.state = {
            listDoctors: [],
            selectedDoctor: {}, //  tự động là value and label
            currentDate: new Date(),
            rangeTime: []
        }
    }
    componentDidMount() {
        this.props.fetchAllDoctor()
        this.props.fetchAllCodeTime()
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
        if (prevProps.allScheduleTime !== this.props.allScheduleTime) {
            let data = this.props.allScheduleTime
            if (data && data.length > 0) {
                data = data.map(item => ({ ...item, isSelected: false }))
            }
            console.log('check isSelected', data)
            this.setState({
                rangeTime: data
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
    handleChangeSelect = async (selectedDoctor) => {
        this.setState({ selectedDoctor });

    };

    handleOnchangeDate = (date) => {
        this.setState({
            currentDate: date[0]
        })
    }

    handleClickTime = (time) => {
        let { rangeTime } = this.state
        if (rangeTime && rangeTime.length > 0) {
            rangeTime = rangeTime.map(item => {
                if (item.id === time.id) {
                    item.isSelected = !item.isSelected;
                }
                return item
            })
            this.setState({
                rangeTime: rangeTime
            })
        }
    }

    handleSaveTime = () => {
        let { rangeTime, selectedDoctor, currentDate } = this.state;
        let result = []

        if (!currentDate) {
            toast.error("Invalid currentDate");
            return
        }
        if (selectedDoctor && _.isEmpty(selectedDoctor)) {
            toast.error("Invalid selectedDoctor");
            return
        }
        let fomatedDate = moment(currentDate).format(dateFormat.SEND_TO_SERVER)

        if (rangeTime && rangeTime.length > 0) {
            let selectedTime = rangeTime.filter(item => item.isSelected === true)
            if (selectedTime && selectedTime.length > 0) {
                selectedTime.map((schedule, index) => {
                    let object = {}
                    object.doctorId = selectedDoctor.value; // lấy id 
                    object.date = fomatedDate;              // format Date : DD/MM/YYY
                    object.time = schedule.keyMap;          // keyMap : TIME : T1 T2 T3
                    result.push(object)
                })
            }
            else {
                toast.error("Invalid selectedTime");
                return
            }
        }
        console.log('check result', result)
    }

    render() {
        console.log('check state schedule', this.state)

        let { rangeTime } = this.state;
        let { language } = this.props
        console.log('check state rangertime', rangeTime)
        console.log('check selected doctor', this.state.selectedDoctor)
        return (

            <div className='manage-schedule-container'>
                <div className='m-s-title'>
                    <FormattedMessage id="manage-schedule.title" />
                </div>
                <div className='container'>
                    <div className='row'>
                        <div className='col-6 form-group'>
                            <label><FormattedMessage id="manage-schedule.chosse-doctor" /></label>
                            <Select
                                value={this.state.selectedDoctor}
                                onChange={this.handleChangeSelect}
                                options={this.state.listDoctors}
                            />
                        </div>
                        <div className='col-6 form-group'>
                            <label><FormattedMessage id="manage-schedule.chosse-date" /></label>
                            <DatePicker
                                onChange={this.handleOnchangeDate}
                                className='form-control'
                                value={this.state.currentDate}
                                minDate={new Date()}
                            />
                        </div>
                        <div className='col-12 pick-hour-container'>
                            {rangeTime && rangeTime.length > 0 &&
                                rangeTime.map((item, index) => {
                                    return (
                                        <button className={item.isSelected === true ? 'btn btn-schedule active' : 'btn btn-schedule'} key={index}
                                            onClick={() => this.handleClickTime(item)}
                                        >
                                            {language === LANGUAGES.VI ? item.valueVi : item.valueEn}
                                        </button>
                                    )
                                })
                            }
                        </div>
                    </div>
                    <div>
                        <button className='btn btn-primary btn-save-schedule'
                            onClick={() => this.handleSaveTime()}
                        >
                            <FormattedMessage id="manage-schedule.save" />
                        </button>

                    </div>

                </div>
            </div>

        );
    }
}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        allDoctors: state.admin.allDoctors,
        language: state.app.language,
        allScheduleTime: state.admin.allScheduleTime
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchAllDoctor: () => dispatch(actions.fetchAllDoctor()),
        fetchAllCodeTime: () => dispatch(actions.fetchAllCodeTime())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageSchedule);
