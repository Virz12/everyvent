'use client'

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle
} from "@/components/ui/alert-dialog";
import { deleteAccount } from "@/lib/actions/account";
import { logout } from "@/lib/actions/auth";
import { useSession } from "next-auth/react";

interface DeleteEventDialogProps {
  isOpen: boolean
  onClose: () => void
}

export default function DeleteAccountDialog({ isOpen, onClose }: DeleteEventDialogProps) {
  const { data: session } = useSession()

  if (!session) {
    return null
  }

  const currentUserId = session.user.id

  const handleDelete = async () => {
    const res = await deleteAccount(currentUserId)

    if (res.success) {
      await logout();
    }
  }

  return (
    <AlertDialog open={isOpen} onOpenChange={onClose}>
      <AlertDialogContent className="bg-slate-800 border-slate-700">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-white">Delete Account</AlertDialogTitle>
          <AlertDialogDescription className="text-slate-300">
            Are you sure you want to delete the account? This action cannot be undone and all events data will be
            lost.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="border-slate-600 text-slate-300 hover:bg-slate-700 cursor-pointer">Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={() => handleDelete()}
            className="bg-red-500 hover:bg-red-600 text-white cursor-pointer">
            Delete Account
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}