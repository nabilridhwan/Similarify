import { useEffect, useState } from "react"
import ReactMarkdown from "react-markdown"
import changelog from "../CHANGELOG.md"
import BackButton from "../Components/BackButton"
import Container from "../Components/Container"
export function Changelog() {
    let [markdown, setMarkdown] = useState("")
    useEffect(() => {
        fetch(changelog)
            .then(res => res.text())
            .then(data => {
                setMarkdown(data)
            })
    }, [])
    return (

        <Container>

            <BackButton />

            <div className="changelog-section clear-both py-1">

                <ReactMarkdown>
                    {markdown}
                </ReactMarkdown>
            </div>
        </Container>
    )
}