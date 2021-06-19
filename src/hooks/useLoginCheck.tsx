import { useState, useEffect } from 'react'
import { useHistory } from 'react-router'

export default function useLoginCheck() {
  const [token] = useState(localStorage.getItem('sessionToken'))
  const history = useHistory()

  useEffect(() => {
    if (token === null) {
      return history.push('/login')
    }
  }, [history, token])
}
