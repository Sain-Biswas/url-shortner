"use client";

import {
  IconAt,
  IconEye,
  IconEyeOff,
  IconLock,
  IconSignature
} from "@tabler/icons-react";
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
import { userSignupSchema } from "~/validators/authentication.validator";

export function SignupForm() {
  const [isPassword, setIsPassword] = useState<boolean>(false);

  const signupForm = useForm({
    defaultValues: {
      password: "",
      username: "",
      email: "",
      name: ""
    },
    validators: {
      onSubmit: userSignupSchema
    },
    onSubmit: async ({ value }) => {
      console.log(value);
    }
  });

  return (
    <form
      onSubmit={event => {
        event.preventDefault();
        void signupForm.handleSubmit();
      }}
      className="m-auto max-w-9/10"
    >
      <FieldGroup>
        <FieldSet>
          <signupForm.Field name="name">
            {field => {
              const isInvalid =
                field.state.meta.isTouched && !field.state.meta.isValid;

              return (
                <Field data-invalid={isInvalid}>
                  <FieldLabel htmlFor={field.name}>Name</FieldLabel>
                  <InputGroup>
                    <InputGroupInput
                      placeholder="Awesome User"
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
                      <IconSignature />
                    </InputGroupAddon>
                  </InputGroup>
                  {isInvalid && <FieldError errors={field.state.meta.errors} />}
                </Field>
              );
            }}
          </signupForm.Field>
          <signupForm.Field name="username">
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
          </signupForm.Field>
          <signupForm.Field name="email">
            {field => {
              const isInvalid =
                field.state.meta.isTouched && !field.state.meta.isValid;

              return (
                <Field data-invalid={isInvalid}>
                  <FieldLabel htmlFor={field.name}>Email</FieldLabel>
                  <InputGroup>
                    <InputGroupInput
                      placeholder="awesomeuser@example.com"
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
                      <IconAt />
                    </InputGroupAddon>
                  </InputGroup>
                  {isInvalid && <FieldError errors={field.state.meta.errors} />}
                </Field>
              );
            }}
          </signupForm.Field>
          <signupForm.Field name="password">
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
          </signupForm.Field>
        </FieldSet>
        <div className="flex justify-end gap-2">
          <Button
            onClick={event => {
              event.preventDefault();
              signupForm.reset();
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
