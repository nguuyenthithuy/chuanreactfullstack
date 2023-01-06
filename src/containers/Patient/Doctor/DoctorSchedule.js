import React, { Component } from 'react';
import { connect } from "react-redux";
import Select from 'react-select';
import moment from 'moment';
import localization from 'moment/locale/vi';
import './DoctorSchedule.scss'
import { LANGUAGES } from '../../../utils';
import { getScheduleDoctorByDate } from '../../../services/userService'

class DoctorSchedule extends Component {

    constructor(props) {
        super(props)
        this.state = {
            allDay: []
        }
    }

    async componentDidMount() {
        let { language } = this.props

        console.log('moment vi', moment(new Date()).format('dddd - DD/MM'))
        console.log('moment en', moment(new Date()).locale('en').format('ddd - DD/MM'))

        // locale để xét tiếng anh tiếng việt nếu không sẽ tự động là tiếng anh
        this.setArrDay(language)


    }
    setArrDay = async (language) => {
        let arrDay = [];
        for (let i = 0; i < 7; i++) {
            let object = {}
            if (language === LANGUAGES.VI) {
                object.label = moment(new Date()).add(i, 'days').format('dddd - DD/MM')
            }
            else {
                object.label = moment(new Date()).add(i, 'days').locale('en').format('ddd - DD/MM')
            }

            object.value = moment(new Date()).add(i, 'days').startOf('days').valueOf()

            // startOf('days) : lấy đầu ngày 00:00:00
            // valueOf() : convert sang kiểu unix TimeStapms

            arrDay.push(object)
        }

        this.setState({
            allDay: arrDay
        })

    }
    componentDidUpdate = (prevProps, prevState, snapshot) => {
        if (prevProps.language !== this.props.language) {
            this.setArrDay(this.props.language)
        }
    }

    handleOnchangeSelected = async (event) => {
        if (this.props.detailDoctorFromparent && this.props.detailDoctorFromparent !== -1) {
            let doctorId = this.props.detailDoctorFromparent;
            let date = event.target.value;
            let res = await getScheduleDoctorByDate(doctorId, date)
            console.log('check res', res)
        }
        console.log('check event', event.target.value,)
    }

    render() {
        let { allDay } = this.state
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
