import React from "react"
import TextField from "@material-ui/core/TextField"

interface Props {
    dockerImage: string
    setDockerImage(newImage: string): void
}

const DockerSelect = (props: Props) => {
    const error = !props.dockerImage.includes(":")

    return (
        <TextField
            label="Docker Image"
            variant="outlined"
            value={props.dockerImage}
            onChange={(event) => props.setDockerImage(event.target.value)}
            error={error}
            helperText={
                error ? "That doesn't look like a vaild Docker image!" : ""
            }
        />
    )
}

export default DockerSelect
