import * as React from 'react';
import { Dimensions, StyleSheet } from 'react-native';
import Carousel from 'react-native-reanimated-carousel';
import { ThemedView } from '../ThemedView';
import { ThemedText } from '../ThemedText';
import ThemedButton from '../ThemedButton';
import { loginCarouselData } from './data';
import { useThemeColor } from '@/hooks/useThemeColor';
import { LinearGradient } from 'expo-linear-gradient';

type Props = {
    setOnboarding: (arg: any) => any
};

function LoginCarousel({ setOnboarding }: Props) {
    const width = Dimensions.get('window').width;

    const handleSetOnboarding = () => setOnboarding((prevState: boolean) => !prevState);
    const firstColor = useThemeColor({}, 'firstColor');
    const secondColor = useThemeColor({}, 'secondColor');
    return (
        <ThemedView style={styles.container}>
            <Carousel
                loop
                width={width}
                autoPlay={true}
                data={loginCarouselData}
                scrollAnimationDuration={1000}
                autoPlayInterval={2000}
                renderItem={({ item, index }) => (
                    <ThemedView style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <ThemedText type='title' style={{ textAlign: 'center' }}>
                            {item.text}
                        </ThemedText>
                    </ThemedView>
                )}
            />
            <ThemedView style={styles.buttonContainer}>
                <LinearGradient
                    colors={[secondColor, firstColor]}
                    start={{ x: 1, y: 1 }}
                    end={{ x: 0, y: 1 }}
                    style={[
                        { borderColor: firstColor }, styles.gradientContainer,
                    ]}
                >
                    <ThemedButton lightColor='transparent' darkColor='transparent' onPress={handleSetOnboarding}>Onboarding</ThemedButton>
                </LinearGradient>
            </ThemedView>
        </ThemedView>
    );
}

export default LoginCarousel;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    button: {
        width: '100%',
    },
    gradientContainer: {
        width: '100%',
        borderWidth: 1,
        borderRadius: 8,
    },
    buttonContainer: {
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-start',
    }
});
