import React from 'react'
import { AppBar} from '@mui/material'
import { Toolbar } from '@mui/material'
import Logo from './shared/Logo'
import { useAuth } from '../context/AuthContext'
import NavigationLink from './shared/NavigationLink'

function Header() {
  const auth = useAuth();
  console.log("status of login", auth?.isLoggedIn)
  return (
    <AppBar sx={{bgcolor: "transparent", position: "static", boxShadow: "none"}}>
      <Toolbar sx={{display:"flex"}}>
        <Logo/>
        {/* console.log() */}
        <div>
          {auth?.isLoggedIn ? (
            <>
              <NavigationLink bg="#00fffc" to="/chat" text="Go To Chat" textColor="black" />
              <NavigationLink bg="#51538f" to="/" text="logout" textColor="white" onClick={auth.logout} />
            </>
          ) : (<>
                <NavigationLink bg="#00fffc" to="/login" text="Login" textColor="black" />
              <NavigationLink bg="#51538f" to="/signup" text="Signup" textColor="white"/>
          </>)}
        </div>
      </Toolbar>
    </AppBar>
  )
}

export default Header