import { zodResolver } from "@hookform/resolvers/zod";
import { nanoid } from "nanoid";
import { User } from "next-auth";
import {
  useActionState,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { saveProfileAction } from "../actions/profile.action";
import {
  SaveProfileFormValues,
  saveProfileSchema,
} from "../validation/profile.validation";

import { useRouter } from "next/navigation";

const useProfileSave = ({
  data,
  authUser,
}: {
  data: SaveProfileFormValues;
  authUser?: User;
}) => {
  const router = useRouter();

  const [isEditing, setIsEditing] = useState(false);

  const [editorResetKey, setEditorResetKey] = useState(() => nanoid());

  const [saveProfileResponse, dispatchSaveProfile, loading] = useActionState(
    saveProfileAction,
    undefined
  );

  const [statusMessageJson, setStatusMessageJson] = useState(
    data.statusMessageJson
  );

  const [aboutMeJson, setAboutMeJson] = useState(data.aboutMeJson);

  const defaultShortLink = useRef<string>(data.shortLink);

  const { handleSubmit, setValue, reset, watch, getValues, register } =
    useForm<SaveProfileFormValues>({
      resolver: zodResolver(saveProfileSchema),
      defaultValues: { ...data, userId: authUser?.id || "" },
    });

  const submit = useCallback(
    async (values: SaveProfileFormValues) => {
      dispatchSaveProfile(values);
    },
    [dispatchSaveProfile]
  );

  const resetForm = useCallback(() => {
    reset();
    setEditorResetKey(nanoid());
  }, []);

  const onChangeBackgroundImage = useCallback((img: string) => {
    setValue("backgroundImage", img, { shouldDirty: true });
  }, []);

  const onChangeAboutMeValue = useCallback((html: string, json: string) => {
    setValue("aboutMe", html, { shouldDirty: true });
    setValue("aboutMeJson", json, { shouldDirty: true });
  }, []);

  const onChangeStatusMessage = useCallback((html: string, json: string) => {
    setValue("statusMessage", html, { shouldDirty: true });
    setValue("statusMessageJson", json, { shouldDirty: true });
  }, []);

  const onToggleShowStatusMessage = useCallback(() => {
    const showStatus = getValues("showStatusMessage");
    setValue("showStatusMessage", !showStatus, { shouldDirty: true });
  }, []);

  const onChangeGridProfile = useCallback(
    (data: SaveProfileFormValues["gridProfile"]) => {
      setValue("gridProfile", data, { shouldDirty: true });
    },
    []
  );

  useEffect(() => {
    if (saveProfileResponse?.success === true) {
      const res = saveProfileResponse;
      toast.success(res.message);
      if (res.data) {
        if (defaultShortLink.current !== res.data.shortLink) {
          router.push(
            `/dashboard/profile/${res.data.shortLink}?shortLink=${res.data.shortLink}`
          );
          return;
        }
        reset(
          {
            userId: data.userId,
            name: res.data.name,
            shortLink: res.data.shortLink,
            backgroundImage: res.data.profile.backgroundImage,
            aboutMe: res.data.profile.aboutMe,
            aboutMeJson: res.data.profile.aboutMeJson,
            statusMessage: res.data.profile.statusMessage,
            statusMessageJson: res.data.profile.statusMessageJson,
            showStatusMessage: res.data.profile.showStatusMessage,
          },
          { keepDefaultValues: false }
        );
        setStatusMessageJson(res.data.profile.statusMessageJson);
        setAboutMeJson(res.data.profile.aboutMeJson);
        defaultShortLink.current = res.data.shortLink;
      }

      setIsEditing(false);
      setEditorResetKey(nanoid());
      return;
    }

    if (saveProfileResponse?.success === false) {
      toast.error(saveProfileResponse.message);
      return;
    }
  }, [saveProfileResponse]);

  return {
    onToggleShowStatusMessage,
    onChangeBackgroundImage,
    onChangeGridProfile,
    onChangeStatusMessage,
    onChangeAboutMeValue,
    handleSubmit: handleSubmit(submit),
    watch,
    loading,
    saveProfileResponse,
    editorResetKey,
    getValues,
    register,
    resetForm,
    isEditing,
    setIsEditing,
    statusMessageJson,
    aboutMeJson,
  };
};

export default useProfileSave;
