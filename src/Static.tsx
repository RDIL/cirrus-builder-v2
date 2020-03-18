import React from "react"
import Typography from "@material-ui/core/Typography"

export const Errors = () => (
    <>
        <Typography>Make sure all of these criteria are filled:</Typography>
        <ul>
            <li>The task has a title</li>
            <li>The task has a valid type and version selected</li>
            <li>You have at least 1 script</li>
            <li>All scripts/caches have a valid name (no spaces!)</li>
        </ul>
    </>
)
