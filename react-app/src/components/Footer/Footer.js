import React from "react";
import './footer.css'

const Footer = () => {
    return (
        <div className="footer">
            <div id='top'>
                <h4>Created By</h4>
            </div>
            <div id='middle'>
                <p>Anai Amy Lopez</p>
            </div>
            <div id='bottom'>
                <a id='about-links' href="https://github.com/anailopez"><i class="fa-brands fa-github" /></a>
                <a id='about-links' href='https://www.linkedin.com/in/anai-lopez-326289241/'><i class="fa-brands fa-linkedin" /></a>
            </div>
        </div>
    )
}

export default Footer
