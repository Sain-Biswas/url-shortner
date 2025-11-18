import {
  IconCirclePlusFilled,
  IconDots,
  IconExclamationCircleFilled,
  IconLink,
  IconRefresh,
  IconTags
} from "@tabler/icons-react";
import { useForm } from "@tanstack/react-form";
import { useMutation, useQuery } from "@tanstack/react-query";
import { nanoid } from "nanoid";
import { useState } from "react";
import { toast } from "sonner";
import { trpc, trpcClient } from "~/integrations/trpc/client.trpc";
import { Badge } from "~/shadcn/ui/badge";
import { Button } from "~/shadcn/ui/button";
import { Checkbox } from "~/shadcn/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "~/shadcn/ui/dialog";
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
  InputGroupInput,
  InputGroupTextarea
} from "~/shadcn/ui/input-group";
import { Popover, PopoverContent, PopoverTrigger } from "~/shadcn/ui/popover";
import { SidebarMenuButton } from "~/shadcn/ui/sidebar";
import { Spinner } from "~/shadcn/ui/spinner";
import { newQuickLinkSchema } from "~/validators/links.validator";

export function QuickCreateDialog() {
  const {
    error,
    isLoading,
    data: tags
  } = useQuery(trpcClient.links.getUserTags.queryOptions());

  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const createNewLinkMutation = useMutation(
    trpcClient.links.createNewLink.mutationOptions({
      onSuccess: async () => {
        toast.success("Link generated successfully.");
        createNewLinkForm.reset();
      },
      onError: () => {
        toast.error("Link generation failed.");
      }
    })
  );

  const createNewLinkForm = useForm({
    defaultValues: {
      originalURL: "",
      description: "",
      id: nanoid(8),
      tags: [] as string[],
      expiresOn: new Date(),
      doesExpire: false
    },
    validators: {
      onSubmit: newQuickLinkSchema
    },
    listeners: {
      onChange: ({ formApi }) => {
        const data =
          tags
            ?.filter(tag => formApi.state.values.tags.includes(tag.id))
            .map(tag => tag.name) ?? [];

        setSelectedTags(data);
      }
    },
    onSubmit: ({ value }) => {
      createNewLinkMutation.mutate({ ...value });
    }
  });

  if (isLoading) {
    return (
      <SidebarMenuButton
        tooltip="Quick Create"
        variant={"outline"}
        className="min-w-8 duration-200 ease-linear"
      >
        <Spinner />
        <span>Quick Create</span>
      </SidebarMenuButton>
    );
  }

  if (error) {
    return (
      <SidebarMenuButton
        tooltip="Quick Create"
        className="min-w-8 bg-destructive text-destructive-foreground duration-200 ease-linear hover:bg-destructive/90 active:bg-destructive/90"
      >
        <IconExclamationCircleFilled />
        <span>Quick Create</span>
      </SidebarMenuButton>
    );
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <SidebarMenuButton
          tooltip="Quick Create"
          className="min-w-8 bg-primary text-primary-foreground duration-200 ease-linear hover:bg-primary/90 hover:text-primary-foreground active:bg-primary/90 active:text-primary-foreground"
        >
          <IconCirclePlusFilled />
          <span>Quick Create</span>
        </SidebarMenuButton>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create new link</DialogTitle>
          <DialogDescription>
            Fill out the details to create a new link.
          </DialogDescription>
        </DialogHeader>
        <form
          onSubmit={event => {
            event.preventDefault();
            void createNewLinkForm.handleSubmit();
          }}
        >
          <FieldSet>
            <FieldGroup>
              <createNewLinkForm.Field name="originalURL">
                {field => {
                  const isInvalid =
                    field.state.meta.isTouched && !field.state.meta.isValid;

                  return (
                    <Field data-invalid={isInvalid}>
                      <FieldLabel htmlFor={field.name}>
                        Destination URL
                      </FieldLabel>
                      <InputGroup>
                        <InputGroupInput
                          placeholder="https://zipinl.vercel.app"
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
                        <InputGroupAddon align={"inline-start"}>
                          <IconLink />
                        </InputGroupAddon>
                      </InputGroup>
                      {isInvalid && (
                        <FieldError errors={field.state.meta.errors} />
                      )}
                    </Field>
                  );
                }}
              </createNewLinkForm.Field>

              <createNewLinkForm.Field
                name="id"
                asyncDebounceMs={500}
                validators={{
                  onChangeAsync: async ({ value }) => {
                    const data =
                      await trpc.links.isNanoidAvailable.query(value);

                    return !data ?
                        { message: "The current nanoid is not available" }
                      : undefined;
                  }
                }}
              >
                {field => {
                  const isInvalid =
                    field.state.meta.isTouched && !field.state.meta.isValid;
                  return (
                    <Field data-invalid={isInvalid}>
                      <FieldLabel htmlFor={field.name}>Short Link</FieldLabel>
                      <InputGroup>
                        <InputGroupInput
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
                        <InputGroupAddon align={"inline-start"}>
                          https://zipinl.vercel.app/r/
                        </InputGroupAddon>
                        <InputGroupAddon align={"inline-end"}>
                          <Button
                            variant={"link"}
                            size={"icon-sm"}
                            onClick={event => {
                              event.preventDefault();
                              field.handleChange(nanoid(8));
                            }}
                          >
                            <IconRefresh />
                          </Button>
                        </InputGroupAddon>
                      </InputGroup>
                      {isInvalid && (
                        <FieldError errors={field.state.meta.errors} />
                      )}
                    </Field>
                  );
                }}
              </createNewLinkForm.Field>
            </FieldGroup>

            <FieldGroup className="gap-3">
              <createNewLinkForm.Field name="description">
                {field => {
                  const isInvalid =
                    field.state.meta.isTouched && !field.state.meta.isValid;

                  return (
                    <Field data-invalid={isInvalid}>
                      <FieldLabel htmlFor={field.name}>Description</FieldLabel>
                      <InputGroup>
                        <InputGroupTextarea
                          id={field.name}
                          name={field.name}
                          value={field.state.value}
                          onBlur={field.handleBlur}
                          onChange={e => {
                            field.handleChange(e.target.value);
                          }}
                          aria-invalid={isInvalid}
                          placeholder="Short Description..."
                          className="min-h-[120px]"
                        />
                      </InputGroup>
                    </Field>
                  );
                }}
              </createNewLinkForm.Field>

              <createNewLinkForm.Field
                name="tags"
                mode="array"
              >
                {field => {
                  const isInvalid =
                    field.state.meta.isTouched && !field.state.meta.isValid;

                  return (
                    <>
                      <FieldLabel htmlFor={field.name}>Tags</FieldLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <InputGroup>
                            <div className="flex w-full flex-wrap gap-0.5 px-2">
                              {selectedTags.map(tag => (
                                <Badge key={tag}>{tag}</Badge>
                              ))}
                              {selectedTags.length < 1 && (
                                <p>No tags selected</p>
                              )}
                            </div>
                            <InputGroupAddon align={"inline-start"}>
                              <IconTags />
                            </InputGroupAddon>
                            <InputGroupAddon align={"inline-end"}>
                              <IconDots />
                            </InputGroupAddon>
                          </InputGroup>
                        </PopoverTrigger>
                        <PopoverContent>
                          <FieldGroup data-slot="checkbox-group">
                            {tags?.map(tag => (
                              <Field
                                data-invalid={isInvalid}
                                key={tag.id}
                                orientation={"horizontal"}
                              >
                                <Checkbox
                                  id={tag.id}
                                  name={field.name}
                                  aria-invalid={isInvalid}
                                  checked={field.state.value.includes(tag.id)}
                                  onCheckedChange={checked => {
                                    if (checked) {
                                      field.pushValue(tag.id);
                                    } else {
                                      const index = field.state.value.indexOf(
                                        tag.id
                                      );
                                      if (index > -1) {
                                        field.removeValue(index);
                                      }
                                    }
                                  }}
                                />
                                <FieldLabel
                                  htmlFor={tag.id}
                                  className="font-normal"
                                >
                                  {tag.name}
                                </FieldLabel>
                              </Field>
                            ))}
                          </FieldGroup>
                        </PopoverContent>
                      </Popover>
                      {isInvalid && (
                        <FieldError errors={field.state.meta.errors} />
                      )}
                    </>
                  );
                }}
              </createNewLinkForm.Field>
            </FieldGroup>
          </FieldSet>
          <DialogFooter className="pt-4">
            <Button>
              {createNewLinkMutation.isPending ?
                <Spinner />
              : <IconCirclePlusFilled />}
              Create
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
