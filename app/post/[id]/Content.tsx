"use client";
import { FormattedPost } from "@/app/types";
import React, { useEffect, useState } from "react";
import { XMarkIcon, PencilSquareIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import SocialLinks from "@/app/(shared)/SocialLinks";
import { Editor, EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import EditorMenuBar from "./EditorMenuBar";
import CategoryAndEdit from "./CategoryAndEdit";
import Article from "./Article";
import { getCurrentUser } from "@/app/firebase/auth";
import { redirect } from 'next/navigation';

type Props = {
  post: FormattedPost;
  isNewPost? : boolean;
};

const Content = ({ post }: Props) => {
  const [isEditable, setIsEditable] = useState<boolean>(false);

  const [title, setTitle] = useState<string>(post.title);
  const [titleError, setTitleError] = useState<string>("");
  const [tempTitle, setTempTitle] = useState<string>(title);

  const [content, setContent] = useState<string>(post.content);
  const [contentError, setContentError] = useState<string>("");
  const [tempContent, setTempContent] = useState<string>(content);

  const [canEdit, setCanEdit] = useState<boolean>(false);

  useEffect(() => {
    getCurrentUser().then((usr) => {
      if(usr==='fGPOXAUgOBPKNeQ0hZHGuXCEEkj2')setCanEdit(true);
      // console.log(usr);
    });
  }, []);

  const handleOnChangeTitle = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (title) setTitleError("");
    setTitle(e.target.value);
  };

  const handeOnChangeContent = ({ editor }: any) => {
    if (!(editor as Editor).isEmpty) setContentError("");
    setContent((editor as Editor).getHTML())
  }

  const date = new Date(post?.createdAt);
  const options = { year: "numeric", month: "long", day: "numeric" } as any;
  const formattedDate = date.toLocaleDateString("en-US", options);

  const editor = useEditor({
    extensions: [StarterKit],
    onUpdate: handeOnChangeContent,
    content: content,
    editorProps: {
      attributes: {
        class:
          "prose prose-sm xl:prose-2xl leading-8 focus:outline-none w-full max-w-full",
      },
    },
    editable: isEditable,
  });

  const handleSubmit = async () => {

    // validation checks
    if(title === "") setTitleError("This Field is reuqired")
    if(editor?.isEmpty) setTitleError("This Field is reuqired")
    if(title === "" || editor?.isEmpty) return; 

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_URL}/api/post/${post?.id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          title: title,
          content: content,
        })

      }
    )
    const data = await response.json();

    handleIsEditable(false);
    setTempTitle("")
    setTempContent("")

    setTitle(data.title)
    setContent(data.content)
    editor?.commands.setContent(data.content)

  };
  
  const handleIsEditable = (bool: boolean) => {
    setIsEditable(bool);
    editor?.setEditable(bool);
  };
  const deletePostHandler= async () => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_URL}/api/delete/${post?.id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          title: title,
          content: content,
        })

      }
    )
    const data = await response.json();
    alert("POST HAS BEEN DELETED")
    console.log("POST DELETED")
    window.location.reload(); 
  }

  return (
    <div className="prose w-full max-w-full mb-10">
      <h5 className="text-wh-300">
        {/* Breadcrumbs */}
        {`Home > ${post.category} > ${post.title}`}
      </h5>

      {/* Category and edit */}

      <CategoryAndEdit
        isEditable={isEditable}
        handleIsEditable={handleIsEditable}
        title={title}
        canEdit={canEdit}
        setTitle={setTitle}
        tempTitle={tempTitle}
        setTempTitle={setTempTitle}
        tempContent={tempContent}
        setTempContent={setTempContent}
        editor={editor}
        post={post}
      />


      <form onSubmit={handleSubmit}>
        {/* HEADER */}
        <>
          {isEditable ? (
            <div>
              <textarea
                className="border-2 rounded-md bg-wh-50 p-3 w-full"
                placeholder="Title"
                onChange={handleOnChangeTitle}
                value={title}
              />
              {titleError && (
                <p className="mt-1 text-primary-500">{titleError}</p>
              )}
            </div>
          ) : (
            <h3 className="font-bold text-3xl mt-3">{title}</h3>
          )}
          <div className="flex gap-3">
            <h5 className="font-semibold text-xs">By {post.author}</h5>
            <h6 className="text-wh-300 text-xs">{formattedDate}</h6>
          </div>
        </>

        {/* IMAGE */}
        <div className="relative w-auto mt-2 mb-16 h-96">
          <Image
            fill
            alt={post.title}
            src={post.image}
            sizes="(max-width: 480px) 100vw,
                  (max-width: 768px) 85vw,
                  (max-width: 1060px) 75vw,
                  60vw"
            style={{ objectFit: "cover" }}
          />
        </div>

        {/* TIP-TAP INTEGRATION */}
        {/* <div
          className={
            isEditable
              ? "border-2 rounded-md bg-wh-50 p-3 "
              : "w-full max-w-full"
          }
        >
          {isEditable && (
            <>
              <EditorMenuBar editor={editor} />
              <hr className="border-1 mt-2 mb-5" />
            </>
          )}
          <EditorContent editor={editor} />
        </div> */}

            {/* Aritcle */}
        <Article 
          contentError={contentError}
          editor={editor}
          canEdit={canEdit}
          isEditable={isEditable}
          setContent={setContent}
          title={title}
        />

        {/* SUBMIT BUTTON */}
        {isEditable && (
          <div className="flex justify-end">
            
            <button
              className="bg-accent-red hover:bg-wh-500 text-wh-10 font-semibold py-2 px-5 mt-5"
              type="submit"
            >
              Submit
            </button>
          </div>
        )}
      </form>
      {isEditable && (
        // <form onSubmit={deletePostHandler}>
        <div className="flex justify-end">
        <button
                className="bg-crimson-red hover:bg-wh-500 text-wh-10 font-semibold py-2 px-5 mt-5"
                onClick={deletePostHandler}
              >
                Delete Post
              </button>
              </div>
        // </form>
      )}
      
      <div className="hidden md:block mt-10 w-1/3">
        <SocialLinks isDark />
      </div>
    </div>
  );
};

export default Content;
