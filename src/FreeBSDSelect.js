import React from "react"
import InputLabel from "@material-ui/core/InputLabel"
import MenuItem from "@material-ui/core/MenuItem"
import Select from "@material-ui/core/Select"

const supportedFreeBsdOses = [
    "freebsd-13-0-snap",
    "freebsd-12-1-snap",
    "freebsd-12-1",
    "freebsd-12-0",
    "freebsd-11-3-snap",
    "freebsd-11-3"
]

let selectors = []
for (let i = 0; i < supportedFreeBsdOses.length; i++) {
    const os = supportedFreeBsdOses[i]
    selectors.push(<MenuItem value={os}>{os}</MenuItem>)
}

export default props => {
    return (
        <>
            <InputLabel id="freebsd-idr">FreeBSD OS Image</InputLabel>
            <Select
                labelId="freebsd-idr"
                id="freebsd-idr"
                value={props.select}
                onChange={event => props.setSelect(event.target.value)}
            >
                {selectors}
            </Select>
        </>
    )
}