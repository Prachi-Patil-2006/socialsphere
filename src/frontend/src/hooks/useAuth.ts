import { useInternetIdentity } from "@caffeineai/core-infrastructure";

export function useAuth() {
  const {
    identity,
    login,
    clear,
    loginStatus,
    isAuthenticated,
    isInitializing,
    isLoggingIn,
  } = useInternetIdentity();

  const principalId = identity?.getPrincipal().toString();

  return {
    identity,
    principalId,
    login,
    logout: clear,
    loginStatus,
    isAuthenticated,
    isInitializing,
    isLoggingIn,
  };
}
