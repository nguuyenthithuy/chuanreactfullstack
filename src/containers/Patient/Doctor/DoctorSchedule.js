import React, { Component } from 'react';
import { connect } from "react-redux";
import Select from 'react-select';
import moment from 'moment';
import localization from 'moment/locale/vi';
import './DoctorSchedule.scss'
import { LANGUAGES } from '../../../utils';
import { getScheduleDoctorByDate } from '../../../services/userService'
import { FormattedMessage } from 'react-intl';

class DoctorSchedule extends Component {

    constructor(props) {
        super(props)
        this.state = {
            allDay: [],
            allAvailabelTime: []
        }
    }

    async componentDidMount() {
        let { language } = this.props

        console.log('moment vi', moment(new Date()).format('dddd - DD/MM'))
        console.log('moment en', moment(new Date()).locale('en').format('ddd - DD/MM'))

        // locale để xét tiếng anh tiếng việt nếu không sẽ tự động là tiếng anh
        let arrDay = this.getArrDays(language)
        this.setState({
            allDay: arrDay,
        })

    }
    capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
    getArrDays = (language) => {
        let arrDay = [];
        for (let i = 0; i < 7; i++) {
            let object = {}

            let dateFirstLetter = moment(new Date()).add(i, 'days').format('dddd - DD/MM')
            if (language === LANGUAGES.VI) {
                if (i === 0) {
                    let DDMM = moment(new Date()).format('DD/MM')
                    object.label = `Hôm nay - ${DDMM}`
                }
                else {
                    object.label = this.capitalizeFirstLetter(dateFirstLetter)
                }

            }
            else {
                if (i === 0) {
                    let DDMM = moment(new Date()).format('DD/MM')
                    object.label = `Today - ${DDMM}`
                }
                else {
                    object.label = moment(new Date()).add(i, 'days').locale('en').format('ddd - DD/MM')
                }

            }

            object.value = moment(new Date()).add(i, 'days').startOf('days').valueOf()

            // startOf('days) : lấy đầu ngày 00:00:00
            // valueOf() : convert sang kiểu unix TimeStapms

            arrDay.push(object)
        }

        return arrDay
    }
    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.language !== this.props.language) {
            let allDay = this.getArrDays(this.props.language)
            this.setState({
                allDay: allDay
            })
        }
        if (prevProps.detailDoctorFromparent !== this.props.detailDoctorFromparent) {
            let allDay = this.getArrDays(this.props.language)
            let res = await getScheduleDoctorByDate(this.props.detailDoctorFromparent, allDay[0].value)
            this.setState({
                allAvailabelTime: res.data ? res.data : []
            })
        }
    }

    handleOnchangeSelected = async (event) => {
        if (this.props.detailDoctorFromparent && this.props.detailDoctorFromparent !== -1) {
            let doctorId = this.props.detailDoctorFromparent;
            let date = event.target.value;
            let res = await getScheduleDoctorByDate(doctorId, date)
            console.log('check res', res)

            if (res && res.errCode === 0) {
                this.setState({
                    allAvailabelTime: res.data ? res.data : []
                })
            }
        }
        console.log('check event', event.target.value,)
    }

    render() {
        let { allDay, allAvailabelTime } = this.state
        let { language } = this.props
        console.log('check allday', allDay)
        return (
            <div className='doctor-schedule-container'>
                <div className='all-schedule'>
                    <select
                        onChange={(event) => this.handleOnchangeSelected(event)}
                    >
                        {allDay && allDay.length > 0 &&
                            allDay.map((item, index) => {

                                return (
                                    <option key={index} value={item.value}>
                                        {item.label}
                                    </option>
                                )
                            })
                        }
                    </select>
                </div>
                <div className='all-availabel-time'>
                    <div className='text-calendar'>
                        <i className="fas fa-calendar-alt">
                            <span> <FormattedMessage id="patient.detail-doctor.schedule" /> </span>
                        </i>
                    </div>
                    <div className='time-content'>
                        {allAvailabelTime && allAvailabelTime.length > 0 ?
                            <>
                                <div className='time-content-btns'>
                                    {allAvailabelTime.map((item, index) => {
                                        let timeDisPlay = language === LANGUAGES.VI ? item.timeTypeData.valueVi : item.timeTypeData.valueEn

                                        return (
                                            <button key={index} className={language === LANGUAGES.VI ? 'btn-vi' : 'btn-en'}>
                                                {timeDisPlay}
                                            </button>
                                        )
                                    })}
                                </div>
                                <div className='book-free'>
                                    <span>
                                        <FormattedMessage id="patient.detail-doctor.chosse" />
                                        <i class="far fa-hand-point-up"></i>
                                        <FormattedMessage id="patient.detail-doctor.and-book-free" /></span>
                                </div>
                            </>

                            :
                            <div className='no-schedule'> <FormattedMessage id="patient.detail-doctor.no-schedule" />  </div>
                        }

                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language,

    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(DoctorSchedule);
