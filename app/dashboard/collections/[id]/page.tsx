"use client"
import { RootState } from "@/store/store";
import { useDispatch, useSelector } from "react-redux";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
  } from "@/components/ui/alert-dialog"
import axiosInstance from "@/utils/axiosInstance";
import { toast } from "@/components/ui/use-toast";
import { selectCollection, setCollections } from "@/store/slice";
import { useRouter } from 'next/navigation';
import { useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";

export default function Page({params}:{
    params : { id: string }
}){
    const collections = useSelector((state: RootState) => state.collections);
    const dispatch = useDispatch();
    const router = useRouter();
    const selectedCollection = useSelector((state: RootState) => state.selectedCollection);
    const [Loading, setLoading] = useState(false);
    
    const text = collections.collections.map((collection) => {
        return collection.texts?.find((text) => text.id === Number(params.id));
    }).find((text) => text);
    
    if (!text) {
        return <div>Text not found</div>
    }
    const deleteText = () => {
        axiosInstance.post('/api/ai/delete', { id: Number(params.id) } ).then(() => {
            dispatch(setCollections(collections.collections.map((collection) => {
                return {
                    ...collection,
                    texts: collection.texts.filter((text) => text.id !== Number(params.id))
                }
            })));
            if (selectedCollection.selectedCollection) {
                const newSelectedCollection = {
                  ...selectedCollection.selectedCollection,
                  texts: selectedCollection.selectedCollection.texts.filter((text) => text.id !== Number(params.id))
                }
                dispatch(selectCollection(newSelectedCollection));
            } 

            toast({
              variant: "default",
              title: "Success",
              description: "Text deleted successfully",
            });
            router.push('/dashboard/collections');
          } ).catch((err) => {
            localStorage.clear();
            router.push('/auth/login');
          });
    }

    const updateText = () => {
        setLoading(true);
        axiosInstance.post('/api/ai/regenerate', { id: Number(params.id) } ).then((res) => {
            dispatch(setCollections(collections.collections.map((collection) => {
                return {
                    ...collection,
                    texts: collection.texts.map((text) => {
                        if (text.id === Number(params.id)) {
                            return {
                                ...text,
                                result: res.data.result
                            }
                        }
                        return text;
                    })
                }
            })));
            if (selectedCollection.selectedCollection) {
                const newSelectedCollection = {
                  ...selectedCollection.selectedCollection,
                  texts: selectedCollection.selectedCollection.texts.map((text) => {
                    if (text.id === Number(params.id)) {
                        return {
                            ...text,
                            result: res.data.result
                        }
                    }
                    return text;
                  })
                }
                dispatch(selectCollection(newSelectedCollection));
            } 

            toast({
              variant: "default",
              title: "Success",
              description: "Text updated successfully",
            });
            setLoading(false);
          } ).catch((err) => {
            localStorage.clear();
            router.push('/auth/login');
          });
    }

    return (
        <div className="p-14 w-full">
            <div className="flex flex-row justify-between w-full">
                <div>
                    <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
                        {text.title}
                    </h1>
                    <blockquote className="mt-6 border-l-2 pl-6 italic">
                        {text.operation}
                    </blockquote>
                </div>
                <div className="flex flex-row gap-8">
                <AlertDialog>
                    <AlertDialogTrigger asChild>
                        <button><UpdateSVG/></button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                            This action cannot be undone. This will permanently update your text.
                        </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={updateText}>Continue</AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
                <AlertDialog>
                    <AlertDialogTrigger asChild>
                        <button><DeleteSVG/></button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                            This action cannot be undone. This will permanently delete your text.
                        </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={deleteText}>Continue</AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
                </div>
            </div>
            <div className="w-full flex flex-row mt-9 gap-10 ">
                <div className="rounded-lg bg-[#120000] p-5 w-[50%]">
                    <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
                        Before
                    </h2>
                    <p className="leading-7 [&:not(:first-child)]:mt-6">{text.body}</p>
                </div>
                <div className="rounded-lg bg-[#001205] p-5 w-[50%]">
                    <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
                        After
                    </h2>
                    {Loading ? <div role="status" className='flex flex-col justify-center gap-3 w-full h-fit mt-6'>
                        <Skeleton className="h-4 w-[90%]" />
                        <Skeleton className="h-4 w-[100%]" />
                        <Skeleton className="h-4 w-[80%]" />
                        <Skeleton className="h-4 w-[70%]" />
                        <Skeleton className="h-4 w-[90%]" />
                        <Skeleton className="h-4 w-[100%]" />
                        <Skeleton className="h-4 w-[80%]" />
                    </div> : <p className="leading-7 [&:not(:first-child)]:mt-6">{text.result}</p>}
                </div>
            </div>
        </div>
    )
}

function DeleteSVG() {
    return (<svg className="hover:fill-[#b80000] hover:stroke-[#b80000] transition-all duration-500 hover:scale-125" fill="#ffffff" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" width="60"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M5,22H19a1,1,0,0,0,1-1V6.414a1,1,0,0,0-.293-.707L16.293,2.293A1,1,0,0,0,15.586,2H5A1,1,0,0,0,4,3V21A1,1,0,0,0,5,22ZM8.793,10.207a1,1,0,0,1,1.414-1.414L12,10.586l1.793-1.793a1,1,0,0,1,1.414,1.414L13.414,12l1.793,1.793a1,1,0,1,1-1.414,1.414L12,13.414l-1.793,1.793a1,1,0,0,1-1.414-1.414L10.586,12Z"></path></g></svg>);
  };  

function UpdateSVG() {
    return (<svg className="hover:stroke-yellow-600 transition-all duration-500 hover:scale-125" width="60" viewBox="0 0 24.00 24.00" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round" stroke="#CCCCCC" stroke-width="0.336"></g><g id="SVGRepo_iconCarrier"> <g id="Edit / Redo"> <path id="Vector" d="M13.9998 8H18.9998V3M18.7091 16.3569C17.7772 17.7918 16.4099 18.8902 14.8079 19.4907C13.2059 20.0913 11.4534 20.1624 9.80791 19.6937C8.16246 19.225 6.71091 18.2413 5.66582 16.8867C4.62073 15.5321 4.03759 13.878 4.00176 12.1675C3.96593 10.4569 4.47903 8.78001 5.46648 7.38281C6.45392 5.98561 7.86334 4.942 9.48772 4.40479C11.1121 3.86757 12.8661 3.86499 14.4919 4.39795C16.1177 4.93091 17.5298 5.97095 18.5209 7.36556" stroke="#ffffff" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" className="hover:stroke-yellow-600 transition-all duration-500 "></path> </g> </g></svg>);
}