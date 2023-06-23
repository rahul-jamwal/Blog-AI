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
import imgex from "../../public/assets/ad-1.jpg";

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

  const handleSubmit = async () => {

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
        snippet: `This blog tells a brief information and writers thoughts about ${title}`,
      }),
    });
    const data = await response.json();
    alert("POST HAS BEEN Uploaded")
    console.log("POST Uploaded")
    window.location.reload(); 
  };

  
  // async function main() {
  //   console.log(`Start seeding...`);
  //   await prisma.post.create({ data: post });
  //   console.log(`Seeding finished.`);
  // }

  return (
    <div className="md:flex gap-10 mb-5 p-4 ml-5">
      <div className="basis-3/4 space-y-12">





        {/* TITLE  */}
        {/* <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
          <div className="sm:col-span-4">
            <label
              htmlFor="username"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              <h2 className="text-base font-semibold leading-7 text-gray-900">
                Title
              </h2>
            </label>
            <div className="mt-2">
              <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                <input
                  type="text"
                  name="title"
                  id="tit"
                  value={title}
                  onChange={titleChangeHandler}
                  className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                  placeholder="Enter a title"
                />
              </div>
            </div>
          </div>
        </div>
 */}




        {/* EDITOR
        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
          <div className="sm:col-span-4">
            <label
              htmlFor="username"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              <h2 className="text-base font-semibold leading-7 text-gray-900">
                Content:
              </h2>
            </label>
            <EditorMenuBar editor={editor} />
            <div className="mt-2">
              <hr className="border-1 mt-2 mb-5" />
              <div className="border-2 rounded-md bg-wh-50 p-3">
                <EditorContent editor={editor} />
              </div>
            </div>
          </div>
        </div> */}
        {/* IMAGE */}



        {/* <div className="mt-4 flex text-sm leading-6 text-gray-600">
          <div>
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
          
        <div className="flex pl-10"><Image
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
        </div>
        </div> */}

{/* 

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
        <label htmlFor="large">Other</label> */}
      


      <div className="space-y-12">
        <div className="border-b border-gray-900/10 pb-12">
          <h2 className="text-base font-semibold leading-7 text-gray-900">ADD NEW BLOG</h2>
          <p className="mt-1 text-sm leading-6 text-gray-600">
            Add a new blog entry to your website.
          </p>

          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-4">
              <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900">
                Title
              </label>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                  <input
                  type="text"
                  name="title"
                  id="tit"
                  value={title}
                  onChange={titleChangeHandler}
                  className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                  placeholder="Enter a title"
                />
                </div>
              </div>
            </div>

            <div className="col-span-full">
              <label htmlFor="about" className="block text-sm font-medium leading-6 text-gray-900">
                Content
              </label>
              <div className="mt-2">
                <EditorMenuBar editor={editor} />
                <div className="mt-2 p-5 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
                  <EditorContent editor={editor} />
                </div>
              </div>
              <p className="mt-3 text-sm leading-6 text-gray-600">Write the content that you want to add.</p>
            </div>

            <div className="col-span-full">
              <label htmlFor="cover-photo" className="block text-sm font-medium leading-6 text-gray-900">
                Cover photo
              </label>

              <div className="sm:grid grid-cols-2 grid-rows-1 gap-x-8 gap-y-8 my-5">
              <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10 col-span-1 row-span-1">
                <div className="text-center">
                  <PhotoIcon className="mx-auto h-12 w-12 text-gray-300" aria-hidden="true" />
                  <div className="mt-4 flex text-sm leading-6 text-gray-600">
                    <label
                      htmlFor="file-upload"
                      className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                    >
                      <span>Upload an Image for the blog</span>
                      <input id="file-upload" name="file-upload" type="file" onChange={handleFileUpload} className="sr-only" />
                    </label>
                    <p className="pl-1">or drag and drop</p>
                  </div>
                  <p className="text-xs leading-5 text-gray-600">PNG, JPG, GIF up to 10MB</p>
                </div>
              </div>
              <div>
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
              </div>
              </div>

            </div>



            <fieldset>
              <legend className="text-sm font-semibold leading-6 text-gray-900">Choose the category:</legend>
              <p className="mt-1 text-sm leading-6 text-gray-600">These will be added under the category you mention</p>
              <div className="mt-6 space-y-6">
                <div className="flex items-center gap-x-3">
                  <input
                    id="Tech"
                    name="category"
                    value="Tech"
                    type="radio"
          checked={category === "Tech"}
          onChange={onOptionChange}
                    className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                  />
                  <label htmlFor="tech" className="block text-sm font-medium leading-6 text-gray-900">
                    Tech
                  </label>
                </div>
                
                <div className="flex items-center gap-x-3">
                  <input
                    id="Travel"
                    name="category"
                    value="Travel"
                    type="radio"
          checked={category === "Travel"}
          onChange={onOptionChange}
                    className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                  />
                  <label htmlFor="tech" className="block text-sm font-medium leading-6 text-gray-900">
                    Travel
                  </label>
                </div>

                <div className="flex items-center gap-x-3">
                  <input
                    id="Other"
                    name="category"
                    value="Other"
                    type="radio"
          checked={category === "Other"}
          onChange={onOptionChange}
                    className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                  />
                  <label htmlFor="tech" className="block text-sm font-medium leading-6 text-gray-900">
                    Other
                  </label>
                </div>


              </div>
            </fieldset>

          




          </div>
        </div>
        </div>

        <div className="flex justify-end">
          <button
            className="bg-accent-red hover:bg-wh-500 text-wh-10 font-semibold py-2 px-5 mt-5"
            onClick={handleSubmit}
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
