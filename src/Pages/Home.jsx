// import listeningImage from './images/listening.png';
import { FaSpotify } from "react-icons/fa"
import { SiReact, SiTailwindcss, SiFramer, SiSentry } from "react-icons/si"
import { Link } from "react-router-dom";
import Container from '../Components/Container';
import Footer from '../Components/Footer';

export default function Home() {
    return (
        <Container>

            {/* Header */}
            <div className='mt-20'>
                <h1 className='text-6xl font-extrabold my-2'>
                    Yikes, Similarify is under maintainence
                </h1>
                <p className='dark:text-white/60 text-black/60 text-lg'>
                    Something big has happened and Similarify is under maintainence. Please come again later :)
                </p>
            </div>


            <Footer />

        </Container>
    );

}