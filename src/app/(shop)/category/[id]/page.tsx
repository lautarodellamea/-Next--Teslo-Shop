// snippet para crear una page: "prc"

import { PageNotFound } from '@/components'
import { notFound } from 'next/navigation'

interface Props {
  params: {
    id: string
  }
}

export default function CategoryIdPage({ params }: Props) {
  const { id } = params

  if (id === 'kids') {
    notFound()
  }

  return <PageNotFound />
}
