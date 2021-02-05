import { useRouter } from "next/router";
import { NextPage } from "next";
import { ReactElement } from "react";

import { useAuth } from "./hooks";

function isBrowser(): boolean {
  return typeof window !== "undefined";
}

function DefaultLoadingFallback(): ReactElement {
  return <p>Loading...</p>;
}

export default function withAuthRedirect<CP = {}, IP = CP>(
  WrappedComponent: NextPage<CP, IP>,
  expectedAuth: boolean,
  location: string,
  LoadingComponent = DefaultLoadingFallback
) {
  const WithAuthRedirectWrapper: NextPage<CP, IP> = (props) => {
    const router = useRouter();
    const { isLoading, isAuthenticated } = useAuth();

    if (isLoading) {
      return <LoadingComponent />;
    }

    if (isBrowser() && expectedAuth !== isAuthenticated) {
      router.push(location);
      return <></>;
    }

    return <WrappedComponent {...props} />;
  };

  return WithAuthRedirectWrapper;
}
