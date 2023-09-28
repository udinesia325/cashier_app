import Authenticated from '@/Layouts/AuthenticatedLayout'
import React from 'react'

function Dashboard({auth}) {
  return (
    <Authenticated user={auth.user}>
        ini dashboard admin
    </Authenticated>
  )
}

export default Dashboard