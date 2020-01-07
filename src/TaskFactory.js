import React from "react"
import TextField from "@material-ui/core/TextField"
import Radio from "@material-ui/core/Radio"
import RadioGroup from "@material-ui/core/RadioGroup"
import FormControlLabel from "@material-ui/core/FormControlLabel"
import FormControl from "@material-ui/core/FormControl"
import FormLabel from "@material-ui/core/FormLabel"
import Grid from "@material-ui/core/Grid"
import FreeBSDSelect from "./FreeBSDSelect"
import WindowsSelect from "./WindowsSelect"
import MacOSSelect from "./MacOSSelect"
import DockerSelect from "./DockerSelect"
import Divider from "@material-ui/core/Divider"
import Button from "@material-ui/core/Button"
import Create from "@material-ui/icons/Create"
import Cache from "@material-ui/icons/Cached"
import Code from "@material-ui/icons/Code"
import CustomizeScript from "./CustomizeScript"
import { withStyles } from "@material-ui/core/styles"

export default withStyles({
    space: {
        marginBottom: "12px"
    }
})(props => {
    let [name, setName] = React.useState("")
    let [taskType, setTaskType] = React.useState("docker")
    let [bsdImg, setBsdImg] = React.useState("")
    let [winImg, setWinImg] = React.useState("")
    let [macImg, setMacImg] = React.useState("")
    let [dkrImage, setDkrImage] = React.useState("debian:latest")

    let componentOsSelect
    switch (taskType) {
        case "docker":
            componentOsSelect = (
                <DockerSelect dkrImage={dkrImage} setDkrImage={setDkrImage} />
            )
            break
        case "win":
            componentOsSelect = (
                <WindowsSelect select={winImg} setSelect={setWinImg} />
            )
            break
        case "macos":
            componentOsSelect = (
                <MacOSSelect select={macImg} setSelect={setMacImg} />
            )
            break
        default:
            componentOsSelect = (
                <FreeBSDSelect select={bsdImg} setSelect={setBsdImg} />
            )
            break
    }

    return (
        <form noValidate autoComplete="off">
            <Grid container spacing={10}>
                <Grid item xs={3}>
                    <TextField
                        label="Task Name"
                        variant="outlined"
                        value={name}
                        onChange={event => setName(event.target.value)}
                    />
                </Grid>
                <Grid item xs={3}>
                    <FormControl component="fieldset">
                        <FormLabel component="legend">Machine Type</FormLabel>
                        <RadioGroup
                            aria-label="machine-type"
                            name="machineType"
                            value={taskType}
                            onChange={event => setTaskType(event.target.value)}
                        >
                            <FormControlLabel
                                value="docker"
                                control={<Radio />}
                                label="Docker"
                            />
                            <FormControlLabel
                                value="macos"
                                control={<Radio />}
                                label="macOS (via Anka)"
                            />
                            <FormControlLabel
                                value="win"
                                control={<Radio />}
                                label="Windows"
                            />
                            <FormControlLabel
                                value="fbsd"
                                control={<Radio />}
                                label="FreeBSD"
                            />
                        </RadioGroup>
                    </FormControl>
                </Grid>
                <Grid item xs={3}>
                    {componentOsSelect}
                </Grid>
                <Grid item xs={3}>
                    <Button
                        className={props.classes.space}
                        variant="contained"
                        color="primary"
                        startIcon={<Create />}
                        endIcon={<Code />}
                    >
                        Add Script
                    </Button>
                    <Button
                        variant="contained"
                        color="primary"
                        startIcon={<Create />}
                        endIcon={<Cache />}
                    >
                        Add Cache
                    </Button>
                </Grid>
            </Grid>
            <br />
            <br />
            <Divider />
        </form>
    )
})
