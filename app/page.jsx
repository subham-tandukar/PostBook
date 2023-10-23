"use client";
import Feed from "@components/Feed";
import { signIn, useSession, getProviders } from "next-auth/react";
import { useEffect, useState } from "react";
import { FcGoogle } from "react-icons/fc";

const Home = () => {
  const { data: session } = useSession();
  const [providers, setProviders] = useState(null);
  useEffect(() => {
    const setUpProviders = async () => {
      const response = await getProviders();
      setProviders(response);
    };

    setUpProviders();
  }, []);
  return (
    <section className="w-full flex-center flex-col">
      <div>
        {session?.user ? (
          <Feed />
        ) : (
          <>
            <h1 className="head_text text-center">
              Discover & Share
              <br className="max-md:hidden" />
              <span className="orange_gradient text-center">
                AI-Powered Post
              </span>
            </h1>

            <p className="desc text-center">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sed
              consequuntur praesentium maiores ad eius ipsa reiciendis soluta
              eligendi deleniti in. Doloremque necessitatibus sit quia quidem
              magni debitis assumenda dignissimos molestiae?
            </p>
            <div className="mt-10 flex justify-center">
              {providers &&
                Object.values(providers).map((provider) => (
                  <button
                    type="button"
                    key={provider.name}
                    onClick={() => signIn(provider.id)}
                    className="white_btn"
                  >
                    <FcGoogle size="1.5rem" />
                    Sign in with google
                  </button>
                ))}
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default Home;
