import { Post } from "@prisma/client";
import { useEffect, useState } from "react";
import Tech from "./(home)/Tech";
import Travel from "./(home)/Travel";
import Trending from "./(home)/Trending";
import Other from "./(shared)/Other";
import Sidebar from "./(shared)/Sidebar";
import Subscribe from "./(shared)/Subscribe";
import { prisma } from "./api/client";
import { getCurrentUser } from "./firebase/auth";

export const revalidate = 60;

const getPosts = async () => {
  const posts: Array<Post> = await prisma.post.findMany();

  const formattedPosts = await Promise.all(
    posts.map( async (post: Post) => {
      // const imageModule = require(`../public${post.image}`)
      return {
        ...post,
        // image: imageModule.default,
      }
    })
  )

  return formattedPosts;
}

export default async function Home() {
  const posts = await getPosts();
  const formatPosts = () => {
    const trendingPosts: Array<Post> = [];
    const techPosts: Array<Post> = [];
    const travelPosts: Array<Post> = [];
    const otherPosts: Array<Post> = [];
    let cntTech: number = 0;
    let cntTravel: number = 0;
    let cntOther: number = 0;
    posts.forEach((post: Post, i: number) => {
      if(post?.category == 'Tech' && cntTech<=4) {
        techPosts.push(post);
        cntTech += 1;
      }
      else if(post?.category == 'Travel' && cntTravel<=4) {
        travelPosts.push(post);
        cntTravel += 1;
      }
      else{
        otherPosts.push(post);
      }
    })
    posts.slice().reverse().forEach((post: Post, i: number) => {
      if(i < 4) {
        trendingPosts.push(post);
      }
    })

    return [trendingPosts,techPosts,travelPosts, otherPosts];
  }

  const [trendingPosts, techPosts, travelPosts, otherPosts] = formatPosts();

  return (
    <main className="px-10 leading-7">
      <Trending trendingPosts={trendingPosts}/>
      <div className="md:flex gap-10 mb-5">
        <div className="basis-3/4">
          <Tech techPosts={techPosts}/>
          <Travel travelPosts={travelPosts}/>
          <Other otherPosts={otherPosts}/>

          <div className="hidden md:block">
            <Subscribe />
          </div>
          </div>
          <div className="basis-1/4">
            <Sidebar/>
          </div>
      </div>
    </main>
  )
}
