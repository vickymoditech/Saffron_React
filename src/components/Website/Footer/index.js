import React, {Component} from 'react';
import './Footer.css';

class Footer extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (

            <div>

                <footer class="footer">
                    <div class="container bottom_border">
                        <div class="row">
                            <div class=" col-sm-4 col-md col-sm-4  col-12 col">
                                <h5 class="headin5_amrc col_white_amrc pt2">Find us</h5>

                                <p class="mb10">Lorem Ipsum is simply dummy text of the printing and typesetting
                                    industry. Lorem Ipsum has been the industry's standard dummy text ever since the
                                    1500s</p>
                                <p><i class="fa fa-location-arrow"></i> 9878/25 sec 9 rohini 35 </p>
                                <p><i class="fa fa-phone"></i> +91-9999878398 </p>
                                <p><i class="fa fa fa-envelope"></i> info@example.com </p>


                            </div>


                            <div class=" col-sm-4 col-md  col-6 col">
                                <h5 class="headin5_amrc col_white_amrc pt2">Quick links</h5>

                                <ul class="footer_ul_amrc">
                                    <li><a href="http://kalarikendramdelhi.com">Home</a></li>
                                    <li><a href="http://kalarikendramdelhi.com">About</a></li>
                                    <li><a href="http://kalarikendramdelhi.com">Services</a></li>
                                    <li><a href="http://kalarikendramdelhi.com">Pricing</a></li>
                                    <li><a href="http://kalarikendramdelhi.com">Blog</a></li>
                                    <li><a href="http://kalarikendramdelhi.com">Contact</a></li>
                                </ul>
                            </div>

                        </div>
                    </div>


                    <div class="container">
                        <p class="text-center">Copyright @2017 | Designed With by <a href="#">Your Company Name</a></p>

                        <ul class="social_footer_ul">
                            <li><a href="http://kalarikendramdelhi.com"><i class="fab fa-facebook-f"></i></a></li>
                            <li><a href="http://kalarikendramdelhi.com"><i class="fab fa-twitter"></i></a></li>
                            <li><a href="http://kalarikendramdelhi.com"><i class="fab fa-linkedin"></i></a></li>
                            <li><a href="http://kalarikendramdelhi.com"><i class="fab fa-instagram"></i></a></li>
                        </ul>

                    </div>
                </footer>
            </div>

        )
    }

}

export default Footer;
