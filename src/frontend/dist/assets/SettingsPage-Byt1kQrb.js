import { m as useAuth, u as useMyProfile, t as useUpdateProfile, r as reactExports, j as jsxRuntimeExports, P as PageHeader, b as LoadingSpinner, U as UserAvatar, L as Label, T as Textarea, I as Input, B as Button, A as LogOut, d as ue } from "./index-CZHbt-YQ.js";
import { S as Separator } from "./separator-BctCa664.js";
function SettingsPage() {
  var _a;
  const { logout } = useAuth();
  const { data: profile, isLoading } = useMyProfile();
  const updateProfile = useUpdateProfile();
  const [bio, setBio] = reactExports.useState("");
  const [profilePicture, setProfilePicture] = reactExports.useState("");
  reactExports.useEffect(() => {
    if (profile) {
      setBio(profile.bio ?? "");
      setProfilePicture(profile.profilePicture ?? "");
    }
  }, [profile]);
  const handleSave = async (e) => {
    e.preventDefault();
    if (!profile) return;
    try {
      await updateProfile.mutateAsync({
        username: profile.username,
        bio,
        profilePicture
      });
      ue.success("Profile updated");
    } catch {
      ue.error("Failed to update profile");
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { "data-ocid": "settings.page", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(PageHeader, { title: "Settings", subtitle: "Manage your account" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-w-lg mx-auto px-4 py-6 flex flex-col gap-6", children: isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-center py-12", children: /* @__PURE__ */ jsxRuntimeExports.jsx(LoadingSpinner, { size: "lg" }) }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "bg-card border border-border/50 rounded-2xl p-5 shadow-subtle", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-semibold text-base text-foreground mb-4", children: "Profile" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4 mb-5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            UserAvatar,
            {
              username: profile == null ? void 0 : profile.username,
              profilePicture: profilePicture || (profile == null ? void 0 : profile.profilePicture),
              size: "xl"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display font-semibold text-foreground", children: profile == null ? void 0 : profile.username }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground", children: [
              "@",
              (_a = profile == null ? void 0 : profile.username) == null ? void 0 : _a.toLowerCase()
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSave, className: "flex flex-col gap-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "bio", className: "text-sm font-medium", children: "Bio" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Textarea,
              {
                id: "bio",
                placeholder: "Tell the world about yourself…",
                value: bio,
                onChange: (e) => setBio(e.target.value),
                maxLength: 160,
                rows: 3,
                className: "bg-background border-border resize-none",
                "data-ocid": "settings.bio_textarea"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground text-right", children: [
              bio.length,
              "/160"
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Label,
              {
                htmlFor: "profilePicture",
                className: "text-sm font-medium",
                children: "Profile picture URL"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                id: "profilePicture",
                type: "url",
                placeholder: "https://example.com/avatar.jpg",
                value: profilePicture,
                onChange: (e) => setProfilePicture(e.target.value),
                className: "bg-background border-border",
                "data-ocid": "settings.profile_picture_input"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              type: "submit",
              className: "rounded-xl",
              disabled: updateProfile.isPending || !profile,
              "data-ocid": "settings.save_button",
              children: updateProfile.isPending ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoadingSpinner, { size: "sm" }) : "Save changes"
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, { className: "bg-border/40" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "bg-card border border-border/50 rounded-2xl p-5 shadow-subtle", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-semibold text-base text-foreground mb-1", children: "Account" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mb-4", children: "Sign out of your account on this device." }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            variant: "outline",
            className: "gap-2 rounded-xl border-destructive/40 text-destructive hover:bg-destructive/10",
            onClick: logout,
            "data-ocid": "settings.logout_button",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(LogOut, { className: "h-4 w-4" }),
              "Sign out"
            ]
          }
        )
      ] })
    ] }) })
  ] });
}
export {
  SettingsPage as default
};
