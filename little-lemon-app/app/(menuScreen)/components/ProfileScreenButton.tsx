import Button from "@/components/Button"
import { retrieveAuthentication } from "@/store/asyncStorage/getData";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Avatar } from "react-native-paper";

export default function ProfileScreenButton() {
    const [name, setName] = useState('');
    const [image, setImage] = useState<any>('');

    const router = useRouter();

    useEffect(() => {
        (async () => {
            const authentication = await retrieveAuthentication();
            setName(authentication.firstName);
            setImage(authentication?.image);
        })();
    }, [])

    const handleClick = () => {
        router.push("/profileScreen");
    };

    return (
        <Button onPress={handleClick}>
            {image ?
                <Avatar.Icon size={40} icon={image} />
                :
                <Avatar.Text size={40} label={name.substring(0, 2)} />
            }
        </Button>
    )
};
