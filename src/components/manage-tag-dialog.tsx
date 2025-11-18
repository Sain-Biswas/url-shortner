import {
  IconCirclePlus,
  IconExclamationCircleFilled,
  IconTag,
  IconTagFilled,
  IconTagsOff
} from "@tabler/icons-react";
import { useForm } from "@tanstack/react-form";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { trpcClient } from "~/integrations/trpc/client.trpc";
import { Button } from "~/shadcn/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "~/shadcn/ui/dialog";
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle
} from "~/shadcn/ui/empty";
import { Field, FieldGroup } from "~/shadcn/ui/field";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput
} from "~/shadcn/ui/input-group";
import { SidebarMenuButton } from "~/shadcn/ui/sidebar";
import { Spinner } from "~/shadcn/ui/spinner";
import { newTagsSchema } from "~/validators/links.validator";

export function ManageTagDialog() {
  const queryClient = useQueryClient();

  const createNewTagMutation = useMutation(
    trpcClient.links.createNewTag.mutationOptions({
      onSuccess: (_data, variables) => {
        toast.success(`New tag created - ${variables.name}`);
        newTagForm.reset();
      }
    })
  );

  const newTagForm = useForm({
    defaultValues: { name: "" },
    validators: {
      onSubmit: newTagsSchema
    },
    onSubmit: async ({ value }) => {
      createNewTagMutation.mutate({ ...value });
      await queryClient.invalidateQueries({
        queryKey: trpcClient.links.getUserTags.queryKey()
      });
    }
  });

  return (
    <Dialog>
      <DialogTrigger asChild>
        <SidebarMenuButton
          tooltip="Tag Management"
          className="bg-secondary text-secondary-foreground duration-200 ease-linear hover:bg-secondary/90 active:bg-secondary/90"
        >
          <IconTagFilled />
          <span>Tags</span>
        </SidebarMenuButton>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Tag Management</DialogTitle>
          <DialogDescription>
            You can view and manage all tags from here.
          </DialogDescription>
        </DialogHeader>
        <section id="new-tag-form">
          <form
            onSubmit={event => {
              event.preventDefault();
              void newTagForm.handleSubmit();
            }}
            className="space-y-4"
          >
            <DialogTitle>Create new tag</DialogTitle>
            <FieldGroup>
              <div className="flex gap-2">
                <newTagForm.Field name="name">
                  {field => {
                    const isInvalid =
                      field.state.meta.isTouched && !field.state.meta.isValid;

                    return (
                      <Field data-invalid={isInvalid}>
                        <InputGroup>
                          <InputGroupInput
                            placeholder="Tag"
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
                            <IconTag />
                          </InputGroupAddon>
                        </InputGroup>
                      </Field>
                    );
                  }}
                </newTagForm.Field>
                <Button type="submit">
                  {createNewTagMutation.isPending ?
                    <Spinner />
                  : <IconCirclePlus />}
                  Create
                </Button>
              </div>
            </FieldGroup>
          </form>
        </section>
        <div className="mt-2 border-t-2 pt-4">
          <DialogTitle>Current Available Tags</DialogTitle>
          <CurrentTagList />
        </div>
      </DialogContent>
    </Dialog>
  );
}

function CurrentTagList() {
  const { data, isPending, error } = useQuery(
    trpcClient.links.getUserTags.queryOptions()
  );

  if (isPending) {
    return (
      <section
        id="tag-list-pending"
        className="flex flex-col items-center justify-center"
      >
        <Spinner />
        <p>Fetching current tags</p>
      </section>
    );
  }

  if (error) {
    return (
      <section
        id="tag-list-pending"
        className="flex flex-col items-center justify-center"
      >
        <IconExclamationCircleFilled className="size-4" />
        <p>Error while fetching tags</p>
      </section>
    );
  }

  return (
    <section
      id="tag-list"
      className="flex flex-wrap gap-2 pt-4"
    >
      {data.map(tag => (
        <Button
          key={tag.id}
          variant={"outline"}
          size={"sm"}
        >
          {tag.name}
        </Button>
      ))}
      {data.length < 1 && (
        <Empty>
          <EmptyHeader>
            <EmptyMedia variant={"icon"}>
              <IconTagsOff />
            </EmptyMedia>
            <EmptyTitle>No Tags Yet</EmptyTitle>
            <EmptyDescription>
              You have&apos;t created any tags yet. Get started by creating your
              first tag.
            </EmptyDescription>
          </EmptyHeader>
        </Empty>
      )}
    </section>
  );
}
