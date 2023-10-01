import React from 'react'

export default function PostDetail({ params }: { params: { postId: string } }) {
  // console.log(params)
  return (
    <div>
      Dinamic Route : {params.postId}
    </div>
  )
}
