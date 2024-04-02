"use client"
import { useGetGalleryQuery } from '@/redux/services/date'
import React from 'react'
import Image from "next/image"
function page() {
  const{isLoading, data ,error} =  useGetGalleryQuery()
  return (
    <div>
    {error ? (
        <>Oh no, there was an error</>
      ) : isLoading ? (
        <>Loading...</>
      ) : data ? (
        <>
        {data.map((e)=>(
          < Image key={e._id} alt={`${e._id}`} src={e.img} width={200} height={200}/>
        ))}
        </>
      ) : null}

      </div>
  )
}

export default page