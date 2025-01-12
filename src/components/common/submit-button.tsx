"use client"

import { useFormStatus } from "react-dom";
import { Button } from "../ui/button";
import Loader from "../ui/loader";

export function SubmitButton({ className, title }: { className?: string, title: string }) {
    const { pending } = useFormStatus();
  
    return (
      <Button type="submit" disabled={pending} className={pending ? `relative` : `relative`}>
        {!pending && title}
        {pending && <Loader className="min-w-6 min-h-6 border-[2.5px] border-r-gray-500 border-b-gray-500 animate-spin absolute z-10" />}
      </Button>
    );
}