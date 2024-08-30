import { getUser } from "@/database/userDatabase";
import { AuthenticationContext } from "@/store/context/AuthenticationContext";
import { RerenderContext } from "@/store/context/RerenderContext";
import { useRouter } from "expo-router";
import { useSQLiteContext } from "expo-sqlite";
import { useContext, useEffect, useState } from "react";
import { Pressable } from "react-native";
import { Avatar } from "react-native-paper";

export function ProfileScreenButton() {
  const db = useSQLiteContext();
  const authentication = useContext(AuthenticationContext);
  const { resetPicture } = useContext(RerenderContext);

  const [image, setImage] = useState<any>("");

  const router = useRouter();

  useEffect(() => {
    (async () => {
      const user = await getUser(db, authentication.email);
      setImage(user.image);
    })();
  }, [authentication, resetPicture]);

  const handleClick = () => {
    router.push("/profile");
  };

  return (
    <Pressable onPress={handleClick}>
      {image ? (
        <Avatar.Image size={40} source={{ uri: image }} />
      ) : (
        <Avatar.Text
          size={40}
          label={authentication.firstName?.substring(0, 2)}
        />
      )}
    </Pressable>
  );
}
