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
    "required": ["datacenter", "data_dir", "log_level", "client_addr"],

    "definitions": {
        "ip": {
            "type": "string",
            "title": "IP Address (ex: 0.0.0.0)"
        },
        "port": {
            "type": "string",
            "title": "Port (ex 1-65536)"
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
        "log_level": {
            "$ref": "#/definitions/log_level"
        },
        "auto_reload_config": {
            "type": "boolean",
            "info": [ "Auto-reload configuration files from disk when changes are detected?" ],
            "deleteOnEmpty": true
        },
        "license_path": {
            "$ref": "#/definitions/directory",
            "title": "Licence Path",
            "info": [
                "Local Filesystem Path to Enterprise License File"
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
            "widget": "Card",
            "title": "Listen Addresses",
            "view": {
                "variant": "outlined"
            },
            "properties": {
                "http": {
                    "title": "Configure HTTP Listen Address(es)",
                    "$ref": "#/definitions/ip"
                },
                "https": {
                    "title": "Configure HTTPS Listen Address(es)",
                    "$ref": "#/definitions/ip"
                },
                "dns": {
                    "title": "Configure DNS Listen Address(es)",
                    "$ref": "#/definitions/ip"
                },
                "grpc": {
                    "title": "Configure GRPC Listen Address(es)",
                    "$ref": "#/definitions/ip"
                }
            }
        },
        "ports": {
            "type": "object",
            "widget": "Card",
            "title": "Listen Ports",
            "view": {
                "variant": "outlined"
            },
            "properties": {
                "http": {
                    "title": "Configure HTTP Listen Port",
                    "$ref": "#/definitions/port"
                },
                "https": {
                    "title": "Configure HTTPS Listen Port",
                    "$ref": "#/definitions/port"
                },
                "dns": {
                    "title": "Configure DNS Listen Port",
                    "$ref": "#/definitions/port"
                },
                "grpc": {
                    "title": "Configure GRPC Listen Port",
                    "$ref": "#/definitions/port"
                },
                "serf_lan": {
                    "title": "Configure SERF LAN Listen Port",
                    "$ref": "#/definitions/port"
                },
                "serf_wan": {
                    "title": "Configure SERF WAN Listen Port",
                    "$ref": "#/definitions/port"
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
        },
        "disable_keyring_file": {
            "type": "boolean",
            "info": [ "If set, the keyring will not be persisted to a file. Any installed keys will be lost on shutdown, and only the given -encrypt key will be available on startup. This defaults to false." ]
        },
        "alt_domain": {
            "type": "string",
            "info": [ "Allows Consul to respond to DNS queries in an alternate domain, in addition to the primary domain." ]
        },
        "auto_pilot": {
            "type": "object",
            "info": [ "Auto pilot configures various settings within consul. Most of these should never be changed unless done with advanced Consul tuning knowledge.",
                      "After bootstrapping consul, Auto pilot values can only be changed via 'consul operator autopilot' commands."],
            "properties": {
                "cleanup_dead_servers": {
                    "type": "boolean",
                    "info": [ "This controls the automatic removal of dead server nodes periodically and whenever a new server is added to the cluster." ]
                },
                "last_contact_threshold": {
                    "type": "string",
                    "info": [ "Controls the maximum amount of time a server can go without contact from the leader before being considered unhealthy. Must be a duration value such as 10s." ]
                },
                "max_trailing_logs": {
                    "type": "string",
                    "info": [ "Controls the maximum number of log entries that a server can trail the leader by before being considered unhealthy." ]
                },
                "min_quorum": {
                    "type": "string",
                    "info": [ "Sets the minimum number of servers necessary in a cluster. Autopilot will stop pruning dead servers when this minimum is reached." ]
                },
                "server_stabilization_time": {
                    "type": "string",
                    "info": [ "Controls the minimum amount of time a server must be stable in the 'healthy' state before being added to the cluster. Only takes effect if all servers are running Raft protocol version 3 or higher. Must be a duration value such as 30s." ]
                },
                "redundancy_zone_tag": {
                    "type": "string",
                    "info": [ "This controls the node_meta key to use when Autopilot is separating servers into zones for redundancy. Only one server in each zone can be a voting member at one time. If left blank (the default), this feature will be disabled." ]
                },
                "disable_upgrade_migration": {
                    "type": "string",
                    "info": [ "If set to true, this setting will disable Autopilot's upgrade migration strategy in Consul Enterprise of waiting until enough newer-versioned servers have been added to the cluster before promoting any of them to voters. " ]
                },
                "upgrade_version_tag": {
                    "type": "string",
                    "info": [ "The node_meta tag to use for version info when performing upgrade migrations. If this is not set, the Consul version will be used." ]
                }
                // "": {
                //     "type": "string",
                //     "info": [ "" ]
                // },
            }
        },
        "cache": {
            "type": "object",
            "widget": "Card",
            "title": "Cache Options (Client Only)",
            "view": {
                "variant": "outlined"
            },
            "properties": {
                "entry_fetch_max_burst": {
                    "type": "string"
                },
                "entry_fetch_rate": {
                    "type": "string"
                },
                "update_interval": {
                    "type": "string"
                }
            }
        },
        "disable_update_check": {
            "type": "boolean"
        },
        "disable_anonymous_signature": {
            "type": "boolean"
        },
        "leave_on_terminate": {
            "type": "boolean"
        },
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
