import Image from "next/image"
import { useRef } from "react"
import { useSession } from "next-auth/react"
import { BellIcon, CalendarIcon, ChatIcon, ChevronDownIcon, ClockIcon, DesktopComputerIcon, EmojiHappyIcon, HomeIcon, ShoppingBagIcon, UserGroupIcon, UserIcon, VideoCameraIcon, ViewGridIcon } from "@heroicons/react/solid"
import { FlagIcon, PlayIcon, SearchIcon, ShoppingCartIcon } from "@heroicons/react/outline"
import { db, storage } from "../firebase"
import { serverTimestamp } from "firebase/firestore";
import { useState } from "react"


function InputBox() {
    const { data: session } = useSession();
    const inputRef = useRef(null);
    const filepickerRef = useRef(null);
    const [imageToPost, setImageToPost] = useState(null);

    const sendPost = (e) => {
        e.preventDefault();

        if (!inputRef.current.value) {
            return;
        }

        db.collection("posts").add({
            message: inputRef.current.value,
            name: session.user.name,
            email: session.user.email,
            image: session.user.image,
            timestamp: serverTimestamp(),
        }).then(doc => {
            if (imageToPost) {
                const uploadTask = storage.ref(`posts/${doc.id}`).putString(imageToPost, "data_url");
                removeImage();

                uploadTask.on("state_change", null, error => console.log(error), () => {
                    storage.ref("posts").child(doc.id).getDownloadURL().then(url => {
                        db.collection("posts").doc(doc.id).set({
                            postImage: url
                        }, { merge: true })
                    })
                });
            }
        })

        inputRef.current.value = "";
    };

    const addImageToPost = (e) => {
        const reader = new FileReader();
        if (e.target.files[0]) {
            reader.readAsDataURL(e.target.files[0]);
        };

        reader.onload = (readerEvent) => {
            setImageToPost(readerEvent.target.result);
        };
    };

    const removeImage = () => {
        setImageToPost(null);
    };

    return (
        <div className=" bg-white p-2 rounded-2xl shadow-md text-gray-500 font-medium mt-6">
            <div className="flex space-x-4 p-4 items-center">
                <Image className=" rounded-full" src={session.user.image} width={40} height={40} layout="fixed" alt="야호호" />
                <form className="flex flex-1">
                    <input ref={inputRef} className=" rounded-full h-12 bg-gray-100 flex-grow px-5 focus:outline-none " type="text" placeholder={`${session.user.name} 무슨 생각을 하고 계신가요? `} />
                    <button hidden type="submit" onClick={sendPost}>게시</button>
                </form>


                {imageToPost && (
                    <div onClick={removeImage} className="flex flex-col filter hover:brightness-110 duration-150 transform hover:scale-105 cursor-pointer">
                        <img className="h-10 object-contain" src={imageToPost} alt="1" />
                        <p className="text-xs text-red-500 text-center">Remove</p>
                    </div>
                )}
            </div>

            <div className=" flex justify-evenly p-3 border-t">
                <div className="inputIcon">
                    <VideoCameraIcon className="h-7 text-red-500" />
                    <p className=" text-xs sm:text-sm xl:text-base">라이브 방송</p>
                </div>


                <div onClick={() => filepickerRef.current.click()} className="inputIcon">
                    <VideoCameraIcon className="h-7 text-green-400" />
                    <p className=" text-xs sm:text-sm xl:text-base">사진/동영상</p>
                    <input ref={filepickerRef} onChange={addImageToPost} type="file" hidden />
                </div>

                <div className="inputIcon">
                    <EmojiHappyIcon className="h-7 text-yellow-300" />
                    <p className=" text-xs sm:text-sm xl:text-base">기분/활동</p>
                </div>


            </div>

        </div>
    );
}

export default InputBox 