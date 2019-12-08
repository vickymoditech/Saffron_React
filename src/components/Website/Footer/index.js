import React, {Component} from 'react';

class Footer extends Component {

    render() {
        return (
            <div>
                <footer class="page-footer footer_section mt-md-5">
                    <div class="container">
                        <div class="row">
                            <div class="col-md-4">
                                <div class="side1 mt-md-5 mb-md-5">
                                    <span>About Imahe</span>
                                    <p class="pt-md-3">Far from the countries Vokalia and Consonantia, there live the blind texts. Separated they live in Bookmarksgrove right at the coast of the Semantics</p>
                                    <div class="d-flex">
                                        <i class="fa fa-twitter mr-md-2"></i>
                                        <i class="fa fa-facebook mr-md-2"></i>
                                        <i class="fa fa-linkedin mr-md-2"></i>
                                        <i class="fa fa-dribbble mr-md-2"></i>
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-4">
                                <div class="side2 mt-md-5 mb-md-5">
                                    <span>Information</span>
                                    <div class="d-flex flex-column pt-md-3">
                                        <div><i class="fa fa-check"></i><a href="#"> Home</a></div>
                                        <div><i class="fa fa-check"></i><a href="#"> Gallery</a></div>
                                        <div> <i class="fa fa-check"></i><a href="#"> About</a></div>
                                        <div><i class="fa fa-check"></i><a href="#"> Blog</a></div>
                                        <div><i class="fa fa-check"></i><a href="#"> Contact</a></div>
                                        <div><i class="fa fa-check"></i><a href="#"> Privacy</a></div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-4">
                                <div class="side3 mt-md-5 mb-md-5">
                                    <span class="side3_title">Contact Info</span>
                                    <div class="pt-md-3">
                                        <span class="side3_content1">291 South 21th Street,</span>
                                    </div>
                                    <span class="side3_content1">Suite 721 New York NY 10016</span>
                                    <div class="mt-md-3">
                                        <div>
                                            <i class="fa fa-phone pr-md-2"></i> <a href="tel:+1235235598">+1235 2355 98</a></div>
                                        <div class="pt-md-2">
                                            <i class="fa fa-envelope-open-o pr-md-2"></i> <a href="mailto:info@yoursite.com">info@yoursite.com</a>
                                        </div>
                                        <div class="pt-md-2">
                                            <i class="fa fa-globe pr-md-2"></i> <a href="#">yourwebsite.com</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="second_footer pt-md-4 pb-md-3">
                        <div class="container">
                            <p class="text-center">Copyright ©2019 All rights reserved | This template is made with <i class="fa fa-heart-o"></i> by Colorlib
                                Demo Images: Unsplash, Pexels</p>
                        </div>
                    </div>
                </footer>
            </div>
        )
    }

}

export default Footer;
