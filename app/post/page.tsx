"use client";
import React, { useState } from "react";
import Sidebar from "../(shared)/Sidebar";
import { Editor, EditorContent, useEditor } from "@tiptap/react";
import EditorMenuBar from "./[id]/EditorMenuBar";
import StarterKit from "@tiptap/starter-kit";
import { PhotoIcon } from "@heroicons/react/24/solid";
import Image, { StaticImageData } from "next/image";
import { FormattedPost } from "../types";
import { storage } from "../firebase/init";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import imgex from "../../public/assets/ad-1.jpg"

type Props = {};

const NewPost = (props: Props) => {
  const [content, setContent] = useState<string>("ADD CONTENT HERE");
  const [contentError, setContentError] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [category, setCategory] = useState("");
  const [percent, setPercent] = useState<number>(0);
  const [url, setUrl] = useState<string>("");

  const onOptionChange = (e: any) => {
    setCategory(e.target.value);
  };

  const handeOnChangeContent = ({ editor }: any) => {
    if (!(editor as Editor).isEmpty) setContentError("");
    setContent((editor as Editor).getHTML());
  };

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        bulletList: {
          keepMarks: true,
          keepAttributes: false, // TODO : Making this as `false` becase marks are not preserved when I try to preserve attrs, awaiting a bit of help
        },
        orderedList: {
          keepMarks: true,
          keepAttributes: false, // TODO : Making this as `false` becase marks are not preserved when I try to preserve attrs, awaiting a bit of help
        },
      }),
    ],
    onUpdate: handeOnChangeContent,
    content: content,
    editorProps: {
      attributes: {
        class:
          "prose prose-sm xl:prose-2xl leading-8 focus:outline-none w-full max-w-full",
      },
    },
  });

  const titleChangeHandler = (e: any) => {
    setTitle(e.target.value);
  };

  const handleFileUpload = (e: any) => {
    const file = e.target.files?.[0];
    if (!file) {
      alert("Please upload an image first!");
      return;
    }
    const storageRef = ref(storage, `${new Date()}-${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const percent = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );

        // update progress
        setPercent(percent);
      },
      (err) => console.log(err),
      () => {
        // download url
        getDownloadURL(uploadTask.snapshot.ref).then((url) => {
          setUrl(url);
          console.log(url);
        });
      }
    );
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/post/`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        category: category,
        title: title,
        content: content,
        author: "Jack Everstein",
        image: url,
        snippet: getWordStr(content),
      }),
    });
    const data = await response.json();
    console.log("POST UPLOADED")
    window.location.reload(); 
  };

  const getWordStr = (str: string) => {
    return str.split(/\s+/).slice(0, 10).join(" ");
  };

  // async function main() {
  //   console.log(`Start seeding...`);
  //   await prisma.post.create({ data: post });
  //   console.log(`Seeding finished.`);
  // }

  return (
    
      <div className="md:flex gap-10 mb-5">
        <div className="basis-3/4">
          <EditorMenuBar editor={editor} />
          <hr className="border-1 mt-2 mb-5" />
          <div className="border-2 rounded-md bg-wh-50 p-3">
            <EditorContent editor={editor} />
          </div>
          <label htmlFor="title" className="font-semibold">
            TITLE:
          </label>
          <input
            type="text"
            name="title"
            id=""
            value={title}
            onChange={titleChangeHandler}
            className="border border-black block"
          />
          IMAGE:
          <div className="mt-4 flex text-sm leading-6 text-gray-600">
            <label
              htmlFor="file-upload"
              className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
            >
              <span>Upload a file</span>
              <input
                id="file-upload"
                name="file-upload"
                type="file"
                onChange={handleFileUpload}
                className="sr-only"
              />
            </label>
          </div>
          <Image
            width={1000}
            height={100}
            alt="tech"
            src={url}
            sizes="(max-width: 480px) 100vw,
                (max-width: 768px) 75vw,
                (max-width: 1060px) 50vw,
                33vw"
            style={{ objectFit: "cover" }}
          />
          <h3>Select Category</h3>
          <input
            type="radio"
            name="category"
            value="Tech"
            id="tech"
            checked={category === "Tech"}
            onChange={onOptionChange}
          />
          <label htmlFor="regular">Tech</label>
          <input
            type="radio"
            name="topping"
            value="Travel"
            id="travel"
            checked={category === "Travel"}
            onChange={onOptionChange}
          />
          <label htmlFor="medium">Travel</label>
          <input
            type="radio"
            name="topping"
            value="Other"
            id="Other"
            checked={category === "Other"}
            onChange={onOptionChange}
          />
          <label htmlFor="large">Other</label>
          <div className="flex justify-end">
            <button
              className="bg-accent-red hover:bg-wh-500 text-wh-10 font-semibold py-2 px-5 mt-5"
              onClick={()=>handleSubmit}
            >
              Submit
            </button>
          </div>
        </div>

        <div className="basis-1/4">
          <Sidebar />
        </div>
      </div>
    
  );
};

export default NewPost;
