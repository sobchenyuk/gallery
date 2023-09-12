"use client";
import { useState, useEffect } from "react";
import { fetchAPI } from '@/utils/fetch-api';
import {Card} from "@/components/crad";
import {ICard} from "@/type/card.interface";
import Head from 'next/head';

export default function Home() {
  const [posts, setPosts] = useState<ICard[]>([])

  useEffect(() => {
    (async() => {
      try {
          const token = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN;
          const options = { headers: { Authorization: `Bearer ${token}` } };
          const {data} = await fetchAPI(`/posts?populate=*`, {}, options);
          setPosts(data)
        } catch (error) {
          console.error(error);
        }
    })()
  }, [])


  return (
      <div className="page">
        <Head> 
            <meta http-equiv="Content-Security-Policy" content="upgrade-insecure-requests" />
        </Head>
          <div className="mx-auto py-[108px] max-w-[1440px]">
              <div className="flex flex-row flex-wrap gap-y-7 justify-center -mx-7">
                  {posts.length > 0 && (
                      <>
                          {posts.map((item: ICard) => (
                              <div key={item.id} className="px-3.5 flex w-1/3">
                                  <Card attributes={item.attributes} id={item.id} />
                              </div>
                          ))}
                      </>
                  )}
              </div>
          </div>
      </div>
  )
}
