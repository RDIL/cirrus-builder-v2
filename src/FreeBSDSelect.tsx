import React from "react"
import { InputLabel, MenuItem, Select } from "@material-ui/core"

const supportedFreeBsdOses = [
    "freebsd-13-0-snap",
    "freebsd-12-1-snap",
    "freebsd-12-1",
    "freebsd-12-0",
    "freebsd-11-3-snap",
    "freebsd-11-3",
]

interface Props {
    select: string
    setSelect(newSelect: unknown): void
}

const selectors: Array<JSX.Element> = []

for (let i = 0; i < supportedFreeBsdOses.length; i++) {
    const os = supportedFreeBsdOses[i]
    selectors.push(<MenuItem value={os} key={os}>{os}</MenuItem>)
}

const FreeBSDSelect = (props: Props) => (
    <>
        <InputLabel id="freebsd-idr">FreeBSD Image</InputLabel>
        <Select
            labelId="freebsd-idr"
            id="freebsd-idr"
            value={props.select}
            onChange={(event) => props.setSelect(event.target.value)}
        >
            {selectors}
        </Select>
    </>
)

export default FreeBSDSelect
