import { retrieveAuthentication } from "@/store/asyncStorage/getData";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Pressable } from "react-native";
import { Avatar } from "react-native-paper";

export default function ProfileScreenButton() {
  const [name, setName] = useState("");
  const [image, setImage] = useState<any>("");

  const router = useRouter();

  useEffect(() => {
    (async () => {
      const authentication = await retrieveAuthentication();
      setName(authentication.firstName);
      setImage(authentication?.image);
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
        <Avatar.Text size={40} label={name.substring(0, 2)} />
      )}
    </Pressable>
  );
}
