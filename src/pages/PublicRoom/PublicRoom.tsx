import { useContext, useEffect } from 'react'
import { Room } from 'components/Room'
import { useParams } from 'react-router-dom'

import { ShellContext } from 'contexts/ShellContext'

interface PublicRoomProps {
  userId: string
}

export function PublicRoom({ userId }: PublicRoomProps) {
  const { roomId = '' } = useParams()
  const { setTitle } = useContext(ShellContext)

  useEffect(() => {
    setTitle(`Room: ${roomId}`)
  }, [roomId, setTitle])

  return <Room userId={userId} roomId={roomId} />
}
