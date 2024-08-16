"use client";
import SubmitButton from "@/components/niwi-ui/button/submit-button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/niwi-ui/form/form";
import TextInput from "@/components/niwi-ui/form/text-input";
import useMagicLinkForm from "../hooks/useMagicLinkForm";

function MagicLinkForm() {
  const { pending, handleSubmit, form } = useMagicLinkForm();

  return (
    <Form {...form}>
      <form
        className="flex flex-col gap-4"
        action={() => form.handleSubmit(handleSubmit)()}
      >
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Generate Magic</FormLabel>
              <FormControl>
                <TextInput
                  type="email"
                  placeholder="johndoe@gmail.com"
                  disabled={pending}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <SubmitButton text="Sign in with email ✨✨" />
      </form>
    </Form>
  );
}
export default MagicLinkForm;
