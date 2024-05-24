"use client"
import React, { ReactNode, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ExitIcon } from '@radix-ui/react-icons';
import { Toaster } from '@/components/ui/toaster';
import { usePathname } from "next/navigation"
import axiosInstance from '@/utils/axiosInstance';
import { useDispatch, useSelector } from 'react-redux';
import { selectCollection, setCollections, toggleMenu } from '@/store/slice';
import { RootState } from '@/store/store';
import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogClose,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { toast } from '@/components/ui/use-toast';

type LayoutProps = {
    children: ReactNode;
};


const Layout: React.FC<LayoutProps> = ({ children }) => {
    const router = useRouter();

    const pathname = usePathname();

    const dispatch = useDispatch();
    const collections = useSelector((state: RootState) => state.collections);
    const open = useSelector((state: RootState) => state.menuIsOpen.menuIsOpen);
    


    const toggle = () => {
        dispatch(toggleMenu());
    };
    
    useEffect(() => {
        if (localStorage.getItem('token') === null) {
            router.push('/auth/login');
        }
        axiosInstance.get('/api/collection/all').then((res) => {
            console.log(res.data);
            dispatch(setCollections(res.data));
            dispatch(selectCollection(res.data[0]));
        }).catch((err) => {
            localStorage.clear();
            router.push('/auth/login');
        });
    }, []);

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
            <div>
                <div className='h-[8vh] w-full bg-black flex items-center justify-between px-16 fixed z-50'>
                    <a href="/dashboard"><p className='text-white text-2xl font-black'>TuniTextAI</p></a>
                    <div className='flex flex-row gap-14'>
                        <div className='cursor-pointer' onClick={()=> router.push('/dashboard/ai')} >
                            <p className='text-white font-semibold transition-all duration-500 hover:scale-125'> Create new ✨ </p>
                        </div>
                        <div className='cursor-pointer' onClick={()=> router.push('/dashboard/collections')}>
                            <p className='text-white font-semibold transition-all duration-500 hover:scale-125'> My Collections 📚 </p>
                        </div>
                        <div className='cursor-pointer' onClick={()=> router.push('/about')}>
                            <p className='text-white font-semibold transition-all duration-500 hover:scale-125'> About 📙 </p>
                        </div>
                    </div>
                    <div className='cursor-pointer flex flex-row gap-3 items-center justify-center transition-all duration-300 hover:scale-110' onClick={() => {
                            localStorage.removeItem('token');
                            router.push('/auth/login');
                        }} >
                        <p className='text-white'> Logout </p>
                        <ExitIcon className='text-white'/>
                    </div>
                </div>
                <div className='flex flex-row w-[99vw]'>
                    { pathname.startsWith('/dashboard/collections') ? <><div className={`flex flex-col bg-black h-[92vh] mt-[8vh] fixed left-0 transition-all duration-500 ${open ? 'w-[300px]' : 'w-[100px] items-center'}`}>
                        <div className={`justify-end w-full flex px-4 transition-all duration-500`}>
                            <div className={`${open ? '' : 'pr-4'} cursor-pointer`} onClick={toggle}>
                                { open ?  <CloseMenuSvg /> : <MenuSvg /> }
                            </div>
                        </div>
                        <div className='mt-6 flex flex-col items-center gap-3'>
                        <Dialog>
                        <DialogTrigger asChild>
                            <Button className= {`w-fit mb-4 transition-all duration-500 `}>
                                { open ? 'Create new collection' : <svg viewBox="0 0 24 24" fill="none" width="25" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M15 12L12 12M12 12L9 12M12 12L12 9M12 12L12 15" stroke="#000000" stroke-width="1.5" stroke-linecap="round"></path> <path d="M22 12C22 16.714 22 19.0711 20.5355 20.5355C19.0711 22 16.714 22 12 22C7.28595 22 4.92893 22 3.46447 20.5355C2 19.0711 2 16.714 2 12C2 7.28595 2 4.92893 3.46447 3.46447C4.92893 2 7.28595 2 12 2C16.714 2 19.0711 2 20.5355 3.46447C21.5093 4.43821 21.8356 5.80655 21.9449 8" stroke="#000000" stroke-width="1.5" stroke-linecap="round"></path> </g></svg>}
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

                            {
                                collections.collections.map((collection) => {
                                    return (
                                        <button
                                            key={collection.id}
                                            className={`bg-gradient-to-br relative group/btn ${open ? 'w-[280px]' : 'w-[80px]'} transition-all duration-500 text-white rounded-md h-10 font-medium border-[0px] whitespace-nowrap text-overflow-ellipsis`}
                                            type="submit"
                                            onClick={() => {
                                                dispatch(selectCollection(collection));
                                                if (pathname != '/dashboard/collections' ){
                                                    router.push('/dashboard/collections');
                                                }
                                            }}
                                        >
                                            <p className='overflow-hidden '>
                                                {collection.title}
                                            </p>
                                            <BottomGradient />
                                        </button>
                                    );
                                })
                            }
                        </div>
                    </div>
                    <div className={`${open ? 'ml-[300px]' : 'ml-[100px]'} transition-all duration-500 flex w-full mt-[8vh]`}>
                        {children}
                    </div></> :
                    <>{children}</> }
                </div>
                <Toaster />
            </div>
        );
    }

export default Layout;

function MenuSvg() {
    return <svg viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" width="35" fill="none" stroke="#ffffff"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fill="#ffffff" fill-rule="evenodd" d="M19 4a1 1 0 01-1 1H2a1 1 0 010-2h16a1 1 0 011 1zm0 6a1 1 0 01-1 1H2a1 1 0 110-2h16a1 1 0 011 1zm-1 7a1 1 0 100-2H2a1 1 0 100 2h16z"></path> </g></svg>
}

function CloseMenuSvg() {
    return <svg viewBox="0 0 1024 1024" width="35" xmlns="http://www.w3.org/2000/svg" fill="#ffffff"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path fill="#ffffff" d="M195.2 195.2a64 64 0 0 1 90.496 0L512 421.504 738.304 195.2a64 64 0 0 1 90.496 90.496L602.496 512 828.8 738.304a64 64 0 0 1-90.496 90.496L512 602.496 285.696 828.8a64 64 0 0 1-90.496-90.496L421.504 512 195.2 285.696a64 64 0 0 1 0-90.496z"></path></g></svg>
}

const BottomGradient = () => {
    return (
      <>
        <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
        <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
      </>
    );
  };