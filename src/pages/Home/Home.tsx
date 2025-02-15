import React, { useEffect, useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import FormControl from '@mui/material/FormControl'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import Divider from '@mui/material/Divider'
import IconButton from '@mui/material/IconButton'
import Link from '@mui/material/Link'
import GitHubIcon from '@mui/icons-material/GitHub'
import Tooltip from '@mui/material/Tooltip'
import { v4 as uuid } from 'uuid'

import { ShellContext } from 'contexts/ShellContext'
import { PeerNameDisplay } from 'components/PeerNameDisplay'
import { ReactComponent as Logo } from 'img/logo.svg'

interface HomeProps {
  userId: string
}

export function Home({ userId }: HomeProps) {
  const { setTitle } = useContext(ShellContext)
  const [roomName, setRoomName] = useState(uuid())
  const navigate = useNavigate()

  useEffect(() => {
    setTitle('Chitchatter')
  }, [setTitle])

  const handleRoomNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target
    setRoomName(value)
  }

  const handleFormSubmit = (event: React.SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault()
    navigate(`/public/${roomName}`)
  }

  return (
    <Box className="Home">
      <main className="mt-6 px-4 max-w-3xl text-center mx-auto">
        <Logo className="px-1 pb-4 mx-auto max-w-md" />
        <form onSubmit={handleFormSubmit} className="max-w-xl mx-auto">
          <Typography sx={{ mb: 2 }}>
            Your user name:{' '}
            <PeerNameDisplay paragraph={false} sx={{ fontWeight: 'bold' }}>
              {userId}
            </PeerNameDisplay>
          </Typography>
          <FormControl fullWidth>
            <Tooltip title="Default room names are randomly generated client-side">
              <TextField
                label="Room name"
                variant="outlined"
                value={roomName}
                onChange={handleRoomNameChange}
                size="medium"
              />
            </Tooltip>
          </FormControl>
          <Button
            variant="contained"
            type="submit"
            sx={{
              marginTop: 2,
            }}
          >
            Go to chat room
          </Button>
        </form>
      </main>
      <Divider sx={{ my: 2 }} />
      <Box className="max-w-3xl text-center mx-auto px-4">
        <Typography variant="body1">
          This is a communication tool that is free, open source, and designed
          for simplicity and security. All communication between you and your
          online peers is encrypted and ephemeral.
        </Typography>
      </Box>
      <Tooltip title="View project source code and documentation">
        <Link
          href="https://github.com/jeremyckahn/chitchatter#readme"
          target="_blank"
          sx={{ display: 'block', textAlign: 'center', color: '#fff' }}
        >
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="Open menu"
            sx={{ mx: 'auto' }}
          >
            <GitHubIcon sx={{ fontSize: '2em' }} />
          </IconButton>
        </Link>
      </Tooltip>
      <Typography variant="body1" sx={{ textAlign: 'center' }}>
        Licensed under{' '}
        <Link
          href="https://github.com/jeremyckahn/chitchatter/blob/develop/LICENSE"
          target="_blank"
        >
          GPL v2
        </Link>
        .
      </Typography>
    </Box>
  )
}
