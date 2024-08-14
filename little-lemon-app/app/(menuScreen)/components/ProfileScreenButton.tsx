import { getUser } from "@/database/userDatabase";
import { retrieveAuthentication } from "@/store/asyncStorage/getData";
import { useRouter } from "expo-router";
import { useSQLiteContext } from "expo-sqlite";
import { useEffect, useState } from "react";
import { Pressable } from "react-native";
import { Avatar } from "react-native-paper";

export default function ProfileScreenButton() {
  const db = useSQLiteContext();

  const [firstName, setFirstName] = useState("");
  const [image, setImage] = useState<any>("");

  const router = useRouter();

  useEffect(() => {
    (async () => {
      const authentication = await retrieveAuthentication();
      const user = await getUser(db, authentication.email);

      setFirstName(authentication.firstName);
      setImage(user.image);
    })();
  }, []);

  const handleClick = () => {
    router.push("/profileScreen");
  };

  return (
    <Pressable onPress={handleClick}>
      {image ? (
        <Avatar.Image size={40} source={{ uri: image }} />
      ) : (
        <Avatar.Text size={40} label={firstName?.substring(0, 2)} />
      )}
    </Pressable>
  );
}
