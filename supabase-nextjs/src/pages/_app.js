import { ChakraProvider } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { SessionContextProvider } from "@supabase/auth-helpers-react";
import { supabaseClient } from "../lib/client";
import customTheme from "../lib/theme";

function MyApp({ Component, pageProps }) {
  const router = useRouter();

  useEffect(() => {
    const { data: authListener } = supabaseClient.auth.onAuthStateChange(
      async (event, session) => {
        console.log('Auth event:', event); // Add this line
        console.log('Auth session:', session); // Add this line
        if (event === "SIGNED_IN") {
          const signedInUser = session.user;
          const userId = signedInUser.id;
          const { data, error } = await supabaseClient.from("profiles").upsert({ id: userId }, { returning: 'representation' });


          if (error) {
            console.error("Error updating profile:", error);
          } else {
            router.push("/");
          }
          
            
        }

        if (event === "SIGNED_OUT") {
          router.push("/signin");
        }
      }
    );

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, [router]);

  return (
    <ChakraProvider theme={customTheme}>
      <SessionContextProvider
        supabaseClient={supabaseClient}
        initialSession={pageProps.initialSession}
      >
        <Component {...pageProps} />
      </SessionContextProvider>
    </ChakraProvider>
  );
}

export default MyApp;
