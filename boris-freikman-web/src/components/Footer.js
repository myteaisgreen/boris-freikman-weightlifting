import FacebookIcon from '@material-ui/icons/Facebook';
import InstagramIcon from '@material-ui/icons/Instagram';
import WhatsAppIcon from '@material-ui/icons/WhatsApp';
import React from 'react';

function Footer(){
    return <div>
        <footer>
            <div class='row'>
                <a href="https://www.facebook.com/BarbellPoint"><FacebookIcon></FacebookIcon></a>
                <a href="#"><WhatsAppIcon ></WhatsAppIcon></a>
                <a href="https://www.instagram.com/borisfreikman/"><InstagramIcon></InstagramIcon></a>
            </div>
        </footer>
    </div> 
}

export default Footer