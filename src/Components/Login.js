import { Link } from "react-router-dom";
import listeningImage from '../images/listening.png';
import { FaSpotify } from "react-icons/fa";
import { useEffect } from "react";
import SpotifyApi from "../Libraries/SpotifyApi";
export default function Login() {

    useEffect(() => {
        new SpotifyApi().authenticateUser();
    }, []);

    return (
        <div>

            <div className="row my-5 align-items-center">
                <div className="col-lg-6">

                    <h1>Welcome to <br /> <span className="text-brand-color">Similarify</span></h1>
                    <p>Powered by Spotify and LastFM, Similarify is an application that helps you discover the songs you like based on the songs you already like! </p>

                    <div className="my-5">
                        <h5>Similarify itself does not collect any data whatsoever.</h5>
                        <p>To get started, connect your Spotify Account (Only for beta-testers)</p>

                        <h6>Spotify's API Limit</h6>
                        <p>Similarify is now requesting for quota extension request from Spotify so that other users can use this application! Similarify is currently only open to beta-testers (25 users).
                            If you are part of the beta-testing program, Login with your certified beta-tester Spotify account.</p>

                        <Link to="/login" className="btn btn-success btn-lg">
                            <FaSpotify className="mx-2" />
                            Login with Spotify
                        </Link>
                    </div>

                </div>

                <div className="col-lg-6">
                    <img src={listeningImage} alt="a girl listening to music" className="img-fluid" />
                </div>
            </div>
        </div>
    )
}