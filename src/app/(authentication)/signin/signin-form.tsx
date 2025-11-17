"use client";

import { IconEye, IconEyeOff, IconLock } from "@tabler/icons-react";
import { useForm } from "@tanstack/react-form";
import { UserRoundIcon } from "lucide-react";
import { useState } from "react";
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
import { userSigninSchema } from "~/validators/authentication.validator";

export function SigninForm() {
  const [isPassword, setIsPassword] = useState<boolean>(false);

  const signinForm = useForm({
    defaultValues: {
      password: "",
      username: ""
    },
    validators: {
      onSubmit: userSigninSchema
    },
    onSubmit: async ({ value }) => {
      console.log(value);
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
          >
            Reset
          </Button>
          <Button type="submit">Signin</Button>
        </div>
      </FieldGroup>
    </form>
  );
}
