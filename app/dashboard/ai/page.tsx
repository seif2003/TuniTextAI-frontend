"use client";
import React from "react";
 
import { AnimatePresence, motion } from "framer-motion";
import { CanvasRevealEffect } from "@/components/ui/canvas-reveal-effect";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea";
import { Select } from "@/components/ui/select";
import { RootState } from "@/store/store";
import { useDispatch, useSelector } from "react-redux";
import axiosInstance from "@/utils/axiosInstance";
import { useRouter } from 'next/navigation';
import { toast } from "@/components/ui/use-toast";
import { selectCollection, setCollections } from "@/store/slice";
import { Button } from "@/components/ui/button";

export default function CanvasRevealEffectDemo() {
  const [isSending, setIsSending] = React.useState(false);
  const router = useRouter();
  const collections = useSelector((state: RootState) => state.collections);
  const dispatch = useDispatch();
  

  // summarize
  const summarize = () => {
      let titleSum = (document.getElementById("titleSum") as HTMLInputElement)?.value;
      let collectionSum = (document.getElementById("collectionSum") as HTMLInputElement)?.value;
      let textSum = (document.getElementById("textSum") as HTMLInputElement)?.value;
      if (titleSum === '' ) {
        toast({
          variant: "destructive",
          title: "Error",
          description: "Please enter a title",
        });
        return;
      }
      if (collectionSum === '' ) {
        toast({
          variant: "destructive",
          title: "Error",
          description: "Please select a collection",
        });
        return;
      }
      if (textSum.length < 500 ) {
        toast({
          variant: "destructive",
          title: "Error",
          description: "Please enter a text with at least 500 characters",
        });
        return;
      }
      if (textSum.length > 5000 ) {
        toast({
          variant: "destructive",
          title: "Error",
          description: "Please enter a text with at most 5000 characters",
        });
        return;
      }

      setIsSending(true);
      axiosInstance.post('/api/ai/summarize', {
        title: titleSum,
        collection_id: collectionSum,
        message: textSum
      }).then((response) => {
        console.log(response);
        setIsSending(false);
        dispatch(setCollections(collections.collections.map((collection) => {
          if (collection.id === Number(collectionSum)) {
            return {
              ...collection,
              texts: [...collection.texts, response.data]
            }
          }
          return collection;
        })));
        const selectedCollection = collections.collections.find((collection) => collection.id === Number(collectionSum));
        if (selectedCollection) {
          dispatch(selectCollection(selectedCollection));
          router.push(`/dashboard/collections/${response.data.id}`);
        }
      }).catch((error) => {
        localStorage.clear();
        router.push('/auth/login');
      });
    };

    // correct
    const correct = () => {
      let titleCor = (document.getElementById("titleCor") as HTMLInputElement)?.value;
      let collectionCor = (document.getElementById("collectionCor") as HTMLInputElement)?.value;
      let textCor = (document.getElementById("textCor") as HTMLInputElement)?.value;
      if (titleCor === '' ) {
        toast({
          variant: "destructive",
          title: "Error",
          description: "Please enter a title",
        });
        return;
      }
      if (collectionCor === '' ) {
        toast({
          variant: "destructive",
          title: "Error",
          description: "Please select a collection",
        });
        return;
      }
      if (textCor.length < 50 ) {
        toast({
          variant: "destructive",
          title: "Error",
          description: "Please enter a text with at least 50 characters",
        });
        return;
      }
      if (textCor.length > 5000 ) {
        toast({
          variant: "destructive",
          title: "Error",
          description: "Please enter a text with at most 5000 characters",
        });
        return;
      }
      setIsSending(true);
      axiosInstance.post('/api/ai/correct', {
        title: titleCor,
        collection_id: collectionCor,
        message: textCor
      }).then((response) => {
        console.log(response);
        setIsSending(false);
        dispatch(setCollections(collections.collections.map((collection) => {
          if (collection.id === Number(collectionCor)) {
            return {
              ...collection,
              texts: [...collection.texts, response.data]
            }
          }
          return collection;
        })));
        const selectedCollection = collections.collections.find((collection) => collection.id === Number(collectionCor));
        if (selectedCollection) {
          dispatch(selectCollection(selectedCollection));
          router.push(`/dashboard/collections/${response.data.id}`);
        }
      }).catch((error) => {
        localStorage.clear();
        router.push('/auth/login');
      });
    };

    // paraphrase
    const paraphrase = () => {
      let name = (document.getElementById("name") as HTMLInputElement)?.value;
      let Collection = (document.getElementById("Collection") as HTMLInputElement)?.value;
      let username = (document.getElementById("username") as HTMLInputElement)?.value;
      if (name === '' ) {
        toast({
          variant: "destructive",
          title: "Error",
          description: "Please enter a title",
        });
        return;
      }
      if (Collection === '' ) {
        toast({
          variant: "destructive",
          title: "Error",
          description: "Please select a collection",
        });
        return;
      }
      if (username.length < 50 ) {
        toast({
          variant: "destructive",
          title: "Error",
          description: "Please enter a text with at least 50 characters",
        });
        return;
      }
      if (username.length > 5000 ) {
        toast({
          variant: "destructive",
          title: "Error",
          description: "Please enter a text with at most 5000 characters",
        });
        return;
      }
      setIsSending(true);
      axiosInstance.post('/api/ai/paraphrase', {
        title: name,
        collection_id: Collection,
        message: username
      }).then((response) => {
        console.log(response);
        setIsSending(false);
        dispatch(setCollections(collections.collections.map((collection) => {
          if (collection.id === Number(Collection)) {
            return {
              ...collection,
              texts: [...collection.texts, response.data]
            }
          }
          return collection;
        })));
        const selectedCollection = collections.collections.find((collection) => collection.id === Number(Collection));
        if (selectedCollection) {
          dispatch(selectCollection(selectedCollection));
          router.push(`/dashboard/collections/${response.data.id}`);
        }
      }).catch((error) => {
        localStorage.clear();
        router.push('/auth/login');
      });
    };

    const handleSubmit = () => {
      const titleInput = document.getElementById('title') as HTMLInputElement;
      if (titleInput && titleInput.value === "") {
          toast({
              variant: "destructive",
              title: "Error",
              description: "Title is required",
          });
      }
      else {
          axiosInstance.post('/api/collection/create', {
              title: titleInput.value
          }).then((res) => {
              dispatch(setCollections([...collections.collections, res.data]));
              dispatch(selectCollection(res.data));
              toast({
                  variant: "default",
                  title: "Success",
                  description: "Collection created successfully",
              });
              document.getElementById('close')?.click();
              titleInput.value = '';
          }).catch((err) => {
              localStorage.clear();
              router.push('/auth/login');
          });
      }
  }
  return (
    <>
      <div className="py-20 flex flex-col lg:flex-row items-center justify-center w-full gap-4 mx-auto px-32 mt-28">
        <Dialog>
          <DialogTrigger asChild>
            <button className="w-[30%]">
            <Card title="Summarize the text" icon={<Icon1 />}>
              <CanvasRevealEffect
                animationSpeed={5.1}
                containerClassName="bg-emerald-900"
              />
            </Card>
            </button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[700px]">
          {!isSending ? <>
            <DialogHeader>
              <DialogTitle>Text Summarization</DialogTitle>
              <DialogDescription>
                Enter a text that you would like to summarize.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="flex flex-row justify-between">
                <div className="items-center gap-4 w-[49%]">
                  <Label htmlFor="titleSum" className="text-right">
                    Title
                  </Label>
                  <Input id="titleSum" className="w-full" placeholder="My cool title ..."/>
                </div>
                <div className="items-center gap-4 w-[49%]">
                  <Label htmlFor="collectionSum" className="text-right">
                    Collection
                  </Label>
                  <div className="flex flex-row">
                  <Select className="w-[238px] mr-3" id="collectionSum">
                    {collections.collections.map((collection) => (
                      <option key={collection.id} value={collection.id}>
                        {collection.title}
                      </option>
                    ))}
                  </Select>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button className= {`w-fit mb-4 transition-all duration-500 `}>
                        <svg viewBox="0 0 24 24" fill="none" width="25" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M15 12L12 12M12 12L9 12M12 12L12 9M12 12L12 15" stroke="#000000" stroke-width="1.5" stroke-linecap="round"></path> <path d="M22 12C22 16.714 22 19.0711 20.5355 20.5355C19.0711 22 16.714 22 12 22C7.28595 22 4.92893 22 3.46447 20.5355C2 19.0711 2 16.714 2 12C2 7.28595 2 4.92893 3.46447 3.46447C4.92893 2 7.28595 2 12 2C16.714 2 19.0711 2 20.5355 3.46447C21.5093 4.43821 21.8356 5.80655 21.9449 8" stroke="#000000" stroke-width="1.5" stroke-linecap="round"></path> </g></svg>
                      </Button> 
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                      <DialogHeader>
                        <DialogTitle>Create Collection</DialogTitle>
                        <DialogDescription>
                          Create a new collection to store your texts.
                        </DialogDescription>
                      </DialogHeader>
                        <div className="w-full">
                          <Label htmlFor="title" className="text-right">
                            Title
                          </Label>
                          <Input id="title" className="col-span-3" />
                        </div>
                      <DialogFooter>
                        <DialogClose asChild>
                          <Button type="button" variant="secondary" id="close">
                              Close
                          </Button>
                        </DialogClose>
                        <Button onClick={handleSubmit}>Create</Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                  </div>
                </div>
              </div>

              <div className="items-center gap-4 w-full">
                <Label htmlFor="textSum" className="text-right">
                  Text
                </Label>
                <Textarea id="textSum" placeholder="My cool text ..." className="w-full h-[50vh]" />
              </div>
            </div>
            <DialogFooter>
              <button
                className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
                onClick={summarize}
              >
                Summarize now
                <BottomGradient />
              </button>
            </DialogFooter></>: <div className="flex items-center justify-center h-[50vh]"><svg aria-hidden="true" className="inline w-16 h-16 text-gray-200 animate-spin dark:text-white fill-emerald-400" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
            </svg>
            <span className="sr-only">Loading...</span></div>
          }
          </DialogContent>
        </Dialog>

        {/* text correction */}
        <Dialog>
          <DialogTrigger asChild>
            <button className="w-[30%]">
            <Card title="Correct the text" icon={<Icon2 />}>
            <CanvasRevealEffect
              animationSpeed={3}
              containerClassName="bg-black"
              colors={[
                [236, 72, 153],
                [232, 121, 249],
              ]}
              dotSize={2}
            />
            {/* Radial gradient for the cute fade */}
            <div className="absolute inset-0 [mask-image:radial-gradient(400px_at_center,white,transparent)] bg-black/50 dark:bg-black/90" />
            </Card>
            </button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[700px]">
          {!isSending ? <>
            <DialogHeader>
              <DialogTitle>Text Correction</DialogTitle>  
              <DialogDescription>
                Enter a text that you would like to correct.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="flex flex-row justify-between">
                <div className="items-center gap-4 w-[49%]">
                  <Label htmlFor="titleCor" className="text-right">
                    Title
                  </Label>
                  <Input id="titleCor" className="w-full" placeholder="My cool title ..."/>
                </div>
                <div className="items-center gap-4 w-[49%]">
                  <Label htmlFor="collectionCor" className="text-right">
                    Collection
                  </Label>
                  <div className="flex flex-row">
                  <Select className="w-[238px] mr-3" id="collectionCor">
                    {collections.collections.map((collection) => (
                      <option key={collection.id} value={collection.id}>
                        {collection.title}
                      </option>
                    ))}
                  </Select>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button className= {`w-fit mb-4 transition-all duration-500 `}>
                        <svg viewBox="0 0 24 24" fill="none" width="25" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M15 12L12 12M12 12L9 12M12 12L12 9M12 12L12 15" stroke="#000000" stroke-width="1.5" stroke-linecap="round"></path> <path d="M22 12C22 16.714 22 19.0711 20.5355 20.5355C19.0711 22 16.714 22 12 22C7.28595 22 4.92893 22 3.46447 20.5355C2 19.0711 2 16.714 2 12C2 7.28595 2 4.92893 3.46447 3.46447C4.92893 2 7.28595 2 12 2C16.714 2 19.0711 2 20.5355 3.46447C21.5093 4.43821 21.8356 5.80655 21.9449 8" stroke="#000000" stroke-width="1.5" stroke-linecap="round"></path> </g></svg>
                      </Button> 
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                      <DialogHeader>
                        <DialogTitle>Create Collection</DialogTitle>
                        <DialogDescription>
                          Create a new collection to store your texts.
                        </DialogDescription>
                      </DialogHeader>
                        <div className="w-full">
                          <Label htmlFor="title" className="text-right">
                            Title
                          </Label>
                          <Input id="title" className="col-span-3" />
                        </div>
                      <DialogFooter>
                        <DialogClose asChild>
                          <Button type="button" variant="secondary" id="close">
                              Close
                          </Button>
                        </DialogClose>
                        <Button onClick={handleSubmit}>Create</Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                  </div>
                </div>
              </div>

              <div className="items-center gap-4 w-full">
                <Label htmlFor="textCor" className="text-right">
                  Text
                </Label>
                <Textarea id="textCor" placeholder="My cool text ..." className="w-full h-[50vh]" />
              </div>
            </div>
            <DialogFooter>
              <button
                className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
                onClick={correct}
              >
                Correct now
                <BottomGradient />
              </button>
            </DialogFooter></>: <div className="flex items-center justify-center h-[50vh]"><svg aria-hidden="true" className="inline w-16 h-16 text-gray-200 animate-spin dark:text-white fill-emerald-400" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
            </svg>
            <span className="sr-only">Loading...</span></div>
          }
          </DialogContent>
        </Dialog>

        {/* text paraphrasing */}
        <Dialog>
          <DialogTrigger asChild>
            <button className="w-[30%]">
            <Card title="Paraphrasing" icon={<Icon3 />}>
              <CanvasRevealEffect
                animationSpeed={3}
                containerClassName="bg-sky-600"
                colors={[[125, 211, 252]]}
              />
            </Card>
            </button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[700px]">
          {!isSending ? <>
            <DialogHeader>
              <DialogTitle>Text Paraphrasing</DialogTitle>
              <DialogDescription>
                Enter a text that you would like to paraphrase.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="flex flex-row justify-between">
                <div className="items-center gap-4 w-[49%]">
                  <Label htmlFor="name" className="text-right">
                    Title
                  </Label>
                  <Input id="name" className="w-full" placeholder="My cool title ..."/>
                </div>
                <div className="items-center gap-4 w-[49%]">
                  <Label htmlFor="Collection" className="text-right">
                    Collection
                  </Label>
                  <div className="flex flex-row">
                  <Select className="w-[238px] mr-3" id="Collection">
                    {collections.collections.map((collection) => (
                      <option key={collection.id} value={collection.id}>
                        {collection.title}
                      </option>
                    ))}
                  </Select>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button className= {`w-fit mb-4 transition-all duration-500 `}>
                        <svg viewBox="0 0 24 24" fill="none" width="25" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M15 12L12 12M12 12L9 12M12 12L12 9M12 12L12 15" stroke="#000000" stroke-width="1.5" stroke-linecap="round"></path> <path d="M22 12C22 16.714 22 19.0711 20.5355 20.5355C19.0711 22 16.714 22 12 22C7.28595 22 4.92893 22 3.46447 20.5355C2 19.0711 2 16.714 2 12C2 7.28595 2 4.92893 3.46447 3.46447C4.92893 2 7.28595 2 12 2C16.714 2 19.0711 2 20.5355 3.46447C21.5093 4.43821 21.8356 5.80655 21.9449 8" stroke="#000000" stroke-width="1.5" stroke-linecap="round"></path> </g></svg>
                      </Button> 
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                      <DialogHeader>
                        <DialogTitle>Create Collection</DialogTitle>
                        <DialogDescription>
                          Create a new collection to store your texts.
                        </DialogDescription>
                      </DialogHeader>
                        <div className="w-full">
                          <Label htmlFor="title" className="text-right">
                            Title
                          </Label>
                          <Input id="title" className="col-span-3" />
                        </div>
                      <DialogFooter>
                        <DialogClose asChild>
                          <Button type="button" variant="secondary" id="close">
                              Close
                          </Button>
                        </DialogClose>
                        <Button onClick={handleSubmit}>Create</Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                  </div>
                </div>
              </div>

              <div className="items-center gap-4 w-full">
                <Label htmlFor="username" className="text-right">
                  Text
                </Label>
                <Textarea id="username" placeholder="My cool text ..." className="w-full h-[50vh]" />
              </div>
            </div>
            <DialogFooter>
              <button
                className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
                onClick={paraphrase}
              >
                Paraphrase now
                <BottomGradient />
              </button>
            </DialogFooter></>: <div className="flex items-center justify-center h-[50vh]"><svg aria-hidden="true" className="inline w-16 h-16 text-gray-200 animate-spin dark:text-white fill-emerald-400" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
            </svg>
            <span className="sr-only">Loading...</span></div>
          }
          </DialogContent>
        </Dialog>
      </div>
    </>
  );
}

const Card = ({
    title,
    icon,
    children,
  }: {
    title: string;
    icon: React.ReactNode;
    children?: React.ReactNode;
  }) => {
    const [hovered, setHovered] = React.useState(false);
    return (
      <div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className="border border-black/[0.2] group/canvas-card flex items-center justify-center dark:border-white/[0.2]  max-w-sm w-full mx-auto p-4 relative h-[30rem] "
      >
        <Icon className="absolute h-6 w-6 -top-3 -left-3 dark:text-white text-black" />
        <Icon className="absolute h-6 w-6 -bottom-3 -left-3 dark:text-white text-black" />
        <Icon className="absolute h-6 w-6 -top-3 -right-3 dark:text-white text-black" />
        <Icon className="absolute h-6 w-6 -bottom-3 -right-3 dark:text-white text-black" />
   
        <AnimatePresence>
          {hovered && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="h-full w-full absolute inset-0"
            >
              {children}
            </motion.div>
          )}
        </AnimatePresence>
   
        <div className="relative z-20">
          <div className="text-center group-hover/canvas-card:-translate-y-4 group-hover/canvas-card:opacity-0 transition duration-200 w-full  mx-auto flex items-center justify-center">
            {icon}
          </div>
          <h2 className="dark:text-white text-xl opacity-0 group-hover/canvas-card:opacity-100 relative z-10 text-black mt-4  font-bold group-hover/canvas-card:text-white group-hover/canvas-card:-translate-y-2 transition duration-200">
            {title}
          </h2>
        </div>
      </div>
    );
  };
   

  const Icon1 = () => {
    return <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#ffffff"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g id="Edit / Text_Align_Center"> <path id="Vector" d="M17 18H7M20 14H4M17 10H7M20 6H4" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g> </g></svg>
  }

  const Icon2 = () => {
    return (
        <svg fill="#ffffff" viewBox="0 0 56 56" xmlns="http://www.w3.org/2000/svg" stroke="#ffffff"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M 16.2929 29.7695 C 22.8320 29.7695 28.1992 24.4023 28.1992 17.8399 C 28.1992 11.3242 22.8320 5.9336 16.2929 5.9336 C 9.7773 5.9336 4.3867 11.3242 4.3867 17.8399 C 4.3867 24.4023 9.7773 29.7695 16.2929 29.7695 Z M 33.8008 13.2461 L 49.8085 13.2461 C 50.8165 13.2461 51.6133 12.4726 51.6133 11.4648 C 51.6133 10.4805 50.8165 9.7070 49.8085 9.7070 L 33.8008 9.7070 C 32.7929 9.7070 32.0195 10.4805 32.0195 11.4648 C 32.0195 12.4726 32.7929 13.2461 33.8008 13.2461 Z M 14.8867 24.8242 C 14.5117 24.8242 14.0429 24.6601 13.7382 24.3320 L 9.2382 19.4101 C 9.0742 19.2226 8.9570 18.8008 8.9570 18.4961 C 8.9570 17.6758 9.5898 17.0430 10.3867 17.0430 C 10.8789 17.0430 11.2304 17.2773 11.4882 17.5352 L 14.8164 21.1679 L 21.0273 12.5430 C 21.2851 12.1679 21.7070 11.9101 22.2226 11.9101 C 22.9960 11.9101 23.6757 12.5195 23.6757 13.3399 C 23.6757 13.5742 23.5586 13.9023 23.3476 14.1836 L 16.0820 24.2852 C 15.8476 24.6133 15.3789 24.8242 14.8867 24.8242 Z M 33.8008 25.5273 L 49.8085 25.5273 C 50.8165 25.5273 51.6133 24.7539 51.6133 23.7461 C 51.6133 22.7617 50.8165 21.9883 49.8085 21.9883 L 33.8008 21.9883 C 32.7929 21.9883 32.0195 22.7617 32.0195 23.7461 C 32.0195 24.7539 32.7929 25.5273 33.8008 25.5273 Z M 6.1679 37.8086 L 49.8085 37.8086 C 50.8165 37.8086 51.6133 37.0117 51.6133 36.0273 C 51.6133 35.0430 50.8165 34.2695 49.8085 34.2695 L 6.1679 34.2695 C 5.1601 34.2695 4.3867 35.0430 4.3867 36.0273 C 4.3867 37.0117 5.1601 37.8086 6.1679 37.8086 Z M 6.1679 50.0664 L 49.8085 50.0664 C 50.8165 50.0664 51.6133 49.2930 51.6133 48.3086 C 51.6133 47.3242 50.8165 46.5273 49.8085 46.5273 L 6.1679 46.5273 C 5.1601 46.5273 4.3867 47.3242 4.3867 48.3086 C 4.3867 49.2930 5.1601 50.0664 6.1679 50.0664 Z"></path></g></svg>
    )
  }

  const Icon3 = () => {
    return <svg version="1.1" id="Uploaded to svgrepo.com" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" fill="#ffffff" stroke="#ffffff"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path  d="M29,18c0,3.472-1.353,6.736-3.808,9.192S19.473,31,16,31c-3.472,0-6.736-1.352-9.192-3.807 C4.353,24.737,3,21.472,3,18s1.353-6.737,3.808-9.192C9.263,6.353,12.527,5,16,5h2.172l-1.586-1.586 c-0.781-0.781-0.781-2.047,0-2.828s2.047-0.781,2.828,0l5,5c0.781,0.781,0.781,2.047,0,2.828l-5,5c-0.782,0.782-2.059,0.769-2.828,0 c-0.781-0.781-0.781-2.047,0-2.828L18.172,9H16c-2.404,0-4.664,0.936-6.364,2.636C7.937,13.336,7,15.596,7,18 s0.937,4.664,2.636,6.364C11.336,26.064,13.597,27,16,27c2.404,0,4.664-0.936,6.364-2.636C24.063,22.664,25,20.403,25,18 c0-1.104,0.896-2,2-2S29,16.896,29,18z"></path> </g></svg>
  }

  export const Icon = ({ className, ...rest }: any) => {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth="1.5"
        stroke="currentColor"
        className={className}
        {...rest}
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m6-6H6" />
      </svg>
    );
  };

  const BottomGradient = () => {
    return (
      <>
        <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
        <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
      </>
    );
  };
