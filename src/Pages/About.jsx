import BackButton from "../Components/BackButton";
import Container from "../Components/Container";


import { SiReact, SiTailwindcss, SiFramer, SiSentry, SiSpotify, SiRedux } from "react-icons/si"

export default function About() {
    return (
        <Container>
            <BackButton />

            <div className="py-5 clear-both">
                <h1 className="font-bold text-2xl" >
                    About Similarify
                </h1>
                <p className="dark:text-white/60 text-black/60">
                    More information and common questions about Similarify
                </p>
            </div>

            <div className="grid md:grid-cols-2 gap-5">
                <div className="section section-card flex flex-col">

                    <div className="flex-1">

                        <h2>
                            Found a bug or want a feature? 🐛🎁*
                        </h2>
                        <p className="text-lg">
                            Submit an issue <a href="https://github.com/nabilridhwan/similarify/issues" className="underline">here</a>.
                        </p>
                    </div>

                    <p className="text-sm mt-5">
                        * Please state clearly how you reproduced the issue or which aspect of the application you want to request new features for.
                    </p>
                </div>

                <div className="section section-card flex flex-col">

                    <div className="flex-1">

                        <h2>
                            Try out new features ✨*
                        </h2>
                        <p className="text-lg">
                            You can try out cutting-edge features <a href="https://next--similarify.netlify.app/" className="underline">here</a>.
                        </p>
                    </div>

                    <p className="text-sm mt-5">
                        * Note that features from the beta branch might not make its way into the public release and features are subject to change.
                    </p>
                </div>
            </div>

            <div className="section spacing">
                <h2>
                    Is Similarify open-source?
                </h2>
                <p>
                    Yes, Similarify is open-source and it's Github project can be found <a href="https://github.com/nabilridhwan/similarify" className="underline">here</a> and the <strong>next</strong> version of Similarify can be found <a href="https://github.com/nabilridhwan/similarify/tree/next" className="underline">here</a>.
                </p>
            </div>

            <div className="section spacing">
                <h2>
                    Why is Similarify created?
                </h2>
                <p>
                    Similarify is created when I wanted to find ways to discover songs to the ones I already like.
                </p>
            </div>

            <div className="section spacing">
                <h2>
                    What is Similarify built on?
                </h2>

                <span className="icons flex text-2xl gap-2 my-4">
                    <SiReact />
                    <SiRedux />
                    <SiTailwindcss />
                    <SiSpotify />
                    <SiFramer />
                    <SiSentry />
                </span>
                <p>
                    Similarify is built on React, Redux, Tailwind CSS, Spotify API (and uses the recommendations algorithms from them), Framer motion for animations and Sentry for error reporting in production.
                </p>
            </div>

            <div className="section spacing">
                <h2>
                    Does Similarify collect data?
                </h2>
                <p>
                    Similarify does not collect any data. Similarify only uses your Spotify account to search for tracks, get your playlists, liked songs, recently played and currently playing track and create or modify existing playlists.
                </p>
            </div>

        </Container>
    )
}