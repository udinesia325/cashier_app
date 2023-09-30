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
} from "@/shadcn/ui/alert-dialog";
import { Button } from "@/shadcn/ui/button";
import { Plus } from "lucide-react";

import React from "react";

function AddAlert({open,setOpen,title = "title",children}) {
    return (
        <AlertDialog  open={open} onOpenChange={setOpen}>
            <AlertDialogTrigger asChild>
                <Button><Plus /></Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>
                        {title}
                    </AlertDialogTitle>
                        {children}
                </AlertDialogHeader>
            </AlertDialogContent>
        </AlertDialog>
    );
}

export default AddAlert;
