"use client";

import { IconEye, IconEyeOff, IconLock } from "@tabler/icons-react";
import { useForm } from "@tanstack/react-form";
import { UserRoundIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { authClient } from "~/server/authentication/client.auth";
import { Button } from "~/shadcn/ui/button";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldSet
} from "~/shadcn/ui/field";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput
} from "~/shadcn/ui/input-group";
import { Spinner } from "~/shadcn/ui/spinner";
import { userSigninSchema } from "~/validators/authentication.validator";

export function SigninForm() {
  const [isPassword, setIsPassword] = useState<boolean>(false);
  const [isPending, setIsPending] = useState<boolean>(false);

  const router = useRouter();

  const signinForm = useForm({
    defaultValues: {
      password: "",
      username: ""
    },
    validators: {
      onSubmit: userSigninSchema
    },
    onSubmit: async ({ value }) => {
      setIsPending(true);

      await authClient.signIn
        .username({
          ...value,
          fetchOptions: {
            onSuccess: () => {
              toast.success("User signin successful");
              signinForm.reset();
              router.replace("/dashboard");
            },
            onError: () => {
              toast.error("User signin failed");
            }
          }
        })
        .finally(() => {
          setIsPending(false);
        });
    }
  });

  return (
    <form
      onSubmit={event => {
        event.preventDefault();
        void signinForm.handleSubmit();
      }}
      className="m-auto max-w-9/10"
    >
      <FieldGroup>
        <FieldSet>
          <signinForm.Field name="username">
            {field => {
              const isInvalid =
                field.state.meta.isTouched && !field.state.meta.isValid;

              return (
                <Field data-invalid={isInvalid}>
                  <FieldLabel htmlFor={field.name}>Username</FieldLabel>
                  <InputGroup>
                    <InputGroupInput
                      placeholder="the-awesome-user"
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={event => {
                        field.handleChange(event.target.value);
                      }}
                      aria-invalid={isInvalid}
                      autoComplete="off"
                    />
                    <InputGroupAddon>
                      <UserRoundIcon />
                    </InputGroupAddon>
                  </InputGroup>
                  {isInvalid && <FieldError errors={field.state.meta.errors} />}
                </Field>
              );
            }}
          </signinForm.Field>
          <signinForm.Field name="password">
            {field => {
              const isInvalid =
                field.state.meta.isTouched && !field.state.meta.isValid;

              return (
                <Field data-invalid={isInvalid}>
                  <FieldLabel htmlFor={field.name}>Password</FieldLabel>
                  <InputGroup>
                    <InputGroupInput
                      type={isPassword ? "text" : "password"}
                      placeholder="********"
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={event => {
                        field.handleChange(event.target.value);
                      }}
                      aria-invalid={isInvalid}
                      autoComplete="off"
                    />
                    <InputGroupAddon>
                      <IconLock />
                    </InputGroupAddon>
                    <InputGroupAddon align={"inline-end"}>
                      <Button
                        variant={"ghost"}
                        size={"icon-sm"}
                        onClick={event => {
                          event.preventDefault();
                          setIsPassword(curr => !curr);
                        }}
                      >
                        {isPassword ?
                          <IconEye />
                        : <IconEyeOff />}
                      </Button>
                    </InputGroupAddon>
                  </InputGroup>
                  {isInvalid && <FieldError errors={field.state.meta.errors} />}
                </Field>
              );
            }}
          </signinForm.Field>
        </FieldSet>
        <div className="flex justify-end gap-2">
          <Button
            onClick={event => {
              event.preventDefault();
              signinForm.reset();
            }}
            variant={"secondary"}
            disabled={isPending}
          >
            Reset
          </Button>
          <Button
            type="submit"
            disabled={isPending}
          >
            {isPending && <Spinner />}
            Signin
          </Button>
        </div>
      </FieldGroup>
    </form>
  );
}
