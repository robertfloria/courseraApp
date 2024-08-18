import { getUser } from "@/database/userDatabase";
import { AuthenticationContext } from "@/store/context/AuthenticationContext";
import { useRouter } from "expo-router";
import { useSQLiteContext } from "expo-sqlite";
import { useContext, useEffect, useState } from "react";
import { Pressable } from "react-native";
import { Avatar } from "react-native-paper";

export default function ProfileScreenButton() {
  const db = useSQLiteContext();

  const authentication = useContext(AuthenticationContext);

  const [image, setImage] = useState<any>("");

  const router = useRouter();

  useEffect(() => {
    (async () => {
      const user = await getUser(db, authentication.email);

      setImage(user.image);
    })();
  }, [authentication]);

  const handleClick = () => {
    router.push("/profileScreen");
  };

  return (
    <Pressable onPress={handleClick}>
      {image ? (
        <Avatar.Image size={40} source={{ uri: image }} />
      ) : (
        <Avatar.Text size={40} label={authentication.firstName?.substring(0, 2)} />
      )}
    </Pressable>
  );
}
