"use client";

import { useForm } from "@tanstack/react-form";
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
  FieldSet
} from "~/shadcn/ui/field";
import { Switch } from "~/shadcn/ui/switch";
import { userSigninSchema } from "~/validators/authentication.validator";

export function SigninForm() {
  const signinForm = useForm({
    defaultValues: {
      isEmail: false,
      password: "",
      email: "",
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
    >
      <FieldGroup>
        <FieldSet>
          <signinForm.Field name="isEmail">
            {field => {
              const isInvalid =
                field.state.meta.isTouched && !field.state.meta.isValid;
              return (
                <Field
                  orientation={"horizontal"}
                  data-invalid={isInvalid}
                >
                  <FieldContent>
                    <FieldLabel htmlFor={field.name}>
                      Use Email instead of Username
                    </FieldLabel>
                    <FieldDescription>
                      If enabled email for registered user will be used instead
                      of username
                    </FieldDescription>
                  </FieldContent>
                  <Switch
                    id={field.name}
                    name={field.name}
                    checked={field.state.value}
                    onCheckedChange={field.handleChange}
                    aria-invalid={isInvalid}
                  />
                </Field>
              );
            }}
          </signinForm.Field>
        </FieldSet>
        <FieldSeparator />
        <FieldSet>
          <signinForm.Field name="email">
            {field => {
              const isInvalid =
                field.state.meta.isTouched && !field.state.meta.isValid;

              return (
                <Field data-invalid={isInvalid}>
                  <FieldLabel htmlFor={field.name}>Email</FieldLabel>
                </Field>
              );
            }}
          </signinForm.Field>
        </FieldSet>
      </FieldGroup>
    </form>
  );
}
