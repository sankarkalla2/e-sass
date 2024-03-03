"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { currentUser } from "@/hooks/current-user";
import { updateUserSchema } from "@/schemas/user-update-schema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useTransition } from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Switch } from "@/components/ui/switch";
import { notFound } from "next/navigation";
import { updateUser } from "@/actions/user";
import { toast } from "sonner";
import { User } from "@prisma/client";

interface ProfileSettingsProps {
  user: User;
}
const ProfileSettings = ({ user }: ProfileSettingsProps) => {
  const [isUpdating, startTransition] = useTransition();

  if (!user || !user.id) return notFound();
  const form = useForm<z.infer<typeof updateUserSchema>>({
    resolver: zodResolver(updateUserSchema),
    defaultValues: {
      name: user?.name || "",
      isTwoFactorEnabled: user?.isTwoFactorEnabled || false,
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof updateUserSchema>) {
    startTransition(() => {
      updateUser(values, user.id).then((data) => {
        if (data.error) {
          return toast.error(data.error);
        }

        toast.success(data.success);
        location.reload();
      });
    });
  }
  return (
    <Tabs defaultValue="account" className="w-[400px]">
      <TabsList>
        <TabsTrigger value="account">Account</TabsTrigger>
        <TabsTrigger value="password" disabled={!user.password}>
          Password
        </TabsTrigger>
      </TabsList>
      <TabsContent value="account">
        <Card>
          <CardHeader>
            <CardTitle>Account</CardTitle>
            <CardDescription>
              Make changes to your account here. Click save when you're done.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-8"
              >
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl className="">
                        <Input
                          placeholder="name..."
                          {...field}
                          disabled={isUpdating}
                        />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="isTwoFactorEnabled"
                  render={({ field }) => (
                    <FormItem className="flex items-center">
                      <FormControl>
                        <div className="border p-2 rounded-md w-full bg-white text-sm flex items-center justify-between font-medium">
                          2Factor Authetication
                          <Switch
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </div>
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button type="submit" disabled={isUpdating}>
                  Save changes
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="password">
        <Card>
          <CardHeader>
            <CardTitle>Password</CardTitle>
            <CardDescription>
              Change your password here. After saving, you'll be logged out.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="space-y-1">
              <Label htmlFor="current">Current password</Label>
              <Input id="current" type="password" placeholder="current password..."/>
            </div>
            <div className="space-y-1">
              <Label htmlFor="new">New password</Label>
              <Input id="new" type="password" placeholder="create new password "/>
            </div>
            <div className="space-y-1">
              <Label htmlFor="new">Retype New password</Label>
              <Input id="new" type="password" placeholder="Retype new password "/>
            </div>
          </CardContent>
          <CardFooter>
            <Button type="submit">Save password</Button>
          </CardFooter>
        </Card>
      </TabsContent>
    </Tabs>
  );
};

export default ProfileSettings;
