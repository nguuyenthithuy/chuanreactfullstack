import React, { Component } from 'react';

import { connect } from 'react-redux';

import { FormattedMessage } from 'react-intl';
import Slider from "react-slick";
import *as actions from "../../../store/actions"
import { isConstructorDeclaration } from 'typescript';
import { LANGUAGES } from "../../../utils";
import { withRouter } from 'react-router-dom';

class OutStandingDoctor extends Component {
    constructor(props) {
        super(props)
        this.state = {
            arrDoctor: []
        }
    }

    componentDidMount() {
        this.props.loadTopDoctor()
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.topDoctorsRedux !== this.props.topDoctorsRedux) {
            this.setState({
                arrDoctor: this.props.topDoctorsRedux
            })
        }
    }

    handleViewDoctor = (doctor) => {
        console.log('check doctor', doctor)
        this.props.history.push(`/detail-doctor/${doctor.id}`)
    }

    render() {

        console.log('check redux topdoctor', this.props.topDoctorsRedux)
        let arrDoctors = this.state.arrDoctor
        // arrDoctors = arrDoctors.concat(arrDoctors).concat(arrDoctors) // double arrDoctors

        let { language } = this.props
        return (
            <div className='section-share section-outstanding-doctor'>
                <div className='section-container'>
                    <div className='section-header'>
                        <span className='title-section'>
                            <FormattedMessage id="homePage.outstanding-doctor" />

                        </span>
                        <button className='btn-section'>
                            <FormattedMessage id="homePage.more-infor" />

                        </button>
                    </div>
                    <div className='section-body'>
                        <Slider {...this.props.settings}>

                            {arrDoctors && arrDoctors.length > 0 &&
                                arrDoctors.map((item, index) => {
                                    let imageBase64 = ''
                                    if (item.image) {
                                        imageBase64 = new Buffer(item.image, 'base64').toString('binary')
                                    }
                                    let nameVi = `${item.positionData.valueVi} ,${item.lastName} ${item.firstName} `
                                    let nameEn = `${item.positionData.valueEn} ,${item.firstName} ${item.lastName}`
                                    return (
                                        <div className='section-customize' key={index}
                                            onClick={() => this.handleViewDoctor(item)}
                                        >
                                            <div className='customize-border'>

                                                <div className='outer-bg'>
                                                    <div className='bg-image section-outstanding-doctor'
                                                        style={{ backgroundImage: `url(${imageBase64})` }}
                                                    />
                                                </div>

                                                <div className='position text-center'>
                                                    <div>{language === LANGUAGES.VI ? nameVi : nameEn}</div>
                                                    <div>Cơ xương khớp</div>
                                                </div>
                                            </div>


                                        </div>
                                    )
                                })
                            }



                        </Slider>
                    </div>

                </div>

            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        topDoctorsRedux: state.admin.topDoctors,
        language: state.app.language,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        loadTopDoctor: () => dispatch(actions.fetchTopDoctor())
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(OutStandingDoctor));
