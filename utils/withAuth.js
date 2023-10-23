import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const withAuth = (Component) => {
  return function WithAuth(props) {
    const { data: session } = useSession();
    const router = useRouter();

    useEffect(() => {
      // Check if the user is authenticated
      if (!session) {
        // Redirect to the sign-in page or another appropriate page
        router.push("/");
      }
    }, [session, router]);

    // Render the protected component
    return <Component {...props} />;
  };
};

export default withAuth;
