import React from "react"
import {
    TextField,
    Radio,
    RadioGroup,
    FormControl,
    FormControlLabel,
    FormLabel,
    Grid,
    Button,
    Tab,
    Tabs,
    Typography,
} from "@material-ui/core"
import FreeBSDSelect from "./FreeBSDSelect"
import WindowsSelect from "./WindowsSelect"
import MacOSSelect from "./MacOSSelect"
import DockerSelect from "./DockerSelect"
import {
    Script,
    CICache,
    Machine,
    Artifact,
    machineType,
    EnvironmentVariable,
} from "./classes"
import ScriptConfig from "./ScriptConfig"
import CacheConfig from "./CacheConfig"
import ArtifactConfig from "./ArtifactConfig"
import Centered from "./Centered"
import Popup from "./Popup"
import { Backup, Create, Cached, Code, DoneOutlined } from "@material-ui/icons"
import AceEditor from "react-ace"

import "ace-builds/src-noconflict/mode-yaml"
import "ace-builds/src-noconflict/theme-xcode"
import EnvironmentVariables from "./EnvironmentVariables"

type Instruction = Script | CICache | Artifact
const instructions: Instruction[] = []
const mtype = new Machine()

const TaskFactory = () => {
    const [tab, setTab] = React.useState(0)
    const [name, setName] = React.useState("") // current task name
    const [freeBsdVersion, setFreeBsdVersion] = React.useState("")
    const [macOsVersion, setMacOsVersion] = React.useState("")
    const [dockerImage, setDockerImage] = React.useState("debian:latest")
    const [dialogIsOpen, setDialogIsOpen] = React.useState(false)
    // a state that allows us to make react think the dom needs
    // to be re-rendered when we change it.
    const [, setForce] = React.useState(0)
    const [envVars, setEnvVars] = React.useState([] as EnvironmentVariable[])

    let osOptionsComponent: JSX.Element
    switch (mtype.getType()) {
        case "docker":
            osOptionsComponent = (
                <DockerSelect value={dockerImage} setValue={setDockerImage} />
            )
            break
        case "win":
            osOptionsComponent = <WindowsSelect />
            break
        case "mac":
            osOptionsComponent = (
                <MacOSSelect value={macOsVersion} setValue={setMacOsVersion} />
            )
            break
        default:
            osOptionsComponent = (
                <FreeBSDSelect
                    value={freeBsdVersion}
                    setValue={setFreeBsdVersion}
                />
            )
            break
    }

    /**
     * Rerenders the page.
     */
    function rerender() {
        setForce(Math.random() * Math.random())
    }

    const drawers: Array<JSX.Element> = []
    instructions.forEach((futureInstruction) => {
        if (futureInstruction instanceof CICache) {
            drawers.push(
                <CacheConfig
                    cache={futureInstruction}
                    key={futureInstruction.getId()}
                />
            )
        } else if (futureInstruction instanceof Script) {
            drawers.push(
                <ScriptConfig
                    script={futureInstruction}
                    key={futureInstruction.getId()}
                />
            )
        } else {
            drawers.push(
                <ArtifactConfig
                    artifact={futureInstruction}
                    key={futureInstruction.getId()}
                />
            )
        }
    })

    const exportYaml = () => {
        const collectedInstructions = instructions
            .map((i) => i.toString() as string)
            .join("\n    ")
        const value = `\
task:
    # Basic metadata:
    name: ${name}

    # The build machine:
    ${mtype.toString(macOsVersion, freeBsdVersion, dockerImage)}

    ${EnvironmentVariable.createEnvBlock(envVars)}

    # Instructions:
    ${collectedInstructions}
`

        return (
            <AceEditor
                placeholder="Welcome to the YAML editor!"
                mode="yaml"
                theme="xcode"
                value={value}
                name={"YAML_EDITOR_" + String(Math.random() * 10)}
                editorProps={{ $blockScrolling: true }}
            />
        )
    }

    const general = (
        <form noValidate>
            <Grid container spacing={10}>
                <Grid item xs>
                    <TextField
                        label="Task Name"
                        variant="outlined"
                        value={name}
                        required={true}
                        onChange={(event) => setName(event.target.value)}
                    />
                </Grid>
                <Grid item xs>
                    <FormControl component="fieldset">
                        <FormLabel component="legend">Machine Type</FormLabel>
                        <RadioGroup
                            aria-label="machine-type"
                            name="machineType"
                            value={mtype.getType()}
                            onChange={(event) => {
                                mtype.setType(event.target.value as machineType)
                                rerender()
                            }}
                        >
                            <FormControlLabel
                                value="docker"
                                control={<Radio disableRipple />}
                                label="Docker Image"
                            />
                            <FormControlLabel
                                value="mac"
                                control={<Radio disableRipple />}
                                label="macOS"
                            />
                            <FormControlLabel
                                value="win"
                                control={<Radio disableRipple />}
                                label="Windows"
                            />
                            <FormControlLabel
                                value="fbsd"
                                control={<Radio disableRipple />}
                                label="FreeBSD"
                            />
                        </RadioGroup>
                    </FormControl>
                </Grid>
                <Grid item xs>
                    {osOptionsComponent}
                </Grid>
                <Grid item xs>
                    <Button
                        variant="contained"
                        color="primary"
                        startIcon={<Create />}
                        endIcon={<Code />}
                        onClick={() => {
                            instructions.push(new Script())
                            rerender()
                        }}
                    >
                        Add Script
                    </Button>
                    <br />
                    <br />
                    <Button
                        variant="contained"
                        color="primary"
                        startIcon={<Create />}
                        endIcon={<Cached />}
                        onClick={() => {
                            instructions.push(new CICache())
                            rerender()
                        }}
                    >
                        Add Cache
                    </Button>
                    <br />
                    <br />
                    <Button
                        variant="contained"
                        color="primary"
                        startIcon={<Create />}
                        endIcon={<Backup />}
                        onClick={() => {
                            instructions.push(new Artifact())
                            rerender()
                        }}
                    >
                        Add Artifact
                    </Button>
                </Grid>
            </Grid>
            <br />
            <br />
            {drawers}
        </form>
    )

    const exportTab = (
        <>
            <Centered>
                <Typography>
                    Press the button below to export the configuration to YAML.
                    You can always edit it after exporting by closing the dialog
                    and going back.
                </Typography>
            </Centered>
            <Centered>
                <Button
                    variant="contained"
                    color="secondary"
                    endIcon={<DoneOutlined />}
                    onClick={() => setDialogIsOpen(true)}
                >
                    Export
                </Button>
            </Centered>
        </>
    )

    const env = <EnvironmentVariables value={envVars} setValue={setEnvVars} />

    return (
        <>
            <Tabs
                style={{ marginBottom: 40 }}
                value={tab}
                onChange={(_e, val) => setTab(val)}
                indicatorColor="primary"
                textColor="primary"
                centered
            >
                <Tab label="General Options" />
                <Tab label="Environment Variables" />
                <Tab label="Export" />
            </Tabs>
            {tab === 0 ? general : null}
            {tab === 1 ? env : null}
            {tab === 2 ? exportTab : null}
            {dialogIsOpen ? (
                <Popup
                    handleClose={setDialogIsOpen}
                    title={"Generated YAML"}
                    desc={exportYaml()}
                />
            ) : (
                <div hidden />
            )}
        </>
    )
}

export default TaskFactory
