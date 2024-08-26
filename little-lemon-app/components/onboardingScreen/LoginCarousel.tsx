import React from 'react';
import { View, Dimensions, StyleSheet } from 'react-native';
import Carousel from 'react-native-reanimated-carousel';
import { ThemedView } from '../ThemedView';
import { ThemedText } from '../ThemedText';
import ThemedButton from '../ThemedButton';
import { loginCarouselData } from './data';
import { useThemeColor } from '@/hooks/useThemeColor';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { interpolate, useAnimatedStyle, useSharedValue } from 'react-native-reanimated';

type Props = {
    setOnboarding: (arg: any) => any;
};

function LoginCarousel({ setOnboarding }: Props) {
    const width = Dimensions.get('window').width;
    const progressValue = useSharedValue(0);
    const firstColor = useThemeColor({}, 'firstColor');
    const secondColor = useThemeColor({}, 'secondColor');

    const handleSetOnboarding = () => setOnboarding((prevState: boolean) => !prevState);

    return (
        <ThemedView style={styles.container}>
            <Carousel
                loop
                width={width}
                autoPlay={true}
                data={loginCarouselData}
                scrollAnimationDuration={1000}
                autoPlayInterval={2000}
                pagingEnabled
                onProgressChange={(_, progress) => (progressValue.value = progress)}
                renderItem={({ item }) => (
                    <ThemedView style={{ alignItems: 'center', justifyContent: 'center' }}>
                        <ThemedText type='title' style={{ textAlign: 'center' }}>
                            {item.text}
                        </ThemedText>
                    </ThemedView>
                )}
            />
            <ThemedView style={styles.pagination}>
                {loginCarouselData.map((_, index) => {
                    const animatedDotStyle = useAnimatedStyle(() => {
                        const opacity = interpolate(
                            progressValue.value,
                            [index - 1, index, index + 1],
                            [0.5, 1, 0.5],
                            'clamp'
                        );

                        const scale = interpolate(
                            progressValue.value,
                            [index - 1, index, index + 1],
                            [0.8, 1.2, 0.8],
                            'clamp'
                        );

                        return {
                            opacity,
                            transform: [{ scale }],
                        };
                    });

                    return (
                        <Animated.View key={index.toString()} style={[styles.dot, animatedDotStyle]} />
                    );
                })}
                <LinearGradient
                    colors={[secondColor, firstColor]}
                    start={{ x: 1, y: 1 }}
                    end={{ x: 0, y: 1 }}
                    style={[{ borderColor: firstColor }, styles.gradientContainer]}
                >
                    <ThemedButton lightColor='transparent' darkColor='transparent' onPress={handleSetOnboarding}>
                        Onboarding
                    </ThemedButton>
                </LinearGradient>
            </ThemedView>

        </ThemedView>
    );
}

export default LoginCarousel;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    gradientContainer: {
        width: '100%',
        borderWidth: 1,
        borderRadius: 8,
    },
    pagination: {
        position: 'absolute',
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        alignItems: 'flex-start',
        gap: 20,
        flex: 1
    },
    dot: {
        width: 10,
        height: 10,
        borderRadius: 5,
        backgroundColor: 'gray',
    },
});
