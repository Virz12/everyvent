'use client'

import AccountForm from "@/components/dashboard/participant/form/account-form";
import DeleteAccountDialog from "@/components/dashboard/delete-account-dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useState } from "react";

export default function AccountPage() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="min-h-screen bg-slate-900">
      {/* Header */}
      <header className="bg-slate-800 py-8 px-4 lg:px-6 border-b border-slate-700">
        <div className="container mx-auto">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
            <div>
              <h1 className="text-3xl lg:text-4xl font-bold text-white mb-2">My Account</h1>
              <p className="text-slate-300">Manage account settings</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <section className="py-8 px-4 lg:px-6">
        <div className="container mx-auto space-y-8">
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-y-6 xl:gap-x-6">
            {/* Card Account Settings */}
            <Card className="col-span-2 bg-slate-800 border-slate-700 pb-6">
              <CardHeader>
                <CardTitle className="text-white space-y-1.5 pt-6">
                  <h2 className="text-2xl tracking-tight">Account Settings</h2>
                </CardTitle>
              </CardHeader>
              <CardContent>
                {/* Form */}
                <AccountForm />
              </CardContent>
            </Card>
            {/* Card Deleting Account */}
            <div className="sticky top-0">
              <Card className="bg-slate-800 border-slate-700 pb-6">
                <CardHeader>
                  <CardTitle className="text-white space-y-1.5 pt-6">
                    <h2 className="text-2xl tracking-tight">Delete Account</h2>
                    <p className="text-slate-300 text-base font-normal">Once you delete your account, there is no going back. Please be certain.</p>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Button
                    className="w-full bg-red-500 hover:bg-red-600 text-white cursor-pointer"
                    onClick={() => setIsOpen(true)}>
                    Delete Account
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {isOpen &&
        <DeleteAccountDialog isOpen={isOpen} onClose={() => setIsOpen(false)} />
      }
    </div >
  )
}