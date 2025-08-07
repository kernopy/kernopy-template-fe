import { RouterProvider } from "react-router-dom";
import router from "./router";
import useStore, { useAppActions } from "./store";
import { useEffect } from "react";
import { getToken } from "./api/v1/auth";
import { Loader } from "lucide-react";
import { toast } from "sonner";

const App = () => {
  const { jwt } = useStore();
  const { setJwt } = useAppActions();

  useEffect(() => {
    const fetchToken = async () => {
      if (!jwt) {
        try {
          const response = await getToken();
          setJwt(response.token);
        } catch (error: any) {
          toast.error(error?.message || "Failed to get token");
        }
      }
    };

    fetchToken();
  }, [jwt, setJwt]);

  return jwt ? (
    <RouterProvider router={router} />
  ) : (
    <div className="h-screen flex items-center justify-center">
      <Loader className="animate-spin h-24 w-24" />
    </div>
  );
};

export default App;
