import React, { Component, Fragment } from 'react';
import NavMenuDesktop from '../components/common/NavMenuDesktop';
import NavMenuMobile from '../components/common/NavMenuMobile';
import FooterDesktop from '../components/common/FooterDesktop';
import FooterMobile from '../components/common/FooterMobile';
import UserRegister from '../components/common/UserRegister';

class RegisterPage extends Component {

    componentDidMount() {
        window.scroll(0, 0);
    }

    render() {
        const setUser = this.props.setUser
        const user = this.props.user

        return (
            <Fragment>
                <div className="Desktop">
                    <NavMenuDesktop />
                </div>

                <div className="Mobile">
                    <NavMenuMobile />
                </div>

                <UserRegister setUser={setUser} user={user} />

                <div className="Desktop">
                    <FooterDesktop />
                </div>

                <div className="Mobile">
                    <FooterMobile />
                </div>
            </Fragment>
        );
    }
}

export default RegisterPage;