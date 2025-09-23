import React from "react";
import {
    View,
    Text,
    Image,
    StyleSheet,
    TouchableOpacity,
    ImageBackground,
} from "react-native";

const HomeScreen = ({ navigation }) => {
    return (
        <ImageBackground
            source={require("../assets/darkGreenBg.jpg")}
            style={styles.background}
            resizeMode="cover"
        >
            <View style={styles.overlay}>
                <Text style={styles.appName}>Music Player</Text>

                <Image
                    source={require("../assets/headphones.png")}
                    style={styles.heroImage}
                    resizeMode="contain"
                />

                <Text style={styles.headline}>Start Your{"\n"}Sonic Journey</Text>

                <Text style={styles.subText}>
                    Dive into a world of music — millions of songs, custom playlists, and
                    every genre you love.
                </Text>

                <TouchableOpacity
                    style={styles.button}
                    onPress={() => navigation.navigate("Songs")}
                >
                    <Text style={styles.buttonText}>🎵 Turn on your music</Text>
                </TouchableOpacity>
            </View>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    background: {
        flex: 1,
        width: "100%",
        height: "100%",
    },
    overlay: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        padding: 20,
        backgroundColor: "rgba(0,0,0,0.4)",
    },
    appName: {
        fontSize: 38,
        fontWeight: "600",
        color: "#B8FF5C",
        marginBottom: 20,
    },
    heroImage: {
        width: 400,
        height: 400,
    },
    headline: {
        fontSize: 28,
        fontWeight: "bold",
        color: "#FFFFFF",
        textAlign: "center",
        marginBottom: 10,
    },
    subText: {
        fontSize: 14,
        color: "#E0E0E0",
        textAlign: "center",
        marginHorizontal: 20,
        marginBottom: 40,
    },
    button: {
        backgroundColor: "#B8FF5C",
        paddingVertical: 15,
        paddingHorizontal: 30,
        borderRadius: 30,
        width: "80%",
        alignItems: "center",
    },
    buttonText: {
        fontSize: 16,
        fontWeight: "600",
        color: "#102D0B",
    },
});

export default HomeScreen;
