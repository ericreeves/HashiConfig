import React from 'react'
import Container from '@mui/material/Container'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { Nav } from '../components/Layout'
import {
    createOrderedMap, createStore, injectPluginStack, JsonSchema,
    onChangeHandler, storeUpdater,
    UIStoreProvider,
} from '@ui-schema/ui-schema'
import { OrderedMap } from 'immutable'
import { GridContainer } from '@ui-schema/ds-material/GridContainer'
import { DataDebug } from '../components/DataDebug'

const schema = createOrderedMap({
    "type": "object",
    "title": "Consul Agent Configuration",
    "required": ["node_name", "data_dir", "log_level"],

    "definitions": {
        "ip": {
            "type": "string",
            "title": "IP Address (ex: 0.0.0.0)"
        },
        "directory": {
            "type": "string",
            "title": "Filsystem Path"
        },
        "log_level": {
            "type": "string",
            "widget": "Select",
            "enum": ["INFO", "WARN", "DEBUG"],
            "title": "Log Level",
            "info": ["Log Verbosity Level"]
        },
        "bootstrap_expect": {
            "type": "number",
            "widget": "NumberSlider",
            "exclusiveMinimum": 0,
            "exclusiveMaximum": 8,
            "enum": [1, 3, 5, 6, 7],
            "view": {
                "marks": true,
                "marksLabel": " Nodes",
                "tooltip": "auto",
                "sizeXs": 10,
                "sizeMd": 8
            },
            "title": "Bootstrap Expect",
            "info": [
                "Total number of Consul servers that must peer in order for the cluster to bootstrap"
            ]
        },
        "list": {
            "type": "array",
            "widget": "GenericList",
            "items": {
                "$ref": "#/definitions/list_item"
            }
        },
        "list_item": {
            "type": "string"
        }
    },

    "properties": {
        "node_name": {
            "type": "string",
            "title": "Node Name",
            "info": ["Human-Readable Node Name"]
        },
        "node_meta": {
            "$ref": "#/definitions/meta_list"
        },
        "data_dir": {
            "$ref": "#/definitions/directory",
            "title": "Data Directory",
            "info": [
                "Local Filesystem Directory Used by Consul to Persist Data"
            ]
        },
        "advertise_addr": {
            "type": "string",
            "title": "Advertise Address",
            "info": [
                "IP Address / Hostname to advertise to other Consul cluster peers (use if Consul is behind a load balancer or proxy)"
            ]
        },
        "client_addr": {
            "type": "string",
            "title": "Client Address",
            "info": ["Client address or something"]
        },
        "log_level": {
            "$ref": "#/definitions/log_level"
        },
        "ui": {
            "type": "boolean",
            "info": "Enable the Consul Web UI?",
            "deleteOnEmpty": true
        },
        "server": {
            "type": "boolean",
            "deleteOnEmpty": true,
            "info": ["Is this a Consul server?  If not, it's a client."]
        },
        "addresses": {
            "type": "object",
            "widget": "Accordions",
            "properties": {
                "http": {
                    "title": "Configure HTTP Listen Address(es)?",
                    "$ref": "#/definitions/ip"
                },
                "https": {
                    "title": "Configure HTTPS Listen Address(es)?",
                    "$ref": "#/definitions/ip"
                },
                "dns": {
                    "title": "Configure DNS Listen Address(es)?",
                    "$ref": "#/definitions/ip"
                },
                "grpc": {
                    "title": "Configure GRPC Listen Address(es)?",
                    "$ref": "#/definitions/ip"
                }
            }
        },
        "verify_incoming": {
            "type": "boolean"
          },
          "verify_outgoing": {
            "type": "boolean"
          },
          "verify_server_hostname": {
            "type": "boolean"
          }
    },
    "dependencies": {
        "server": {
            "properties": {
                "bootstrap_expect": {
                    "$ref": "#/definitions/bootstrap_expect"
                },
                "datacenter": {
                    "type": "string",
                    "title": "Datacenter",
                    "info": ["Datacenter ID for this Consul Instance"]
                },
                "primary_datacenter": {
                    "type": "string",
                    "title": "Primary Datacenter",
                    "info": ["Primary Datacenter of the Cluster"]
                }
            }
        }
    }
} as JsonSchema)

const GridStack = injectPluginStack(GridContainer)
const DemoComponent = () => {
    const showValidity = true
    const [store, setStore] = React.useState(() => createStore(OrderedMap({})))

    const onChange: onChangeHandler = React.useCallback(
        (actions) => setStore(storeUpdater(actions)),
        [setStore],
    )

    return <React.Fragment>
        <UIStoreProvider
            store={store}
            onChange={onChange}
            showValidity={showValidity}
        >
            <GridStack
                schema={schema}
                showValidity={showValidity}
                isRoot
            />

            <DataDebug/>
        </UIStoreProvider>
    </React.Fragment>
}

export const PageConsul: React.ComponentType = () => {
    return <>
        <Container maxWidth={'md'} fixed style={{display: 'flex'}}>
            <Nav/>
            <Box mx={2} py={1} style={{flexGrow: 1}}>
                <Box mb={2}>
                    <Typography variant={'h1'} gutterBottom>Consul Configuration</Typography>
                    <Typography variant={'body2'} gutterBottom>Consul config generator incorporating best-practices guidance, configuration key depdencies, and input validation.</Typography>
                </Box>
                <DemoComponent/>
            </Box>
        </Container>
    </>
}
