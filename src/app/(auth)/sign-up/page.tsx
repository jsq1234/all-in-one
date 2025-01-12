"use client";
import { SubmitButton } from "@/components/common/submit-button";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { signup } from "@/lib/actions";
import { cn } from "@/lib/utils";
import { SignupSchema } from "@/lib/validations";
import { addYears, format, subYears } from "date-fns";
import { CalendarIcon } from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";
import { useFormState, useFormStatus } from "react-dom";

function SignUp() {
  const { toast } = useToast();
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [state, formAction] = useFormState(signup, null);
  const [errors, setErrors] = useState<any>(null);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    const formData = new FormData(e.currentTarget);
    let jsonData: Record<string, string> = {};
    ["email", "firstName", "lastName", "gender", "dob"].forEach((field) => {
      jsonData[field] = formData.get(field) as string;
    });
    const { success, error } = SignupSchema.safeParse(jsonData);
    if (!success) {
      setErrors(error.flatten().fieldErrors);
      toast({
        title: "Invalid form",
        description: JSON.stringify(error, null, 2),
      });
      e.preventDefault();
    }else{
      setErrors(null);
    }
  };
  return (
    <Card className="w-full sm:w-[640px] py-4">
      <CardHeader className="flex justify-center items-center">
        <CardTitle>Sign Up</CardTitle>
        <CardDescription>
          Create an account to access our services
        </CardDescription>
      </CardHeader>
      <CardContent className="!mt-2 text-sm [&_*]:text-xs">
        <form
          action={formAction}
          onSubmit={handleSubmit}
          className="flex flex-col space-y-7 text-inherit"
        >
          <div className="flex flex-col space-y-1">
            <Label htmlFor="email">Email address</Label>
            <Input
              name="email"
              className={
                errors &&
                errors["email"] &&
                errors["email"].length > 0 &&
                "border-red-600 ring-2 ring-red-400 bg-red-300/80"
              }
            />
            {errors && errors["email"] && errors["email"].length > 0 && (
              <small className="!text-[12px] !-mb-4 text-red-500 font-semibold">
                {errors["email"][0]}
              </small>
            )}
          </div>
          <div>
            <div className="flex flex-col space-y-4 sm:space-x-4 sm:flex-row sm:space-y-0">
              <div className="flex-1 flex flex-col space-y-1">
                <Label htmlFor="firstName">First name</Label>
                <Input
                  name="firstName"
                  className={
                    errors &&
                    errors["firstName"] &&
                    errors["firstName"].length > 0 &&
                    "border-red-600 ring-2 ring-red-400 bg-red-300/80"
                  }
                />
                {errors &&
                  errors["firstName"] &&
                  errors["firstName"].length > 0 && (
                    <small className="!text-[12px] !-mb-4 text-red-500 font-semibold">
                      {errors["firstName"][0]}
                    </small>
                  )}
              </div>
              <div className="flex-1 flex flex-col space-y-1">
                <Label htmlFor="lastName">Last name</Label>
                <Input
                  name="lastName"
                  className={
                    errors &&
                    errors["lastName"] &&
                    errors["lastName"].length > 0 &&
                    "border-red-600 ring-2 ring-red-400 bg-red-300/80"
                  }
                />
                {errors &&
                  errors["lastName"] &&
                  errors["lastName"].length > 0 && (
                    <small className="!text-[12px] !-mb-4 text-red-500 font-semibold">
                      {errors["lastName"][0]}
                    </small>
                  )}
              </div>
            </div>
          </div>
          <div className="flex flex-col space-y-4 sm:space-x-4 sm:flex-row sm:space-y-0">
            <div className="flex-1 flex flex-col space-y-1">
              <Label htmlFor="gender">Gender</Label>
              <Select name="gender">
                <SelectTrigger
                  className={
                    errors &&
                    errors["gender"] &&
                    errors["gender"].length > 0 &&
                    "border-red-600 ring-2 ring-red-400 bg-red-300/80"
                  }
                >
                  <SelectValue placeholder="Gender"></SelectValue>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="M">Male</SelectItem>
                  <SelectItem value="F">Female</SelectItem>
                </SelectContent>
              </Select>
              {errors && errors["gender"] && errors["gender"].length > 0 && (
                <small className="!text-[12px] !-mb-4 text-red-500 font-semibold">
                  {errors["gender"][0]}
                </small>
              )}
            </div>
            <div className="flex-1 flex flex-col space-y-1">
              <Label htmlFor="dob">Date of birth</Label>
              <Input
                name="dob"
                value={date ? format(date, "yyyy-MM-dd") : ""}
                className="hidden"
              />
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    name="dob"
                    className={cn(
                      "justify-start text-left font-normal",
                      !date && "text-muted-foreground",
                      errors && errors.dob && errors.dob.length > 0
                        ? "border-red-600 ring-2 ring-red-400 bg-red-300/80"
                        : ""
                    )}
                  >
                    <CalendarIcon />
                    {date ? format(date, "PPP") : <span>Pick a date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0 relative" align="start">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    disabled={(date) =>
                      date > new Date() || date < new Date("1900-01-01")
                    }
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              {errors && errors.dob && errors.dob.length > 0 && (
                <small className="text-red-500">{errors.dob[0]}</small>
              )}
            </div>
          </div>
          <div className="!mt-10 flex flex-col space-y-2">
            {state?.success !== undefined && state?.success && (
              <small className="text-green-700 font-semibold text-center -mt-4">
                Successfully created user!
              </small>
            )}
            <SubmitButton title="Sign Up" />
            <div className="text-center">
              Already have an account?{" "}
              <Link href="/sign-in" className="text-sky-700 font-bold">
                Sign in
              </Link>
            </div>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}

export default SignUp;
