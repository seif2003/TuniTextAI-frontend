"use client"
import { HoverEffect } from "@/components/ui/card-hover-effect";
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
import { selectCollection, setCollections } from "@/store/slice";
import { toast } from "@/components/ui/use-toast";
import { useRouter } from 'next/navigation';

type Item = {
  title: string;
  description: string;
  link: string;
};

export default function CardHoverEffectDemo() {
  const router = useRouter();
  const selectedCollection = useSelector((state: RootState) => state.selectedCollection);
  const texts = selectedCollection.selectedCollection?.texts;
  const open = useSelector((state: RootState) => state.menuIsOpen.menuIsOpen);
  const dispatch = useDispatch();
  const collections = useSelector((state: RootState) => state.collections.collections);

  const truncate = (text: string) => {
    if ( open ) {
      return text.length > 200 ? text.substring(0, 200) + "..." : text;
    } else {
      return text.length > 400 ? text.substring(0, 400) + "..." : text;
    }
  };

  const items: Item[] = texts?.map((text) => ({
    title: text.title,
    description: truncate(text.body),
    link: `/dashboard/collections/${text.id}`,
  })) || [];

  const deleteCol = () => {
    axiosInstance.post('/api/collection/delete', { id: selectedCollection.selectedCollection?.id } ).then(() => {
      if (collections.length === 1) {
        dispatch(setCollections([]));
        dispatch(selectCollection(null));
      }
      dispatch(setCollections(collections.filter(collection => collection.id !== selectedCollection.selectedCollection?.id)));
      toast({
        variant: "default",
        title: "Success",
        description: "Collection deleted successfully",
      });
    } ).catch((err) => {
      localStorage.clear();
      router.push('/auth/login');
    });
  };

  return (
    <div className="max-w-full px-8 mt-20 mx-20 w-full">
      <div className="flex flex-row justify-between items-center w-full">
        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
          {selectedCollection.selectedCollection?.title || "No collection selected"}
        </h1>
        { selectedCollection.selectedCollection?.title && <AlertDialog>
          <AlertDialogTrigger asChild>
            <button><DeleteSVG/></button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete your collection.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={deleteCol}>Continue</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>}
      </div>
      <HoverEffect items={items} />
    </div>
  );
}

function DeleteSVG() {
  return (<svg className="hover:fill-[#b80000] hover:stroke-[#b80000] transition-all duration-500 hover:scale-125" fill="#ffffff" width="60" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" stroke="#ffffff"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M20,7H12.309a.5.5,0,0,1-.447-.276L10.276,3.553A1,1,0,0,0,9.382,3H4A1,1,0,0,0,3,4V20a1,1,0,0,0,1,1H20a1,1,0,0,0,1-1V8A1,1,0,0,0,20,7Zm-4.793,8.793a1,1,0,1,1-1.414,1.414L12,15.414l-1.793,1.793a1,1,0,0,1-1.414-1.414L10.586,14,8.793,12.207a1,1,0,0,1,1.414-1.414L12,12.586l1.793-1.793a1,1,0,0,1,1.414,1.414L13.414,14Z"></path></g></svg>);
};  