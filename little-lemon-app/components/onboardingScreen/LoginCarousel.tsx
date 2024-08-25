import * as React from 'react';
import { Dimensions, Text, View } from 'react-native';
import Carousel from 'react-native-reanimated-carousel';
import { ThemedView } from '../ThemedView';
import { ThemedText } from '../ThemedText';
import ThemedButton from '../ThemedButton';

type Props = {
    setOnboarding: (arg: any) => any
};

function LoginCarousel({ setOnboarding }: Props) {
    const width = Dimensions.get('window').width;

    const handleSetOnboarding = () => setOnboarding((prevState: boolean) => !prevState);

    return (
        <ThemedView style={{ flex: 1, display: 'flex' }}>
            <ThemedText type='subtitle'>Are you hungry?</ThemedText>
            <Carousel
                loop
                width={width}
                height={50}
                autoPlay={false}
                data={[...new Array(6).keys()]}
                scrollAnimationDuration={1000}
                renderItem={({ index }) => (
                    <ThemedView
                        style={{
                            flex: 1,
                            justifyContent: 'center',
                        }}
                    >
                        <ThemedText style={{ textAlign: 'center', fontSize: 30, lineHeight:0 }}>
                            {index}
                        </ThemedText>
                    </ThemedView>
                )}
            />
            <ThemedButton onPress={handleSetOnboarding}>Onboarding</ThemedButton>
        </ThemedView>
    );
}

export default LoginCarousel;
