import React, { Component, Fragment } from 'react';

import { connect } from 'react-redux';


import { FormattedMessage } from 'react-intl';



class HomeFooter extends Component {




    render() {


        return (
            <div className='home-footer'>
                <p>&copy; 2022 Nguyễn Thành Đạt đang thấy lú vlon. Nhấn vào đây để ib facebook
                    <a target='_blank' href='https://www.facebook.com/'> &#8594; Click here &#8592;</a>
                </p>
            </div>


        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language
    };
};

const mapDispatchToProps = dispatch => {
    return {

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeFooter);
