import { useEffect } from "react";
import useRequest from "../../hooks/use-request";
import { useRouter } from "next/navigation";

const Signout = () => {
  const router = useRouter();
  const { doRequest: signout } = useRequest({
    url: "/api/users/signout",
    method: "post",
    body: {},
    onSuccess: () => router.push("/"),
  });
  useEffect(() => {
    signout();
  }, []);
  return <div>Signing out...</div>;
};

export default Signout;
