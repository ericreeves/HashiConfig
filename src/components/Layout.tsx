import React from 'react'
import { useNavigate, useLocation, Route, Routes } from 'react-router-dom'
import Box from '@mui/material/Box'
import MuiList from '@mui/material/List'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemText from '@mui/material/ListItemText'
import { PageHome } from '../pages/PageHome'
import { PageVault } from '../pages/PageVault'
import { PageConsul } from '../pages/PageConsul'
import { PageNomad } from '../pages/PageNomad'

export const Nav: React.FC<{}> = () => {
    const navigate = useNavigate()
    const location = useLocation()
    return <Box style={{display: 'flex', flexDirection: 'column', flexShrink: 0}}>
        <MuiList>
            <ListItemButton onClick={() => navigate('/consul')} selected={'/consul' === location.pathname}>
                <ListItemText primary={'Consul'}/>
            </ListItemButton>
            <ListItemButton onClick={() => navigate('/vault')} selected={'/vault' === location.pathname}>
                <ListItemText primary={'Vault'}/>
            </ListItemButton>
            <ListItemButton onClick={() => navigate('/nomad')} selected={'/nomad' === location.pathname}>
                <ListItemText primary={'Nomad'}/>
            </ListItemButton>
        </MuiList>
    </Box>
}

export const Layout: React.ComponentType<{}> = () => {
    const scrollWrapper = React.useRef<HTMLDivElement | null>(null)

    return <div
        ref={scrollWrapper}
        style={{
            display: 'flex',
            flexDirection: 'column',
            maxHeight: '100%',
            position: 'relative',
            color: '#ffffff',
            overflow: 'auto',
            padding: '0 12px',
        }}
    >
        <Routes>
            <Route path={'/'} element={<PageHome/>}/>
            <Route path={'/consul'} element={<PageConsul/>}/>
            <Route path={'/vault'} element={<PageVault/>}/>
            <Route path={'/nomad'} element={<PageNomad/>}/>
        </Routes>
    </div>
}
