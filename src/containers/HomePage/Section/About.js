import React, { Component, Fragment } from 'react';

import { connect } from 'react-redux';
import video from "../../../../src/assets/6096740810358120424.mp4"


import { FormattedMessage } from 'react-intl';



class About extends Component {




    render() {


        return (
            <div className='section-share section-about'>
                <div className='section-about-header'>
                    Động lực mỗi ngày
                </div>
                <div className='section-about-content'>
                    <div className='content-left'>

                        <video height="400px" width="25%" src={video} type="video/mp4" controls>

                        </video>


                    </div>
                    <div className='content-right'>
                        <p>
                            Bầu trời xanh, làn mây trắng. Anh yêu nắng hay yêu em?


                            2. Nhờ có nắng mới thấy cầu vồng. Nhờ có anh mới thấy màu hạnh phúc.


                            3. Anh yêu ơi ới ời. Anh đang ở đâu?


                            4. Soái ca là của ngôn tình. Còn anh thì chỉ của mình em thôi.


                            5. Giữa cuộc đời hàng ngàn cám dỗ.Em chỉ cần bến đỗ anh thôi.


                            6. Bồ công anh bay khi có gió. Em chỉ cười vì ở đó có anh.


                            7. Chỉ cần anh nói yêu, em sẽ bám theo anh suốt đời. Cô gái đang muốn muốn bật đèn xanh đấy. Cô nàng muốn gợi ý là mình chung thủy lắm đấy. Anh cứ thử tỏ tình mà xem.
                        </p>
                    </div>

                </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(About);
