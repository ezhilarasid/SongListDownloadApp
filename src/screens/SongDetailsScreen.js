import React, { useState, useEffect } from "react";
import {
    View,
    Text,
    Image,
    StyleSheet,
    TouchableOpacity,
    ImageBackground,
    ActivityIndicator,
    Alert,
} from "react-native";
import { downloadSong } from "../utils/downloadHelper";
import { requestStoragePermission } from "../utils/permissionsHelper";

const SongDetailsScreen = ({ route }) => {
    const { song } = route.params;
    const [downloading, setDownloading] = useState(false);

    const handleDownload = async () => {
        try {
            setDownloading(true);
            const path = await downloadSong(song);
            Alert.alert("✅ Download Complete", `${song.title} saved to:\n${path}`);
        } catch (err) {
            console.error("Download failed", err);
            Alert.alert("❌ Download Failed", "Something went wrong while downloading.");
        } finally {
            setDownloading(false);
        }
    };


    useEffect(() => {
        requestStoragePermission();
    }, []);

    return (
        <ImageBackground
            source={require("../assets/MusicBackGround.jpg")}
            style={styles.background}
            resizeMode="cover"
        >
            <View style={styles.overlay}>
                <Image source={{ uri: song.thumbnail }} style={styles.thumbnail} />
                <Text style={styles.title}>{song.title}</Text>
                <Text style={styles.artist}>{song.artist}</Text>

                <TouchableOpacity
                    style={styles.downloadBtn}
                    onPress={handleDownload}
                    disabled={downloading}
                >
                    {downloading ? (
                        <ActivityIndicator size="small" color="#102D0B" />
                    ) : (
                        <Text style={styles.downloadText}>Download Song</Text>
                    )}
                </TouchableOpacity>
            </View>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    background: { flex: 1, width: "100%", height: "100%" },
    overlay: {
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.7)",
        alignItems: "center",
        justifyContent: "center",
    },
    thumbnail: {
        marginBottom: 20,
        borderRadius: 12,
    },
    title: {
        fontSize: 22,
        fontWeight: "bold",
        color: "#FFFFFF",
        marginBottom: 8,
    },
    artist: {
        fontSize: 18,
        color: "#CCCCCC",
        marginBottom: 20,
    },
    downloadBtn: {
        backgroundColor: "#B8FF5C",
        padding: 12,
        borderRadius: 8,
        marginTop: 20,
        width: "70%",
        alignItems: "center",
    },
    downloadText: { color: "#102D0B", fontSize: 16, fontWeight: "600" },
});

export default SongDetailsScreen;
