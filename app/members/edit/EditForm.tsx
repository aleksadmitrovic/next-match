"use client";
import {
  MemberEditSchema,
  memberEditSchema,
} from "@/lib/schemas/memberEditSchema";
import { Input, Textarea } from "@heroui/input";
import { Button } from "@heroui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { Member } from "@prisma/client";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { updateMemberProfile } from "@/app/actions/userActions";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { handleFormServerErrors } from "@/lib/util";

type Props = {
  member: Member;
};

export default function EditForm({ member }: Props) {
  const rounter = useRouter();
  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { isValid, isDirty, isSubmitting, errors },
  } = useForm<MemberEditSchema>({
    resolver: zodResolver(memberEditSchema),
    mode: "onTouched",
  });

  useEffect(() => {
    if (member) {
      reset({
        name: member.name,
        description: member.description,
        city: member.city,
        country: member.country,
      });
    }
  }, [member, reset]);

  async function onSubmit(data: MemberEditSchema) {
    const result = await updateMemberProfile(data);

    if (result.status === "success") {
      toast.success("Profile Updated");
      rounter.refresh();
      reset({ ...data });
    } else {
      handleFormServerErrors(result, setError);
    }
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col space-y-4 "
    >
      <Input
        label="name"
        variant="bordered"
        {...register("name")}
        defaultValue={member.name}
        isInvalid={!!errors.name}
        errorMessage={errors.name?.message}
      />
      <Textarea
        label="description"
        variant="bordered"
        {...register("description")}
        defaultValue={member.description}
        isInvalid={!!errors.description}
        errorMessage={errors.description?.message}
        minRows={6}
      />
      <div className="flex flex-row gap-3">
        <Input
          label="city"
          variant="bordered"
          {...register("city")}
          defaultValue={member.city}
          isInvalid={!!errors.city}
          errorMessage={errors.city?.message}
        />
        <Input
          label="country"
          variant="bordered"
          {...register("country")}
          defaultValue={member.country}
          isInvalid={!!errors.country}
          errorMessage={errors.country?.message}
        />
      </div>
      {errors.root?.serverError && (
        <p className="text-danger" text-sm>
          {errors.root.serverError.message}
        </p>
      )}
      <Button
        type="submit"
        className="flex self-end"
        variant="solid"
        isDisabled={!isValid || !isDirty}
        isLoading={isSubmitting}
        color="secondary"
      >
        Update profile
      </Button>
    </form>
  );
}
